import {
  FileText, ClipboardCheck, BadgeCheck, Briefcase, ArrowRight, Sparkles, ShieldCheck, Zap,
} from 'lucide-react';
import { useApp } from '../AppContext';
import { FlowCard } from '../components/FlowCard';
import { defaultSkills } from '../AppContext';

export function LandingPage() {
  const { navigate, setSkills, setAuthed, setUser } = useApp();

  const startDemo = () => {
    setAuthed(true);
    setUser({
      name: 'Jane Doe',
      email: 'jane@example.com',
      education: 'University',
      degree: 'B.S. Computer Science',
      graduationYear: '2026',
      careerCategory: 'Data Analytics',
      careerRole: 'Data Analyst',
      avatarColor: 'ember',
    });
    setSkills(defaultSkills);
    navigate('dashboard');
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-midnight-900 text-cream-50">
        {/* Decorative blobs */}
        <div className="absolute top-0 -right-32 w-96 h-96 bg-ember-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 -left-32 w-96 h-96 bg-crimson-500/15 rounded-full blur-3xl" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

        <div className="relative max-w-7xl mx-auto px-5 lg:px-8 pt-20 pb-24 lg:pt-28 lg:pb-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-4 py-2 mb-8 animate-fade-up">
              <Sparkles className="w-4 h-4 text-ember-400" />
              <span className="text-sm font-semibold text-cream-100">Verify. Compare. Match.</span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[0.95] text-balance animate-fade-up" style={{ animationDelay: '0.05s' }}>
              SKILLUP <span className="text-ember-400">PRO</span>
            </h1>

            <p className="mt-6 text-2xl md:text-3xl font-bold text-cream-50 leading-tight text-balance animate-fade-up" style={{ animationDelay: '0.12s' }}>
              Don't just claim your skills. <span className="text-ember-400">Prove them.</span>
            </p>

            <p className="mt-5 text-lg text-cream-200/80 max-w-2xl leading-relaxed animate-fade-up" style={{ animationDelay: '0.19s' }}>
              Verify what you actually know, understand your job readiness, and discover the skills you need to become career-ready.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 animate-fade-up" style={{ animationDelay: '0.26s' }}>
              <button onClick={() => navigate('signup')} className="btn-primary text-base px-8 py-4">
                Get Started
                <ArrowRight className="w-5 h-5" />
              </button>
              <button onClick={startDemo} className="btn-outline text-base px-8 py-4">
                Try Demo
              </button>
            </div>

            {/* Stats strip */}
            <div className="mt-16 flex flex-wrap gap-8 animate-fade-up" style={{ animationDelay: '0.33s' }}>
              {[
                { value: '5', label: 'Assessable Skills' },
                { value: '10', label: 'Questions Per Test' },
                { value: '70%', label: 'Pass Threshold' },
                { value: '7', label: 'Career Paths' },
              ].map((s, i) => (
                <div key={i}>
                  <div className="text-3xl font-extrabold text-ember-400">{s.value}</div>
                  <div className="text-sm text-cream-200/60 font-medium mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="relative">
          <svg viewBox="0 0 1440 80" className="w-full h-12 md:h-16" preserveAspectRatio="none">
            <path d="M0,40 C320,80 480,0 720,20 C960,40 1120,80 1440,30 L1440,80 L0,80 Z" fill="#fdfbf7" />
          </svg>
        </div>
      </section>

      {/* Flow section */}
      <section className="max-w-7xl mx-auto px-5 lg:px-8 py-16 lg:py-24">
        <div className="text-center mb-14">
          <div className="section-label justify-center mb-3">How It Works</div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-midnight-900 tracking-tight text-balance">
            From resume claim to <span className="text-ember-500">verified proof</span>
          </h2>
          <p className="mt-4 text-lg text-midnight-500 max-w-2xl mx-auto">
            A four-step journey that turns self-reported skills into evidence-backed readiness.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 md:gap-2 stagger">
          <FlowCard icon={FileText} step={1} title="Resume Claim" description="List the skills you say you have." accent="midnight" />
          <FlowCard icon={ClipboardCheck} step={2} title="Skill Assessment" description="Prove it with a 10-question test." accent="ember" />
          <FlowCard icon={BadgeCheck} step={3} title="Verified Skill" description="Get an objective verified level." accent="crimson" />
          <FlowCard icon={Briefcase} step={4} title="Job Match" description="See how ready you are for real jobs." accent="midnight" isLast />
        </div>
      </section>

      {/* Feature cards */}
      <section className="max-w-7xl mx-auto px-5 lg:px-8 pb-16 lg:pb-24">
        <div className="grid md:grid-cols-3 gap-6 stagger">
          <div className="card p-8 hover:shadow-lift hover:-translate-y-1 transition-all duration-300">
            <div className="w-14 h-14 rounded-2xl bg-ember-100 flex items-center justify-center mb-5">
              <ShieldCheck className="w-7 h-7 text-ember-600" />
            </div>
            <h3 className="text-xl font-bold text-midnight-900 mb-2">Verified Skills</h3>
            <p className="text-midnight-500 leading-relaxed">
              Take real assessments and get an objective skill level — not just what you wrote on your resume.
            </p>
          </div>

          <div className="card p-8 hover:shadow-lift hover:-translate-y-1 transition-all duration-300">
            <div className="w-14 h-14 rounded-2xl bg-crimson-100 flex items-center justify-center mb-5">
              <FileText className="w-7 h-7 text-crimson-600" />
            </div>
            <h3 className="text-xl font-bold text-midnight-900 mb-2">Resume Reality Check</h3>
            <p className="text-midnight-500 leading-relaxed">
              Compare your resume claims against verified results and see where they align — or differ.
            </p>
          </div>

          <div className="card p-8 hover:shadow-lift hover:-translate-y-1 transition-all duration-300">
            <div className="w-14 h-14 rounded-2xl bg-midnight-100 flex items-center justify-center mb-5">
              <Zap className="w-7 h-7 text-midnight-700" />
            </div>
            <h3 className="text-xl font-bold text-midnight-900 mb-2">Job Readiness Score</h3>
            <p className="text-midnight-500 leading-relaxed">
              Paste any job description and instantly see your match percentage and skill gaps.
            </p>
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section className="max-w-7xl mx-auto px-5 lg:px-8 pb-20">
        <div className="relative overflow-hidden rounded-5xl bg-midnight-900 p-10 md:p-16 text-center">
          <div className="absolute -top-20 -right-20 w-72 h-72 bg-ember-500/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-crimson-500/15 rounded-full blur-3xl" />
          <div className="relative">
            <h2 className="text-3xl md:text-5xl font-extrabold text-cream-50 tracking-tight text-balance">
              Ready to prove what you know?
            </h2>
            <p className="mt-4 text-lg text-cream-200/70 max-w-xl mx-auto">
              Join SkillUp Pro and turn your skills into evidence-backed career readiness.
            </p>
            <button onClick={() => navigate('signup')} className="btn-primary text-base px-8 py-4 mt-8">
              Get Started Free
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
