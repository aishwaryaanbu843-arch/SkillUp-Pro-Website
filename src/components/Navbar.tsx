import {
  LayoutDashboard, ClipboardCheck, Award, FileSearch, Briefcase,
  TrendingUp, Target, LogOut, Menu, X,
} from 'lucide-react';
import { useState } from 'react';
import { useApp } from '../AppContext';
import type { PageId } from '../types';

const NAV_ITEMS: { id: PageId; label: string; icon: typeof LayoutDashboard }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'assessment', label: 'Assessment', icon: ClipboardCheck },
  { id: 'dashboard', label: 'My Skills', icon: Award },
  { id: 'resume-check', label: 'Resume Check', icon: FileSearch },
  { id: 'job-match', label: 'Job Match', icon: Briefcase },
  { id: 'improvement', label: 'Improvement Plan', icon: TrendingUp },
  { id: 'jobs', label: 'Jobs', icon: Target },
];

export function Navbar() {
  const { currentPage, navigate, user, setUser, setAuthed, isAuthed } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNav = (page: PageId) => {
    navigate(page);
    setMobileOpen(false);
  };

  const handleLogout = () => {
    setAuthed(false);
    setUser(null);
    navigate('landing');
  };

  return (
    <header className="sticky top-0 z-50 bg-cream-50/85 backdrop-blur-lg border-b border-midnight-900/5">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button onClick={() => navigate(isAuthed ? 'dashboard' : 'landing')} className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-midnight-900 flex items-center justify-center group-hover:scale-105 transition-transform">
              <span className="text-ember-400 font-extrabold text-lg">S</span>
            </div>
            <span className="font-extrabold text-lg text-midnight-900 tracking-tight">
              SkillUp<span className="text-ember-500"> Pro</span>
            </span>
          </button>

          {/* Desktop nav */}
          {isAuthed ? (
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_ITEMS.map((item, i) => {
                const isActive = currentPage === item.id && !(item.label === 'My Skills' && currentPage !== 'dashboard');
                return (
                  <button
                    key={i}
                    onClick={() => handleNav(item.id)}
                    className={`px-3.5 py-2 rounded-full text-sm font-semibold transition-all ${
                      isActive
                        ? 'bg-midnight-900 text-cream-50'
                        : 'text-midnight-600 hover:bg-midnight-100 hover:text-midnight-900'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
              <div className="w-px h-6 bg-midnight-200 mx-2" />
              <div className="flex items-center gap-2 pl-1">
                <div className="w-8 h-8 rounded-full bg-ember-400 flex items-center justify-center text-white font-bold text-sm">
                  {user?.name?.charAt(0) ?? 'J'}
                </div>
                <button onClick={handleLogout} className="p-2 rounded-full text-midnight-500 hover:bg-midnight-100 hover:text-crimson-600 transition-colors" title="Log out">
                  <LogOut className="w-4.5 h-4.5" />
                </button>
              </div>
            </nav>
          ) : (
            <div className="hidden lg:flex items-center gap-3">
              <button onClick={() => navigate('login')} className="px-4 py-2 text-sm font-semibold text-midnight-700 hover:text-midnight-900 transition-colors">
                Log in
              </button>
              <button onClick={() => navigate('signup')} className="btn-primary text-sm">
                Get Started
              </button>
            </div>
          )}

          {/* Mobile toggle */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 rounded-xl text-midnight-900 hover:bg-midnight-100">
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden pb-4 animate-fade-in">
            {isAuthed ? (
              <div className="flex flex-col gap-1">
                {NAV_ITEMS.map((item, i) => (
                  <button
                    key={i}
                    onClick={() => handleNav(item.id)}
                    className={`px-4 py-3 rounded-2xl text-sm font-semibold text-left transition-all ${
                      currentPage === item.id ? 'bg-midnight-900 text-cream-50' : 'text-midnight-600 hover:bg-midnight-100'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
                <button onClick={handleLogout} className="px-4 py-3 rounded-2xl text-sm font-semibold text-left text-crimson-600 hover:bg-crimson-50">
                  Log out
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <button onClick={() => handleNav('login')} className="btn-ghost w-full">Log in</button>
                <button onClick={() => handleNav('signup')} className="btn-primary w-full">Get Started</button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
