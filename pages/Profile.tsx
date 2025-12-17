import React from 'react';
import { Layout } from '../components/Layout';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Profile: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  return (
    <Layout>
      <div className="max-w-[1200px] mx-auto flex flex-col gap-8 p-4 md:p-8 pb-24">
        <div className="flex flex-col gap-2">
          <h1 className="text-white text-4xl font-black leading-tight">Profile & Settings</h1>
          <p className="text-[#9db8a8] text-base">Manage your account, preferences, and security settings.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="bg-surface-dark rounded-2xl p-6 border border-surface-border flex flex-col gap-6">
              <div className="flex flex-col items-center gap-4 relative">
                <div className="relative group cursor-pointer">
                  <div className="size-32 rounded-full bg-cover bg-center border-4 border-surface-border" style={{ backgroundImage: "url('https://picsum.photos/200')" }}></div>
                  <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="material-symbols-outlined text-white text-3xl">edit</span>
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="text-white text-2xl font-bold">{currentUser?.displayName || 'User'}</h3>
                  <p className="text-primary font-medium">Student</p>
                </div>
              </div>
              <div className="flex flex-col gap-4 mt-2">
                 <div className="space-y-1">
                    <label className="text-xs font-bold text-text-secondary uppercase tracking-wider ml-1">Email</label>
                    <input className="w-full bg-surface-border rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-primary/50 transition-all font-medium border-none" type="email" defaultValue={currentUser?.email || ''} readOnly/>
                 </div>
              </div>
              <button className="mt-4 w-full bg-primary hover:bg-primary-hover text-background-dark font-bold text-sm py-3 px-6 rounded-full transition-colors flex items-center justify-center gap-2">
                 <span className="material-symbols-outlined text-[20px]">save</span>
                 Save Changes
              </button>
            </div>
          </div>

          <div className="lg:col-span-8 flex flex-col gap-6">
            <div className="bg-surface-dark rounded-2xl p-6 lg:p-8 border border-surface-border">
               <div className="flex items-center gap-3 mb-6">
                  <span className="material-symbols-outlined text-primary bg-surface-border p-2 rounded-full">notifications_active</span>
                  <h3 className="text-xl font-bold text-white">Notifications</h3>
               </div>
               <div className="space-y-6">
                  {['Push Notifications', 'Email Notifications', 'Announcement Alerts'].map((item, i) => (
                    <div key={i} className="flex items-center justify-between py-2 border-b border-surface-border last:border-0">
                       <span className="text-white font-medium">{item}</span>
                       <div className="relative inline-block w-12 h-6 rounded-full bg-primary cursor-pointer">
                          <span className="absolute right-0.5 top-0.5 size-5 bg-white rounded-full shadow transition-transform"></span>
                       </div>
                    </div>
                  ))}
               </div>
            </div>

            <div className="bg-surface-dark rounded-2xl p-6 border border-surface-border">
               <div className="flex items-center gap-3 mb-6">
                  <span className="material-symbols-outlined text-red-400 bg-surface-border p-2 rounded-full">shield_lock</span>
                  <h3 className="text-lg font-bold text-white">Account</h3>
               </div>
               <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                  <p className="text-text-secondary text-sm">Manage your password and session access.</p>
                  <div className="flex gap-4 w-full sm:w-auto">
                     <button className="flex-1 sm:flex-none text-white font-bold text-sm py-2.5 px-5 rounded-full border border-surface-border hover:bg-surface-border transition-colors">Change Password</button>
                     <button onClick={handleLogout} className="flex-1 sm:flex-none text-red-400 font-bold text-sm py-2.5 px-5 rounded-full border border-red-900/30 hover:bg-red-900/20 transition-colors flex items-center justify-center gap-2">
                        <span className="material-symbols-outlined text-[18px]">logout</span>
                        Log Out
                     </button>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;