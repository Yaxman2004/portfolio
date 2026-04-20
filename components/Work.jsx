const projects = [
  {
    title: "Schuberg's Bar & Grill",
    description:
      "Full redesign of a 90-year-old Big Rapids institution. Built a fast, modern 5-page site with an interactive menu, history timeline, photo gallery, and working contact form. Replaced a dated Wix site with a custom Next.js build.',",
    tags: ['Next.js', 'Tailwind CSS', 'Formspree', 'Vercel'],
    live: 'https://schubergsbar-site.vercel.app',
    github: null,
    type: 'Client Redesign',
    color: 'from-amber-950/40 to-transparent',
    accent: 'text-amber-400',
    border: 'border-amber-900/30',
  },
  {
    title: 'Metrik',
    description:
      'SaaS landing page for a fictional analytics platform. Features a fully coded dashboard mockup, animated hero section, feature grid, working monthly/yearly pricing toggle, testimonials, and a multi-column footer.',
    tags: ['React', 'Next.js', 'Tailwind CSS', 'Vercel'],
    live: 'https://metrik-chi.vercel.app',
    github: null,
    type: 'SaaS Landing Page',
    color: 'from-violet-950/40 to-transparent',
    accent: 'text-violet-400',
    border: 'border-violet-900/30',
  },
  {
    title: 'Bloxscope',
    description:
      'Full-stack SaaS analytics platform for Roblox game developers. Features real-time server health dashboards, revenue breakdowns, player activity tracking, live event streams, and AI-powered moderation tools for auto-flagging and banning cheaters.',
    tags: ['Next.js', 'Python', 'Vercel', 'Render'],
    live: 'https://www.bloxscope.com',
    github: null,
    type: 'Full-Stack Product',
    color: 'from-sky-950/40 to-transparent',
    accent: 'text-sky-400',
    border: 'border-sky-900/30',
  },
]

export default function Work() {
  return (
    <section id="work" className="py-32 px-6">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-16">
          <p className="font-mono text-[#38BDF8] text-xs tracking-widest mb-3">02. work</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white">Selected projects</h2>
        </div>

        {/* Projects */}
        <div className="flex flex-col gap-6">
          {projects.map((p, i) => (
            <div
              key={p.title}
              className={`relative bg-[#161B27] rounded-2xl p-7 border ${p.border} overflow-hidden group hover:border-white/10 transition-all duration-300`}
            >
              {/* Background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${p.color} pointer-events-none`} />

              <div className="relative z-10">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`text-xs font-mono font-medium ${p.accent}`}>{p.type}</span>
                      <span className="text-slate-700 text-xs">#{String(i + 1).padStart(2, '0')}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white">{p.title}</h3>
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-3 flex-shrink-0">
                    {p.github && (
                      <a href={p.github} target="_blank" rel="noopener noreferrer"
                         className="text-xs text-slate-400 hover:text-white border border-white/10 hover:border-white/20 px-3 py-1.5 rounded-lg transition-all">
                        GitHub
                      </a>
                    )}
                    {p.live && (
                      <a href={p.live} target="_blank" rel="noopener noreferrer"
                         className="text-xs text-[#0F1117] font-semibold bg-[#38BDF8] hover:bg-sky-300 px-4 py-1.5 rounded-lg transition-colors">
                        Live site ↗
                      </a>
                    )}
                  </div>
                </div>

                <p className="text-slate-400 text-sm leading-relaxed mb-5 max-w-2xl">{p.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {p.tags.map((tag) => (
                    <span key={tag}
                          className="text-xs font-mono text-slate-500 bg-white/5 px-3 py-1 rounded-full border border-white/5">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
