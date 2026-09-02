import type { SkillLevel } from '../types';

export function LevelBadge({ level, size = 'md' }: { level: SkillLevel; size?: 'sm' | 'md' }) {
  const colors: Record<SkillLevel, string> = {
    Beginner: 'bg-midnight-100 text-midnight-700',
    Intermediate: 'bg-ember-100 text-ember-700',
    'Job Ready': 'bg-green-100 text-green-700',
    Advanced: 'bg-crimson-100 text-crimson-700',
  };
  const sz = size === 'sm' ? 'px-2.5 py-1 text-xs' : 'px-3.5 py-1.5 text-sm';
  return (
    <span className={`pill ${colors[level]} ${sz}`}>
      {level}
    </span>
  );
}
