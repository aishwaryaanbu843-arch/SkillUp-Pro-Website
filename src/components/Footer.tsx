export function Footer() {
  return (
    <footer className="mt-20 border-t border-midnight-900/5 bg-cream-100">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-midnight-900 flex items-center justify-center">
              <span className="text-ember-400 font-extrabold">S</span>
            </div>
            <span className="font-extrabold text-midnight-900">
              SkillUp<span className="text-ember-500"> Pro</span>
            </span>
          </div>
          <p className="text-sm text-midnight-400">
            Don't just claim your skills. Prove them.
          </p>
          <p className="text-xs text-midnight-400">
            © 2026 SkillUp Pro · Interactive Prototype
          </p>
        </div>
      </div>
    </footer>
  );
}
