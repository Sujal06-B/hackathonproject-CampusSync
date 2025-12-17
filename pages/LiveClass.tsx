import React, { useState, useEffect } from 'react';
import { Layout } from '../components/Layout';

// Mock Data
const PARTICIPANTS = [
  { id: 1, name: 'Rahul K.', role: 'Student', isMuted: true, avatar: 'https://i.pravatar.cc/150?u=1' },
  { id: 2, name: 'Sneha P.', role: 'Student', isMuted: true, avatar: 'https://i.pravatar.cc/150?u=2' },
  { id: 3, name: 'Vikram S.', role: 'Student', isMuted: false, avatar: 'https://i.pravatar.cc/150?u=3' },
  { id: 4, name: 'Aditi M.', role: 'Student', isMuted: true, avatar: 'https://i.pravatar.cc/150?u=4' },
];

const CHAT_MESSAGES = [
  { id: 1, sender: 'Rahul K.', text: 'Is the mid-sem syllabus covered today?', time: '10:05 AM' },
  { id: 2, sender: 'Prof. Anjali Gupta', text: 'Yes, we will cover the last module.', time: '10:06 AM' },
  { id: 3, sender: 'Sneha P.', text: 'Can you zoom in on the diagram?', time: '10:12 AM' },
];

type ClassState = 'lobby' | 'setup' | 'live' | 'ended';

const LiveClass: React.FC = () => {
  const [viewState, setViewState] = useState<ClassState>('lobby');
  const [micOn, setMicOn] = useState(false);
  const [cameraOn, setCameraOn] = useState(true);
  const [screenShareOn, setScreenShareOn] = useState(false);
  const [handRaised, setHandRaised] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'people' | 'activities'>('chat');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleStartClass = () => {
      setViewState('setup');
  };

  const handleJoinClass = () => {
      setViewState('live');
  };

  const handleEndClass = () => {
      setViewState('ended');
  };

  // 1. Lobby View
  if (viewState === 'lobby') {
      return (
          <Layout>
              <div className="h-full flex flex-col p-6 relative overflow-hidden">
                  {/* Background Decoration */}
                  <div className="absolute inset-0 z-0">
                      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-30 blur-sm"></div>
                      <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/90 to-transparent"></div>
                  </div>

                  <div className="relative z-10 flex flex-col h-full max-w-6xl mx-auto w-full">
                      <div className="flex justify-between items-center mb-12">
                          <h1 className="text-2xl font-bold flex items-center gap-2">
                             <span className="material-symbols-outlined text-primary">videocam</span>
                             Live Classes
                          </h1>
                          <span className="text-gray-400 font-mono">{formatTime(currentTime)}</span>
                      </div>

                      <div className="flex-1 flex flex-col justify-center items-center">
                          <div className="w-full max-w-2xl bg-surface-dark/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl animate-in fade-in slide-in-from-bottom-8 duration-500">
                              <h2 className="text-3xl font-black text-center mb-2">Join a Session</h2>
                              <p className="text-center text-text-secondary mb-8">Enter a code or link to join your live classroom.</p>

                              <div className="flex flex-col gap-6">
                                   <div className="flex gap-2 p-1 bg-surface-border rounded-xl">
                                       <button onClick={handleStartClass} className="flex-1 bg-primary hover:bg-primary-hover text-background-dark font-bold py-4 rounded-lg transition-colors flex items-center justify-center gap-2">
                                           <span className="material-symbols-outlined icon-filled">add_box</span>
                                           Start New Class
                                       </button>
                                       <button className="flex-1 bg-transparent hover:bg-white/5 text-white font-bold py-4 rounded-lg transition-colors flex items-center justify-center gap-2">
                                           <span className="material-symbols-outlined">login</span>
                                           Join Existing
                                       </button>
                                   </div>

                                   <div className="relative my-2">
                                       <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10"></div></div>
                                       <div className="relative flex justify-center text-xs uppercase"><span className="bg-surface-dark px-2 text-text-secondary font-bold tracking-wider">Or enter code</span></div>
                                   </div>

                                   <div className="flex gap-2">
                                       <div className="relative flex-1">
                                           <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-500">keyboard</span>
                                           <input type="text" placeholder="Enter class code (e.g., cs-301-live)" className="w-full bg-background-dark border border-surface-border rounded-xl py-4 pl-12 pr-4 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none" />
                                       </div>
                                       <button className="bg-surface-border hover:bg-white/10 text-white font-bold px-8 rounded-xl transition-colors">Join</button>
                                   </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </Layout>
      );
  }

  // 2. Setup (Pre-Join) View
  if (viewState === 'setup') {
      return (
          <Layout>
              <div className="h-full flex items-center justify-center p-6 bg-[#0a0a0a]">
                  <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* Left: Preview */}
                      <div className="bg-[#1a1a1a] rounded-3xl overflow-hidden aspect-video relative group border border-white/10 shadow-2xl">
                          {cameraOn ? (
                              <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2576&auto=format&fit=crop" className="w-full h-full object-cover transform scale-x-[-1]" alt="Preview" />
                          ) : (
                              <div className="w-full h-full flex items-center justify-center bg-[#111]">
                                  <div className="size-24 rounded-full bg-surface-border flex items-center justify-center text-gray-500">
                                      <span className="material-symbols-outlined text-4xl">videocam_off</span>
                                  </div>
                              </div>
                          )}
                          
                          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-4">
                              <button 
                                  onClick={() => setMicOn(!micOn)}
                                  className={`size-12 rounded-full flex items-center justify-center transition-all ${micOn ? 'bg-[#2a2a2a] text-white border border-white/20' : 'bg-red-500 text-white shadow-lg shadow-red-500/30'}`}
                              >
                                  <span className="material-symbols-outlined">{micOn ? 'mic' : 'mic_off'}</span>
                              </button>
                              <button 
                                  onClick={() => setCameraOn(!cameraOn)}
                                  className={`size-12 rounded-full flex items-center justify-center transition-all ${cameraOn ? 'bg-[#2a2a2a] text-white border border-white/20' : 'bg-red-500 text-white shadow-lg shadow-red-500/30'}`}
                              >
                                  <span className="material-symbols-outlined">{cameraOn ? 'videocam' : 'videocam_off'}</span>
                              </button>
                          </div>
                          
                          <div className="absolute top-4 left-4 bg-black/50 backdrop-blur px-3 py-1 rounded-full text-xs font-bold flex items-center gap-2">
                             <div className={`size-2 rounded-full ${micOn ? 'bg-green-500' : 'bg-red-500'}`}></div>
                             {micOn ? 'Mic Active' : 'Mic Muted'}
                          </div>
                      </div>

                      {/* Right: Settings */}
                      <div className="flex flex-col justify-center gap-6 p-4">
                          <div>
                              <div className="size-20 rounded-full bg-primary/20 flex items-center justify-center text-primary mb-4 border-2 border-primary">
                                  <span className="material-symbols-outlined text-4xl">person</span>
                              </div>
                              <h2 className="text-3xl font-bold mb-1">Prof. Anya Sharma</h2>
                              <p className="text-gray-400">Ready to start the class?</p>
                          </div>

                          <div className="space-y-4">
                              <div className="space-y-1">
                                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Class Name</label>
                                  <div className="w-full bg-[#1a1a1a] rounded-xl px-4 py-3 text-white border border-white/10 flex items-center justify-between">
                                      <span>CS301: Data Structures</span>
                                      <span className="material-symbols-outlined text-gray-500">expand_more</span>
                                  </div>
                              </div>
                              <div className="space-y-1">
                                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Audio Device</label>
                                  <div className="w-full bg-[#1a1a1a] rounded-xl px-4 py-3 text-white border border-white/10 flex items-center justify-between">
                                      <span>MacBook Pro Microphone</span>
                                      <span className="material-symbols-outlined text-gray-500">mic</span>
                                  </div>
                              </div>
                          </div>

                          <div className="flex gap-3 mt-4">
                              <button onClick={() => setViewState('lobby')} className="px-6 py-3 rounded-xl font-bold text-gray-400 hover:text-white hover:bg-white/5 transition-colors">Cancel</button>
                              <button onClick={handleJoinClass} className="flex-1 bg-primary hover:bg-primary-hover text-background-dark font-bold py-3 rounded-xl transition-colors shadow-lg shadow-primary/20">Start Class</button>
                          </div>
                      </div>
                  </div>
              </div>
          </Layout>
      );
  }

  // 4. Ended View
  if (viewState === 'ended') {
      return (
          <Layout>
              <div className="h-full flex flex-col items-center justify-center p-6 bg-[#0a0a0a] relative">
                  <div className="w-full max-w-2xl bg-surface-dark border border-surface-border rounded-3xl p-8 text-center relative z-10 animate-in zoom-in-95 duration-300">
                      <div className="size-20 mx-auto bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mb-6">
                          <span className="material-symbols-outlined text-4xl icon-filled">call_end</span>
                      </div>
                      <h2 className="text-3xl font-black text-white mb-2">Class Ended</h2>
                      <p className="text-gray-400 mb-8">The session for CS301 has ended. Duration: 45m 12s</p>

                      <div className="grid grid-cols-4 gap-4 mb-8">
                           {[1,2,3,4].map(i => (
                               <div key={i} className="flex flex-col items-center gap-2">
                                   <img src={`https://i.pravatar.cc/150?u=${i}`} className="size-12 rounded-full border border-white/10" alt="Participant" />
                                   <span className="text-xs text-gray-500">Student</span>
                               </div>
                           ))}
                      </div>

                      <button onClick={() => setViewState('lobby')} className="bg-primary text-background-dark font-bold px-8 py-3 rounded-full hover:bg-primary-hover transition-colors">
                          Return to Dashboard
                      </button>
                  </div>
              </div>
          </Layout>
      );
  }

  // 3. Live View (Default Return)
  return (
      <Layout>
      <div className="flex flex-col h-full bg-[#0a0a0a] text-white overflow-hidden relative">
        
        {/* Main Workspace */}
        <div className="flex flex-1 overflow-hidden">
          
          {/* Primary Video Area */}
          <div className="flex-1 flex flex-col p-4 gap-4 relative">
            
            {/* Top Info Bar */}
            <div className="absolute top-6 left-6 z-10 flex items-center gap-4">
               <div className="flex items-center gap-2 bg-red-500/90 text-white text-xs font-bold px-3 py-1.5 rounded-md shadow-lg animate-pulse">
                  <span className="material-symbols-outlined text-[14px] icon-filled">radio_button_checked</span>
                  REC
               </div>
               <div className="bg-surface-dark/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 flex items-center gap-3 shadow-lg">
                  <span className="font-bold text-sm tracking-wide">CS301: Advanced Data Structures</span>
                  <div className="h-3 w-px bg-white/20"></div>
                  <span className="text-xs text-gray-300 font-mono">{formatTime(currentTime)}</span>
               </div>
            </div>

            {/* Main Video Feed (Teacher) */}
            <div className="flex-1 bg-[#1a1a1a] rounded-2xl border border-white/5 relative overflow-hidden group shadow-2xl">
               <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-transparent to-black/60">
                  <div className="text-center">
                     <div className="size-32 mx-auto rounded-full bg-surface-border flex items-center justify-center mb-4 border-4 border-primary shadow-xl shadow-primary/20">
                        <span className="material-symbols-outlined text-6xl text-primary">person</span>
                     </div>
                     <h2 className="text-2xl font-bold tracking-tight">Prof. Anya Sharma</h2>
                     <p className="text-primary font-medium animate-pulse mt-1">Speaking...</p>
                  </div>
               </div>
               
               {/* Visualizations for Audio */}
               <div className="absolute bottom-6 left-6 flex items-end gap-1 h-8">
                  <div className="w-1 bg-primary rounded-full animate-[bounce_1s_infinite] h-4"></div>
                  <div className="w-1 bg-primary rounded-full animate-[bounce_1.2s_infinite] h-8"></div>
                  <div className="w-1 bg-primary rounded-full animate-[bounce_0.8s_infinite] h-6"></div>
                  <div className="w-1 bg-primary rounded-full animate-[bounce_1.1s_infinite] h-3"></div>
               </div>

               {/* Hover Controls */}
               <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                  <button className="size-8 rounded-full bg-black/50 hover:bg-white text-white hover:text-black flex items-center justify-center backdrop-blur-sm">
                     <span className="material-symbols-outlined text-sm">pin_invoke</span>
                  </button>
                  <button className="size-8 rounded-full bg-black/50 hover:bg-white text-white hover:text-black flex items-center justify-center backdrop-blur-sm">
                     <span className="material-symbols-outlined text-sm">fullscreen</span>
                  </button>
               </div>
            </div>

            {/* Bottom Strip of Participants (If screen share or focused view) */}
            <div className="h-32 flex gap-3 overflow-x-auto pb-1 custom-scrollbar">
               {PARTICIPANTS.map(p => (
                  <div key={p.id} className="min-w-[180px] bg-[#1a1a1a] rounded-xl border border-white/10 relative overflow-hidden flex items-center justify-center group">
                     <img src={p.avatar} alt={p.name} className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity" />
                     <div className="relative z-10 flex flex-col items-center">
                        {p.isMuted && <div className="bg-black/60 p-1.5 rounded-full mb-1 backdrop-blur-sm"><span className="material-symbols-outlined text-white text-sm">mic_off</span></div>}
                     </div>
                     <span className="absolute bottom-2 left-2 text-xs font-bold text-white bg-black/40 px-2 py-0.5 rounded backdrop-blur-sm">{p.name}</span>
                  </div>
               ))}
               <div className="min-w-[180px] bg-[#1a1a1a] rounded-xl border border-white/10 flex flex-col items-center justify-center gap-1 text-gray-400 hover:text-white hover:bg-white/5 cursor-pointer transition-colors">
                  <span className="font-bold text-lg">+12</span>
                  <span className="text-xs">Others</span>
               </div>
            </div>
          </div>

          {/* Right Sidebar */}
          {isSidebarOpen && (
             <div className="w-80 bg-[#111111] border-l border-white/10 flex flex-col">
                {/* Tabs */}
                <div className="flex border-b border-white/10">
                   <button 
                     onClick={() => setActiveTab('chat')}
                     className={`flex-1 py-4 text-sm font-bold border-b-2 transition-colors flex flex-col items-center gap-1 ${activeTab === 'chat' ? 'border-primary text-primary' : 'border-transparent text-gray-400 hover:text-white'}`}
                   >
                     <span className="material-symbols-outlined">chat_bubble</span>
                     Chat
                   </button>
                   <button 
                     onClick={() => setActiveTab('people')}
                     className={`flex-1 py-4 text-sm font-bold border-b-2 transition-colors flex flex-col items-center gap-1 ${activeTab === 'people' ? 'border-primary text-primary' : 'border-transparent text-gray-400 hover:text-white'}`}
                   >
                     <span className="material-symbols-outlined">group</span>
                     People (16)
                   </button>
                   <button 
                     onClick={() => setActiveTab('activities')}
                     className={`flex-1 py-4 text-sm font-bold border-b-2 transition-colors flex flex-col items-center gap-1 ${activeTab === 'activities' ? 'border-primary text-primary' : 'border-transparent text-gray-400 hover:text-white'}`}
                   >
                     <span className="material-symbols-outlined">category</span>
                     Activities
                   </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                   {activeTab === 'chat' && (
                      <div className="flex flex-col gap-4">
                         {CHAT_MESSAGES.map(msg => (
                            <div key={msg.id} className="flex flex-col gap-1">
                               <div className="flex justify-between items-baseline">
                                  <span className="text-xs font-bold text-gray-300">{msg.sender}</span>
                                  <span className="text-[10px] text-gray-500">{msg.time}</span>
                               </div>
                               <div className="bg-[#1f2937] p-3 rounded-lg rounded-tl-none text-sm text-gray-200">
                                  {msg.text}
                               </div>
                            </div>
                         ))}
                      </div>
                   )}

                   {activeTab === 'people' && (
                      <div className="flex flex-col gap-4">
                         <div className="flex items-center gap-2 mb-2">
                            <button className="flex-1 py-2 text-xs font-bold bg-[#1f2937] text-white rounded hover:bg-[#374151]">Mute All</button>
                            <button className="flex-1 py-2 text-xs font-bold bg-[#1f2937] text-white rounded hover:bg-[#374151]">Add People</button>
                         </div>
                         <div className="space-y-4">
                            <div className="flex items-center justify-between">
                               <div className="flex items-center gap-3">
                                  <div className="size-8 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold">
                                     You
                                  </div>
                                  <span className="text-sm font-medium">Priya Sharma</span>
                               </div>
                               <span className="material-symbols-outlined text-gray-400 text-sm">mic_off</span>
                            </div>
                            {PARTICIPANTS.map(p => (
                               <div key={p.id} className="flex items-center justify-between group">
                                  <div className="flex items-center gap-3">
                                     <img src={p.avatar} alt={p.name} className="size-8 rounded-full object-cover" />
                                     <span className="text-sm font-medium">{p.name}</span>
                                  </div>
                                  <div className="flex gap-2">
                                     <button className="text-gray-500 hover:text-white"><span className="material-symbols-outlined text-sm">more_vert</span></button>
                                     <span className="material-symbols-outlined text-gray-400 text-sm">{p.isMuted ? 'mic_off' : 'mic'}</span>
                                  </div>
                               </div>
                            ))}
                         </div>
                      </div>
                   )}
                   
                   {activeTab === 'activities' && (
                      <div className="grid grid-cols-2 gap-3">
                         <div className="bg-[#1f2937] p-4 rounded-xl flex flex-col items-center gap-2 hover:bg-[#374151] cursor-pointer transition-colors border border-transparent hover:border-primary/50">
                            <div className="size-10 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center">
                               <span className="material-symbols-outlined">poll</span>
                            </div>
                            <span className="text-xs font-bold">Polls</span>
                         </div>
                         <div className="bg-[#1f2937] p-4 rounded-xl flex flex-col items-center gap-2 hover:bg-[#374151] cursor-pointer transition-colors border border-transparent hover:border-primary/50">
                            <div className="size-10 rounded-full bg-yellow-500/20 text-yellow-400 flex items-center justify-center">
                               <span className="material-symbols-outlined">draw</span>
                            </div>
                            <span className="text-xs font-bold">Whiteboard</span>
                         </div>
                         <div className="bg-[#1f2937] p-4 rounded-xl flex flex-col items-center gap-2 hover:bg-[#374151] cursor-pointer transition-colors border border-transparent hover:border-primary/50">
                            <div className="size-10 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center">
                               <span className="material-symbols-outlined">quiz</span>
                            </div>
                            <span className="text-xs font-bold">Q&A</span>
                         </div>
                      </div>
                   )}
                </div>

                {/* Bottom of Sidebar */}
                {activeTab === 'chat' && (
                   <div className="p-4 border-t border-white/10">
                      <div className="relative">
                         <input 
                            type="text" 
                            placeholder="Send a message..." 
                            className="w-full bg-[#1f2937] border-none rounded-full py-3 px-4 pr-10 text-sm focus:ring-1 focus:ring-primary text-white placeholder-gray-500"
                         />
                         <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-black transition-colors">
                            <span className="material-symbols-outlined text-sm">send</span>
                         </button>
                      </div>
                   </div>
                )}
             </div>
          )}
        </div>

        {/* Bottom Toolbar */}
        <div className="h-20 bg-[#111111] border-t border-white/10 flex items-center justify-between px-6 z-20">
            {/* Left: Metadata */}
            <div className="w-1/4 hidden md:flex flex-col">
               <span className="font-bold text-sm">CS301 - Live Session</span>
               <span className="text-xs text-primary cursor-pointer hover:underline">View joining info</span>
            </div>

            {/* Center: Controls */}
            <div className="flex items-center gap-3">
               <button 
                  onClick={() => setMicOn(!micOn)}
                  className={`size-12 rounded-full flex items-center justify-center transition-all ${micOn ? 'bg-[#2a2a2a] text-white hover:bg-[#333]' : 'bg-red-500 text-white hover:bg-red-600 shadow-[0_0_15px_rgba(239,68,68,0.4)]'}`}
                  title={micOn ? "Mute Microphone" : "Unmute Microphone"}
               >
                  <span className="material-symbols-outlined">{micOn ? 'mic' : 'mic_off'}</span>
               </button>
               
               <button 
                  onClick={() => setCameraOn(!cameraOn)}
                  className={`size-12 rounded-full flex items-center justify-center transition-all ${cameraOn ? 'bg-[#2a2a2a] text-white hover:bg-[#333]' : 'bg-red-500 text-white hover:bg-red-600'}`}
                  title={cameraOn ? "Turn Off Camera" : "Turn On Camera"}
               >
                  <span className="material-symbols-outlined">{cameraOn ? 'videocam' : 'videocam_off'}</span>
               </button>

               <button 
                  onClick={() => setHandRaised(!handRaised)}
                  className={`size-12 rounded-full flex items-center justify-center transition-all ${handRaised ? 'bg-primary text-black' : 'bg-[#2a2a2a] text-white hover:bg-[#333]'}`}
                  title="Raise Hand"
               >
                  <span className="material-symbols-outlined icon-filled">back_hand</span>
               </button>

               <button 
                  onClick={() => setScreenShareOn(!screenShareOn)}
                  className={`size-12 rounded-full flex items-center justify-center transition-all ${screenShareOn ? 'bg-blue-500 text-white' : 'bg-[#2a2a2a] text-white hover:bg-[#333]'}`}
                  title="Share Screen"
               >
                  <span className="material-symbols-outlined icon-filled">present_to_all</span>
               </button>

               <button className="size-12 rounded-full bg-[#2a2a2a] text-white hover:bg-[#333] flex items-center justify-center transition-all">
                  <span className="material-symbols-outlined">more_vert</span>
               </button>

               <button onClick={handleEndClass} className="w-16 h-10 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center ml-2 shadow-lg shadow-red-900/20">
                  <span className="material-symbols-outlined icon-filled">call_end</span>
               </button>
            </div>

            {/* Right: Toggles */}
            <div className="w-1/4 flex justify-end gap-3">
               <button className="size-10 rounded-full bg-transparent hover:bg-white/10 text-white flex items-center justify-center" title="Whiteboard">
                  <span className="material-symbols-outlined">draw</span>
               </button>
               <button 
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className={`size-10 rounded-full flex items-center justify-center transition-colors ${isSidebarOpen ? 'bg-primary/20 text-primary' : 'hover:bg-white/10 text-white'}`}
                  title="Show Info"
               >
                  <span className="material-symbols-outlined icon-filled">info</span>
               </button>
            </div>
        </div>
      </div>
      </Layout>
  );
};

export default LiveClass;