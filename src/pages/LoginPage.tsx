import { useState } from 'react';
import { Mail, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { useApp } from '../AppContext';
import { showToast } from '../components/Toast';

export function LoginPage() {
  const { navigate, setAuthed, setUser } = useApp();
  const [email, setEmail] = useState('jane@example.com');
  const [password, setPassword] = useState('demo1234');
  const [showPw, setShowPw] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      showToast('error', 'Please enter your email and password.');
      return;
    }
    setAuthed(true);
    setUser({
      name: 'Jane Doe',
      email,
      education: 'University',
      degree: 'B.S. Computer Science',
      graduationYear: '2026',
      careerCategory: 'Data Analytics',
      careerRole: 'Data Analyst',
      avatarColor: 'ember',
    });
    showToast('success', 'Welcome back, Jane!');
    navigate('dashboard');
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-5 py-12">
      <div className="w-full max-w-md animate-fade-up">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-midnight-900 flex items-center justify-center mx-auto mb-5">
            <span className="text-ember-400 font-extrabold text-2xl">S</span>
          </div>
          <h1 className="text-3xl font-extrabold text-midnight-900">Welcome back</h1>
          <p className="mt-2 text-midnight-500">Log in to continue proving your skills.</p>
        </div>

        <form onSubmit={handleSubmit} className="card p-8 space-y-5">
          <div>
            <label className="block text-sm font-semibold text-midnight-700 mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-midnight-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="input-field pl-12"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-midnight-700 mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-midnight-400" />
              <input
                type={showPw ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="input-field pl-12 pr-12"
              />
              <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-4 top-1/2 -translate-y-1/2 text-midnight-400 hover:text-midnight-700">
                {showPw ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-midnight-600 cursor-pointer">
              <input type="checkbox" className="rounded accent-ember-500" defaultChecked />
              Remember me
            </label>
            <button type="button" className="font-semibold text-ember-600 hover:text-ember-700">Forgot password?</button>
          </div>

          <button type="submit" className="btn-primary w-full text-base py-4">
            Log In
            <ArrowRight className="w-5 h-5" />
          </button>

          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-midnight-100" /></div>
            <div className="relative flex justify-center"><span className="bg-white px-4 text-sm text-midnight-400">or</span></div>
          </div>

          <button type="button" onClick={() => { setAuthed(true); setUser({ name: 'Jane Doe', email: 'jane@example.com', education: 'University', degree: 'B.S. Computer Science', graduationYear: '2026', careerCategory: 'Data Analytics', careerRole: 'Data Analyst', avatarColor: 'ember' }); showToast('info', 'Logged in with demo account.'); navigate('dashboard'); }} className="btn-ghost w-full text-base py-4">
            Continue with Demo Account
          </button>
        </form>

        <p className="text-center mt-6 text-midnight-500 text-sm">
          Don't have an account?{' '}
          <button onClick={() => navigate('signup')} className="font-bold text-ember-600 hover:text-ember-700">
            Sign up free
          </button>
        </p>
      </div>
    </div>
  );
}
