import { useState } from 'react';
import { ArrowRight, GraduationCap, Calendar } from 'lucide-react';
import { useApp } from '../AppContext';
import { showToast } from '../components/Toast';

export function ProfileSetupPage() {
  const { navigate, user, setUser } = useApp();
  const [education, setEducation] = useState(user?.education || '');
  const [degree, setDegree] = useState(user?.degree || '');
  const [graduationYear, setGraduationYear] = useState(user?.graduationYear || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!education || !degree || !graduationYear) {
      showToast('error', 'Please complete all fields.');
      return;
    }
    setUser({ ...(user as NonNullable<typeof user>), education, degree, graduationYear });
    showToast('success', 'Profile saved!');
    navigate('career-selection');
  };

  return (
    <div className="max-w-3xl mx-auto px-5 lg:px-8 py-12">
      <div className="animate-fade-up">
        <div className="section-label mb-3">Step 1 of 3 · Profile</div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-midnight-900 tracking-tight">
          Let's set up your profile
        </h1>
        <p className="mt-3 text-lg text-midnight-500">
          Tell us about your education so we can personalize your experience.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="card p-8 mt-8 space-y-6 animate-fade-up" style={{ animationDelay: '0.1s' }}>
        <div>
          <label className="block text-sm font-semibold text-midnight-700 mb-2">Name</label>
          <input value={user?.name ?? ''} disabled className="input-field opacity-60" />
        </div>

        <div>
          <label className="block text-sm font-semibold text-midnight-700 mb-2">Education</label>
          <div className="relative">
            <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-midnight-400" />
            <select
              value={education}
              onChange={(e) => setEducation(e.target.value)}
              className="input-field pl-12 appearance-none"
            >
              <option value="">Select your education level</option>
              <option value="High School">High School</option>
              <option value="University">University</option>
              <option value="Bootcamp">Coding Bootcamp</option>
              <option value="Self-taught">Self-taught</option>
              <option value="Graduate School">Graduate School</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-midnight-700 mb-2">Degree / Field of study</label>
          <input
            type="text"
            value={degree}
            onChange={(e) => setDegree(e.target.value)}
            placeholder="e.g. B.S. Computer Science"
            className="input-field"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-midnight-700 mb-2">Graduation year</label>
          <div className="relative">
            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-midnight-400" />
            <input
              type="text"
              value={graduationYear}
              onChange={(e) => setGraduationYear(e.target.value)}
              placeholder="e.g. 2026"
              className="input-field pl-12"
            />
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button type="submit" className="btn-primary text-base">
            Continue
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}
