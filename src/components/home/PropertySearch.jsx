import { MapPin, Search, SlidersHorizontal } from 'lucide-react';

const searchFields = [
  { label: 'Where would you like to live?', value: 'Bengaluru', icon: MapPin },
  { label: 'Looking to', value: 'Buy a home' },
  { label: 'Property type', value: 'Any type' },
];

export function PropertySearch() {
  return (
    <section id="search" className="relative z-10 -mt-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-slate-200 bg-white/95 p-6 shadow-2xl shadow-slate-950/10 backdrop-blur dark:border-slate-800 dark:bg-slate-900/95 sm:p-8">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_.85fr] lg:items-center">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-600">Smart search</p>
            <h2 className="text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-4xl">Find the right Bengaluru area fast.</h2>
            <p className="max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-400">Preview search preferences and get started with property options that match your needs.</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {searchFields.map(({ label, value, icon: Icon }) => (
                <div key={label} className="rounded-3xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950/95">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">{label}</p>
                  <p className="mt-2 flex items-center gap-2 text-sm font-bold text-slate-950 dark:text-white">
                    {Icon && <Icon size={16} className="text-brand-600" />}
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6 shadow-lg shadow-slate-950/5 dark:border-slate-800 dark:bg-slate-950/95">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Start browsing</p>
            <h3 className="mt-3 text-3xl font-black text-slate-950 dark:text-white">Your next home search begins here.</h3>
            <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">Use the sample filters to imagine the kinds of properties you care about. Your search can still be as flexible as you want.</p>
            <button type="button" className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 px-6 py-3.5 text-sm font-extrabold text-white transition hover:bg-brand-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 dark:bg-brand-600 dark:hover:bg-brand-500">
              <Search size={18} /> Search properties
            </button>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-200 pt-4 text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <span>Discover homes with context, not clutter.</span>
            <button type="button" className="inline-flex items-center gap-2 text-brand-700 transition hover:text-brand-800 dark:text-brand-300">
              <SlidersHorizontal size={16} /> More filters
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function SearchField({ label, value, icon: Icon, className = '' }) {
  return (
    <label className={`block rounded-xl border border-slate-200 px-4 py-3 transition focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-100 dark:border-slate-700 dark:focus-within:ring-brand-900 ${className}`}>
      <span className="text-xs font-bold text-slate-500 dark:text-slate-400">{label}</span>
      <span className="mt-1 flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
        {Icon && <Icon size={16} className="text-brand-600" />}
        {value}
      </span>
    </label>
  );
}
