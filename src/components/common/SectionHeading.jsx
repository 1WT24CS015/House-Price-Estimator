import { motion } from 'framer-motion';

export function SectionHeading({ align = 'center', eyebrow, title, description }) {
  const alignment = align === 'left' ? 'items-start text-left' : 'items-center text-center';
  return (
    <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.5 }} className={`mx-auto flex max-w-2xl flex-col ${alignment}`}>
      {eyebrow && <span className="mb-3 text-xs font-extrabold uppercase tracking-[0.16em] text-brand-700 dark:text-brand-300">{eyebrow}</span>}
      <h2 className="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl dark:text-white">{title}</h2>
      {description && <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300">{description}</p>}
    </motion.div>
  );
}
