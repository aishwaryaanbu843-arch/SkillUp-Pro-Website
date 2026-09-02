import { ArrowRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export function FlowCard({
  icon: LucideIcon,
  step,
  title,
  description,
  accent = 'ember',
  isLast = false,
}: {
  icon: LucideIcon;
  step: number;
  title: string;
  description: string;
  accent?: 'ember' | 'crimson' | 'midnight';
  isLast?: boolean;
}) {
  const accentMap = {
    ember: 'bg-ember-500 text-white',
    crimson: 'bg-crimson-500 text-white',
    midnight: 'bg-midnight-900 text-cream-50',
  };
  return (
    <div className="flex items-start gap-4 flex-1">
      <div className="flex flex-col items-center gap-3 flex-1">
        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${accentMap[accent]} shadow-soft`}>
          <icon className="w-7 h-7" />
        </div>
        <div className="text-center">
          <div className="text-xs font-bold uppercase tracking-wider text-midnight-400 mb-1">Step {step}</div>
          <h3 className="text-lg font-bold text-midnight-900 mb-1">{title}</h3>
          <p className="text-sm text-midnight-500 leading-relaxed">{description}</p>
        </div>
      </div>
      {!isLast && (
        <div className="hidden md:flex items-center pt-8">
          <ArrowRight className="w-6 h-6 text-midnight-300" />
        </div>
      )}
    </div>
  );
}
