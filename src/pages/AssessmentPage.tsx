import { useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, Circle, Trophy } from 'lucide-react';
import { useApp } from '../AppContext';
import { ASSESSMENT_QUESTIONS } from '../mockData';
import { ProgressBar } from '../components/ProgressBar';
import { showToast } from '../components/Toast';
import type { SkillLevel, SkillResult } from '../types';
import { LEVEL_ORDER } from '../types';

function levelFromScore(score: number): SkillLevel {
  if (score >= 90) return 'Advanced';
  if (score >= 70) return 'Job Ready';
  if (score >= 50) return 'Intermediate';
  return 'Beginner';
}

export function AssessmentPage() {
  const { assessment, setAssessment, navigate, addSkillResult } = useApp();
  const [submitting, setSubmitting] = useState(false);

  if (!assessment.skill || !assessment.selfDeclaredLevel) {
    return (
      <div className="max-w-2xl mx-auto px-5 py-20 text-center">
        <p className="text-midnight-500 mb-4">No assessment in progress.</p>
        <button onClick={() => navigate('skill-level')} className="btn-primary">Choose a skill</button>
      </div>
    );
  }

  const questions = ASSESSMENT_QUESTIONS[assessment.skill];
  const idx = assessment.currentIndex;
  const total = questions.length;
  const current = questions[idx];
  const answers = [...assessment.answers];

  const selectAnswer = (optionIdx: number) => {
    answers[idx] = optionIdx;
    setAssessment({ ...assessment, answers });
  };

  const goNext = () => {
    if (idx < total - 1) setAssessment({ ...assessment, currentIndex: idx + 1 });
  };
  const goPrev = () => {
    if (idx > 0) setAssessment({ ...assessment, currentIndex: idx - 1 });
  };

  const handleSubmit = () => {
    setSubmitting(true);
    const unanswered = answers.filter((a) => a === -1).length;
    if (unanswered > 0) {
      showToast('warning', `${unanswered} question(s) unanswered. Submitting anyway.`);
    }
    const correct = answers.filter((a, i) => a === questions[i].correctIndex).length;
    const score = Math.round((correct / total) * 100);
    const verified = levelFromScore(score);
    const result: SkillResult = {
      skill: assessment.skill,
      selfDeclared: assessment.selfDeclaredLevel,
      verified,
      score,
    };
    addSkillResult(result);
    setAssessment({ ...assessment, completed: true });
    setTimeout(() => {
      navigate('assessment-result');
    }, 600);
  };

  const answeredCount = answers.filter((a) => a !== -1).length;

  return (
    <div className="max-w-3xl mx-auto px-5 lg:px-8 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="section-label mb-1">{assessment.skill} Assessment</div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-midnight-900">
            Question {idx + 1} of {total}
          </h1>
        </div>
        <div className="text-right">
          <div className="text-sm text-midnight-400 font-semibold">Self-declared</div>
          <div className="text-lg font-bold text-ember-600">{assessment.selfDeclaredLevel}</div>
        </div>
      </div>

      {/* Progress */}
      <div className="mb-8">
        <ProgressBar value={answeredCount} max={total} color="ember" height="h-3" />
        <div className="flex justify-between mt-2 text-sm text-midnight-400">
          <span>{answeredCount} answered</span>
          <span>{Math.round(((idx + 1) / total) * 100)}% complete</span>
        </div>
      </div>

      {/* Question card */}
      <div key={idx} className="card p-8 animate-fade-up">
        <div className="flex items-start gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-midnight-900 flex items-center justify-center shrink-0">
            <span className="text-ember-400 font-extrabold">{idx + 1}</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-midnight-900 leading-snug pt-1">
            {current.question}
          </h2>
        </div>

        <div className="space-y-3">
          {current.options.map((opt, i) => {
            const isSelected = answers[idx] === i;
            return (
              <button
                key={i}
                onClick={() => selectAnswer(i)}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all duration-200 ${
                  isSelected
                    ? 'border-ember-400 bg-ember-50 shadow-soft'
                    : 'border-midnight-900/8 bg-white hover:border-midnight-900/20 hover:bg-cream-50'
                }`}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-all ${
                  isSelected ? 'bg-ember-500' : 'border-2 border-midnight-200'
                }`}>
                  {isSelected ? <CheckCircle2 className="w-5 h-5 text-white" /> : <Circle className="w-3 h-3 text-transparent" />}
                </div>
                <span className={`font-medium ${isSelected ? 'text-midnight-900' : 'text-midnight-700'}`}>
                  {opt}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Nav buttons */}
      <div className="flex items-center justify-between mt-6">
        <button
          onClick={goPrev}
          disabled={idx === 0}
          className="btn-ghost disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0"
        >
          <ArrowLeft className="w-5 h-5" />
          Previous
        </button>

        {idx < total - 1 ? (
          <button onClick={goNext} className="btn-primary">
            Next
            <ArrowRight className="w-5 h-5" />
          </button>
        ) : (
          <button onClick={handleSubmit} disabled={submitting} className="btn-crimson">
            <Trophy className="w-5 h-5" />
            {submitting ? 'Submitting...' : 'Submit Assessment'}
          </button>
        )}
      </div>

      {/* Question dots */}
      <div className="flex justify-center gap-2 mt-8">
        {questions.map((_, i) => (
          <button
            key={i}
            onClick={() => setAssessment({ ...assessment, currentIndex: i })}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              i === idx ? 'bg-ember-500 w-6' : answers[i] !== -1 ? 'bg-ember-300' : 'bg-midnight-200'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
