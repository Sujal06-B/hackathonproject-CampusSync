import React from 'react';
import { Layout } from '../components/Layout';
import { Assignment } from '../types';

const ASSIGNMENTS: Assignment[] = [
  {
    id: '1',
    courseCode: 'CS301',
    title: 'Data Structures Project',
    description: 'Implement a Red-Black tree with insertion and deletion operations.',
    dueDate: 'In 5 hours',
    dueTimeText: 'Due in 5 hours',
    progress: 65,
    status: 'urgent',
    isIndividual: true
  },
  {
    id: '2',
    courseCode: 'MAT202',
    title: 'Calculus Quiz Prep',
    description: 'Review Chapter 4 on Derivatives. Complete practice problems.',
    dueDate: 'In 2 days',
    dueTimeText: 'Due in 2 days',
    progress: 10,
    status: 'pending',
    isIndividual: true
  },
  {
    id: '3',
    courseCode: 'ENG105',
    title: 'Modern Lit Essay',
    description: 'Draft a 2000-word essay comparing themes of isolation.',
    dueDate: 'In 5 days',
    dueTimeText: 'Due in 5 days',
    progress: 0,
    status: 'not-started',
    isIndividual: true
  }
];

const AssignmentCard: React.FC<{ item: Assignment }> = ({ item }) => {
  let statusColor = 'text-text-secondary';
  let badgeColor = 'bg-surface-border';
  if (item.status === 'urgent') {
    statusColor = 'text-urgent';
    badgeColor = 'bg-urgent';
  } else if (item.status === 'pending') {
    statusColor = 'text-warning';
    badgeColor = 'bg-warning';
  }

  return (
    <article className={`group relative flex flex-col bg-surface-dark border border-surface-border rounded-[1.5rem] p-5 hover:border-${item.status === 'urgent' ? 'urgent' : 'primary'}/50 transition-all duration-300 shadow-lg shadow-black/20`}>
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-full bg-white/10 text-white text-xs font-bold tracking-wide border border-white/5">{item.courseCode}</span>
          <span className={`size-2 rounded-full ${badgeColor} ${item.status === 'urgent' ? 'animate-pulse' : ''}`}></span>
        </div>
        <button className="text-text-secondary hover:text-white transition-colors p-1 rounded-full hover:bg-white/5">
          <span className="material-symbols-outlined text-[20px]">more_horiz</span>
        </button>
      </div>
      
      <div className="flex-1 mb-5">
        <h3 className="text-xl font-bold text-white mb-1 line-clamp-1 group-hover:text-primary transition-colors">{item.title}</h3>
        <p className="text-text-secondary text-sm mb-4 line-clamp-2">{item.description}</p>
        <div className={`flex items-center gap-2 ${statusColor} ${item.status === 'urgent' ? 'bg-urgent/10 border-urgent/20' : 'bg-surface-border border-surface-border'} w-fit px-3 py-1.5 rounded-lg border`}>
          <span className="material-symbols-outlined text-[18px] icon-filled">timer</span>
          <span className="text-sm font-bold">{item.dueTimeText}</span>
        </div>
      </div>

      <div className="mb-5">
        <div className="flex justify-between text-xs font-medium mb-1.5">
          <span className="text-text-secondary">Progress</span>
          <span className={item.progress > 0 ? 'text-primary' : 'text-text-secondary'}>{item.progress > 0 ? `${item.progress}%` : 'Not started'}</span>
        </div>
        <div className="w-full bg-surface-border rounded-full h-1.5">
          <div className="bg-primary h-1.5 rounded-full transition-all duration-500" style={{ width: `${item.progress}%` }}></div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 mt-auto pt-4 border-t border-surface-border">
         <div className="text-xs text-text-secondary font-medium">Individual Task</div>
         <div className="flex gap-2">
            <button className="px-4 py-2 rounded-full bg-surface-border hover:bg-[#3c5345] text-white text-sm font-bold transition-colors">Details</button>
            <button className="size-9 flex items-center justify-center rounded-full bg-primary hover:bg-primary-hover text-background-dark transition-colors">
              <span className="material-symbols-outlined text-[20px]">check</span>
            </button>
         </div>
      </div>
    </article>
  );
};

const Assignments: React.FC = () => {
  return (
    <Layout>
      <div className="w-full max-w-[1200px] mx-auto flex flex-col gap-6 p-4 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h1 className="text-4xl font-black leading-tight text-white">My Assignments</h1>
          <div className="flex gap-4">
            <div className="bg-surface-dark border border-surface-border rounded-xl px-4 py-2 flex items-center gap-3">
              <div className="size-8 rounded-full bg-urgent/20 text-urgent flex items-center justify-center">
                <span className="material-symbols-outlined text-sm font-bold">priority_high</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-text-secondary font-medium uppercase tracking-wider">Urgent</span>
                <span className="text-white font-bold leading-none">2 Pending</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-b border-surface-border">
            <div className="flex gap-8 overflow-x-auto">
               <button className="flex items-center gap-2 border-b-[3px] border-b-primary text-white pb-3 pt-2 whitespace-nowrap">
                  <span className="text-sm font-bold">Upcoming</span>
                  <span className="bg-primary text-background-dark text-[10px] font-bold px-1.5 py-0.5 rounded-full">3</span>
               </button>
               <button className="flex items-center gap-2 border-b-[3px] border-b-transparent text-text-secondary hover:text-white pb-3 pt-2 whitespace-nowrap">
                  <span className="text-sm font-bold">Overdue</span>
               </button>
               <button className="flex items-center gap-2 border-b-[3px] border-b-transparent text-text-secondary hover:text-white pb-3 pt-2 whitespace-nowrap">
                  <span className="text-sm font-bold">Completed</span>
               </button>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
           {ASSIGNMENTS.map(item => <AssignmentCard key={item.id} item={item} />)}
        </div>
      </div>
    </Layout>
  );
};

export default Assignments;