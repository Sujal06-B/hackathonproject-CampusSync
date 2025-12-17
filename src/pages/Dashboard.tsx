import React from 'react';
import { Layout } from '../components/Layout';
import { useAuth } from '../contexts/AuthContext';
import { AnnouncementCard } from '../features/announcements/AnnouncementCard';
import { useAnnouncements } from '../hooks/useAnnouncements';

const StatCard: React.FC<{ icon: string, count: string, label: string, colorClass: string }> = ({ icon, count, label, colorClass }) => (
  <div className="bg-surface-dark rounded-xl p-6 border border-surface-border shadow-sm hover:shadow-md transition-shadow group">
    <div className="flex justify-between items-start mb-2">
      <div className={`p-2 rounded-full ${colorClass} bg-opacity-10`}>
        <span className={`material-symbols-outlined icon-filled ${colorClass.replace('bg-', 'text-')}`}>{icon}</span>
      </div>
      <span className="material-symbols-outlined text-gray-600 group-hover:text-primary transition-colors">arrow_outward</span>
    </div>
    <div className="mt-2">
      <p className="text-4xl font-black text-white tracking-tight">{count}</p>
      <p className="text-gray-400 font-medium text-sm mt-1">{label}</p>
    </div>
  </div>
);

const Dashboard: React.FC = () => {
  const { userProfile } = useAuth();
  const { announcements, loading } = useAnnouncements();

  return (
    <Layout>
      <div className="p-6 md:p-10 pb-24 max-w-5xl mx-auto space-y-8">
         <header className="flex justify-between items-center">
            <div className="flex flex-col">
              <h2 className="text-2xl md:text-3xl font-black tracking-tight text-white">Good morning, {userProfile?.displayName || 'Student'}</h2>
              <p className="text-[#9db8a8] text-sm md:text-base font-medium mt-1">
                {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
              </p>
            </div>
            <button className="relative group p-3 rounded-full bg-surface-dark border border-surface-border hover:bg-surface-border transition-colors">
              <span className="material-symbols-outlined text-white group-hover:animate-pulse">notifications</span>
              <span className="absolute top-2 right-2.5 size-2.5 bg-primary rounded-full ring-2 ring-background-dark"></span>
            </button>
         </header>

         <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatCard icon="pending_actions" count="3" label="Pending Assignments" colorClass="text-orange-400" />
            <StatCard icon="mark_chat_unread" count={announcements.filter(a => a.isUnread).length.toString()} label="Unread Announcements" colorClass="text-blue-400" />
            <StatCard icon="event_upcoming" count="2" label="Deadlines this week" colorClass="text-purple-400" />
         </section>

         <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h3 className="text-xl font-bold text-white">Announcement Feed</h3>
            <div className="flex gap-2">
               {userProfile?.role === 'teacher' && (
                  <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary hover:bg-primary-hover text-background-dark font-bold text-sm transition-colors">
                    <span className="material-symbols-outlined text-lg">add</span>
                    New Post
                  </button>
               )}
               <div className="inline-flex p-1 bg-surface-dark rounded-full self-start md:self-auto border border-surface-border">
                  <button className="px-4 py-2 rounded-full text-sm font-bold bg-primary text-background-dark shadow-sm">All Updates</button>
                  <button className="px-4 py-2 rounded-full text-sm font-bold text-gray-400 hover:text-white">By Course</button>
               </div>
            </div>
         </div>

         <div className="flex flex-col gap-4">
            {loading ? (
              <div className="text-center text-gray-500 py-10">Loading updates...</div>
            ) : announcements.length === 0 ? (
               <div className="text-center text-gray-500 py-10">No announcements yet.</div>
            ) : (
              announcements.map(item => (
                <AnnouncementCard key={item.id} item={item} />
              ))
            )}
         </div>

         <div className="flex justify-center pt-4">
            <button className="flex items-center gap-2 px-6 py-3 rounded-full border border-surface-border text-gray-300 hover:bg-surface-border transition-colors text-sm font-bold">
               <span>Load Older Announcements</span>
               <span className="material-symbols-outlined text-sm">expand_more</span>
            </button>
         </div>
      </div>
    </Layout>
  );
};

export default Dashboard;