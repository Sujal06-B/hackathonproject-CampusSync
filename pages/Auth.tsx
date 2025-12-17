import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const { login, signup, googleSignIn } = useAuth();
  
  // Default to where user wanted to go, or dashboard
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const from = (location.state as any)?.from?.pathname || "/dashboard";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await login(email, password);
        navigate(from, { replace: true });
      } else {
        await signup(email, password);
        // Navigate to onboarding for new users
        navigate('/onboarding', { replace: true });
      }
    } catch (err: any) {
      console.error(err);
      let msg = "Failed to authenticate";
      if (err.code === 'auth/wrong-password') msg = "Incorrect password.";
      if (err.code === 'auth/user-not-found') msg = "No account found with this email.";
      if (err.code === 'auth/email-already-in-use') msg = "Email already in use.";
      if (err.code === 'auth/weak-password') msg = "Password should be at least 6 characters.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setError('');
      setLoading(true);
      await googleSignIn();
      navigate(from, { replace: true });
    } catch (err) {
      setError('Failed to sign in with Google');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background-dark font-display antialiased flex flex-col relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]"></div>

        <header className="w-full flex items-center justify-between border-b border-white/10 px-6 py-4 z-50 bg-background-dark/50 backdrop-blur-md">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
                <div className="flex items-center justify-center size-10 rounded-xl bg-primary/20 text-primary">
                    <span className="material-symbols-outlined text-[24px]">school</span>
                </div>
                <h2 className="text-white text-xl font-bold tracking-tight">CampusSync</h2>
            </div>
        </header>

        <main className="flex-grow flex items-center justify-center p-4">
            <div className="w-full max-w-[480px] bg-surface-dark/70 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl animate-in fade-in zoom-in-95 duration-300">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-white mb-2">
                      {isLogin ? 'Welcome Back' : 'Create Account'}
                    </h2>
                    <p className="text-gray-400 text-sm">
                      {isLogin ? 'Please enter your details to sign in.' : 'Join your campus network today.'}
                    </p>
                </div>

                <div className="flex p-1 bg-surface-border rounded-full mb-6 relative">
                    <button 
                      onClick={() => { setIsLogin(true); setError(''); }}
                      className={`flex-1 py-2.5 text-sm font-bold rounded-full transition-all text-center ${isLogin ? 'text-background-dark bg-primary shadow-lg' : 'text-gray-400 hover:text-white'}`}
                    >
                      Sign In
                    </button>
                    <button 
                      onClick={() => { setIsLogin(false); setError(''); }}
                      className={`flex-1 py-2.5 text-sm font-bold rounded-full transition-all text-center ${!isLogin ? 'text-background-dark bg-primary shadow-lg' : 'text-gray-400 hover:text-white'}`}
                    >
                      Sign Up
                    </button>
                </div>

                {error && (
                  <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-xl mb-4 text-sm font-bold flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">error</span>
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-gray-300 ml-4">Email Address</label>
                        <div className="relative">
                            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-[20px]">mail</span>
                            <input 
                              className="w-full bg-surface-dark border border-white/10 rounded-full h-12 pl-12 pr-4 text-white text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" 
                              type="email" 
                              placeholder="student@university.edu" 
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required 
                            />
                        </div>
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-gray-300 ml-4">Password</label>
                        <div className="relative">
                            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-[20px]">lock</span>
                            <input 
                              className="w-full bg-surface-dark border border-white/10 rounded-full h-12 pl-12 pr-12 text-white text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" 
                              type="password" 
                              placeholder="••••••••" 
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              required 
                            />
                        </div>
                    </div>
                    
                    <button 
                      type="submit" 
                      disabled={loading}
                      className="w-full bg-primary hover:bg-primary-hover text-background-dark font-bold h-12 rounded-full mt-4 transition-all shadow-lg shadow-primary/25 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                          <span className="size-5 border-2 border-background-dark border-t-transparent rounded-full animate-spin"></span>
                        ) : (
                          <>
                            <span>{isLogin ? 'Sign In' : 'Get Started'}</span>
                            <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                          </>
                        )}
                    </button>
                </form>
                
                 <div className="relative flex items-center justify-center my-6">
                    <div className="h-px bg-white/10 w-full absolute"></div>
                    <span className="bg-[#1c2620] px-3 text-xs text-gray-500 font-medium relative z-10 uppercase tracking-wider">or continue with</span>
                </div>
                
                 <button 
                    type="button"
                    onClick={handleGoogleSignIn}
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-3 bg-white text-gray-900 hover:bg-gray-100 transition-colors h-12 rounded-full font-bold text-sm shadow-md"
                 >
                     <span className="material-symbols-outlined">g_mobiledata</span>
                     Continue with Google
                 </button>
            </div>
        </main>
    </div>
  );
};

export default Auth;