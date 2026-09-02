import { useState } from 'react';
import { Briefcase, ArrowRight, Sparkles } from 'lucide-react';
import { useApp } from '../AppContext';
import { PageHeader } from '../components/PageHeader';
import { SAMPLE_JOB_DESCRIPTION } from '../mockData';
import { showToast } from '../components/Toast';

export function JobInputPage() {
  const { navigate, jobDescription, setJobDescription } = useApp();
  const [text, setText] = useState(jobDescription);

  const handleAnalyze = () => {
    if (!text.trim()) {
      showToast('error', 'Please paste a job description first.');
      return;
    }
    setJobDescription(text);
    showToast('success', 'Analyzing job requirements...');
    navigate('job-match');
  };

  return (
    <div className="max-w-3xl mx-auto px-5 lg:px-8 py-10">
      <PageHeader
        eyebrow="Job Matching"
        title="Paste a job description"
        subtitle="We'll compare the required skills against your verified skills and calculate your job readiness score."
      />

      <div className="card p-6 animate-fade-up">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste the job description here..."
          className="w-full h-72 rounded-2xl border border-midnight-900/10 bg-cream-50 p-4 text-midnight-900 placeholder:text-midnight-400 outline-none resize-none focus:border-ember-400 focus:ring-4 focus:ring-ember-400/15 transition-all text-sm leading-relaxed"
        />
        <button
          onClick={() => { setText(SAMPLE_JOB_DESCRIPTION); showToast('info', 'Sample job description loaded.'); }}
          className="text-sm font-semibold text-ember-600 hover:text-ember-700 mt-3 flex items-center gap-1.5"
        >
          <Sparkles className="w-4 h-4" /> Use sample: Junior Data Analyst
        </button>
      </div>

      <div className="flex justify-end mt-6">
        <button onClick={handleAnalyze} className="btn-primary text-base">
          <Briefcase className="w-5 h-5" />
          Calculate Job Match
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
