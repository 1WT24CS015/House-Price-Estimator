import { useEffect } from 'react';

const variantClasses = {
  success: 'border-emerald-200 bg-emerald-50 text-emerald-900',
  error: 'border-red-200 bg-red-50 text-red-900',
  warning: 'border-amber-200 bg-amber-50 text-amber-900',
  info: 'border-sky-200 bg-sky-50 text-sky-900',
};

function ToastItem({ toast, onDismiss }) {
  useEffect(() => {
    if (toast.duration <= 0) return undefined;
    const timer = window.setTimeout(() => onDismiss(toast.id), toast.duration);
    return () => window.clearTimeout(timer);
  }, [onDismiss, toast.duration, toast.id]);

  return (
    <div role="status" className={`flex w-full items-start gap-3 rounded-lg border p-4 shadow-lg ${variantClasses[toast.variant] ?? variantClasses.info}`}>
      <p className="flex-1 text-sm font-medium">{toast.message}</p>
      <button type="button" onClick={() => onDismiss(toast.id)} className="rounded p-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-current" aria-label="Dismiss notification">
        <span aria-hidden="true">×</span>
      </button>
    </div>
  );
}

export function ToastNotification({ toasts, onDismiss }) {
  return (
    <div className="pointer-events-none fixed inset-x-4 bottom-4 z-50 mx-auto flex max-w-md flex-col gap-3" aria-live="polite" aria-atomic="true">
      {toasts.map((toast) => (
        <div className="pointer-events-auto" key={toast.id}>
          <ToastItem toast={toast} onDismiss={onDismiss} />
        </div>
      ))}
    </div>
  );
}
