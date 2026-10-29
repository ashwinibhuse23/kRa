import Logo from './Logo';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navColumns = [
    {
      title: 'Company & Vision',
      links: [
        { name: 'About kRa', href: '#about' },
        { name: 'Operating Approach', href: '#about' },
        { name: 'Why kRa Life Sciences', href: '#why-kra' },
        { name: 'Founder & Leadership', href: '#leadership' },
        { name: 'FAQs', href: '#faq' },
      ],
    },
    {
      title: 'Clinical Services',
      links: [
        { name: 'Trial Set-Up & Mgmt', href: '#services' },
        { name: 'Development Strategy', href: '#services' },
        { name: 'Patient & Site Strategy', href: '#services' },
        { name: 'Operational Excellence', href: '#services' },
        { name: 'Cross-Functional Integration', href: '#services' },
        { name: 'Specialist Advisory', href: '#services' },
      ],
    },
    {
      title: 'Expertise & Scope',
      links: [
        { name: 'Therapeutic Areas', href: '#expertise' },
        { name: 'Study Phases & Types', href: '#expertise' },
        { name: 'Product Modalities', href: '#expertise' },
        { name: 'Contact & Enquiries', href: '#contact' },
      ],
    },
  ];

  return (
    <footer
      className="relative w-full overflow-hidden bg-[#010814] text-white border-t border-slate-800/80 pt-16 sm:pt-20 pb-10 font-sans"
    >
      {/* ── Ambient Radial Accent ── */}
      <div className="absolute top-0 left-1/3 w-[600px] h-[300px] bg-gradient-to-b from-[#0078B8]/10 to-transparent rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">

        {/* ── Top Brand & Navigation Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-slate-800/80">

          {/* Brand Presentation (5 Columns) */}
          <div className="lg:col-span-5 space-y-5">
            <div className="flex items-center gap-3">
              <Logo height={54} theme="dark" className="drop-shadow-[0_0_12px_rgba(0,120,184,0.3)]" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white tracking-tight font-playfair">
                kRa Life Sciences
              </h3>
              <p className="text-xs sm:text-sm font-semibold text-[#0078B8] leading-snug">
                Clinical Trial Consulting &amp; Clinical Development Solutions
              </p>
            </div>

            {/* Brand Motto Callout */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 max-w-md">
              <p className="text-xs sm:text-sm text-slate-200 italic leading-relaxed font-playfair">
                &ldquo;Integrated expertise. Operational excellence. Execution with purpose.&rdquo;
              </p>
            </div>

            <div className="text-xs text-slate-400 space-y-1">
              <p>Independent Clinical Research &amp; Operations Consultancy</p>
              <p className="text-sky-400/90 font-medium">Headquartered in Bengaluru • Multi-Geography Reach</p>
            </div>
          </div>

          {/* Quick Link Navigation Columns (7 Columns) */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {navColumns.map((col) => (
              <div key={col.title} className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  {col.title}
                </h4>
                <ul className="space-y-2.5 text-xs sm:text-[13px]">
                  {col.links.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-slate-400 hover:text-[#00C4FF] transition-colors inline-block"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>

        {/* ── Bottom Copyright, Standards & Back to Top Strip ── */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">

          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <span className="text-slate-400 font-medium">
              &copy; {currentYear} <strong className="text-white font-semibold">kRa Life Sciences</strong>. All rights reserved.
            </span>
            <span className="hidden sm:inline text-slate-600">|</span>

          </div>


        </div>

      </div>
    </footer>
  );
}
