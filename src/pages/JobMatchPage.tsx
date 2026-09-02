import { CheckCircle2, CircleDashed, XCircle, ArrowRight, Target, Briefcase } from 'lucide-react';
import { useApp } from '../AppContext';
import { PageHeader } from '../components/PageHeader';
import { ProgressBar } from '../components/ProgressBar';
import { LEVEL_ORDER } from '../types';
import type { SkillLevel } from '../types';

interface JobReq {
  skill: string;
  requiredLevel: SkillLevel;
}

const JOB_REQUIREMENTS: JobReq[] = [
  { skill: 'Python', requiredLevel: 'Intermediate' },
  { skill: 'SQL', requiredLevel: 'Intermediate' },
  { skill: 'Power BI', requiredLevel: 'Job Ready' },
  { skill: 'Excel', requiredLevel: 'Intermediate' },
  { skill: 'Communication', requiredLevel: 'Job Ready' },
  { skill: 'Data Visualization', requiredLevel: 'Intermediate' },
];

export function JobMatchPage() {
  const { navigate, skills } = useApp();
  const skillMap = new Map(skills.map((s) => [s.skill, s]));

  const strong: typeof JOB_REQUIREMENTS = [];
  const partial: typeof JOB_REQUIREMENTS = [];
  const gap: typeof JOB_REQUIREMENTS = [];

  JOB_REQUIREMENTS.forEach((req) => {
    const verified = skillMap.get(req.skill);
    if (!verified) {
      partial.push(req);
    } else if (LEVEL_ORDER[verified.verified] >= LEVEL_ORDER[req.requiredLevel]) {
      strong.push(req);
    } else if (LEVEL_ORDER[verified.verified] >= LEVEL_ORDER[req.requiredLevel] - 1) {
      partial.push(req);
    } else {
      gap.push(req);
    }
  });

  const matchPercent = Math.round(
    (strong.length / JOB_REQUIREMENTS.length) * 100 +
    (partial.length / JOB_REQUIREMENTS.length) * 50,
  );

  const readiness = matchPercent >= 80
    ? 'Strong match — you are ready to apply!'
    : matchPercent >= 60
      ? 'Good match — you can apply while improving your skill gaps.'
      : 'Improve your skill gaps before applying.';

  return (
    <div className="max-w-5xl mx-auto px-5 lg:px-8 py-10">
      <PageHeader
        eyebrow="Job Match Result"
        title="Your job readiness score"
        subtitle="Based on your verified skills vs. the Junior Data Analyst requirements."
      />

      {/* Score hero */}
      <div className="card p-8 mb-8 text-center bg-midnight-900 text-cream-50 relative overflow-hidden animate-fade-up">
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-ember-500/20 rounded-full blur-3xl" />
        <div className="relative">
          <div className="text-7xl md:text-8xl font-extrabold text-ember-400">{matchPercent}%</div>
          <div className="text-lg font-bold text-cream-50 mt-2">JOB MATCH</div>
          <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2.5">
            <Target className="w-5 h-5 text-ember-400" />
            <span className="font-semibold text-cream-100">{readiness}</span>
          </div>
        </div>
      </div>

      {/* Match breakdown */}
      <div className="grid md:grid-cols-3 gap-5 mb-8 stagger">
        {/* Strong match */}
        <div className="card p-6">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle2 className="w-5 h-5 text-green-500" />
            <h3 className="font-bold text-midnight-900">Strong Match</h3>
          </div>
          {strong.length === 0 ? (
            <p className="text-sm text-midnight-400 italic">No strong matches yet.</p>
          ) : (
            <ul className="space-y-2">
              {strong.map((s) => (
                <li key={s.skill} className="flex items-center gap-2 text-sm text-midnight-700">
                  <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" /> {s.skill}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Partial match */}
        <div className="card p-6">
          <div className="flex items-center gap-2 mb-4">
            <CircleDashed className="w-5 h-5 text-ember-500" />
            <h3 className="font-bold text-midnight-900">Partial Match</h3>
          </div>
          {partial.length === 0 ? (
            <p className="text-sm text-midnight-400 italic">No partial matches.</p>
          ) : (
            <ul className="space-y-2">
              {partial.map((s) => (
                <li key={s.skill} className="flex items-center gap-2 text-sm text-midnight-700">
                  <CircleDashed className="w-4 h-4 text-ember-500 shrink-0" /> {s.skill}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Skill gap */}
        <div className="card p-6">
          <div className="flex items-center gap-2 mb-4">
            <XCircle className="w-5 h-5 text-crimson-500" />
            <h3 className="font-bold text-midnight-900">Skill Gap</h3>
          </div>
          {gap.length === 0 ? (
            <p className="text-sm text-midnight-400 italic">No skill gaps — great job!</p>
          ) : (
            <ul className="space-y-2">
              {gap.map((s) => (
                <li key={s.skill} className="flex items-center gap-2 text-sm text-midnight-700">
                  <XCircle className="w-4 h-4 text-crimson-500 shrink-0" /> {s.skill}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Application readiness */}
      <div className="card p-6 mb-8 bg-cream-100">
        <div className="flex items-center gap-3 mb-2">
          <Briefcase className="w-6 h-6 text-ember-600" />
          <h3 className="text-lg font-bold text-midnight-900">Application Readiness</h3>
        </div>
        <p className="text-midnight-700 leading-relaxed">{readiness}</p>
        <div className="mt-4">
          <ProgressBar value={matchPercent} color="ember" showLabel label="Overall match" />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button onClick={() => navigate('skill-gap')} className="btn-primary text-base">
          View Skill Gaps
          <ArrowRight className="w-5 h-5" />
        </button>
        <button onClick={() => navigate('jobs')} className="btn-ghost text-base">
          See Job Recommendations
        </button>
      </div>
    </div>
  );
}
