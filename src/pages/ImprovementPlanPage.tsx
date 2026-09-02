import { useState } from 'react';
import { Check, ArrowRight, Calendar, Sparkles } from 'lucide-react';
import { useApp } from '../AppContext';
import { PageHeader } from '../components/PageHeader';
import { IMPROVEMENT_PLAN } from '../mockData';
import { showToast } from '../components/Toast';

export function ImprovementPlanPage() {
  const { navigate } = useApp();
  const [weeks, setWeeks] = useState(IMPROVEMENT_PLAN);

  const toggleTask = (weekIdx: number, taskIdx: number) => {
    setWeeks((prev) =>
      prev.map((w, wi) =>
        wi === weekIdx
          ? { ...w, tasks: w.tasks.map((t, ti) => (ti === taskIdx ? `${t}${t.endsWith('✓') ? '' : ' ✓'}` : t)) }
          : w,
      ),
    );
  };

  const totalTasks = weeks.reduce((a, w) => a + w.tasks.length, 0);
  const doneTasks = weeks.reduce(
    (a, w) => a + w.tasks.filter((t) => t.endsWith('✓')).length, 0,
  );
  const progress = Math.round((doneTasks / totalTasks) * 100);

  return (
    <div className="max-w-5xl mx-auto px-5 lg:px-8 py-10">
      <PageHeader
        eyebrow="Improvement Plan"
        title="Your 4-week improvement plan"
        subtitle="A focused roadmap to close your biggest skill gaps and boost your job readiness."
      />

      {/* Overall progress */}
      <div className="card p-6 mb-8 bg-midnight-900 text-cream-50">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-ember-400" />
            <span className="font-bold">Overall Progress</span>
          </div>
          <span className="text-2xl font-extrabold text-ember-400">{progress}%</span>
        </div>
        <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-3 bg-ember-500 rounded-full transition-all duration-700"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-sm text-cream-200/60 mt-2">{doneTasks} of {totalTasks} tasks completed</p>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-midnight-100 hidden md:block" />

        <div className="space-y-6 stagger">
          {weeks.map((week, wi) => {
            const weekDone = week.tasks.filter((t) => t.endsWith('✓')).length;
            const weekPct = Math.round((weekDone / week.tasks.length) * 100);
            return (
              <div key={week.week} className="relative md:pl-16">
                {/* Node */}
                <div className="hidden md:flex absolute left-0 top-2 w-12 h-12 rounded-full bg-midnight-900 items-center justify-center z-10">
                  <Calendar className="w-5 h-5 text-ember-400" />
                </div>

                <div className="card p-6">
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-ember-600">Week {week.week}</div>
                      <h3 className="text-xl font-bold text-midnight-900 mt-0.5">{week.title}</h3>
                    </div>
                    <span className={`pill text-xs ${weekPct === 100 ? 'bg-green-100 text-green-700' : 'bg-cream-100 text-midnight-600'}`}>
                      {weekPct === 100 ? 'Complete!' : `${weekDone}/${week.tasks.length} done`}
                    </span>
                  </div>

                  <div className="mb-4">
                    <div className="w-full h-2 bg-midnight-100 rounded-full overflow-hidden">
                      <div
                        className="h-2 bg-ember-500 rounded-full transition-all duration-500"
                        style={{ width: `${weekPct}%` }}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    {week.tasks.map((task, ti) => {
                      const done = task.endsWith('✓');
                      const label = done ? task.replace(' ✓', '') : task;
                      return (
                        <button
                          key={ti}
                          onClick={() => { toggleTask(wi, ti); if (!done) showToast('success', 'Task checked off!'); }}
                          className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all ${
                            done ? 'bg-green-50' : 'bg-cream-50 hover:bg-cream-100'
                          }`}
                        >
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-all ${
                            done ? 'bg-green-500' : 'border-2 border-midnight-200'
                          }`}>
                            {done && <Check className="w-4 h-4 text-white" />}
                          </div>
                          <span className={`text-sm ${done ? 'text-midnight-400 line-through' : 'text-midnight-700 font-medium'}`}>
                            {label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex justify-center mt-10">
        <button onClick={() => navigate('jobs')} className="btn-primary text-base">
          See Job Recommendations
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
