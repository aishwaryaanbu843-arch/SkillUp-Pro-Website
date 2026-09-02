import { useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useApp } from '../AppContext';
import { LEVELS } from '../types';
import { showToast } from '../components/Toast';
import type { SkillLevel, SkillName } from '../types';

const SKILL_OPTIONS: SkillName[] = ['Python', 'SQL', 'Power BI', 'Excel', 'JavaScript'];

export function SkillLevelPage() {
  const { navigate, setAssessment } = useApp();
  const [selectedSkill, setSelectedSkill] = useState<SkillName>('Python');
  const [selectedLevel, setSelectedLevel] = useState<SkillLevel | null>(null);

  const handleStart = () => {
    if (!selectedLevel) {
      showToast('error', 'Please select your self-declared skill level.');
      return;
    }
    setAssessment({
      skill: selectedSkill,
      selfDeclaredLevel: selectedLevel,
      answers: new Array(10).fill(-1),
      currentIndex: 0,
      completed: false,
    });
    showToast('info', `Starting ${selectedSkill} assessment...`);
    navigate('assessment');
  };

  return (
    <div className="max-w-4xl mx-auto px-5 lg:px-8 py-12">
      <div className="animate-fade-up">
        <div className="section-label mb-3">Step 3 of 3 · Self-Declared Level</div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-midnight-900 tracking-tight">
          How well do you know <span className="text-ember-500">your skills?</span>
        </h1>
        <p className="mt-3 text-lg text-midnight-500 max-w-2xl">
          Pick a skill and tell us honestly where you think you are. Your assessment will verify this level.
        </p>
      </div>

      {/* Skill picker */}
      <div className="mt-8 animate-fade-up" style={{ animationDelay: '0.08s' }}>
        <label className="block text-sm font-bold text-midnight-700 mb-3">Choose a skill to assess</label>
        <div className="flex flex-wrap gap-3">
          {SKILL_OPTIONS.map((s) => (
            <button
              key={s}
              onClick={() => setSelectedSkill(s)}
              className={`pill px-5 py-2.5 text-base transition-all ${
                selectedSkill === s
                  ? 'bg-midnight-900 text-cream-50 shadow-soft'
                  : 'bg-white text-midnight-700 border border-midnight-900/10 hover:border-midnight-900/20'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Level cards */}
      <div className="mt-10">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-sm font-bold text-midnight-700">Self-declared level</span>
          <span className="pill bg-ember-100 text-ember-700 text-xs">Your assessment will verify this</span>
        </div>
        <div className="grid sm:grid-cols-2 gap-4 stagger">
          {LEVELS.map((l, i) => {
            const isSelected = selectedLevel === l.level;
            return (
              <button
                key={l.level}
                onClick={() => setSelectedLevel(l.level)}
                className={`card p-6 text-left transition-all duration-300 hover:shadow-lift hover:-translate-y-1 ${
                  isSelected ? 'ring-2 ring-ember-400 shadow-lift' : ''
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-midnight-400">Level {i + 1}</span>
                  {isSelected && <Sparkles className="w-5 h-5 text-ember-500 animate-scale-in" />}
                </div>
                <h3 className="text-xl font-extrabold text-midnight-900 mb-1">{l.level}</h3>
                <p className="text-sm text-midnight-500 italic">"{l.tagline}"</p>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-10">
        <p className="text-sm text-midnight-500">
          {selectedSkill && selectedLevel
            ? `Ready to assess ${selectedSkill} at ${selectedLevel} level.`
            : 'Pick a skill and level to continue.'}
        </p>
        <button onClick={handleStart} disabled={!selectedLevel} className="btn-primary text-base disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0">
          Start Assessment
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
