import React from "react";
import { useNavigate } from "react-router-dom";

const Landing: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-background-dark text-white">
      {/* Navbar */}
      <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-background-dark/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-background-dark">
              <span className="material-symbols-outlined text-xl">sync</span>
            </div>
            <span className="text-lg font-bold tracking-tight">CampusSync</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a
              className="text-sm font-medium text-slate-300 hover:text-primary transition-colors"
              href="#features"
            ></a>
            <a
              className="text-sm font-medium text-slate-300 hover:text-primary transition-colors"
              href="#how-it-works"
            ></a>
          </nav>
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/login")}
              className="hidden md:flex h-9 items-center justify-center rounded-full bg-primary px-4 text-sm font-bold text-background-dark transition hover:bg-primary/90"
            >
              Sign In
            </button>
            <button className="md:hidden text-white flex items-center justify-center">
              <span className="material-symbols-outlined">menu</span>
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
              <div className="flex flex-col gap-6 text-center lg:text-left z-10">
                <h1 className="text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                  Never Miss Another{" "}
                  <span className="text-primary">Campus Update</span>
                </h1>
                <p className="mx-auto max-w-lg text-lg text-slate-400 lg:mx-0">
                  Academic coordination for Indian colleges—simple, instant,
                  mobile-first. Stop relying on scattered messages.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4 lg:justify-start">
                  {/* Primary CTA goes to auth; onboarding comes after login */}
                  <button
                    onClick={() => navigate("/login")}
                    className="h-12 rounded-full bg-primary px-8 text-base font-bold text-background-dark transition hover:bg-primary/90 hover:scale-105 transform duration-200"
                  >
                    Get Started Free
                  </button>
                  <button className="flex h-12 items-center justify-center gap-2 rounded-full border border-slate-600 bg-transparent px-8 text-base font-bold text-white transition hover:bg-white/5 hover:border-white">
                    <span className="material-symbols-outlined text-xl">
                      play_circle
                    </span>
                    Watch Demo
                  </button>
                </div>
                <div className="mt-4 flex items-center justify-center gap-4 lg:justify-start">
                  <p className="text-sm font-medium text-slate-400">
                    Trusted by IIT Delhi, BITS Pilani, & Anna University
                    students
                  </p>
                </div>
              </div>

              {/* Simulated 3D Element Placeholder */}
              <div className="relative mx-auto w-full max-w-[500px] lg:max-w-none">
                <div className="aspect-square relative z-10 rounded-3xl bg-surface-dark/50 p-4 border border-surface-border/30 backdrop-blur-sm flex items-center justify-center overflow-hidden shadow-2xl shadow-primary/5">
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-indigo-500/20"></div>
                  <div className="w-full h-full bg-center bg-contain bg-no-repeat relative">
                    {/* Floating Cards Simulation */}
                    <div
                      className="absolute top-1/4 right-8 bg-surface-dark border border-surface-border p-3 rounded-xl shadow-xl animate-bounce"
                      style={{ animationDuration: "3s" }}
                    >
                      <div className="flex gap-3 items-center">
                        <div className="h-8 w-8 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center">
                          <span className="material-symbols-outlined text-sm">
                            warning
                          </span>
                        </div>
                        <div>
                          <p className="text-xs text-white font-bold">
                            Assignment Due
                          </p>
                          <p className="text-[10px] text-slate-400">
                            Physics 101 • Tomorrow
                          </p>
                        </div>
                      </div>
                    </div>
                    <div
                      className="absolute bottom-1/3 left-8 bg-surface-dark border border-surface-border p-3 rounded-xl shadow-xl animate-bounce"
                      style={{ animationDuration: "4s", animationDelay: "1s" }}
                    >
                      <div className="flex gap-3 items-center">
                        <div className="h-8 w-8 rounded-full bg-primary/20 text-primary flex items-center justify-center">
                          <span className="material-symbols-outlined text-sm">
                            check_circle
                          </span>
                        </div>
                        <div>
                          <p className="text-xs text-white font-bold">
                            Grade Posted
                          </p>
                          <p className="text-[10px] text-slate-400">
                            Math Final • A+
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Landing;
