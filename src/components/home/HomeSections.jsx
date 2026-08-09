import { motion } from 'framer-motion';
import { ChevronDown, ChevronRight, Quote } from 'lucide-react';
import { useState } from 'react';
import { SectionHeading } from '../common/SectionHeading';
import { faqs, features, reasons, services, statistics, testimonials } from '../../data/homeContent';

const reveal = { hidden: { opacity: 0, y: 20 }, visible: (index) => ({ opacity: 1, y: 0, transition: { delay: index * 0.08, duration: 0.45 } }) };

export function FeatureSection() {
  return (
    <section id="explore" className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-brand-500/10 blur-3xl" />
      <div className="mx-auto max-w-7xl relative">
        <SectionHeading eyebrow="A better starting point" title="Everything you need to see the bigger picture." description="No noise. Just a more useful way to understand the homes and places you are considering." />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {features.map(({ icon: Icon, title, text }, index) => (
            <motion.article key={title} custom={index} variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="group flex min-h-[320px] flex-col rounded-[2rem] border border-slate-200 bg-white p-8 shadow-card transition hover:-translate-y-1 hover:shadow-2xl dark:border-slate-800 dark:bg-slate-900">
              <span className="grid h-14 w-14 place-items-center rounded-3xl bg-brand-50 text-brand-700 transition group-hover:bg-brand-700 group-hover:text-white dark:bg-brand-950 dark:text-brand-300">
                <Icon size={24} />
              </span>
              <h3 className="mt-7 text-2xl font-extrabold text-slate-950 dark:text-white">{title}</h3>
              <p className="mt-4 flex-1 leading-7 text-slate-600 dark:text-slate-300">{text}</p>
              <div className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-brand-700 transition group-hover:text-brand-800">
                Learn more
                <ChevronRight size={18} />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ServicesSection() {
  return (
    <section id="services" className="bg-slate-950 px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="Designed around you" title="A more considered property experience." description="Understand what matters in every search stage — from discovery to the final move." />

        <div className="mt-14 grid gap-8 lg:grid-cols-[.95fr_1.05fr] lg:items-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/95 p-6 shadow-2xl shadow-black/20 sm:p-8">
            <div className="absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.24),transparent_35%)]" />
            <div className="relative">
              <p className="text-xs font-semibold uppercase tracking-[0.26em] text-brand-300">Insightful search</p>
              <h3 className="mt-4 text-4xl font-black tracking-tight text-white">Turn property details into a smarter search.</h3>
              <p className="mt-5 max-w-xl text-base leading-7 text-slate-300">EstateIQ AI helps you feel confident at every step by making local value, home-fit, and next actions easier to compare.</p>

              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5 text-white shadow-lg shadow-slate-950/10">
                  <p className="text-sm font-bold uppercase tracking-[0.24em] text-brand-200">Find better matches</p>
                  <p className="mt-3 text-sm leading-6 text-slate-300">See which homes align with both your budget and lifestyle.</p>
                </div>
                <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5 text-white shadow-lg shadow-slate-950/10">
                  <p className="text-sm font-bold uppercase tracking-[0.24em] text-brand-200">Keep the context</p>
                  <p className="mt-3 text-sm leading-6 text-slate-300">Compare estimates alongside local market signals and practical details.</p>
                </div>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                {services.map(({ icon: Icon, title, text, accent }, index) => (
                  <motion.article key={title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08, duration: 0.45 }} className="rounded-[1.75rem] border border-white/10 bg-slate-950/90 p-6 shadow-lg shadow-black/10">
                    <div className={`inline-flex h-12 w-12 items-center justify-center rounded-3xl ${accent}`}>
                      <Icon size={20} />
                    </div>
                    <h4 className="mt-6 text-xl font-extrabold text-white">{title}</h4>
                    <p className="mt-3 text-sm leading-6 text-slate-300">{text}</p>
                  </motion.article>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="rounded-[2rem] bg-white p-6 shadow-2xl shadow-slate-950/10 dark:bg-slate-900 sm:p-8">
            <div className="overflow-hidden rounded-[1.75rem] bg-slate-950 text-white shadow-xl shadow-slate-950/20">
              <img src="https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80" alt="Interior with natural light and stylish living space" className="h-96 w-full object-cover" />
              <div className="space-y-3 p-6">
                <span className="inline-flex rounded-full bg-brand-100/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-brand-200">Featured perspective</span>
                <h3 className="text-3xl font-black text-white">A clearer picture for every stage.</h3>
                <p className="text-sm leading-6 text-slate-300">Property planning is easier when you can see the home, the value, and the next move in one place.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function WhyChooseSection() {
  return (
    <section id="why-us" className="relative px-4 py-24 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.16),transparent_50%)]" />
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
        <div className="relative overflow-hidden rounded-[2rem] bg-slate-950 text-white shadow-2xl shadow-black/20">
          <img src="https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1100&q=85" alt="Contemporary home surrounded by greenery" className="h-[520px] w-full object-cover" />
          <div className="absolute bottom-8 left-8 right-8 rounded-[2rem] border border-white/10 bg-slate-950/85 p-6 backdrop-blur-md shadow-2xl shadow-black/20">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-300">Built for clarity</p>
            <h3 className="mt-3 text-3xl font-black text-white">A thoughtful property experience.</h3>
            <p className="mt-3 text-sm leading-6 text-slate-300">More perspective, less pressure, and a clearer view of what matters most.</p>
          </div>
        </div>

        <div>
          <SectionHeading align="left" eyebrow="Why choose EstateIQ AI" title="More perspective. Less pressure." description="Property decisions are personal. We make room for the details, the questions, and the confidence you need to move forward." />
          <div className="mt-8 grid gap-4">
            {reasons.map(({ icon: Icon, title, text }, index) => (
              <motion.div key={title} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08, duration: 0.45 }} className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-card dark:border-slate-800 dark:bg-slate-950">
                <div className="flex items-start gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-3xl bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300">
                    <Icon size={20} />
                  </span>
                  <div>
                    <h3 className="text-xl font-extrabold text-slate-950 dark:text-white">{title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{text}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function StatisticsSection() { return <section className="bg-slate-950 px-4 py-16 sm:px-6 lg:px-8"><div className="mx-auto grid max-w-7xl gap-8 sm:grid-cols-2 lg:grid-cols-4">{statistics.map(({ value, label }) => <div key={label} className="border-l border-brand-400/40 pl-5"><p className="text-4xl font-black tracking-tight text-white">{value}</p><p className="mt-2 text-sm font-medium text-slate-400">{label}</p></div>)}</div></section>; }

export function TestimonialsSection() { return <section id="stories" className="bg-brand-50 px-4 py-24 dark:bg-brand-950/30 sm:px-6 lg:px-8"><div className="mx-auto max-w-7xl"><SectionHeading eyebrow="Real moves, real people" title="Stories from the search." /><div className="mt-12 grid gap-5 lg:grid-cols-3">{testimonials.map(({ quote, name, detail, initials }, index) => <motion.figure key={name} custom={index} variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="rounded-2xl bg-white p-7 shadow-sm dark:bg-slate-900"><Quote className="text-brand-600" size={28} fill="currentColor" fillOpacity="0.15" /><blockquote className="mt-5 text-lg font-semibold leading-8 text-slate-800 dark:text-slate-100">“{quote}”</blockquote><figcaption className="mt-7 flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-full bg-slate-900 text-xs font-bold text-white dark:bg-brand-700">{initials}</span><span><span className="block text-sm font-extrabold text-slate-950 dark:text-white">{name}</span><span className="text-xs text-slate-500 dark:text-slate-400">{detail}</span></span></figcaption></motion.figure>)}</div></div></section>; }

export function FaqSection() { const [openIndex, setOpenIndex] = useState(0); return <section className="px-4 py-24 sm:px-6 lg:px-8"><div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.8fr_1.2fr]"><SectionHeading align="left" eyebrow="Questions, answered" title="The helpful details." description="Everything you need to know before you begin exploring with EstateIQ AI." /><div className="divide-y divide-slate-200 rounded-2xl border border-slate-200 px-6 dark:divide-slate-800 dark:border-slate-800">{faqs.map(({ question, answer }, index) => { const open = openIndex === index; return <div key={question}><button type="button" onClick={() => setOpenIndex(open ? -1 : index)} aria-expanded={open} className="flex w-full items-center justify-between gap-4 py-5 text-left text-base font-extrabold text-slate-900 dark:text-white">{question}<ChevronDown size={20} className={`shrink-0 transition ${open ? 'rotate-180 text-brand-700' : ''}`} /></button>{open && <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="pb-5 pr-8 text-sm leading-7 text-slate-600 dark:text-slate-300">{answer}</motion.p>}</div>; })}</div></div></section>; }

export function CtaSection() { return <section className="px-4 pb-24 sm:px-6 lg:px-8"><div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-brand-700 px-6 py-14 text-center sm:px-12 sm:py-20"><p className="text-xs font-extrabold uppercase tracking-[0.16em] text-brand-200">Your next chapter starts here</p><h2 className="mx-auto mt-4 max-w-2xl text-4xl font-black tracking-tight text-white sm:text-5xl">Let’s make your next move feel like the right one.</h2><p className="mx-auto mt-5 max-w-xl text-brand-100">Explore Bengaluru with more clarity, better local context, and a perspective designed around you.</p><a href="#search" className="mt-8 inline-flex rounded-xl bg-white px-5 py-3.5 text-sm font-extrabold text-brand-800 transition hover:-translate-y-0.5 hover:bg-brand-50">Start exploring</a></div></section>; }
