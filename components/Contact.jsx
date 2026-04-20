'use client'

import { useState } from 'react'

const socials = [
  { label: 'GitHub',    href: 'https://github.com/Yaxman2004' },
  { label: 'LinkedIn',  href: 'https://www.linkedin.com/in/carter-yax-4b7536329/' },
  { label: 'Instagram', href: 'https://www.instagram.com/carteryax/' },
  { label: 'Twitter',   href: 'https://x.com/CarterJYreal' },
]

export default function Contact() {
  const [form, setForm]     = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle')

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      // Replace YOUR_FORM_ID with your Formspree form ID (formspree.io)
      const res = await fetch('https://formspree.io/f/mbdqkyqy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) { setStatus('success'); setForm({ name: '', email: '', message: '' }) }
      else setStatus('error')
    } catch { setStatus('error') }
  }

  return (
    <>
      <section id="contact" className="py-32 px-6">
        <div className="max-w-5xl mx-auto">

          <div className="mb-16">
            <p className="font-mono text-[#38BDF8] text-xs tracking-widest mb-3">04. contact</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Let's work together</h2>
            <p className="text-slate-400 max-w-xl leading-relaxed">
              Have a project in mind or just want to chat? I'm currently available for
              freelance work and always happy to hear from new people.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">

            {/* Left info */}
            <div>
              <div className="flex flex-col gap-6 mb-10">
                <div>
                  <p className="text-xs font-mono text-slate-500 tracking-widest uppercase mb-2">Email</p>
                  <a href="mailto:carteryax@gmail.com"
                     className="text-white hover:text-[#38BDF8] transition-colors">
                    carteryax@gmail.com
                  </a>
                </div>
                <div>
                  <p className="text-xs font-mono text-slate-500 tracking-widest uppercase mb-2">Based in</p>
                  <p className="text-white">Big Rapids, Michigan</p>
                </div>
                <div>
                  <p className="text-xs font-mono text-slate-500 tracking-widest uppercase mb-3">Social</p>
                  <div className="flex flex-col gap-2">
                    {socials.map((s) => (
                      <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                         className="text-slate-400 hover:text-[#38BDF8] transition-colors text-sm">
                        {s.label} ↗
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div>
              {status === 'success' ? (
                <div className="p-6 border border-emerald-800/50 bg-emerald-950/30 rounded-xl text-emerald-400 text-sm">
                  Message sent! I'll get back to you soon.
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div>
                    <label className="block text-xs font-mono tracking-widest uppercase text-slate-500 mb-2">Name</label>
                    <input type="text" name="name" required value={form.name} onChange={handleChange}
                           placeholder="Your name"
                           className="w-full bg-[#161B27] border border-white/10 text-slate-200 px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-[#38BDF8]/50 transition-colors placeholder-slate-600" />
                  </div>
                  <div>
                    <label className="block text-xs font-mono tracking-widest uppercase text-slate-500 mb-2">Email</label>
                    <input type="email" name="email" required value={form.email} onChange={handleChange}
                           placeholder="your@email.com"
                           className="w-full bg-[#161B27] border border-white/10 text-slate-200 px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-[#38BDF8]/50 transition-colors placeholder-slate-600" />
                  </div>
                  <div>
                    <label className="block text-xs font-mono tracking-widest uppercase text-slate-500 mb-2">Message</label>
                    <textarea name="message" required rows={5} value={form.message} onChange={handleChange}
                              placeholder="Tell me about your project..."
                              className="w-full bg-[#161B27] border border-white/10 text-slate-200 px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-[#38BDF8]/50 transition-colors resize-none placeholder-slate-600" />
                  </div>
                  {status === 'error' && <p className="text-red-400 text-xs">Something went wrong. Please try again.</p>}
                  <button type="submit" disabled={status === 'sending'}
                          className="px-6 py-3.5 bg-[#38BDF8] hover:bg-sky-300 text-[#0F1117] font-semibold rounded-xl transition-colors text-sm disabled:opacity-50">
                    {status === 'sending' ? 'Sending...' : 'Send message'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 px-6 py-8">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-mono text-xs text-slate-600">
            © {new Date().getFullYear()} Carter Yax. Built with Next.js & Tailwind.
          </p>
          <div className="flex items-center gap-6">
            {socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                 className="text-xs text-slate-600 hover:text-[#38BDF8] transition-colors">
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </>
  )
}
