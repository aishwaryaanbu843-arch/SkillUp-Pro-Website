import { useEffect, useState } from 'react';
import { CheckCircle2, XCircle, AlertTriangle, Info } from 'lucide-react';

type ToastType = 'success' | 'error' | 'warning' | 'info';
interface ToastMsg { id: number; type: ToastType; message: string; }

let toastId = 0;
const listeners = new Set<(t: ToastMsg) => void>();

export function showToast(type: ToastType, message: string) {
  const t: ToastMsg = { id: ++toastId, type, message };
  listeners.forEach((l) => l(t));
}

const icons = {
  success: CheckCircle2,
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
};

const styles = {
  success: 'bg-midnight-900 text-cream-50 border-ember-400',
  error: 'bg-crimson-700 text-white border-crimson-400',
  warning: 'bg-ember-500 text-white border-ember-300',
  info: 'bg-midnight-800 text-cream-50 border-midnight-500',
};

export function ToastContainer() {
  const [toasts, setToasts] = useState<ToastMsg[]>([]);

  useEffect(() => {
    const handler = (t: ToastMsg) => {
      setToasts((prev) => [...prev, t]);
      setTimeout(() => setToasts((prev) => prev.filter((p) => p.id !== t.id)), 3500);
    };
    listeners.add(handler);
    return () => { listeners.delete(handler); };
  }, []);

  return (
    <div className="fixed top-6 right-6 z-[100] flex flex-col gap-3 pointer-events-none">
      {toasts.map((t) => {
        const Icon = icons[t.type];
        return (
          <div
            key={t.id}
            className={`flex items-center gap-3 rounded-2xl border-l-4 px-5 py-4 shadow-lift animate-scale-in pointer-events-auto max-w-sm ${styles[t.type]}`}
          >
            <Icon className="w-5 h-5 shrink-0" />
            <span className="text-sm font-semibold">{t.message}</span>
          </div>
        );
      })}
    </div>
  );
}
