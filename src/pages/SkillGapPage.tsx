import { ArrowRight, Target, TrendingUp, BookOpen } from 'lucide-react';
import { useApp } from '../AppContext';
import { PageHeader } from '../components/PageHeader';
import { LevelBadge } from '../components/LevelBadge';
import { ProgressBar } from '../components/ProgressBar';
import type { SkillLevel } from '../types';

interface GapItem {
  rank: number;
  skill: string;
  currentLevel: SkillLevel;
  requiredLevel: SkillLevel;
  action: string;
}

const GAPS: GapItem[] = [
  { rank: 1, skill: 'Power BI', currentLevel: 'Beginner', requiredLevel: 'Job Ready', action: 'Complete a Power BI fundamentals course and build 2 dashboard projects.' },
  { rank: 2, skill: 'Data Visualization', currentLevel: 'Beginner', requiredLevel: 'Intermediate', action: 'Practice creating visualizations with real datasets and learn chart selection principles.' },
  { rank: 3, skill: 'Communication', currentLevel: 'Beginner', requiredLevel: 'Job Ready', action: 'Practice presenting data insights to non-technical audiences and join a toastmasters group.' },
];

export function SkillGapPage() {
  const { navigate } = useApp();

  return (
    <div className="max-w-4xl mx-auto px-5 lg:px-8 py-10">
      <PageHeader
        eyebrow="Skill Gap Analysis"
        title="Your top 3 skills to improve"
        subtitle="These are the highest-impact gaps between where you are now and where your target job needs you to be."
      />

      <div className="space-y-5 stagger">
        {GAPS.map((gap) => {
          const levelDiff = ['Beginner', 'Intermediate', 'Job Ready', 'Advanced'];
          const currentIdx = levelDiff.indexOf(gap.currentLevel);
          const requiredIdx = levelDiff.indexOf(gap.requiredLevel);
          const progress = Math.round((currentIdx / (requiredIdx)) * 100);

          return (
            <div key={gap.skill} className="card p-6 hover:shadow-lift transition-all duration-300">
              <div className="flex items-start gap-5">
                {/* Rank badge */}
                <div className="w-12 h-12 rounded-2xl bg-midnight-900 flex items-center justify-center shrink-0">
                  <span className="text-ember-400 font-extrabold text-xl">{gap.rank}</span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <h3 className="text-xl font-bold text-midnight-900">{gap.skill}</h3>
                    <div className="flex items-center gap-2">
                      <LevelBadge level={gap.currentLevel} size="sm" />
                      <ArrowRight className="w-4 h-4 text-midnight-300" />
                      <LevelBadge level={gap.requiredLevel} size="sm" />
                    </div>
                  </div>

                  <div className="mb-4">
                    <ProgressBar value={progress} color="crimson" height="h-2" />
                    <div className="flex justify-between mt-1.5 text-xs text-midnight-400 font-medium">
                      <span>Current: {gap.currentLevel}</span>
                      <span>Required: {gap.requiredLevel}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 p-4 rounded-2xl bg-cream-100">
                    <Target className="w-5 h-5 text-ember-500 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-midnight-400 mb-1">Recommended Action</div>
                      <p className="text-sm text-midnight-700 leading-relaxed">{gap.action}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
        <button onClick={() => navigate('improvement')} className="btn-primary text-base">
          <TrendingUp className="w-5 h-5" />
          View Improvement Plan
          <ArrowRight className="w-5 h-5" />
        </button>
        <button onClick={() => navigate('jobs')} className="btn-ghost text-base">
          <BookOpen className="w-5 h-5" />
          Browse Jobs
        </button>
      </div>
    </div>
  );
}
