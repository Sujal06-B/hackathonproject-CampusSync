import React from 'react';
import { Layout } from '../components/Layout';
import { AssignmentCard } from '../features/assignments/AssignmentCard';
import { useAssignments } from '../hooks/useAssignments';

const Assignments: React.FC = () => {
  const { assignments, loading } = useAssignments();

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
                <span className="text-white font-bold leading-none">
                  {assignments.filter(a => a.status === 'urgent').length} Pending
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-b border-surface-border">
            <div className="flex gap-8 overflow-x-auto">
               <button className="flex items-center gap-2 border-b-[3px] border-b-primary text-white pb-3 pt-2 whitespace-nowrap">
                  <span className="text-sm font-bold">Upcoming</span>
                  <span className="bg-primary text-background-dark text-[10px] font-bold px-1.5 py-0.5 rounded-full">{assignments.length}</span>
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
           {loading ? (
             <div className="text-gray-500">Loading assignments...</div>
           ) : assignments.length === 0 ? (
             <div className="text-gray-500">No assignments found.</div>
           ) : (
             assignments.map(item => <AssignmentCard key={item.id} item={item} />)
           )}
        </div>
      </div>
    </Layout>
  );
};

export default Assignments;