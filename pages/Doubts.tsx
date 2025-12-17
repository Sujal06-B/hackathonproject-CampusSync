import React, { useState, useRef, useEffect } from 'react';
import { Layout } from '../components/Layout';

interface Message {
    id: number;
    sender: 'user' | 'peer' | 'instructor';
    name: string;
    avatar?: string;
    text: string;
    image?: string;
    time: string;
    isOwn?: boolean;
}

const CHANNELS = [
    { id: 1, name: 'General Queries', unread: 0 },
    { id: 2, name: 'CS301 - Data Structures', unread: 3 },
    { id: 3, name: 'MAT202 - Calculus', unread: 0 },
    { id: 4, name: 'Project Collaboration', unread: 12 },
];

const INITIAL_MESSAGES: Message[] = [
    { id: 1, sender: 'peer', name: 'Rahul K.', avatar: 'https://i.pravatar.cc/150?u=1', text: 'Can someone explain the difference between BFS and DFS traversal?', time: '10:30 AM' },
    { id: 2, sender: 'instructor', name: 'Prof. Anjali', avatar: 'https://i.pravatar.cc/150?u=anjali', text: 'BFS uses a Queue data structure (FIFO), while DFS uses a Stack (LIFO). BFS explores neighbors first, DFS goes deep.', time: '10:35 AM' },
    { id: 3, sender: 'peer', name: 'Sneha P.', avatar: 'https://i.pravatar.cc/150?u=2', text: 'Here is a diagram I found helpful:', image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=2021&auto=format&fit=crop', time: '10:40 AM' },
];

const Doubts: React.FC = () => {
    const [activeChannel, setActiveChannel] = useState(2);
    const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
    const [inputText, setInputText] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSendMessage = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (!inputText.trim()) return;

        const newMessage: Message = {
            id: Date.now(),
            sender: 'user',
            name: 'Priya Sharma',
            text: inputText,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isOwn: true
        };

        setMessages([...messages, newMessage]);
        setInputText('');
    };

    const handleImageUpload = () => {
        const newMessage: Message = {
            id: Date.now(),
            sender: 'user',
            name: 'Priya Sharma',
            text: 'Uploaded an image',
            image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2070&auto=format&fit=crop', // Placeholder for uploaded image
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isOwn: true
        };
        setMessages([...messages, newMessage]);
    };

    return (
        <Layout>
            <div className="flex h-full bg-[#0a0a0a] overflow-hidden">
                {/* Left Sidebar - Channels */}
                <div className="w-80 bg-background-dark border-r border-surface-border hidden md:flex flex-col">
                    <div className="p-4 border-b border-surface-border">
                        <h2 className="text-lg font-bold text-white flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">forum</span>
                            Discussion Forums
                        </h2>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 space-y-2">
                        {CHANNELS.map(channel => (
                            <button 
                                key={channel.id}
                                onClick={() => setActiveChannel(channel.id)}
                                className={`w-full text-left px-4 py-3 rounded-xl flex justify-between items-center transition-colors ${activeChannel === channel.id ? 'bg-primary/10 text-primary font-bold' : 'text-gray-400 hover:bg-surface-dark hover:text-white'}`}
                            >
                                <span className="truncate"># {channel.name}</span>
                                {channel.unread > 0 && (
                                    <span className="bg-primary text-background-dark text-xs font-bold px-2 py-0.5 rounded-full">{channel.unread}</span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Main Chat Area */}
                <div className="flex-1 flex flex-col h-full relative">
                    {/* Header */}
                    <div className="p-4 bg-background-dark/80 backdrop-blur-md border-b border-surface-border z-10 flex justify-between items-center">
                        <div>
                            <h3 className="font-bold text-white flex items-center gap-2">
                                <span className="md:hidden text-gray-400">#</span>
                                {CHANNELS.find(c => c.id === activeChannel)?.name}
                            </h3>
                            <p className="text-xs text-text-secondary">32 students, 1 instructor online</p>
                        </div>
                        <div className="flex -space-x-2">
                            {[1,2,3].map(i => (
                                <img key={i} className="size-8 rounded-full border-2 border-background-dark" src={`https://i.pravatar.cc/150?u=${i}`} alt="User" />
                            ))}
                            <div className="size-8 rounded-full border-2 border-background-dark bg-surface-border flex items-center justify-center text-xs text-white font-bold">+29</div>
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-6">
                        {messages.map((msg) => (
                            <div key={msg.id} className={`flex gap-3 ${msg.isOwn ? 'flex-row-reverse' : ''}`}>
                                {!msg.isOwn && (
                                    <img src={msg.avatar} alt={msg.name} className="size-10 rounded-full object-cover mt-1" />
                                )}
                                <div className={`flex flex-col max-w-[70%] ${msg.isOwn ? 'items-end' : 'items-start'}`}>
                                    <div className="flex items-baseline gap-2 mb-1">
                                        <span className="text-sm font-bold text-white">{msg.name}</span>
                                        <span className="text-xs text-gray-500">{msg.time}</span>
                                        {msg.sender === 'instructor' && <span className="bg-blue-500/20 text-blue-400 text-[10px] font-bold px-1.5 rounded uppercase">Instr</span>}
                                    </div>
                                    <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                                        msg.isOwn 
                                            ? 'bg-primary text-background-dark rounded-tr-sm' 
                                            : msg.sender === 'instructor' 
                                                ? 'bg-blue-900/20 border border-blue-500/30 text-blue-100 rounded-tl-sm'
                                                : 'bg-surface-dark border border-surface-border text-gray-200 rounded-tl-sm'
                                    }`}>
                                        {msg.text}
                                        {msg.image && (
                                            <div className="mt-3 rounded-lg overflow-hidden border border-black/10">
                                                <img src={msg.image} alt="Attached" className="w-full h-auto" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="p-4 bg-background-dark border-t border-surface-border">
                        <form onSubmit={handleSendMessage} className="flex gap-3 bg-surface-dark p-2 rounded-2xl border border-surface-border focus-within:border-primary/50 transition-colors">
                            <button type="button" onClick={handleImageUpload} className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors" title="Upload Image">
                                <span className="material-symbols-outlined">add_photo_alternate</span>
                            </button>
                            <input 
                                type="text" 
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                placeholder="Type your doubt here..." 
                                className="flex-1 bg-transparent border-none text-white placeholder-gray-500 focus:ring-0"
                            />
                            <button type="submit" className="p-2 bg-primary text-background-dark rounded-xl hover:bg-primary-hover transition-colors font-bold disabled:opacity-50" disabled={!inputText.trim()}>
                                <span className="material-symbols-outlined icon-filled">send</span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Doubts;