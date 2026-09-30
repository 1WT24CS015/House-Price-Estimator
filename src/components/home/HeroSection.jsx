import { motion } from 'framer-motion';
import { ArrowDownRight, MapPin, PlayCircle, Star } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-slate-950 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_12%,rgba(59,130,246,0.24),transparent_16%),radial-gradient(circle_at_85%_15%,rgba(16,185,129,0.16),transparent_18%)] opacity-90" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.72),rgba(15,23,42,0.92))]" />
      <div className="relative mx-auto grid min-h-[680px] max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.05fr_.95fr] lg:px-8 lg:py-24">
        <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.24em] text-brand-100 backdrop-blur">Bengaluru property intelligence</div>
          <h1 className="max-w-3xl text-5xl font-black tracking-[-0.055em] text-white sm:text-6xl lg:text-7xl">Find a home that <span className="text-brand-300">feels right</span>.</h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">A calmer way to explore Bengaluru real estate, built around locality context, clearer value signals, and a more confident estimate.</p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {[
              ['Local market perspective', 'Built for Bangalore neighbourhoods.'],
              ['Faster decisions', 'Instant scores for your search.'],
              ['Smart simplicity', 'Only the details that matter.'],
              ['Trusted insights', 'Clear, easy-to-read estimates.'],
            ].map(([title, subtitle]) => (
              <div key={title} className="rounded-3xl border border-white/10 bg-white/5 px-4 py-4 shadow-lg shadow-slate-950/10 backdrop-blur transition hover:border-brand-300/40 hover:bg-white/10">
                <p className="text-sm font-semibold text-brand-200">{title}</p>
                <p className="mt-2 text-sm leading-6 text-slate-300">{subtitle}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a href="#search" className="inline-flex items-center gap-2 rounded-full bg-brand-400 px-6 py-3 text-sm font-bold text-slate-950 shadow-xl shadow-brand-500/25 transition hover:-translate-y-0.5 hover:bg-brand-300">Explore homes</a>
            <a href="#why-us" className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:border-brand-300/40 hover:text-brand-200">Why EstateIQ AI</a>
          </div>

          <div className="mt-12 flex items-center gap-3 text-sm text-slate-300">
            <div className="flex -space-x-2">
              {['A', 'R', 'M'].map((initial, index) => (
                <span key={initial} className={`grid h-9 w-9 place-items-center rounded-full border-2 border-white/15 text-xs font-bold text-white ${['bg-rose-500', 'bg-amber-500', 'bg-brand-600'][index]}`}>{initial}</span>
              ))}
            </div>
            <span className="inline-flex items-center gap-1"><Star className="text-amber-400" size={14} />Trusted by Bengaluru home seekers</span>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.15 }} className="relative mx-auto w-full max-w-lg">
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/90 p-4 shadow-2xl shadow-black/40 backdrop-blur-sm">
            <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=85" alt="Modern sunlit living room" className="h-[420px] w-full rounded-[1.35rem] object-cover sm:h-[490px]" />
            <div className="absolute inset-x-7 bottom-7 rounded-3xl border border-white/20 bg-slate-950/90 p-5 backdrop-blur">
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-500 text-white shadow-lg shadow-brand-500/20"><MapPin size={20} /></div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-200">Explore better</p>
                  <p className="mt-1 text-sm font-semibold text-white">Your Bengaluru, your way.</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
