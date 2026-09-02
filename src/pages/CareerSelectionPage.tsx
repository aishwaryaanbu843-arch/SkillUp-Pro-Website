import { useState } from 'react';
import * as Icons from 'lucide-react';
import { ArrowRight, Check } from 'lucide-react';
import { useApp } from '../AppContext';
import { CAREER_CATEGORIES } from '../mockData';
import { showToast } from '../components/Toast';

export function CareerSelectionPage() {
  const { navigate, user, setUser } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(user?.careerCategory || null);
  const [selectedRole, setSelectedRole] = useState<string | null>(user?.careerRole || null);

  const category = CAREER_CATEGORIES.find((c) => c.id === selectedCategory);

  const handleContinue = () => {
    if (!category || !selectedRole) {
      showToast('error', 'Please pick a career path and a role.');
      return;
    }
    setUser({
      ...(user as NonNullable<typeof user>),
      careerCategory: category.title,
      careerRole: selectedRole,
    });
    showToast('success', `Career path: ${category.title} → ${selectedRole}`);
    navigate('skill-level');
  };

  return (
    <div className="max-w-6xl mx-auto px-5 lg:px-8 py-12">
      <div className="animate-fade-up">
        <div className="section-label mb-3">Step 2 of 3 · Career Path</div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-midnight-900 tracking-tight">
          Choose your career path
        </h1>
        <p className="mt-3 text-lg text-midnight-500 max-w-2xl">
          Pick the field you're aiming for. We'll tailor your assessments and job matches to this path.
        </p>
      </div>

      {/* Category cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-8 stagger">
        {CAREER_CATEGORIES.map((cat) => {
          const Icon = (Icons as Record<string, Icons.LucideIcon>)[cat.icon] ?? Icons.Compass;
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => { setSelectedCategory(cat.id); setSelectedRole(null); }}
              className={`card p-6 text-left transition-all duration-300 hover:shadow-lift hover:-translate-y-1 ${
                isSelected ? 'ring-2 ring-ember-400 shadow-lift' : ''
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                  cat.accent === 'ember' ? 'bg-ember-100 text-ember-600' : 'bg-crimson-100 text-crimson-600'
                }`}>
                  <Icon className="w-6 h-6" />
                </div>
                {isSelected && (
                  <div className="w-6 h-6 rounded-full bg-ember-500 flex items-center justify-center animate-scale-in">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
              <h3 className="text-lg font-bold text-midnight-900 mb-1">{cat.title}</h3>
              <p className="text-sm text-midnight-500 leading-relaxed">{cat.description}</p>
            </button>
          );
        })}
      </div>

      {/* Role selection */}
      {category && (
        <div className="mt-8 animate-fade-up">
          <h2 className="text-xl font-bold text-midnight-900 mb-4">
            Pick a role in <span className="text-ember-600">{category.title}</span>
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {category.roles.map((role) => {
              const isSelected = selectedRole === role.title;
              return (
                <button
                  key={role.id}
                  onClick={() => setSelectedRole(role.title)}
                  className={`card p-5 text-left transition-all duration-300 hover:shadow-lift hover:-translate-y-0.5 ${
                    isSelected ? 'ring-2 ring-ember-400 shadow-lift bg-ember-50/40' : ''
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-bold text-midnight-900">{role.title}</h4>
                    {isSelected && <Check className="w-5 h-5 text-ember-500" />}
                  </div>
                  <p className="text-sm text-midnight-500">{role.description}</p>
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="flex justify-end mt-10">
        <button onClick={handleContinue} disabled={!selectedCategory || !selectedRole} className="btn-primary text-base disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0">
          Continue
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
