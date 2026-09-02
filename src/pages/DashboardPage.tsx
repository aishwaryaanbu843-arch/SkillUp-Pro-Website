import { Award, ArrowRight, Plus, TrendingUp } from 'lucide-react';
import { useApp } from '../AppContext';
import { LevelBadge } from '../components/LevelBadge';
import { ProgressBar } from '../components/ProgressBar';
import { PageHeader } from '../components/PageHeader';
import { ASSESSABLE_SKILLS } from '../mockData';
import { LEVEL_ORDER } from '../types';

export function DashboardPage() {
  const { navigate, user, skills } = useApp();

  const skillMap = new Map(skills.map((s) => [s.skill, s]));

  return (
    <div className="max-w-6xl mx-auto px-5 lg:px-8 py-10">
      <PageHeader
        eyebrow="My Verified Skills"
        title={`Welcome back, ${user?.name?.split(' ')[0] ?? 'there'}!`}
        subtitle="Here's your verified skill profile based on your assessments."
      >
        <div className="flex flex-wrap gap-3 mt-6">
          <button onClick={() => navigate('assessment')} className="btn-primary text-sm">
            <Plus className="w-4 h-4" />
            Take New Assessment
          </button>
          <button onClick={() => navigate('resume-check')} className="btn-ghost text-sm">
            Resume Reality Check
            <ArrowRight className="w-4 h-4" />
          </button>
          <button onClick={() => navigate('job-match')} className="btn-ghost text-sm">
            Check Job Match
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </PageHeader>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 stagger">
        {[
          { label: 'Skills Verified', value: skills.length, icon: Award },
          { label: 'Avg Score', value: skills.length ? `${Math.round(skills.reduce((a, s) => a + s.score, 0) / skills.length)}%` : '—', icon: TrendingUp },
          { label: 'Career Path', value: user?.careerCategory ?? '—', icon: Award },
          { label: 'Target Role', value: user?.careerRole ?? '—', icon: Award },
        ].map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} className="card p-5">
              <div className="w-10 h-10 rounded-xl bg-midnight-100 flex items-center justify-center mb-3">
                <Icon className="w-5 h-5 text-midnight-700" />
              </div>
              <div className="text-2xl font-extrabold text-midnight-900 truncate">{s.value}</div>
              <div className="text-sm text-midnight-400 font-medium">{s.label}</div>
            </div>
          );
        })}
      </div>

      {/* Skill cards */}
      <h2 className="text-xl font-bold text-midnight-900 mb-4">Verified Skill Cards</h2>
      {skills.length === 0 ? (
        <div className="card p-12 text-center">
          <Award className="w-12 h-12 text-midnight-300 mx-auto mb-4" />
          <p className="text-midnight-500 mb-4">No verified skills yet. Take your first assessment!</p>
          <button onClick={() => navigate('skill-level')} className="btn-primary">Start Assessment</button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 stagger">
          {skills.map((s) => {
            const diff = LEVEL_ORDER[s.verified] - LEVEL_ORDER[s.selfDeclared];
            return (
              <div key={s.skill} className="card p-6 hover:shadow-lift hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-midnight-900">{s.skill}</h3>
                  <span className={`pill text-xs ${s.score >= 70 ? 'bg-green-100 text-green-700' : 'bg-crimson-50 text-crimson-600'}`}>
                    {s.score}% score
                  </span>
                </div>
                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-midnight-500">Self-declared</span>
                    <LevelBadge level={s.selfDeclared} size="sm" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-midnight-500">Verified</span>
                    <LevelBadge level={s.verified} size="sm" />
                  </div>
                </div>
                <ProgressBar value={s.score} color={s.score >= 70 ? 'ember' : 'crimson'} />
                <div className="mt-3 text-center">
                  {diff === 0 ? (
                    <span className="text-xs font-semibold text-green-600">Matches your claim</span>
                  ) : diff > 0 ? (
                    <span className="text-xs font-semibold text-ember-600">Verified higher than claimed</span>
                  ) : (
                    <span className="text-xs font-semibold text-crimson-600">Verified lower than claimed</span>
                  )}
                </div>
              </div>
            );
          })}

          {/* Add skill card */}
          <button
            onClick={() => navigate('skill-level')}
            className="card p-6 flex flex-col items-center justify-center gap-3 border-2 border-dashed border-midnight-200 hover:border-ember-400 hover:bg-ember-50/30 transition-all duration-300 min-h-[200px]"
          >
            <div className="w-12 h-12 rounded-full bg-midnight-100 flex items-center justify-center">
              <Plus className="w-6 h-6 text-midnight-500" />
            </div>
            <span className="font-semibold text-midnight-600">Assess a new skill</span>
            <span className="text-sm text-midnight-400">Python, SQL, Power BI, Excel, JS</span>
          </button>
        </div>
      )}

      {/* Unassessed skills */}
      {skills.length < ASSESSABLE_SKILLS.length && (
        <div className="mt-8">
          <h3 className="text-sm font-bold text-midnight-500 mb-3">Skills you can still assess</h3>
          <div className="flex flex-wrap gap-2">
            {ASSESSABLE_SKILLS.filter((s) => !skillMap.has(s)).map((s) => (
              <button key={s} onClick={() => navigate('skill-level')} className="pill bg-white border border-midnight-200 text-midnight-600 hover:border-ember-400 hover:text-ember-600 transition-colors">
                {s}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
