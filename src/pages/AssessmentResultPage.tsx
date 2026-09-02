import { useEffect, useMemo } from 'react';
import { Trophy, ArrowRight, RotateCcw, TrendingUp, Sparkles } from 'lucide-react';
import { useApp } from '../AppContext';
import { LevelBadge } from '../components/LevelBadge';
import { ProgressBar } from '../components/ProgressBar';
import { showToast } from '../components/Toast';
import type { SkillResult } from '../types';
import { LEVEL_ORDER } from '../types';

function Confetti() {
  const pieces = useMemo(
    () => Array.from({ length: 60 }, () => ({
      left: Math.random() * 100,
      delay: Math.random() * 0.5,
      duration: 2.5 + Math.random() * 2,
      color: ['#fb5a1a', '#e23d56', '#1f2856', '#ffaa74', '#f79faa'][Math.floor(Math.random() * 5)],
      size: 6 + Math.random() * 8,
    })),
    [],
  );
  return (
    <div className="fixed inset-0 pointer-events-none z-[60] overflow-hidden">
      {pieces.map((p, i) => (
        <div
          key={i}
          className="absolute top-0 rounded-sm"
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size * 1.4}px`,
            background: p.color,
            animation: `confetti-fall ${p.duration}s linear ${p.delay}s forwards`,
          }}
        />
      ))}
    </div>
  );
}

export function AssessmentResultPage() {
  const { assessment, skills, navigate, setAssessment } = useApp();

  const result: SkillResult | undefined = assessment.skill
    ? skills.find((s) => s.skill === assessment.skill)
    : undefined;

  const passed = result ? result.score >= 70 : false;

  useEffect(() => {
    if (passed) showToast('success', 'Assessment complete!');
  }, [passed]);

  if (!result || !assessment.skill) {
    return (
      <div className="max-w-2xl mx-auto px-5 py-20 text-center">
        <p className="text-midnight-500 mb-4">No assessment result to show.</p>
        <button onClick={() => navigate('skill-level')} className="btn-primary">Take an assessment</button>
      </div>
    );
  }

  const selfLevel = result.selfDeclared;
  const verifiedLevel = result.verified;
  const matches = selfLevel === verifiedLevel;
  const verifiedHigher = LEVEL_ORDER[verifiedLevel] > LEVEL_ORDER[selfLevel];

  const areasToImprove = ['Functions', 'Data Structures', 'Exception Handling'];

  return (
    <div className="max-w-3xl mx-auto px-5 lg:px-8 py-12">
      {passed && <Confetti />}

      {passed ? (
        <div className="text-center animate-scale-in">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-ember-100 mb-6">
            <Trophy className="w-10 h-10 text-ember-600" />
          </div>
          <div className="section-label justify-center mb-3">Assessment Complete</div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-midnight-900 tracking-tight">
            Congratulations!
          </h1>
          <p className="mt-4 text-lg text-midnight-500">
            Your skill has been verified.
          </p>
        </div>
      ) : (
        <div className="text-center animate-fade-up">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-midnight-100 mb-6">
            <TrendingUp className="w-10 h-10 text-midnight-700" />
          </div>
          <div className="section-label justify-center mb-3">Keep Going</div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-midnight-900 tracking-tight text-balance">
            You're not there yet — but you're getting closer.
          </h1>
        </div>
      )}

      {/* Score card */}
      <div className="card p-8 mt-8 animate-fade-up" style={{ animationDelay: '0.1s' }}>
        <div className="flex flex-col sm:flex-row items-center gap-8">
          {/* Score ring */}
          <div className="relative w-36 h-36 shrink-0">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="52" fill="none" stroke="#eef1f8" strokeWidth="12" />
              <circle
                cx="60" cy="60" r="52" fill="none"
                stroke={passed ? '#fb5a1a' : '#e23d56'}
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray={`${(result.score / 100) * 327} 327`}
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-extrabold text-midnight-900">{result.score}%</span>
              <span className="text-sm text-midnight-400 font-semibold">Score</span>
            </div>
          </div>

          {/* Level comparison */}
          <div className="flex-1 w-full space-y-4">
            <div className="flex items-center justify-between p-4 rounded-2xl bg-cream-100">
              <span className="font-semibold text-midnight-600">Self-declared</span>
              <LevelBadge level={selfLevel} />
            </div>
            <div className="flex items-center justify-between p-4 rounded-2xl bg-ember-50 border border-ember-200">
              <span className="font-semibold text-midnight-700">Verified level</span>
              <LevelBadge level={verifiedLevel} />
            </div>
            <div className="text-center">
              {matches ? (
                <p className="text-sm font-semibold text-green-600 flex items-center justify-center gap-1.5">
                  <Sparkles className="w-4 h-4" /> Your self-declared level matches your verified level.
                </p>
              ) : verifiedHigher ? (
                <p className="text-sm font-semibold text-ember-600">
                  You performed better than you claimed — nice surprise!
                </p>
              ) : (
                <p className="text-sm font-semibold text-crimson-600">
                  Your verified level is currently lower than the resume claim.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Fail: areas to improve */}
      {!passed && (
        <div className="card p-8 mt-6 animate-fade-up" style={{ animationDelay: '0.18s' }}>
          <h2 className="text-xl font-bold text-midnight-900 mb-4">Areas to improve</h2>
          <div className="flex flex-wrap gap-3">
            {areasToImprove.map((a) => (
              <span key={a} className="pill bg-crimson-50 text-crimson-700 border border-crimson-200">{a}</span>
            ))}
          </div>
          <p className="mt-5 text-midnight-600 italic leading-relaxed">
            "Every expert was once a beginner. You've taken the first step by measuring where you are — now you know exactly what to work on. Keep going."
          </p>
        </div>
      )}

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center">
        {passed ? (
          <button onClick={() => navigate('dashboard')} className="btn-primary text-base">
            View My Skill Profile
            <ArrowRight className="w-5 h-5" />
          </button>
        ) : (
          <>
            <button onClick={() => navigate('improvement')} className="btn-primary text-base">
              View Improvement Plan
              <ArrowRight className="w-5 h-5" />
            </button>
            <button onClick={() => {
              setAssessment({ skill: assessment.skill, selfDeclaredLevel: assessment.selfDeclaredLevel, answers: new Array(10).fill(-1), currentIndex: 0, completed: false });
              navigate('assessment');
            }} className="btn-ghost text-base">
              <RotateCcw className="w-5 h-5" />
              Retake Assessment
            </button>
          </>
        )}
      </div>

      {/* Progress bar summary */}
      <div className="mt-10">
        <ProgressBar value={result.score} color={passed ? 'ember' : 'crimson'} showLabel label={`${result.skill} proficiency`} />
      </div>
    </div>
  );
}
