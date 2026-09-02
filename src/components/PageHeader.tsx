import type { ReactNode } from 'react';

export function PageHeader({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
}) {
  return (
    <div className="mb-8 animate-fade-up">
      {eyebrow && <div className="section-label mb-3">{eyebrow}</div>}
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-midnight-900 tracking-tight text-balance">
        {title}
      </h1>
      {subtitle && <p className="mt-3 text-lg text-midnight-500 max-w-2xl leading-relaxed">{subtitle}</p>}
      {children}
    </div>
  );
}
