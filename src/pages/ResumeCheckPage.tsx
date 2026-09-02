import { CheckCircle2, AlertTriangle, ArrowRight, ShieldCheck, FileText } from 'lucide-react';
import { useApp } from '../AppContext';
import { PageHeader } from '../components/PageHeader';
import { LevelBadge } from '../components/LevelBadge';
import { DEFAULT_RESUME_CLAIMS } from '../mockData';
import { LEVEL_ORDER } from '../types';
import type { ResumeClaim } from '../types';

export function ResumeCheckPage() {
  const { navigate, skills, resumeClaims } = useApp();

  const claims: ResumeClaim[] = resumeClaims.length ? resumeClaims : DEFAULT_RESUME_CLAIMS;
  const skillMap = new Map(skills.map((s) => [s.skill, s]));

  const rows = claims.map((claim) => {
    const verified = skillMap.get(claim.skill);
    const verifiedLevel = verified?.verified ?? null;
    const verifiedScore = verified?.score ?? null;
    let status: 'verified' | 'difference' | 'needs-improvement' | 'unverified';
    if (!verifiedLevel) status = 'unverified';
    else if (verifiedLevel === claim.claimedLevel) status = 'verified';
    else if (LEVEL_ORDER[verifiedLevel] < LEVEL_ORDER[claim.claimedLevel]) status = 'difference';
    else status = 'difference';

    return { claim, verifiedLevel, verifiedScore, status };
  });

  const verifiedCount = rows.filter((r) => r.status === 'verified').length;
  const diffCount = rows.filter((r) => r.status === 'difference').length;
  const unverifiedCount = rows.filter((r) => r.status === 'unverified').length;

  return (
    <div className="max-w-5xl mx-auto px-5 lg:px-8 py-10">
      <PageHeader
        eyebrow="Resume Reality Check"
        title="Your resume vs. your verified skills"
        subtitle="We never call your resume fake. We simply compare what you claimed against what you proved — and show where they align or differ."
      />

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-4 mb-8 stagger">
        <div className="card p-5 text-center">
          <div className="text-3xl font-extrabold text-green-600">{verifiedCount}</div>
          <div className="text-sm text-midnight-500 font-medium mt-1">Verified</div>
        </div>
        <div className="card p-5 text-center">
          <div className="text-3xl font-extrabold text-ember-600">{diffCount}</div>
          <div className="text-sm text-midnight-500 font-medium mt-1">Differ</div>
        </div>
        <div className="card p-5 text-center">
          <div className="text-3xl font-extrabold text-midnight-400">{unverifiedCount}</div>
          <div className="text-sm text-midnight-500 font-medium mt-1">Unverified</div>
        </div>
      </div>

      {/* Comparison table */}
      <div className="card overflow-hidden animate-fade-up">
        <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-midnight-900 text-cream-50 font-bold text-sm">
          <div className="col-span-3">Skill</div>
          <div className="col-span-3">Resume Claim</div>
          <div className="col-span-3">Verified Level</div>
          <div className="col-span-3 text-right">Status</div>
        </div>
        {rows.map((r, i) => (
          <div
            key={r.claim.skill}
            className={`grid grid-cols-12 gap-4 px-6 py-5 items-center ${
              i % 2 === 0 ? 'bg-white' : 'bg-cream-50/50'
            }`}
          >
            <div className="col-span-3 font-bold text-midnight-900">{r.claim.skill}</div>
            <div className="col-span-3"><LevelBadge level={r.claim.claimedLevel} size="sm" /></div>
            <div className="col-span-3">
              {r.verifiedLevel ? (
                <div className="flex items-center gap-2">
                  <LevelBadge level={r.verifiedLevel} size="sm" />
                  {r.verifiedScore !== null && <span className="text-xs text-midnight-400">({r.verifiedScore}%)</span>}
                </div>
              ) : (
                <span className="text-sm text-midnight-400 italic">Not assessed yet</span>
              )}
            </div>
            <div className="col-span-3 flex justify-end">
              {r.status === 'verified' && (
                <span className="pill bg-green-100 text-green-700 text-xs">
                  <CheckCircle2 className="w-4 h-4" /> Verified
                </span>
              )}
              {r.status === 'difference' && (
                <span className="pill bg-ember-100 text-ember-700 text-xs">
                  <AlertTriangle className="w-4 h-4" /> Difference
                </span>
              )}
              {r.status === 'unverified' && (
                <span className="pill bg-midnight-100 text-midnight-500 text-xs">
                  <ShieldCheck className="w-4 h-4" /> Needs verification
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Explanatory notes */}
      <div className="grid md:grid-cols-2 gap-4 mt-6">
        <div className="card p-6">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="w-5 h-5 text-ember-500" />
            <h3 className="font-bold text-midnight-900">What this means</h3>
          </div>
          <ul className="space-y-2 text-sm text-midnight-600">
            <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" /> Verified = your claim matches your assessment.</li>
            <li className="flex gap-2"><AlertTriangle className="w-4 h-4 text-ember-500 shrink-0 mt-0.5" /> Difference = resume claim differs from assessment.</li>
            <li className="flex gap-2"><ShieldCheck className="w-4 h-4 text-midnight-400 shrink-0 mt-0.5" /> Needs verification = skill not yet assessed.</li>
          </ul>
        </div>
        <div className="card p-6 bg-cream-100">
          <h3 className="font-bold text-midnight-900 mb-2">Our promise</h3>
          <p className="text-sm text-midnight-600 leading-relaxed">
            We never call your resume "fake." If a claim differs, it may simply mean your verified level is currently lower than the resume claim — and that's exactly what SkillUp Pro helps you improve.
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center">
        <button onClick={() => navigate('job-match')} className="btn-primary text-base">
          Check Job Match
          <ArrowRight className="w-5 h-5" />
        </button>
        <button onClick={() => navigate('assessment')} className="btn-ghost text-base">
          Verify More Skills
        </button>
      </div>
    </div>
  );
}
