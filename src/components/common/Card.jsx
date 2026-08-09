export function Card({ children, className = '', title, description, ...props }) {
  return (
    <section
      className={`rounded-xl border border-slate-200 bg-white p-6 shadow-card dark:border-slate-800 dark:bg-slate-900 ${className}`}
      {...props}
    >
      {(title || description) && (
        <header className="mb-4">
          {title && <h2 className="text-lg font-semibold text-slate-900 dark:text-white">{title}</h2>}
          {description && <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{description}</p>}
        </header>
      )}
      {children}
    </section>
  );
}
