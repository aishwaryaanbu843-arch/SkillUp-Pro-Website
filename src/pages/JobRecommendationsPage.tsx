import { MapPin, ArrowRight, CheckCircle2, XCircle, Briefcase, DollarSign } from 'lucide-react';
import { useApp } from '../AppContext';
import { PageHeader } from '../components/PageHeader';
import { JOB_RECOMMENDATIONS } from '../mockData';
import { showToast } from '../components/Toast';

export function JobRecommendationsPage() {
  const { navigate } = useApp();

  const matchColor = (pct: number) => {
    if (pct >= 80) return { ring: 'text-green-600', bg: 'bg-green-100', bar: 'bg-green-500' };
    if (pct >= 60) return { ring: 'text-ember-600', bg: 'bg-ember-100', bar: 'bg-ember-500' };
    return { ring: 'text-crimson-600', bg: 'bg-crimson-100', bar: 'bg-crimson-500' };
  };

  return (
    <div className="max-w-6xl mx-auto px-5 lg:px-8 py-10">
      <PageHeader
        eyebrow="Job Recommendations"
        title="Jobs matched to your verified skills"
        subtitle="These roles are ranked by how well your verified skills align with their requirements."
      />

      <div className="grid md:grid-cols-2 gap-5 stagger">
        {JOB_RECOMMENDATIONS.map((job) => {
          const c = matchColor(job.matchPercent);
          return (
            <div key={job.id} className="card p-6 hover:shadow-lift hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-midnight-900">{job.title}</h3>
                  <div className="flex items-center gap-3 text-sm text-midnight-500 mt-1">
                    <span className="font-medium">{job.company}</span>
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {job.location}</span>
                  </div>
                </div>
                <div className={`text-right shrink-0 ${c.ring}`}>
                  <div className="text-3xl font-extrabold">{job.matchPercent}%</div>
                  <div className="text-xs font-bold uppercase tracking-wide">Match</div>
                </div>
              </div>

              {/* Match bar */}
              <div className="w-full h-2 bg-midnight-100 rounded-full overflow-hidden mb-5">
                <div className={`h-2 ${c.bar} rounded-full transition-all duration-700`} style={{ width: `${job.matchPercent}%` }} />
              </div>

              {/* Matching skills */}
              <div className="mb-3">
                <div className="text-xs font-bold uppercase tracking-wider text-green-600 mb-1.5">Matching Skills</div>
                <div className="flex flex-wrap gap-1.5">
                  {job.matchingSkills.map((s) => (
                    <span key={s} className="pill bg-green-50 text-green-700 text-xs">
                      <CheckCircle2 className="w-3.5 h-3.5" /> {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Missing skills */}
              {job.missingSkills.length > 0 && (
                <div className="mb-4">
                  <div className="text-xs font-bold uppercase tracking-wider text-crimson-600 mb-1.5">Missing Skills</div>
                  <div className="flex flex-wrap gap-1.5">
                    {job.missingSkills.map((s) => (
                      <span key={s} className="pill bg-crimson-50 text-crimson-600 text-xs">
                        <XCircle className="w-3.5 h-3.5" /> {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-midnight-100">
                <div className="flex items-center gap-3 text-sm text-midnight-500">
                  <span className="flex items-center gap-1 font-medium"><DollarSign className="w-4 h-4" /> {job.salary}</span>
                  <span>·</span>
                  <span>{job.posted}</span>
                </div>
              </div>

              <div className={`mt-4 p-3 rounded-2xl text-sm font-semibold ${
                job.readiness === 'Ready to apply' ? 'bg-green-50 text-green-700' :
                job.readiness === 'Good match — apply while improving' ? 'bg-ember-50 text-ember-700' :
                'bg-crimson-50 text-crimson-700'
              }`}>
                {job.readiness}
              </div>

              <button
                onClick={() => showToast('info', 'Application saved! (Prototype demo)')}
                className="btn-dark w-full mt-4 text-sm py-3"
              >
                <Briefcase className="w-4 h-4" />
                Apply Now
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center mt-10">
        <button onClick={() => navigate('improvement')} className="btn-ghost text-base">
          View Your Improvement Plan
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
