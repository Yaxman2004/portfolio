'use client'

import { useState, useEffect } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [isOpen, setIsOpen]     = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { label: 'Work',    href: '#work' },
    { label: 'About',   href: '#about' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-[#0F1117]/90 backdrop-blur-md border-b border-white/5' : 'bg-transparent'
    }`}>
      <div className="max-w-5xl mx-auto px-6 flex items-center justify-between h-16 w-full">

        {/* Logo */}
        <a href="#" className="font-mono text-sm text-[#38BDF8] tracking-tight hover:opacity-80 transition-opacity">
          carter.dev
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a key={l.label} href={l.href}
               className="text-sm text-slate-400 hover:text-white transition-colors duration-200">
              {l.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a href="mailto:carteryax@gmail.com"
           className="hidden md:block text-sm bg-[#38BDF8] hover:bg-sky-300 text-[#0F1117] font-semibold px-4 py-2 rounded-lg transition-colors duration-200">
          Hire me
        </a>

        {/* Mobile hamburger */}
        <button className="md:hidden flex flex-col gap-1.5 p-2" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
          <span className={`block w-5 h-0.5 bg-slate-400 transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-5 h-0.5 bg-slate-400 transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-0.5 bg-slate-400 transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="bg-[#0F1117]/98 border-t border-white/5 px-6 pb-6 pt-4 flex flex-col gap-4">
          {links.map((l) => (
            <a key={l.label} href={l.href} onClick={() => setIsOpen(false)}
               className="text-sm text-slate-400 hover:text-white transition-colors py-1 border-b border-white/5">
              {l.label}
            </a>
          ))}
          <a href="mailto:carteryax@gmail.com"
             className="mt-2 text-sm bg-[#38BDF8] text-[#0F1117] font-semibold px-4 py-3 rounded-lg text-center">
            Hire me
          </a>
        </div>
      </div>
    </nav>
  )
}
