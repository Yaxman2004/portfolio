'use client'

import { useEffect, useRef, useState } from 'react'

// ─── DATA ─────────────────────────────────────────────────────────────────────

const projects = [
  {
    title: "Schuberg's Bar & Grill",
    type: 'Client Redesign',
    description: 'Full redesign of a 90-year-old Big Rapids institution. Custom 5-page Next.js site with interactive menu, history timeline, and photo gallery — replacing a dated Wix site.',
    tags: ['Next.js', 'Tailwind CSS', 'Vercel'],
    live: 'https://schubergsbar-site.vercel.app',
    color: '#f59e0b',
  },
  {
    title: 'Metrik',
    type: 'SaaS Landing Page',
    description: 'Analytics SaaS landing page with a fully coded dashboard mockup, animated hero, feature grid, and working monthly/yearly pricing toggle.',
    tags: ['React', 'Next.js', 'Tailwind CSS'],
    live: 'https://metrik-chi.vercel.app',
    color: '#a78bfa',
  },
  {
    title: 'Bloxscope',
    type: 'Full-Stack Product',
    description: 'Real-time SaaS analytics for Roblox developers. Live dashboards, AI-powered moderation, revenue tracking, player activity, and server health monitoring.',
    tags: ['Next.js', 'Python', 'Render', 'Vercel'],
    live: 'https://www.bloxscope.com',
    color: '#38bdf8',
  },
]

const skills = ['React','Next.js','JavaScript','Tailwind CSS','Python','Node.js','Vercel','Git / GitHub','REST APIs','Figma','Responsive Design','SEO']

const socials = [
  { label: 'GitHub',    href: 'https://github.com/Yaxman2004' },
  { label: 'LinkedIn',  href: 'https://www.linkedin.com/in/carter-yax-4b7536329/' },
  { label: 'Instagram', href: 'https://www.instagram.com/carteryax/' },
  { label: 'Twitter',   href: 'https://x.com/CarterJYreal' },
]

// ─── COLOR INTERPOLATION ──────────────────────────────────────────────────────

function lerp(a, b, t) { return a + (b - a) * t }

function lerpColor(c1, c2, t) {
  const h = (a, b) => parseInt(a, 16) + Math.round((parseInt(b, 16) - parseInt(a, 16)) * t)
  const parse = c => ({ r: c.slice(1,3), g: c.slice(3,5), b: c.slice(5,7) })
  const a = parse(c1), b = parse(c2)
  const r = h(a.r, b.r).toString(16).padStart(2,'0')
  const g = h(a.g, b.g).toString(16).padStart(2,'0')
  const bl = h(a.b, b.b).toString(16).padStart(2,'0')
  return `#${r}${g}${bl}`
}

// Smooth color stops for the ocean background — no flashing
const BG_STOPS = [
  { p: 0.00, top: '#87CEEB', bot: '#48cae4' },
  { p: 0.08, top: '#48cae4', bot: '#0096c7' },
  { p: 0.18, top: '#0096c7', bot: '#023e8a' },
  { p: 0.32, top: '#023e8a', bot: '#03045e' },
  { p: 0.50, top: '#03045e', bot: '#010d1f' },
  { p: 0.70, top: '#010d1f', bot: '#020608' },
  { p: 1.00, top: '#010810', bot: '#020406' },
]

function getBg(p) {
  let lo = BG_STOPS[0], hi = BG_STOPS[BG_STOPS.length - 1]
  for (let i = 0; i < BG_STOPS.length - 1; i++) {
    if (p >= BG_STOPS[i].p && p <= BG_STOPS[i+1].p) {
      lo = BG_STOPS[i]; hi = BG_STOPS[i+1]; break
    }
  }
  const t = lo.p === hi.p ? 0 : (p - lo.p) / (hi.p - lo.p)
  const top = lerpColor(lo.top, hi.top, t)
  const bot = lerpColor(lo.bot, hi.bot, t)
  return `linear-gradient(to bottom, ${top} 0%, ${bot} 100%)`
}

// ─── FISH HOOK ────────────────────────────────────────────────────────────────

// ─── FISH SPECIES BY DEPTH ────────────────────────────────────────────────────
// Surface (0–0.25): tropical, bright, small — clownfish, tang, parrotfish
// Mid (0.25–0.6):   larger, muted — tuna, grouper, barracuda
// Deep (0.6–1.0):   eerie, glowing — anglerfish, shark, oarfish, deep sea

const SHALLOW_FISH = [
  // Clownfish — small, orange/white stripes
  { w: 32, h: 18, type: 'clown',      color: '#f97316', stripe: '#ffffff', fin: '#ea580c' },
  // Blue tang — oval, bright blue
  { w: 36, h: 22, type: 'tang',       color: '#2563eb', stripe: '#facc15', fin: '#1d4ed8' },
  // Parrotfish — chunky, teal/green
  { w: 42, h: 22, type: 'parrot',     color: '#0d9488', stripe: '#5eead4', fin: '#0f766e' },
  // Yellow damselfish — small, bright yellow
  { w: 28, h: 16, type: 'damsel',     color: '#eab308', stripe: '#fde047', fin: '#ca8a04' },
  // Surgeonfish — blue oval
  { w: 38, h: 20, type: 'surgeon',    color: '#38bdf8', stripe: '#7dd3fc', fin: '#0284c7' },
]

const MID_FISH = [
  // Tuna — sleek, fast, dark blue/silver
  { w: 72, h: 26, type: 'tuna',       color: '#1e3a5f', stripe: '#64748b', fin: '#0f2744' },
  // Barracuda — long, narrow, silver
  { w: 90, h: 16, type: 'barracuda',  color: '#475569', stripe: '#94a3b8', fin: '#334155' },
  // Grouper — stocky, brownish
  { w: 58, h: 30, type: 'grouper',    color: '#78350f', stripe: '#a16207', fin: '#5c2d04' },
  // Mahi-mahi — colorful, tall dorsal
  { w: 64, h: 28, type: 'mahi',       color: '#065f46', stripe: '#f59e0b', fin: '#047857' },
  // Large jack — oval, silver
  { w: 66, h: 32, type: 'jack',       color: '#374151', stripe: '#9ca3af', fin: '#1f2937' },
]

const DEEP_FISH = [
  // Shark — large, grey, iconic
  { w: 120, h: 40, type: 'shark',     color: '#374151', belly: '#d1d5db', fin: '#1f2937' },
  // Anglerfish — dark, glowing lure
  { w: 60,  h: 44, type: 'angler',    color: '#1e1b4b', glow: '#a78bfa',  fin: '#312e81' },
  // Oarfish — very long, silver ribbon
  { w: 160, h: 14, type: 'oarfish',   color: '#94a3b8', stripe: '#e2e8f0', fin: '#64748b' },
  // Dragonfish — dark, bioluminescent dots
  { w: 80,  h: 18, type: 'dragon',    color: '#0c1445', glow: '#38bdf8',  fin: '#1e3a8a' },
  // Deep sea jellyfish — translucent, glowing
  { w: 44,  h: 54, type: 'jelly',     color: '#7c3aed', glow: '#c4b5fd',  fin: '#6d28d9' },
]

function useFish() {
  const [fish, setFish] = useState([])
  const frameRef = useRef(null)

  useEffect(() => {
    const makeFish = (types, depthMin, depthMax, count, idOffset) =>
      Array.from({ length: count }, (_, i) => {
        const t = types[i % types.length]
        const dir = i % 2 === 0 ? 1 : -1
        return {
          id: idOffset + i,
          x: dir === 1 ? -200 - Math.random() * 400 : window.innerWidth + 200 + Math.random() * 400,
          y: 15 + Math.random() * 65,
          speed: 0.5 + Math.random() * 0.9,
          dir,
          wobble: Math.random() * Math.PI * 2,
          wobbleSpeed: 0.018 + Math.random() * 0.025,
          depth: depthMin + Math.random() * (depthMax - depthMin),
          ...t,
        }
      })

    setFish([
      ...makeFish(SHALLOW_FISH, 0.00, 0.30, 6,  0),
      ...makeFish(MID_FISH,     0.28, 0.62, 6, 10),
      ...makeFish(DEEP_FISH,    0.58, 1.00, 6, 20),
    ])
  }, [])

  useEffect(() => {
    if (!fish.length) return
    const animate = () => {
      setFish(prev => prev.map(f => {
        let nx = f.x + f.speed * f.dir
        // Wrap around — when a fish exits the screen it re-enters from the other side
        if (f.dir === 1  && nx > window.innerWidth + 150) nx = -150
        if (f.dir === -1 && nx < -150) nx = window.innerWidth + 150
        return { ...f, x: nx, wobble: f.wobble + f.wobbleSpeed }
      }))
      frameRef.current = requestAnimationFrame(animate)
    }
    frameRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frameRef.current)
  }, [fish.length])

  return fish
}

// ─── BUBBLES ──────────────────────────────────────────────────────────────────

function useBubbles() {
  const [bubbles, setBubbles] = useState([])
  const frameRef = useRef(null)

  useEffect(() => {
    setBubbles(Array.from({ length: 18 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: 70 + Math.random() * 30,
      size: 3 + Math.random() * 7,
      speed: 0.025 + Math.random() * 0.045,
      opacity: 0.15 + Math.random() * 0.35,
      drift: Math.random() * Math.PI * 2,
    })))
  }, [])

  useEffect(() => {
    if (!bubbles.length) return
    const animate = () => {
      setBubbles(prev => prev.map(b => ({
        ...b,
        y: b.y - b.speed < -5 ? 105 : b.y - b.speed,
        x: b.x + Math.sin(b.drift) * 0.04,
        drift: b.drift + 0.008,
      })))
      frameRef.current = requestAnimationFrame(animate)
    }
    frameRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frameRef.current)
  }, [bubbles.length])

  return bubbles
}

// ─── FISH SVG — species-specific ─────────────────────────────────────────────

function FishSVG({ f }) {
  const scaleX = f.dir === 1 ? -1 : 1
  const wobbleY = Math.sin(f.wobble) * (f.type === 'jelly' ? 3 : f.type === 'oarfish' ? 2 : 5)

  const body = () => {
    switch(f.type) {
      case 'clown': return <svg width={f.w} height={f.h} viewBox="0 0 36 20" fill="none">
        <ellipse cx="18" cy="10" rx="14" ry="8" fill={f.color}/>
        <rect x="12" y="2" width="3" height="16" fill={f.stripe} opacity="0.9" rx="1"/>
        <rect x="20" y="3" width="2.5" height="14" fill={f.stripe} opacity="0.7" rx="1"/>
        <path d="M32 10 L38 4 L38 16 Z" fill={f.fin}/>
        <path d="M16 2 Q20 -2 24 2" stroke={f.fin} strokeWidth="2" fill="none"/>
        <circle cx="7" cy="8" r="2.5" fill="white"/><circle cx="6.5" cy="8" r="1.2" fill="#1e293b"/>
      </svg>

      case 'tang': return <svg width={f.w} height={f.h} viewBox="0 0 40 24" fill="none">
        <ellipse cx="20" cy="12" rx="16" ry="10" fill={f.color}/>
        <path d="M36 12 L44 5 L44 19 Z" fill={f.fin}/>
        <path d="M10 2 Q20 -3 30 2" stroke={f.stripe} strokeWidth="2.5" fill="none"/>
        <circle cx="7" cy="10" r="3" fill="white"/><circle cx="6" cy="10" r="1.5" fill="#1e293b"/>
        <line x1="34" y1="14" x2="38" y2="18" stroke={f.stripe} strokeWidth="2"/>
      </svg>

      case 'parrot': return <svg width={f.w} height={f.h} viewBox="0 0 46 24" fill="none">
        <ellipse cx="22" cy="12" rx="18" ry="10" fill={f.color}/>
        <path d="M40 12 L48 5 L48 19 Z" fill={f.fin}/>
        <path d="M18 2 Q24 -2 30 2" stroke={f.stripe} strokeWidth="3" fill="none"/>
        <circle cx="8" cy="9" r="3" fill="white"/><circle cx="7" cy="9" r="1.5" fill="#1e293b"/>
        <path d="M2 13 Q5 16 8 13" stroke={f.stripe} strokeWidth="2" fill="none"/>
      </svg>

      case 'damsel': return <svg width={f.w} height={f.h} viewBox="0 0 32 18" fill="none">
        <ellipse cx="16" cy="9" rx="12" ry="7" fill={f.color}/>
        <path d="M28 9 L34 4 L34 14 Z" fill={f.fin}/>
        <path d="M14 2 Q18 -1 22 2" stroke={f.stripe} strokeWidth="1.5" fill="none"/>
        <circle cx="6" cy="7" r="2.5" fill="white"/><circle cx="5.5" cy="7" r="1.2" fill="#1e293b"/>
      </svg>

      case 'surgeon': return <svg width={f.w} height={f.h} viewBox="0 0 42 22" fill="none">
        <ellipse cx="20" cy="11" rx="16" ry="9" fill={f.color}/>
        <path d="M36 11 L44 5 L44 17 Z" fill={f.fin}/>
        <path d="M12 2 Q20 -2 28 2" stroke={f.stripe} strokeWidth="2" fill="none"/>
        <circle cx="7" cy="9" r="3" fill="white"/><circle cx="6" cy="9" r="1.5" fill="#1e293b"/>
        <line x1="36" y1="14" x2="40" y2="17" stroke="#f87171" strokeWidth="1.5"/>
      </svg>

      case 'tuna': return <svg width={f.w} height={f.h} viewBox="0 0 80 28" fill="none">
        <ellipse cx="36" cy="14" rx="32" ry="11" fill={f.color}/>
        <ellipse cx="36" cy="18" rx="30" ry="5" fill={f.stripe} opacity="0.18"/>
        <path d="M68 14 L82 4 L82 24 Z" fill={f.fin}/>
        <path d="M24 3 Q36 -2 48 3" stroke={f.stripe} strokeWidth="2" fill="none" opacity="0.5"/>
        <path d="M60 5 L72 3 L70 10 Z" fill={f.fin} opacity="0.7"/>
        <path d="M60 23 L72 25 L70 18 Z" fill={f.fin} opacity="0.7"/>
        <circle cx="10" cy="11" r="4" fill="white" opacity="0.8"/><circle cx="9" cy="11" r="2" fill="#0f172a"/>
      </svg>

      case 'barracuda': return <svg width={f.w} height={f.h} viewBox="0 0 100 18" fill="none">
        <ellipse cx="48" cy="9" rx="44" ry="6" fill={f.color}/>
        <ellipse cx="48" cy="9" rx="44" ry="3" fill={f.stripe} opacity="0.25"/>
        <path d="M92 9 L104 3 L104 15 Z" fill={f.fin}/>
        <path d="M2 8 Q5 4 10 9 Q5 14 2 10 Z" fill={f.stripe} opacity="0.8"/>
        <circle cx="12" cy="7" r="3" fill="white" opacity="0.8"/><circle cx="11" cy="7" r="1.5" fill="#0f172a"/>
        {[20,35,50,65].map(x=><line key={x} x1={x} y1="5" x2={x} y2="13" stroke={f.stripe} strokeWidth="0.8" opacity="0.25"/>)}
      </svg>

      case 'grouper': return <svg width={f.w} height={f.h} viewBox="0 0 64 32" fill="none">
        <ellipse cx="30" cy="17" rx="26" ry="13" fill={f.color}/>
        <path d="M56 17 L66 8 L66 26 Z" fill={f.fin}/>
        {[15,25,35,45].map(x=><ellipse key={x} cx={x} cy="17" rx="4" ry="6" fill={f.stripe} opacity="0.12"/>)}
        <circle cx="9" cy="13" r="4" fill="white" opacity="0.85"/><circle cx="8" cy="13" r="2" fill="#1e293b"/>
        <path d="M3 17 Q6 21 9 17" stroke={f.stripe} strokeWidth="2" fill="none"/>
      </svg>

      case 'mahi': return <svg width={f.w} height={f.h} viewBox="0 0 70 30" fill="none">
        <ellipse cx="34" cy="18" rx="28" ry="11" fill={f.color}/>
        <path d="M8 7 Q20 2 40 6 Q50 4 62 18" stroke={f.stripe} strokeWidth="4" fill="none" strokeLinecap="round"/>
        <path d="M62 18 L74 9 L74 27 Z" fill={f.fin}/>
        <circle cx="10" cy="15" r="4" fill="white" opacity="0.85"/><circle cx="9" cy="15" r="2" fill="#1e293b"/>
      </svg>

      case 'jack': return <svg width={f.w} height={f.h} viewBox="0 0 72 34" fill="none">
        <ellipse cx="34" cy="17" rx="28" ry="14" fill={f.color}/>
        <ellipse cx="34" cy="21" rx="26" ry="6" fill={f.stripe} opacity="0.18"/>
        <path d="M62 17 L74 7 L74 27 Z" fill={f.fin}/>
        <circle cx="9" cy="13" r="4" fill="white" opacity="0.85"/><circle cx="8" cy="13" r="2" fill="#1e293b"/>
      </svg>

      case 'shark': return <svg width={f.w} height={f.h} viewBox="0 0 130 42" fill="none">
        <ellipse cx="58" cy="24" rx="52" ry="14" fill={f.color}/>
        <ellipse cx="58" cy="30" rx="48" ry="7" fill={f.belly} opacity="0.55"/>
        <path d="M110 24 L130 8 L126 24 L130 40 Z" fill={f.fin}/>
        <path d="M50 10 L62 -6 L74 10 Z" fill={f.fin}/>
        <path d="M40 30 L20 42 L50 32 Z" fill={f.fin} opacity="0.85"/>
        <path d="M72 30 L90 40 L76 32 Z" fill={f.fin} opacity="0.7"/>
        <circle cx="14" cy="20" r="5" fill="white" opacity="0.9"/><circle cx="13" cy="20" r="3" fill="#0f172a"/>
        <circle cx="12.5" cy="19.5" r="1" fill="white" opacity="0.4"/>
        {[22,28,34].map(x=><path key={x} d={`M${x} 16 Q${x+1} 22 ${x} 28`} stroke={f.belly} strokeWidth="1.5" fill="none" opacity="0.35"/>)}
        <path d="M4 25 Q10 30 18 27" stroke={f.belly} strokeWidth="2" fill="none" opacity="0.65"/>
      </svg>

      case 'angler': return <svg width={f.w} height={f.h} viewBox="0 0 64 46" fill="none" style={{filter:`drop-shadow(0 0 10px ${f.glow})`}}>
        <ellipse cx="34" cy="28" rx="24" ry="16" fill={f.color}/>
        <path d="M10 28 Q16 20 24 24 Q16 32 10 36 Z" fill="#1a0a2e" opacity="0.9"/>
        {[14,17,20,23].map(x=><line key={x} x1={x} y1="22" x2={x-1} y2="27" stroke="#e2e8f0" strokeWidth="1.5"/>)}
        <path d="M40 12 Q46 4 50 2" stroke={f.glow} strokeWidth="2" fill="none"/>
        <circle cx="50" cy="2" r="5" fill={f.glow} opacity="0.9"/>
        <circle cx="50" cy="2" r="9" fill={f.glow} opacity="0.15"/>
        <path d="M58 28 L68 18 L68 38 Z" fill={f.fin}/>
        <circle cx="18" cy="24" r="4" fill="#fef08a" opacity="0.9"/><circle cx="17" cy="24" r="2" fill="#1a0a2e"/>
      </svg>

      case 'oarfish': return <svg width={f.w} height={f.h} viewBox="0 0 170 16" fill="none" style={{filter:`drop-shadow(0 0 4px ${f.stripe})`}}>
        <path d="M0 8 Q42 3 84 8 Q126 13 168 8" stroke={f.color} strokeWidth="6" fill="none" strokeLinecap="round"/>
        <path d="M0 8 Q42 4 84 8 Q126 12 168 8" stroke={f.stripe} strokeWidth="2" fill="none" opacity="0.4"/>
        <path d="M10 8 Q50 1 90 5 Q130 1 160 5" stroke="#ef4444" strokeWidth="2.5" fill="none" opacity="0.75"/>
        <ellipse cx="8" cy="8" rx="8" ry="5" fill={f.color}/>
        <circle cx="4" cy="6" r="2" fill="white" opacity="0.8"/><circle cx="3.5" cy="6" r="1" fill="#0f172a"/>
        <path d="M166 8 L172 2" stroke="#ef4444" strokeWidth="2" strokeLinecap="round"/>
      </svg>

      case 'dragon': return <svg width={f.w} height={f.h} viewBox="0 0 84 20" fill="none" style={{filter:`drop-shadow(0 0 6px ${f.glow})`}}>
        <path d="M4 10 Q20 5 42 10 Q64 15 80 10" stroke={f.color} strokeWidth="8" fill="none" strokeLinecap="round"/>
        <path d="M4 10 Q20 5 42 10 Q64 15 80 10" stroke={f.glow} strokeWidth="2" fill="none" opacity="0.35"/>
        {[10,20,30,40,50,60,70].map((x,i)=><circle key={x} cx={x} cy={10+Math.sin(i)*3} r="2.5" fill={f.glow} opacity="0.85"/>)}
        <path d="M80 10 L90 4 L90 16 Z" fill={f.fin}/>
        <circle cx="6" cy="8" r="3" fill="white" opacity="0.7"/><circle cx="5" cy="8" r="1.5" fill="#0f172a"/>
      </svg>

      case 'jelly': return <svg width={f.w} height={f.h} viewBox="0 0 48 58" fill="none" style={{filter:`drop-shadow(0 0 12px ${f.glow})`}}>
        <ellipse cx="24" cy="20" rx="20" ry="18" fill={f.color} opacity="0.4"/>
        <ellipse cx="24" cy="18" rx="16" ry="12" fill={f.glow} opacity="0.12"/>
        <path d="M4 20 Q24 38 44 20" stroke={f.glow} strokeWidth="1.5" fill="none" opacity="0.5"/>
        {[10,16,22,28,34,40].map((x,i)=>(
          <path key={x} d={`M${x} 36 Q${x+Math.sin(i)*6} ${44+i*2} ${x+Math.sin(i+1)*4} 56`}
            stroke={f.glow} strokeWidth="1.5" fill="none" opacity="0.65" strokeLinecap="round"/>
        ))}
      </svg>

      default: return <svg width={f.w||50} height={f.h||24} viewBox="0 0 50 24" fill="none">
        <ellipse cx="24" cy="12" rx="18" ry="9" fill={f.color||'#67e8f9'}/>
        <path d="M42 12 L52 5 L52 19 Z" fill={f.fin||'#22d3ee'}/>
        <circle cx="9" cy="10" r="3" fill="white"/><circle cx="8" cy="10" r="1.5" fill="#0f172a"/>
      </svg>
    }
  }

  return (
    <div style={{ position:'absolute', left:f.x, top:`${f.y}%`, transform:`translateY(${wobbleY}px)` }}>
      <div style={{ transform:`scaleX(${scaleX})`, display:'block' }}>
        {body()}
      </div>
    </div>
  )
}

// OceanFloor removed — no floor needed

// ─── BIOLUMINESCENT PARTICLES ─────────────────────────────────────────────────

function Particles({ progress }) {
  const opacity = Math.max(0, Math.min(1, (progress - 0.45) * 3))
  if (opacity === 0) return null

  // Pre-computed positions so they don't re-randomize
  const dots = useRef(Array.from({ length: 22 }, (_, i) => ({
    x: (i * 37 + 11) % 97,
    y: (i * 53 + 7)  % 93,
    size: 1.5 + (i % 3),
    color: ['#38bdf8','#67e8f9','#86efac','#c4b5fd','#a5f3fc'][i % 5],
    dur: 2.5 + (i % 4) * 0.8,
    delay: (i % 5) * 0.4,
  }))).current

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 2, pointerEvents: 'none', opacity }}>
      {dots.map((d, i) => (
        <div key={i} style={{
          position: 'absolute',
          left: `${d.x}%`, top: `${d.y}%`,
          width: d.size, height: d.size,
          borderRadius: '50%',
          background: d.color,
          boxShadow: `0 0 ${d.size * 3}px ${d.color}`,
          animation: `bioFloat ${d.dur}s ease-in-out ${d.delay}s infinite alternate`,
        }}/>
      ))}
      <style>{`
        @keyframes bioFloat {
          from { transform: translate(0,0); opacity: 0.3; }
          to   { transform: translate(6px,-10px); opacity: 0.9; }
        }
      `}</style>
    </div>
  )
}

// ─── LIGHT RAYS ───────────────────────────────────────────────────────────────

function LightRays({ progress }) {
  const opacity = Math.max(0, 1 - progress * 4)
  if (opacity < 0.02) return null
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none', overflow: 'hidden' }}>
      {[...Array(7)].map((_, i) => (
        <div key={i} style={{
          position: 'absolute', top: 0,
          left: `${8 + i * 13}%`,
          width: '70px', height: '100vh',
          background: 'linear-gradient(to bottom, rgba(255,255,255,0.07) 0%, transparent 65%)',
          transform: `rotate(${-18 + i * 6}deg)`,
          transformOrigin: 'top center',
          opacity: opacity * 0.8,
          animation: `ray${i % 3} ${2.5 + i * 0.4}s ease-in-out infinite alternate`,
        }}/>
      ))}
      <style>{`
        @keyframes ray0 { from{transform:rotate(-18deg)} to{transform:rotate(-12deg)} }
        @keyframes ray1 { from{transform:rotate(-6deg)}  to{transform:rotate(0deg)} }
        @keyframes ray2 { from{transform:rotate(6deg)}   to{transform:rotate(12deg)} }
      `}</style>
    </div>
  )
}

// ─── SEAWEED ──────────────────────────────────────────────────────────────────

function Seaweed({ progress }) {
  const raw = progress < 0.25 ? (progress - 0.15) * 10 : progress > 0.78 ? (0.85 - progress) * 14 : 1
  const opacity = Math.max(0, Math.min(1, raw))
  if (opacity < 0.02) return null

  const plants = [
    { x:'2%',  h:170, color:'#065f46', d:'0s' },
    { x:'6%',  h:130, color:'#047857', d:'0.4s' },
    { x:'11%', h:100, color:'#064e3b', d:'0.9s' },
    { x:'86%', h:150, color:'#047857', d:'0.2s' },
    { x:'91%', h:190, color:'#065f46', d:'0.7s' },
    { x:'96%', h:120, color:'#064e3b', d:'1.1s' },
  ]

  return (
    <div style={{ position:'fixed', bottom:0, left:0, right:0, zIndex:3, pointerEvents:'none', opacity }}>
      {plants.map((p,i) => (
        <div key={i} style={{ position:'absolute', bottom:0, left:p.x }}>
          <svg width="26" height={p.h} viewBox={`0 0 26 ${p.h}`} fill="none">
            <path d={`M13 ${p.h} Q4 ${p.h*.72} 13 ${p.h*.48} Q22 ${p.h*.24} 13 0`}
              stroke={p.color} strokeWidth="7" fill="none" strokeLinecap="round"
              style={{ animation:`weed 2.2s ease-in-out infinite alternate`, animationDelay:p.d }}/>
          </svg>
        </div>
      ))}
      <style>{`@keyframes weed { from{transform:rotate(-6deg) translateX(-2px)} to{transform:rotate(6deg) translateX(2px)} }`}</style>
    </div>
  )
}

// ─── DEPTH INDICATOR ──────────────────────────────────────────────────────────

function DepthIndicator({ progress }) {
  const labels = ['0m · Surface','10m · Sunlit','50m · Twilight','200m · Midnight','1000m · Abyss']
  const idx = Math.min(Math.floor(progress * 5), 4)
  return (
    <div style={{
      position:'fixed', right:'20px', top:'50%', transform:'translateY(-50%)',
      zIndex:50, display:'flex', flexDirection:'column', alignItems:'flex-end', gap:'6px',
    }}>
      <div style={{ width:'2px', height:'100px', background:'rgba(255,255,255,0.08)', borderRadius:'2px', position:'relative', overflow:'hidden' }}>
        <div style={{
          position:'absolute', top:0, left:0, right:0,
          height:`${progress*100}%`,
          background:'linear-gradient(to bottom, #67e8f9, #0369a1)',
          borderRadius:'2px', transition:'height 0.3s ease',
        }}/>
      </div>
      <span style={{ fontFamily:'var(--font-mono)', fontSize:'9px', color:'rgba(255,255,255,0.35)', textAlign:'right', maxWidth:'90px', lineHeight:1.3 }}>
        {labels[idx]}
      </span>
    </div>
  )
}

// ─── NAVBAR ───────────────────────────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <nav style={{
      position:'fixed', top:0, left:0, right:0, zIndex:100,
      padding:'0 32px', height:'60px',
      display:'flex', alignItems:'center', justifyContent:'space-between',
      background: scrolled ? 'rgba(2,14,26,0.75)' : 'transparent',
      backdropFilter: scrolled ? 'blur(14px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : 'none',
      transition:'all 0.3s',
    }}>
      <span style={{ fontFamily:'var(--font-mono)', fontSize:'14px', color:'#67e8f9', letterSpacing:'0.05em' }}>
        carter.dev
      </span>
      <div style={{ display:'flex', gap:'28px' }}>
        {['#work','#about','#contact'].map(h => (
          <a key={h} href={h} style={{ fontSize:'13px', color:'rgba(255,255,255,0.55)', textDecoration:'none', transition:'color 0.2s' }}
            onMouseEnter={e=>e.target.style.color='#67e8f9'}
            onMouseLeave={e=>e.target.style.color='rgba(255,255,255,0.55)'}>
            {h.replace('#','')}
          </a>
        ))}
      </div>
      <a href="mailto:carteryax@gmail.com" style={{
        fontSize:'13px', fontWeight:600, color:'#020e1a',
        background:'#38bdf8', padding:'8px 18px', borderRadius:'8px',
        textDecoration:'none', transition:'background 0.2s',
      }}
      onMouseEnter={e=>e.target.style.background='#67e8f9'}
      onMouseLeave={e=>e.target.style.background='#38bdf8'}>
        Hire me
      </a>
    </nav>
  )
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────

export default function OceanPortfolio() {
  const [scrollY,   setScrollY]   = useState(0)
  const [maxScroll, setMaxScroll] = useState(1)
  const [formData,  setFormData]  = useState({ name:'', email:'', message:'' })
  const [formStatus,setFormStatus]= useState('idle')
  const fish    = useFish()
  const bubbles = useBubbles()

  useEffect(() => {
    const update = () => {
      setScrollY(window.scrollY)
      setMaxScroll(document.body.scrollHeight - window.innerHeight)
    }
    window.addEventListener('scroll', update, { passive:true })
    window.addEventListener('resize', update)
    update()
    return () => { window.removeEventListener('scroll',update); window.removeEventListener('resize',update) }
  }, [])

  const progress = maxScroll > 0 ? Math.min(scrollY / maxScroll, 1) : 0

  const handleSubmit = async (e) => {
    e.preventDefault(); setFormStatus('sending')
    try {
      const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method:'POST',
        headers:{ 'Content-Type':'application/json', Accept:'application/json' },
        body: JSON.stringify(formData),
      })
      setFormStatus(res.ok ? 'success' : 'error')
      if (res.ok) setFormData({ name:'', email:'', message:'' })
    } catch { setFormStatus('error') }
  }

  const glass = {
    background:'rgba(255,255,255,0.05)',
    border:'1px solid rgba(255,255,255,0.09)',
    borderRadius:'16px',
    backdropFilter:'blur(14px)',
    padding:'28px',
  }

  const section = (extra={}) => ({
    position:'relative', zIndex:10,
    padding:'90px 0',
    ...extra,
  })

  const container = {
    maxWidth:'900px', margin:'0 auto', padding:'0 32px', width:'100%',
  }

  return (
    <>
      {/* ── FIXED OCEAN BACKGROUND ── */}
      <div style={{
        position:'fixed', inset:0, zIndex:0,
        background: getBg(progress),
        // No CSS transition — we interpolate manually each frame so it's perfectly smooth
      }}/>

      <LightRays   progress={progress} />
      <Seaweed     progress={progress} />
      <Particles   progress={progress} />

      {/* Bubbles */}
      <div style={{ position:'fixed', inset:0, zIndex:2, pointerEvents:'none', overflow:'hidden' }}>
        {bubbles.map(b => (
          <div key={b.id} style={{
            position:'absolute',
            left:`${b.x}%`, top:`${b.y}%`,
            width:b.size, height:b.size,
            borderRadius:'50%',
            border:'1px solid rgba(255,255,255,0.55)',
            background:'rgba(255,255,255,0.04)',
            opacity:b.opacity,
          }}/>
        ))}
      </div>

      {/* Fish — fade in/out by depth, only visible at screen edges */}
      <div style={{ position:'fixed', inset:0, zIndex:2, pointerEvents:'none', overflow:'hidden' }}>
        {fish.map(f => {
          // How close is scroll progress to this fish's depth zone
          const dist = Math.abs(f.depth - progress)
          // Fade window: full opacity within 0.18, fades out by 0.30
          const opacity = dist > 0.30 ? 0 : dist > 0.18 ? 1 - ((dist - 0.18) / 0.12) : 1
          if (opacity <= 0) return null
          // Only render — opacity handles the seamless fade
          return (
            <div key={f.id} style={{ opacity, transition: 'opacity 1.2s ease' }}>
              <FishSVG f={f} />
            </div>
          )
        })}
      </div>

      <DepthIndicator progress={progress} />
      <Navbar />

      {/* ── SCROLLABLE CONTENT ── */}
      <div style={{ position:'relative', zIndex:10 }}>

        {/* HERO */}
        <section style={{ ...section(), minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <div style={{ ...container, textAlign:'center' }}>
            <div style={{
              width:'80px', height:'3px', margin:'0 auto 36px',
              background:'linear-gradient(90deg,transparent,rgba(255,255,255,0.7),transparent)',
              borderRadius:'2px', animation:'ripple 2.2s ease-in-out infinite',
            }}/>
            <style>{`
              @keyframes ripple { 0%,100%{width:50px;opacity:0.3} 50%{width:130px;opacity:0.9} }
              @keyframes pulse  { 0%,100%{opacity:1} 50%{opacity:0.35} }
              @keyframes fadeDown { 0%{opacity:0;transform:translateY(-8px)} 50%{opacity:1} 100%{opacity:0;transform:translateY(8px)} }
            `}</style>

            <div style={{
              display:'inline-flex', alignItems:'center', gap:'8px',
              background:'rgba(16,185,129,0.12)', border:'1px solid rgba(16,185,129,0.28)',
              borderRadius:'999px', padding:'6px 16px', marginBottom:'28px',
            }}>
              <div style={{ width:'6px', height:'6px', borderRadius:'50%', background:'#34d399', animation:'pulse 2s infinite' }}/>
              <span style={{ fontSize:'12px', color:'#6ee7b7', fontWeight:500 }}>Available for new projects</span>
            </div>

            <p style={{ fontFamily:'var(--font-mono)', color:'#67e8f9', fontSize:'13px', marginBottom:'12px', letterSpacing:'0.12em' }}>Hi, I'm</p>
            <h1 style={{
              fontSize:'clamp(52px,10vw,96px)', fontWeight:800, color:'white',
              lineHeight:1.05, marginBottom:'16px', letterSpacing:'-0.02em',
              textShadow:'0 0 60px rgba(56,189,248,0.25), 0 4px 24px rgba(0,0,0,0.6)',
            }}>Carter Yax</h1>
            <h2 style={{ fontSize:'clamp(18px,3vw,28px)', fontWeight:500, color:'rgba(255,255,255,0.7)', marginBottom:'20px', lineHeight:1.4 }}>
              I build websites & web apps{' '}
              <span style={{ color:'#67e8f9' }}>for businesses.</span>
            </h2>
            <p style={{ fontSize:'16px', color:'rgba(255,255,255,0.5)', maxWidth:'480px', margin:'0 auto 40px', lineHeight:1.75 }}>
              Frontend developer based in Big Rapids, MI. React, Next.js, and a passion for building things that actually work.
            </p>

            <div style={{ display:'flex', gap:'16px', justifyContent:'center', flexWrap:'wrap', marginBottom:'48px' }}>
              <a href="#work" style={{
                padding:'14px 32px', background:'#38bdf8', color:'#020e1a',
                fontWeight:700, borderRadius:'12px', textDecoration:'none', fontSize:'14px',
                boxShadow:'0 0 32px rgba(56,189,248,0.28)', transition:'all 0.2s',
              }}>See my work</a>
              <a href="mailto:carteryax@gmail.com" style={{
                padding:'14px 32px', background:'rgba(255,255,255,0.07)',
                border:'1px solid rgba(255,255,255,0.18)', color:'white',
                fontWeight:600, borderRadius:'12px', textDecoration:'none', fontSize:'14px',
                backdropFilter:'blur(8px)',
              }}>Get in touch</a>
            </div>

            <div style={{ display:'flex', gap:'24px', justifyContent:'center' }}>
              {socials.map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  style={{ fontSize:'12px', color:'rgba(255,255,255,0.38)', textDecoration:'none', transition:'color 0.2s', letterSpacing:'0.04em' }}
                  onMouseEnter={e=>e.target.style.color='#67e8f9'}
                  onMouseLeave={e=>e.target.style.color='rgba(255,255,255,0.38)'}>
                  {s.label}
                </a>
              ))}
            </div>

            <div style={{ marginTop:'64px', display:'flex', flexDirection:'column', alignItems:'center', gap:'8px', opacity:0.45 }}>
              <span style={{ fontFamily:'var(--font-mono)', fontSize:'10px', color:'rgba(255,255,255,0.7)', letterSpacing:'0.2em' }}>DIVE IN</span>
              <div style={{ width:'1px', height:'44px', background:'linear-gradient(to bottom, rgba(255,255,255,0.7), transparent)', animation:'fadeDown 1.6s ease-in-out infinite' }}/>
            </div>
          </div>
        </section>

        {/* WORK */}
        <section id="work" style={section()}>
          <div style={container}>
            <div style={{ marginBottom:'44px' }}>
              <p style={{ fontFamily:'var(--font-mono)', color:'#67e8f9', fontSize:'10px', letterSpacing:'0.22em', marginBottom:'8px' }}>02. WORK</p>
              <h2 style={{ fontSize:'clamp(26px,5vw,42px)', fontWeight:800, color:'white', letterSpacing:'-0.02em' }}>Selected projects</h2>
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:'18px' }}>
              {projects.map((p,i) => (
                <div key={p.title} style={{ ...glass, borderLeft:`3px solid ${p.color}`, transition:'transform 0.2s' }}
                  onMouseEnter={e=>e.currentTarget.style.transform='translateX(6px)'}
                  onMouseLeave={e=>e.currentTarget.style.transform='translateX(0)'}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', flexWrap:'wrap', gap:'12px', marginBottom:'12px' }}>
                    <div>
                      <span style={{ fontSize:'10px', fontFamily:'var(--font-mono)', color:p.color, letterSpacing:'0.1em' }}>{p.type}</span>
                      <h3 style={{ fontSize:'21px', fontWeight:700, color:'white', marginTop:'4px' }}>{p.title}</h3>
                    </div>
                    {p.live && (
                      <a href={p.live} target="_blank" rel="noopener noreferrer" style={{
                        fontSize:'12px', fontWeight:600, color:'#020e1a',
                        background:p.color, padding:'7px 16px', borderRadius:'8px', textDecoration:'none', flexShrink:0,
                      }}>Live site ↗</a>
                    )}
                  </div>
                  <p style={{ fontSize:'14px', color:'rgba(255,255,255,0.52)', lineHeight:1.75, marginBottom:'16px' }}>{p.description}</p>
                  <div style={{ display:'flex', gap:'7px', flexWrap:'wrap' }}>
                    {p.tags.map(t => (
                      <span key={t} style={{
                        fontSize:'10px', fontFamily:'var(--font-mono)', color:'rgba(255,255,255,0.4)',
                        background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.07)',
                        padding:'3px 10px', borderRadius:'999px',
                      }}>{t}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" style={section()}>
          <div style={container}>
            <div style={{ marginBottom:'44px' }}>
              <p style={{ fontFamily:'var(--font-mono)', color:'#67e8f9', fontSize:'10px', letterSpacing:'0.22em', marginBottom:'8px' }}>03. ABOUT</p>
              <h2 style={{ fontSize:'clamp(26px,5vw,42px)', fontWeight:800, color:'white', letterSpacing:'-0.02em' }}>About me</h2>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:'28px' }}>
              <div style={glass}>
                <div style={{ display:'flex', flexDirection:'column', gap:'14px', fontSize:'15px', color:'rgba(255,255,255,0.6)', lineHeight:1.8 }}>
                  <p>I'm Carter — a self-taught frontend developer based in Big Rapids, Michigan. I build fast, polished websites and web apps that help businesses look professional and work reliably.</p>
                  <p>I started building on the web because I wanted to create real things that real people use. Whether it's a local restaurant needing a better site or a startup needing an MVP — I care about the craft and the end result.</p>
                  <p>Currently open to freelance projects and looking to take on new clients.</p>
                </div>
                <a href="mailto:carteryax@gmail.com" style={{ display:'inline-block', marginTop:'22px', fontSize:'14px', color:'#67e8f9', textDecoration:'none', fontWeight:500 }}>
                  carteryax@gmail.com →
                </a>
              </div>
              <div style={glass}>
                <p style={{ fontFamily:'var(--font-mono)', fontSize:'10px', color:'rgba(255,255,255,0.3)', letterSpacing:'0.18em', marginBottom:'18px' }}>TECH I WORK WITH</p>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px' }}>
                  {skills.map(s => (
                    <div key={s} style={{ display:'flex', alignItems:'center', gap:'8px', fontSize:'13px', color:'rgba(255,255,255,0.65)' }}>
                      <span style={{ color:'#67e8f9', fontSize:'9px', fontFamily:'var(--font-mono)' }}>▹</span>{s}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" style={{ ...section(), paddingBottom:'160px' }}>
          <div style={container}>
            <div style={{ marginBottom:'44px' }}>
              <p style={{ fontFamily:'var(--font-mono)', color:'#67e8f9', fontSize:'10px', letterSpacing:'0.22em', marginBottom:'8px' }}>04. CONTACT</p>
              <h2 style={{ fontSize:'clamp(26px,5vw,42px)', fontWeight:800, color:'white', letterSpacing:'-0.02em' }}>Let's work together</h2>
              <p style={{ fontSize:'15px', color:'rgba(255,255,255,0.48)', marginTop:'12px', maxWidth:'460px', lineHeight:1.7 }}>
                Have a project in mind? I'm available for freelance work and always happy to hear from new people.
              </p>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))', gap:'28px' }}>
              <div style={{ display:'flex', flexDirection:'column', gap:'22px' }}>
                {[
                  { label:'EMAIL',    value:'carteryax@gmail.com', href:'mailto:carteryax@gmail.com' },
                  { label:'BASED IN', value:'Big Rapids, Michigan', href:null },
                ].map(item => (
                  <div key={item.label}>
                    <p style={{ fontFamily:'var(--font-mono)', fontSize:'9px', color:'rgba(255,255,255,0.28)', letterSpacing:'0.22em', marginBottom:'6px' }}>{item.label}</p>
                    {item.href
                      ? <a href={item.href} style={{ color:'white', textDecoration:'none', fontSize:'15px', transition:'color 0.2s' }}
                           onMouseEnter={e=>e.target.style.color='#67e8f9'}
                           onMouseLeave={e=>e.target.style.color='white'}>{item.value}</a>
                      : <p style={{ color:'white', fontSize:'15px' }}>{item.value}</p>
                    }
                  </div>
                ))}
                <div>
                  <p style={{ fontFamily:'var(--font-mono)', fontSize:'9px', color:'rgba(255,255,255,0.28)', letterSpacing:'0.22em', marginBottom:'12px' }}>SOCIAL</p>
                  {socials.map(s => (
                    <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                      style={{ display:'block', fontSize:'14px', color:'rgba(255,255,255,0.45)', textDecoration:'none', marginBottom:'8px', transition:'color 0.2s' }}
                      onMouseEnter={e=>e.target.style.color='#67e8f9'}
                      onMouseLeave={e=>e.target.style.color='rgba(255,255,255,0.45)'}>
                      {s.label} ↗
                    </a>
                  ))}
                </div>
              </div>

              <div style={glass}>
                {formStatus === 'success' ? (
                  <div style={{ padding:'20px', border:'1px solid rgba(52,211,153,0.3)', borderRadius:'12px', background:'rgba(16,185,129,0.1)', color:'#6ee7b7', fontSize:'14px' }}>
                    Message sent! I'll get back to you soon.
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:'14px' }}>
                    {[
                      { name:'name',  label:'NAME',  type:'text',  ph:'Your name' },
                      { name:'email', label:'EMAIL', type:'email', ph:'your@email.com' },
                    ].map(f => (
                      <div key={f.name}>
                        <label style={{ display:'block', fontFamily:'var(--font-mono)', fontSize:'9px', color:'rgba(255,255,255,0.3)', letterSpacing:'0.2em', marginBottom:'8px' }}>{f.label}</label>
                        <input type={f.type} name={f.name} required placeholder={f.ph}
                          value={formData[f.name]} onChange={e=>setFormData({...formData,[f.name]:e.target.value})}
                          style={{ width:'100%', background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:'10px', padding:'11px 14px', color:'white', fontSize:'14px', outline:'none', boxSizing:'border-box' }}/>
                      </div>
                    ))}
                    <div>
                      <label style={{ display:'block', fontFamily:'var(--font-mono)', fontSize:'9px', color:'rgba(255,255,255,0.3)', letterSpacing:'0.2em', marginBottom:'8px' }}>MESSAGE</label>
                      <textarea name="message" required rows={4} placeholder="Tell me about your project..."
                        value={formData.message} onChange={e=>setFormData({...formData,message:e.target.value})}
                        style={{ width:'100%', background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:'10px', padding:'11px 14px', color:'white', fontSize:'14px', outline:'none', resize:'none', boxSizing:'border-box' }}/>
                    </div>
                    {formStatus==='error' && <p style={{ color:'#f87171', fontSize:'12px' }}>Something went wrong. Try again.</p>}
                    <button type="submit" disabled={formStatus==='sending'} style={{
                      padding:'13px', background:'#38bdf8', color:'#020e1a',
                      fontWeight:700, borderRadius:'10px', border:'none',
                      fontSize:'14px', cursor:'pointer', transition:'background 0.2s',
                    }}>{formStatus==='sending' ? 'Sending...' : 'Send message'}</button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer style={{
          position:'relative', zIndex:10,
          borderTop:'1px solid rgba(255,255,255,0.05)',
          padding:'24px 32px',
          display:'flex', flexWrap:'wrap', justifyContent:'space-between', alignItems:'center', gap:'12px',
        }}>
          <p style={{ fontFamily:'var(--font-mono)', fontSize:'10px', color:'rgba(255,255,255,0.22)' }}>
            © {new Date().getFullYear()} Carter Yax. Built with Next.js & Tailwind.
          </p>
          <div style={{ display:'flex', gap:'20px' }}>
            {socials.map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                style={{ fontSize:'10px', color:'rgba(255,255,255,0.22)', textDecoration:'none', transition:'color 0.2s' }}
                onMouseEnter={e=>e.target.style.color='#67e8f9'}
                onMouseLeave={e=>e.target.style.color='rgba(255,255,255,0.22)'}>
                {s.label}
              </a>
            ))}
          </div>
        </footer>
      </div>
    </>
  )
}