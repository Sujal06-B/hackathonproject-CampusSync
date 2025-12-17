import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getChatResponse } from '../services/geminiService';
import { useAuth } from '../contexts/AuthContext';

interface LayoutProps {
  children: React.ReactNode;
}

const SidebarLink = ({ to, icon, label, active }: { to: string; icon: string; label: string; active: boolean }) => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(to)}
      className={`flex items-center gap-4 px-4 py-3 rounded-full transition-colors w-full ${
        active
          ? 'bg-primary text-background-dark shadow-lg shadow-primary/20 font-bold'
          : 'text-text-secondary hover:bg-white/5 hover:text-white font-medium'
      }`}
    >
      <span className={`material-symbols-outlined ${active ? 'icon-filled' : ''}`}>{icon}</span>
      <span className="text-sm">{label}</span>
    </button>
  );
};

const AIChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; text: string }[]>([
    { role: 'model', text: 'Hi! I\'m your CampusSync assistant. Ask me about your assignments or schedule.' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
      // Convert internal message format to Gemini history format
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));
      
      const response = await getChatResponse(userMsg, history);
      setMessages(prev => [...prev, { role: 'model', text: response }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'model', text: "Error connecting to AI." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 size-14 rounded-full bg-primary text-background-dark shadow-lg shadow-primary/30 flex items-center justify-center hover:scale-110 transition-transform"
      >
        <span className="material-symbols-outlined icon-filled text-2xl">smart_toy</span>
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 h-[500px] bg-surface-dark border border-surface-border rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 fade-in duration-200">
          <div className="p-4 bg-background-dark border-b border-surface-border flex justify-between items-center">
            <h3 className="font-bold text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">auto_awesome</span>
              Campus AI
            </h3>
            <button onClick={() => setIsOpen(false)} className="text-text-secondary hover:text-white">
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-2xl p-3 text-sm ${
                  m.role === 'user' 
                    ? 'bg-primary text-background-dark font-medium rounded-tr-sm' 
                    : 'bg-surface-border text-gray-200 rounded-tl-sm'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                 <div className="bg-surface-border rounded-2xl p-3 rounded-tl-sm flex gap-1">
                    <span className="w-2 h-2 bg-text-secondary rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-text-secondary rounded-full animate-bounce delay-100"></span>
                    <span className="w-2 h-2 bg-text-secondary rounded-full animate-bounce delay-200"></span>
                 </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-3 bg-background-dark border-t border-surface-border flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask anything..."
              className="flex-1 bg-surface-dark border border-surface-border rounded-full px-4 py-2 text-sm text-white focus:outline-none focus:border-primary"
            />
            <button 
              onClick={handleSend}
              disabled={loading}
              className="size-9 bg-primary rounded-full flex items-center justify-center text-background-dark hover:bg-primary-hover disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-sm">send</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currentUser, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  return (
    <div className="flex h-screen w-full bg-background-light dark:bg-background-dark overflow-hidden">
      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-background-dark border-r border-surface-border transform transition-transform duration-300 lg:translate-x-0 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full p-6">
          <div className="flex items-center gap-3 mb-10 px-2 cursor-pointer" onClick={() => navigate('/dashboard')}>
            <div className="flex items-center justify-center size-10 rounded-full bg-primary text-background-dark">
              <span className="material-symbols-outlined icon-filled">school</span>
            </div>
            <h1 className="text-xl font-bold tracking-tight text-white">CampusSync</h1>
          </div>

          <nav className="flex flex-col gap-2 flex-1 overflow-y-auto no-scrollbar">
            {/* Core journey */}
            <SidebarLink
              to="/dashboard"
              icon="home"
              label="Home / Feed"
              active={location.pathname === '/dashboard'}
            />
            <SidebarLink
              to="/assignments"
              icon="assignment"
              label="Assignments"
              active={location.pathname === '/assignments'}
            />
            <SidebarLink
              to="/live-class"
              icon="videocam"
              label="Live Class"
              active={location.pathname === '/live-class'}
            />
            <SidebarLink
              to="/materials"
              icon="folder_open"
              label="Materials"
              active={location.pathname === '/materials'}
            />

            {/* Community / college context */}
            <SidebarLink
              to="/department"
              icon="domain"
              label="Department"
              active={location.pathname === '/department'}
            />
            <SidebarLink
              to="/doubts"
              icon="quiz"
              label="Doubt Clearing"
              active={location.pathname === '/doubts'}
            />
            <SidebarLink
              to="/profile"
              icon="person"
              label="Profile"
              active={location.pathname === '/profile'}
            />
          </nav>

          <div className="flex flex-col gap-2 pt-6 border-t border-surface-border">
            <SidebarLink
              to="/settings"
              icon="settings"
              label="Settings"
              active={location.pathname === '/settings'}
            />
            <SidebarLink
              to="/help"
              icon="help"
              label="Help & Support"
              active={location.pathname === '/help'}
            />
            
            <div className="flex items-center justify-between mt-4 px-2 p-2 rounded-xl bg-surface-dark border border-surface-border">
              <div className="flex items-center gap-3">
                <div className="size-8 rounded-full bg-cover bg-center border border-primary" style={{ backgroundImage: "url('https://picsum.photos/200')" }}></div>
                <div className="flex flex-col overflow-hidden">
                  <span className="text-xs font-bold text-white truncate max-w-[100px]">{currentUser?.email?.split('@')[0] || 'User'}</span>
                  <span className="text-[10px] text-text-secondary">Online</span>
                </div>
              </div>
              <button onClick={handleLogout} className="text-gray-400 hover:text-red-400 transition-colors" title="Log Out">
                <span className="material-symbols-outlined text-[18px]">logout</span>
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative lg:ml-72">
        {/* Header Mobile */}
        <header className="lg:hidden flex items-center justify-between px-6 py-4 border-b border-surface-border bg-background-dark">
           <div className="flex items-center gap-3">
             <button onClick={() => setMobileMenuOpen(true)} className="text-white">
                <span className="material-symbols-outlined">menu</span>
             </button>
             <h1 className="text-lg font-bold text-white">CampusSync</h1>
           </div>
           <div className="size-8 rounded-full bg-cover bg-center border border-primary" style={{ backgroundImage: "url('https://picsum.photos/200')" }}></div>
        </header>

        <div className="flex-1 overflow-y-auto no-scrollbar">
          {children}
        </div>
        
        <AIChatBot />
      </main>
    </div>
  );
};