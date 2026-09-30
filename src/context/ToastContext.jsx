import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { ToastNotification } from '../components/common/ToastNotification';

const ToastContext = createContext(null);
const DEFAULT_DURATION = 5_000;

function createToastId() {
  return globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const dismissToast = useCallback((id) => {
    setToasts((currentToasts) => currentToasts.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback(({ message, variant = 'info', duration = DEFAULT_DURATION }) => {
    if (!message?.trim()) throw new Error('A toast message is required.');
    const id = createToastId();
    setToasts((currentToasts) => [...currentToasts, { id, message, variant, duration }]);
    return id;
  }, []);

  const value = useMemo(() => ({ showToast, dismissToast }), [dismissToast, showToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastNotification toasts={toasts} onDismiss={dismissToast} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within ToastProvider.');
  return context;
}
