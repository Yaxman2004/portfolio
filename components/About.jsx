const skills = [
  'React', 'Next.js', 'JavaScript', 'Tailwind CSS',
  'Python', 'Node.js', 'Vercel', 'Git / GitHub',
  'REST APIs', 'Figma', 'Responsive Design', 'SEO Basics',
]

export default function About() {
  return (
    <section id="about" className="py-32 px-6 bg-[#0D1016]">
      <div className="max-w-5xl mx-auto">

        <div className="mb-16">
          <p className="font-mono text-[#38BDF8] text-xs tracking-widest mb-3">03. about</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white">About me</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">

          {/* Bio */}
          <div>
            <div className="flex flex-col gap-4 text-slate-400 leading-relaxed mb-8">
              <p>
                I'm Carter — a self-taught frontend developer based in Big Rapids, Michigan.
                I build fast, polished websites and web apps that help businesses look professional
                and work reliably.
              </p>
              <p>
                I started building on the web because I wanted to create real things that real people
                use. That's still what drives me. Whether it's a local restaurant that needs a better
                website or a startup that needs an MVP frontend, I care about the craft and the end result.
              </p>
              <p>
                When I'm not building, I'm learning — there's always a new tool, pattern, or project
                to dig into. I'm currently open to freelance projects and looking to take on my first
                clients.
              </p>
            </div>

            <a href="mailto:carteryax@gmail.com"
               className="inline-flex items-center gap-2 text-sm text-[#38BDF8] hover:text-sky-300 transition-colors font-medium">
              carteryax@gmail.com →
            </a>
          </div>

          {/* Skills */}
          <div>
            <p className="text-xs font-mono text-slate-500 tracking-widest uppercase mb-5">Tech I work with</p>
            <div className="grid grid-cols-2 gap-2">
              {skills.map((skill) => (
                <div key={skill} className="flex items-center gap-2.5 text-sm text-slate-400">
                  <span className="text-[#38BDF8] text-xs font-mono">▹</span>
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
