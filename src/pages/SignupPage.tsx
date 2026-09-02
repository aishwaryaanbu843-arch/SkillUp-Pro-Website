import { useState } from 'react';
import { Mail, Lock, User, ArrowRight, Check } from 'lucide-react';
import { useApp } from '../AppContext';
import { showToast } from '../components/Toast';

export function SignupPage() {
  const { navigate, setAuthed, setUser } = useApp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      showToast('error', 'Please fill in all fields.');
      return;
    }
    setAuthed(true);
    setUser({
      name,
      email,
      education: '',
      degree: '',
      graduationYear: '',
      careerCategory: '',
      careerRole: '',
      avatarColor: 'ember',
    });
    showToast('success', `Welcome to SkillUp Pro, ${name}!`);
    navigate('profile-setup');
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-5 py-12">
      <div className="w-full max-w-md animate-fade-up">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-midnight-900 flex items-center justify-center mx-auto mb-5">
            <span className="text-ember-400 font-extrabold text-2xl">S</span>
          </div>
          <h1 className="text-3xl font-extrabold text-midnight-900">Create your account</h1>
          <p className="mt-2 text-midnight-500">Start verifying your skills in minutes.</p>
        </div>

        <form onSubmit={handleSubmit} className="card p-8 space-y-5">
          <div>
            <label className="block text-sm font-semibold text-midnight-700 mb-2">Full name</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-midnight-400" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Doe"
                className="input-field pl-12"
              />
            </div>
          </div>

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
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                className="input-field pl-12"
              />
            </div>
          </div>

          <div className="space-y-2">
            {['Free to get started', 'No credit card required', 'Verify your first skill in minutes'].map((b) => (
              <div key={b} className="flex items-center gap-2 text-sm text-midnight-600">
                <Check className="w-4 h-4 text-green-500" /> {b}
              </div>
            ))}
          </div>

          <button type="submit" className="btn-primary w-full text-base py-4">
            Create Account
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>

        <p className="text-center mt-6 text-midnight-500 text-sm">
          Already have an account?{' '}
          <button onClick={() => navigate('login')} className="font-bold text-ember-600 hover:text-ember-700">
            Log in
          </button>
        </p>
      </div>
    </div>
  );
}
