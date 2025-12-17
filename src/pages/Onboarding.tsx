import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { createUserProfile } from '../lib/firestore';

const Onboarding: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<'student' | 'teacher'>('student');
  const [university, setUniversity] = useState('IIT Bombay');
  const [department, setDepartment] = useState('Computer Science');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    setLoading(true);
    try {
      await createUserProfile(currentUser.uid, {
        email: currentUser.email || '',
        role,
        university,
        department,
        courses: ['CS301', 'CS101'] // Default courses for demo
      });
      navigate('/dashboard');
    } catch (error) {
      console.error("Failed to save profile", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background-dark font-display text-white flex flex-col">
       <header className="sticky top-0 z-50 flex items-center justify-between border-b border-surface-border bg-background-dark/80 backdrop-blur-md px-6 py-4">
         <div className="flex items-center gap-3">
             <span className="material-symbols-outlined text-primary text-2xl">school</span>
             <h2 className="text-xl font-bold">CampusSync</h2>
         </div>
       </header>

       <main className="flex-grow flex justify-center py-12 px-4">
         <div className="max-w-[800px] w-full flex flex-col gap-8">
            <div className="flex flex-col gap-3 px-4">
                <h1 className="text-4xl font-black">Welcome to CampusSync</h1>
                <p className="text-text-secondary">Let's personalize your academic feed in 3 simple steps.</p>
            </div>

            <div className="px-4">
               <div className="flex justify-between items-center mb-2">
                   <span className="font-medium">Setup Progress</span>
                   <span className="text-primary font-bold">Step {step} of 3</span>
               </div>
               <div className="h-2.5 bg-surface-dark rounded-full overflow-hidden">
                   <div className="h-full bg-primary transition-all duration-500" style={{ width: `${(step/3)*100}%` }}></div>
               </div>
            </div>

            <form className="flex flex-col gap-8 px-4" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-4">
                    <h3 className="text-xl font-bold">1. Select your role</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <label className="cursor-pointer group">
                            <input 
                              type="radio" 
                              name="role" 
                              className="peer sr-only" 
                              checked={role === 'student'} 
                              onChange={() => setRole('student')} 
                            />
                            <div className="p-6 rounded-2xl bg-surface-dark border-2 border-surface-border peer-checked:border-primary peer-checked:bg-[#1a2e23] transition-all">
                                <span className="material-symbols-outlined text-3xl mb-4 text-white peer-checked:text-primary">school</span>
                                <p className="font-bold text-lg">Student</p>
                                <p className="text-sm text-text-secondary">Access assignments, grades, and materials.</p>
                            </div>
                        </label>
                        <label className="cursor-pointer group">
                            <input 
                              type="radio" 
                              name="role" 
                              className="peer sr-only" 
                              checked={role === 'teacher'} 
                              onChange={() => setRole('teacher')}
                            />
                            <div className="p-6 rounded-2xl bg-surface-dark border-2 border-surface-border peer-checked:border-primary peer-checked:bg-[#1a2e23] transition-all">
                                <span className="material-symbols-outlined text-3xl mb-4 text-white peer-checked:text-primary">history_edu</span>
                                <p className="font-bold text-lg">Teacher</p>
                                <p className="text-sm text-text-secondary">Manage courses and post updates.</p>
                            </div>
                        </label>
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                     <h3 className="text-xl font-bold">2. Academic Details</h3>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-text-secondary">University</label>
                            <div className="relative">
                                <select 
                                  value={university}
                                  onChange={(e) => setUniversity(e.target.value)}
                                  className="w-full appearance-none rounded-xl bg-surface-dark border border-surface-border text-white px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                                >
                                    <option>IIT Bombay</option>
                                    <option>IIT Delhi</option>
                                    <option>Anna University</option>
                                </select>
                                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-text-secondary">expand_more</span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-text-secondary">Department</label>
                            <div className="relative">
                                <select 
                                  value={department}
                                  onChange={(e) => setDepartment(e.target.value)}
                                  className="w-full appearance-none rounded-xl bg-surface-dark border border-surface-border text-white px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                                >
                                    <option>Computer Science</option>
                                    <option>Electrical Eng.</option>
                                    <option>Mechanical Eng.</option>
                                </select>
                                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-text-secondary">expand_more</span>
                            </div>
                        </div>
                     </div>
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-primary hover:bg-primary-hover text-background-dark font-bold py-4 rounded-full text-lg shadow-[0_0_20px_rgba(48,232,122,0.3)] transition-transform active:scale-[0.99] disabled:opacity-50"
                >
                    {loading ? 'Saving...' : 'Complete Setup'}
                </button>
            </form>
         </div>
       </main>
    </div>
  );
};

export default Onboarding;