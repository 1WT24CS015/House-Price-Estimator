import { forwardRef } from 'react';
import { Loader } from './Loader';

const variants = {
  primary: 'bg-brand-700 text-white hover:bg-brand-800 focus-visible:ring-brand-600',
  secondary: 'bg-slate-100 text-slate-800 hover:bg-slate-200 focus-visible:ring-slate-500 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700',
  outline: 'border border-brand-700 text-brand-800 hover:bg-brand-50 focus-visible:ring-brand-600 dark:text-brand-300 dark:hover:bg-brand-950',
  danger: 'bg-red-700 text-white hover:bg-red-800 focus-visible:ring-red-600',
};

const sizes = {
  sm: 'min-h-9 px-3 text-sm',
  md: 'min-h-10 px-4 text-sm',
  lg: 'min-h-12 px-5 text-base',
};

export const Button = forwardRef(function Button(
  { children, className = '', disabled = false, loading = false, size = 'md', type = 'button', variant = 'primary', ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 dark:focus-visible:ring-offset-slate-950 ${variants[variant] ?? variants.primary} ${sizes[size] ?? sizes.md} ${className}`}
      {...props}
    >
      {loading && <Loader size="sm" label="Loading" />}
      {children}
    </button>
  );
});
