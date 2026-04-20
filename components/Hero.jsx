const socials = [
  { label: 'GitHub',    href: 'https://github.com/Yaxman2004' },
  { label: 'LinkedIn',  href: 'https://www.linkedin.com/in/carter-yax-4b7536329/' },
  { label: 'Instagram', href: 'https://www.instagram.com/carteryax/' },
  { label: 'Twitter',   href: 'https://x.com/CarterJYreal' },
]

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">

      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-sky-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: 'linear-gradient(#38BDF8 1px, transparent 1px), linear-gradient(90deg, #38BDF8 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto w-full">
        <div className="max-w-3xl">

          {/* Available badge */}
          <div className="inline-flex items-center gap-2 bg-emerald-950/60 border border-emerald-800/40 rounded-full px-4 py-1.5 mb-8">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-emerald-400 font-medium">Available for new projects</span>
          </div>

          {/* Name */}
          <p className="font-mono text-[#38BDF8] text-sm mb-3 tracking-wide">Hi, I'm</p>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 leading-tight tracking-tight">
            Carter Yax
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-400 mb-6 leading-snug">
            I build websites & web apps
            <br />
            <span className="text-[#38BDF8]">for businesses.</span>
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed mb-10 max-w-xl">
            Frontend developer based in Big Rapids, MI. I turn ideas into fast,
            polished, production-ready products using React and Next.js.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <a href="#work"
               className="px-7 py-3.5 bg-[#38BDF8] hover:bg-sky-300 text-[#0F1117] font-semibold rounded-xl transition-colors duration-200 text-sm text-center">
              See my work
            </a>
            <a href="mailto:carteryax@gmail.com"
               className="px-7 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium rounded-xl transition-colors duration-200 text-sm text-center">
              Get in touch
            </a>
          </div>

          {/* Socials */}
          <div className="flex items-center gap-6">
            {socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                 className="text-xs text-slate-500 hover:text-[#38BDF8] transition-colors duration-200 tracking-wide">
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
