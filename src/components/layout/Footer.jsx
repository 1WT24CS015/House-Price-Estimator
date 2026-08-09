import { ArrowUpRight, Instagram, Linkedin, Twitter } from 'lucide-react';

const footerLinks = [
  { title: 'Explore', links: ['Homes for sale', 'Neighbourhoods', 'Market insights'] },
  { title: 'Company', links: ['Our story', 'How it works', 'Contact us'] },
];

export function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.5fr_repeat(2,1fr)]">
          <div className="space-y-5">
            <a href="#main-content" className="inline-flex items-center gap-2 text-xl font-extrabold text-white">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-500 text-sm">E</span>
              EstateIQ AI
            </a>
            <p className="max-w-md text-sm leading-6 text-slate-400">Make confident Bengaluru property decisions with clear data, thoughtful guidance, and a human-first experience.</p>
            <div className="flex items-center gap-2">
              {[Twitter, Instagram, Linkedin].map((Icon) => (
                <a key={Icon.displayName ?? Icon.name} href="#main-content" aria-label="Social link" className="grid h-10 w-10 place-items-center rounded-2xl bg-slate-800 text-slate-200 transition hover:bg-brand-700 hover:text-white">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {footerLinks.map(({ title, links }) => (
            <FooterColumn key={title} title={title} links={links} />
          ))}

          <div className="rounded-[1.75rem] border border-slate-800 bg-slate-900/80 p-6 shadow-lg shadow-slate-950/20">
            <h3 className="text-sm font-bold text-white">Stay in the know</h3>
            <p className="mt-3 text-sm leading-6 text-slate-400">Fresh local market insights, delivered monthly.</p>
            <a href="#stories" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-brand-300 transition hover:text-brand-200">
              Read market stories <ArrowUpRight size={16} />
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-slate-800 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} EstateIQ AI. Built for better moves.</span>
          <span>Privacy · Terms · Accessibility</span>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }) {
  return (
    <div>
      <h3 className="text-sm font-bold text-white">{title}</h3>
      <ul className="mt-4 space-y-3">
        {links.map((link) => (
          <li key={link}>
            <a href="#main-content" className="text-sm text-slate-400 transition hover:text-brand-300">
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
