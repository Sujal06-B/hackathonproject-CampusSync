import React from 'react';
import { Assignment } from '../../types';

export const AssignmentCard: React.FC<{ item: Assignment }> = ({ item }) => {
  let statusColor = 'text-text-secondary';
  let badgeColor = 'bg-surface-border';
  if (item.status === 'urgent') {
    statusColor = 'text-urgent';
    badgeColor = 'bg-urgent';
  } else if (item.status === 'pending') {
    statusColor = 'text-warning';
    badgeColor = 'bg-warning';
  } else if (item.status === 'completed') {
    statusColor = 'text-primary';
    badgeColor = 'bg-primary';
  }

  return (
    <article className={`group relative flex flex-col bg-surface-dark border border-surface-border rounded-[1.5rem] p-5 hover:border-${item.status === 'urgent' ? 'urgent' : 'primary'}/50 transition-all duration-300 shadow-lg shadow-black/20`}>
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-full bg-white/10 text-white text-xs font-bold tracking-wide border border-white/5">{item.courseCode || item.courseName}</span>
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
          <span className="text-sm font-bold">{item.dueTimeText || new Date(item.dueDate?.seconds * 1000).toLocaleDateString()}</span>
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
         <div className="text-xs text-text-secondary font-medium">{item.isIndividual ? 'Individual Task' : 'Group Task'}</div>
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