import React from 'react';
import { Layout } from '../components/Layout';

const FACULTY = [
    { id: 1, name: 'Dr. Rajesh Kumar', role: 'Head of Department', email: 'hod.cs@uni.edu', img: 'https://i.pravatar.cc/150?u=hod', specialization: 'Machine Learning' },
    { id: 2, name: 'Prof. Anjali Gupta', role: 'Professor', email: 'anjali.g@uni.edu', img: 'https://i.pravatar.cc/150?u=anjali', specialization: 'Data Structures' },
    { id: 3, name: 'Dr. Vikram Singh', role: 'Associate Professor', email: 'vikram.s@uni.edu', img: 'https://i.pravatar.cc/150?u=vikram', specialization: 'Network Security' },
    { id: 4, name: 'Ms. Sneha Reddy', role: 'Assistant Professor', email: 'sneha.r@uni.edu', img: 'https://i.pravatar.cc/150?u=sneha', specialization: 'Web Technologies' },
    { id: 5, name: 'Dr. Amit Patel', role: 'Lecturer', email: 'amit.p@uni.edu', img: 'https://i.pravatar.cc/150?u=amit', specialization: 'Embedded Systems' },
];

const Department: React.FC = () => {
  return (
    <Layout>
      <div className="max-w-[1200px] mx-auto p-4 md:p-8 flex flex-col gap-8 pb-24">
        {/* Header */}
        <div className="flex flex-col gap-4">
            <div className="h-48 w-full rounded-3xl bg-cover bg-center relative overflow-hidden" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=2086&auto=format&fit=crop')" }}>
               <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/50 to-transparent"></div>
               <div className="absolute bottom-6 left-6 md:left-10">
                   <span className="bg-primary text-background-dark text-xs font-bold px-3 py-1 rounded-full mb-2 inline-block">Engineering</span>
                   <h1 className="text-3xl md:text-5xl font-black text-white">Computer Science</h1>
                   <p className="text-gray-300 mt-1 max-w-xl">Innovating the future through code, algorithms, and artificial intelligence research.</p>
               </div>
            </div>
        </div>

        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Department News</h2>
                <button className="text-primary text-sm font-bold">View Archive</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1,2,3].map(i => (
                    <div key={i} className="bg-surface-dark border border-surface-border rounded-xl p-5 hover:border-primary/30 transition-colors cursor-pointer group">
                        <span className="text-xs text-text-secondary mb-1 block">Oct {20+i}, 2023</span>
                        <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors mb-2">Research Grant Awarded for AI Safety Project</h3>
                        <p className="text-sm text-gray-400 line-clamp-2">The department has received a $2M grant to study the implications of large language models on educational integrity.</p>
                    </div>
                ))}
            </div>
        </div>

        <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold text-white">Faculty Directory</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {FACULTY.map(member => (
                    <div key={member.id} className="bg-surface-dark border border-surface-border rounded-2xl p-6 flex flex-col items-center text-center hover:-translate-y-1 transition-transform duration-300 hover:shadow-xl hover:shadow-primary/5">
                        <div className="size-24 rounded-full bg-surface-border mb-4 p-1 border-2 border-surface-border group-hover:border-primary transition-colors">
                            <img src={member.img} alt={member.name} className="w-full h-full rounded-full object-cover" />
                        </div>
                        <h3 className="text-lg font-bold text-white">{member.name}</h3>
                        <p className="text-primary text-sm font-medium mb-1">{member.role}</p>
                        <p className="text-text-secondary text-xs mb-4">{member.specialization}</p>
                        
                        <div className="mt-auto flex gap-2 w-full">
                            <button className="flex-1 bg-surface-border hover:bg-white/10 text-white text-xs font-bold py-2 rounded-lg transition-colors flex items-center justify-center gap-1">
                                <span className="material-symbols-outlined text-sm">mail</span> Email
                            </button>
                            <button className="flex-1 bg-surface-border hover:bg-white/10 text-white text-xs font-bold py-2 rounded-lg transition-colors flex items-center justify-center gap-1">
                                <span className="material-symbols-outlined text-sm">calendar_month</span> Book
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </Layout>
  );
};

export default Department;