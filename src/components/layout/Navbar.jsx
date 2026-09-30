import { AnimatePresence, motion } from 'framer-motion';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { THEME } from '../../config/theme';

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const nextTheme = theme === THEME.LIGHT ? 'dark' : 'light';
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigation = [
    { label: 'Explore', href: '#explore' },
    { label: 'Services', href: '#services' },
    { label: 'Why EstateIQ AI', href: '#why-us' },
    { label: 'Stories', href: '#stories' },
  ];

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/60 bg-white/80 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/85">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <Link to="/" onClick={closeMenu} className="flex items-center gap-2 text-lg font-extrabold tracking-tight text-slate-950 dark:text-white">
          <span className="grid h-8 w-8 place-items-center rounded-xl bg-brand-700 text-sm text-white shadow-lg shadow-brand-700/25">E</span>
          EstateIQ AI
        </Link>
        <div className="hidden items-center gap-7 md:flex">
          {navigation.map((item) => <a key={item.href} href={item.href} className="text-sm font-semibold text-slate-600 transition hover:text-brand-700 dark:text-slate-300 dark:hover:text-brand-300">{item.label}</a>)}
        </div>
        <div className="flex items-center gap-1">
          <button type="button" onClick={toggleTheme} className="grid h-10 w-10 place-items-center rounded-xl text-slate-700 transition hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 dark:text-slate-200 dark:hover:bg-slate-800" aria-label={`Switch to ${nextTheme} theme`}>
            {theme === THEME.LIGHT ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          <a href="#estimator" className="hidden rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-brand-700 md:inline-flex dark:bg-brand-600 dark:hover:bg-brand-500">Get started</a>
          <button type="button" onClick={() => setIsMenuOpen((open) => !open)} className="grid h-10 w-10 place-items-center rounded-xl text-slate-700 transition hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 md:hidden dark:text-slate-200 dark:hover:bg-slate-800" aria-label="Toggle navigation menu" aria-expanded={isMenuOpen}>
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {isMenuOpen && <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden border-t border-slate-100 bg-white md:hidden dark:border-slate-800 dark:bg-slate-950"><div className="space-y-1 px-4 py-3">{navigation.map((item) => <a key={item.href} href={item.href} onClick={closeMenu} className="block rounded-lg px-3 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800">{item.label}</a>)}<a href="#estimator" onClick={closeMenu} className="mt-2 block rounded-lg bg-brand-700 px-3 py-3 text-center text-sm font-bold text-white">Get started</a></div></motion.div>}
      </AnimatePresence>
    </header>
  );
}
