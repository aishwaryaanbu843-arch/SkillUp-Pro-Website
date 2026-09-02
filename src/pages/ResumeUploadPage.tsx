import { useState } from 'react';
import { Upload, FileText, ArrowRight, Sparkles } from 'lucide-react';
import { useApp } from '../AppContext';
import { PageHeader } from '../components/PageHeader';
import { DEFAULT_RESUME_CLAIMS, SAMPLE_RESUME_TEXT } from '../mockData';
import { showToast } from '../components/Toast';
import type { ResumeClaim, SkillLevel } from '../types';

const LEVELS: SkillLevel[] = ['Beginner', 'Intermediate', 'Job Ready', 'Advanced'];

export function ResumeUploadPage() {
  const { navigate, setResumeClaims } = useApp();
  const [mode, setMode] = useState<'upload' | 'paste'>('paste');
  const [resumeText, setResumeText] = useState('');
  const [fileName, setFileName] = useState<string | null>(null);

  const handleAnalyze = () => {
    if (mode === 'upload' && !fileName) {
      showToast('error', 'Please upload a resume file first.');
      return;
    }
    if (mode === 'paste' && !resumeText.trim()) {
      showToast('error', 'Please paste your resume text first.');
      return;
    }
    setResumeClaims(DEFAULT_RESUME_CLAIMS);
    showToast('success', 'Resume analyzed! Extracting skill claims...');
    navigate('resume-check');
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      showToast('info', `Loaded: ${file.name}`);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-5 lg:px-8 py-10">
      <PageHeader
        eyebrow="Resume Reality Check"
        title="Upload or paste your resume"
        subtitle="We'll extract the skills you've claimed and compare them against your verified assessment results."
      />

      {/* Mode toggle */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setMode('paste')}
          className={`pill px-5 py-2.5 ${mode === 'paste' ? 'bg-midnight-900 text-cream-50' : 'bg-white border border-midnight-200 text-midnight-600'}`}
        >
          <FileText className="w-4 h-4" /> Paste Text
        </button>
        <button
          onClick={() => setMode('upload')}
          className={`pill px-5 py-2.5 ${mode === 'upload' ? 'bg-midnight-900 text-cream-50' : 'bg-white border border-midnight-200 text-midnight-600'}`}
        >
          <Upload className="w-4 h-4" /> Upload File
        </button>
      </div>

      {mode === 'paste' ? (
        <div className="card p-6 animate-fade-up">
          <textarea
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            placeholder="Paste your resume text here..."
            className="w-full h-64 rounded-2xl border border-midnight-900/10 bg-cream-50 p-4 text-midnight-900 placeholder:text-midnight-400 outline-none resize-none focus:border-ember-400 focus:ring-4 focus:ring-ember-400/15 transition-all font-mono text-sm"
          />
          <button
            onClick={() => { setResumeText(SAMPLE_RESUME_TEXT); showToast('info', 'Sample resume loaded.'); }}
            className="text-sm font-semibold text-ember-600 hover:text-ember-700 mt-3 flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4" /> Use sample resume
          </button>
        </div>
      ) : (
        <div className="card p-8 animate-fade-up">
          <label className="block">
            <div className="border-2 border-dashed border-midnight-200 rounded-3xl p-12 text-center hover:border-ember-400 hover:bg-ember-50/30 transition-all duration-300 cursor-pointer">
              {fileName ? (
                <div className="flex flex-col items-center gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-ember-100 flex items-center justify-center">
                    <FileText className="w-7 h-7 text-ember-600" />
                  </div>
                  <span className="font-semibold text-midnight-900">{fileName}</span>
                  <span className="text-sm text-green-600">Ready to analyze</span>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-midnight-100 flex items-center justify-center">
                    <Upload className="w-7 h-7 text-midnight-500" />
                  </div>
                  <span className="font-semibold text-midnight-700">Click to upload your resume</span>
                  <span className="text-sm text-midnight-400">PDF, DOCX, or TXT up to 5MB</span>
                </div>
              )}
              <input type="file" accept=".pdf,.docx,.txt" onChange={handleFile} className="hidden" />
            </div>
          </label>
        </div>
      )}

      {/* Preview extracted claims */}
      <div className="mt-6 card p-6">
        <h3 className="text-sm font-bold text-midnight-700 mb-3">Skills we'll extract (preview)</h3>
        <div className="flex flex-wrap gap-2">
          {DEFAULT_RESUME_CLAIMS.map((c) => (
            <span key={c.skill} className="pill bg-cream-100 text-midnight-700 text-sm">
              {c.skill} — {c.claimedLevel}
            </span>
          ))}
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <button onClick={handleAnalyze} className="btn-primary text-base">
          Analyze Resume
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
