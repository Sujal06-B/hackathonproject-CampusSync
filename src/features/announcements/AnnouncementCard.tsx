import React from 'react';
import { Announcement } from '../../types';

export const AnnouncementCard: React.FC<{ item: Announcement }> = ({ item }) => (
  <article className={`flex flex-col md:flex-row gap-4 p-5 rounded-xl bg-surface-dark border ${item.isPinned ? 'border-l-4 border-l-primary' : 'border border-surface-border'} hover:bg-[#23362b] transition-colors cursor-pointer group`}>
    <div className="flex-shrink-0 flex items-start justify-between md:flex-col md:justify-start gap-3 w-full md:w-auto md:min-w-[140px]">
       <div className="flex items-center gap-2">
         {item.isPinned && (
           <span className="inline-flex items-center justify-center size-8 rounded-full bg-primary/20 text-primary">
             <span className="material-symbols-outlined text-[18px] icon-filled">push_pin</span>
           </span>
         )}
         <span className={`px-2 py-1 rounded-md text-xs font-bold uppercase tracking-wider ${item.tagColor || 'bg-gray-800 text-gray-300'}`}>
           {item.tag || item.courseName}
         </span>
       </div>
       <span className="text-xs text-gray-400 font-medium">{item.time || 'Just now'}</span>
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