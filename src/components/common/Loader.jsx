export function Loader({ className = '', label = 'Loading', size = 'md' }) {
  const sizeClasses = { sm: 'h-4 w-4 border-2', md: 'h-6 w-6 border-[3px]', lg: 'h-10 w-10 border-4' };
  return (
    <span className={`inline-flex items-center justify-center ${className}`} role="status" aria-label={label}>
      <span className={`animate-spin rounded-full border-current border-r-transparent ${sizeClasses[size] ?? sizeClasses.md}`} />
    </span>
  );
}
