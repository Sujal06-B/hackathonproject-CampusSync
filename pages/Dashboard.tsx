import React from 'react';
import { Layout } from '../components/Layout';
import { Announcement } from '../types';

const DUMMY_ANNOUNCEMENTS: Announcement[] = [
  {
    id: '1',
    title: 'Mid-Semester Exam Schedule Released',
    author: 'Admin',
    role: 'Admin',
    time: '2 hours ago',
    content: 'The final schedule for the upcoming mid-semester exams has been published. Please check your dates carefully. Any conflicts must be reported to the academic office by Friday.',
    isPinned: true,
    isUnread: true,
    tag: 'Admin',
    tagColor: 'bg-gray-100 text-gray-600 dark:bg-white/5 dark:text-gray-300'
  },
  {
    id: '2',
    title: 'Lecture Notes Updated: Module 4',
    author: 'Prof. Smith',
    role: 'CS101',
    time: '4 hours ago',
    content: 'Professor Smith has uploaded the revised slides for Module 4: Advanced Algorithms. This includes the new examples discussed in class.',
    isUnread: true,
    tag: 'CS101',
    tagColor: 'bg-blue-900/30 text-blue-300'
  },
  {
    id: '3',
    title: 'Guest Lecture on AI Ethics',
    author: 'Council',
    role: 'Council',
    time: 'Yesterday',
    content: 'Join us for a special session with Dr. Aruna Rao from TechInstitute this Friday at 4 PM in the main auditorium.',
    tag: 'Council',
    tagColor: 'bg-purple-900/30 text-purple-300'
  }
];

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

const AnnouncementCard: React.FC<{ item: Announcement }> = ({ item }) => (
  <article className={`flex flex-col md:flex-row gap-4 p-5 rounded-xl bg-surface-dark border ${item.isPinned ? 'border-l-4 border-l-primary' : 'border border-surface-border'} hover:bg-[#23362b] transition-colors cursor-pointer group`}>
    <div className="flex-shrink-0 flex items-start justify-between md:flex-col md:justify-start gap-3 w-full md:w-auto md:min-w-[140px]">
       <div className="flex items-center gap-2">
         {item.isPinned && (
           <span className="inline-flex items-center justify-center size-8 rounded-full bg-primary/20 text-primary">
             <span className="material-symbols-outlined text-[18px] icon-filled">push_pin</span>
           </span>
         )}
         <span className={`px-2 py-1 rounded-md text-xs font-bold uppercase tracking-wider ${item.tagColor}`}>
           {item.tag}
         </span>
       </div>
       <span className="text-xs text-gray-400 font-medium">{item.time}</span>
    </div>
    <div className="flex-1">
      <div className="flex justify-between items-start">
        <h4 className="text-lg font-bold text-white mb-2 group-hover:text-primary transition-colors">{item.title}</h4>
        {item.isUnread && <span className="size-2 rounded-full bg-primary flex-shrink-0 mt-2" title="Unread"></span>}
      </div>
      <p className="text-gray-300 text-sm leading-relaxed line-clamp-2">{item.content}</p>
    </div>
  </article>
);

const Dashboard: React.FC = () => {
  return (
    <Layout>
      <div className="p-6 md:p-10 pb-24 max-w-5xl mx-auto space-y-8">
         <header className="flex justify-between items-center">
            <div className="flex flex-col">
              <h2 className="text-2xl md:text-3xl font-black tracking-tight text-white">Good morning, Priya</h2>
              <p className="text-[#9db8a8] text-sm md:text-base font-medium mt-1">Tuesday, Oct 24 • Week 8</p>
            </div>
            <button className="relative group p-3 rounded-full bg-surface-dark border border-surface-border hover:bg-surface-border transition-colors">
              <span className="material-symbols-outlined text-white group-hover:animate-pulse">notifications</span>
              <span className="absolute top-2 right-2.5 size-2.5 bg-primary rounded-full ring-2 ring-background-dark"></span>
            </button>
         </header>

         <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatCard icon="pending_actions" count="3" label="Pending Assignments" colorClass="text-orange-400" />
            <StatCard icon="mark_chat_unread" count="5" label="Unread Announcements" colorClass="text-blue-400" />
            <StatCard icon="event_upcoming" count="2" label="Deadlines this week" colorClass="text-purple-400" />
         </section>

         <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h3 className="text-xl font-bold text-white">Announcement Feed</h3>
            <div className="inline-flex p-1 bg-surface-dark rounded-full self-start md:self-auto border border-surface-border">
               <button className="px-4 py-2 rounded-full text-sm font-bold bg-primary text-background-dark shadow-sm">All Updates</button>
               <button className="px-4 py-2 rounded-full text-sm font-bold text-gray-400 hover:text-white">By Course</button>
            </div>
         </div>

         <div className="flex flex-col gap-4">
            {DUMMY_ANNOUNCEMENTS.map(item => (
              <AnnouncementCard key={item.id} item={item} />
            ))}
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