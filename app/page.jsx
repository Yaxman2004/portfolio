'use client'

import { useEffect, useRef, useState } from 'react'

// ─── DATA ─────────────────────────────────────────────────────────────────────

const projects = [
  {
    title: "Schuberg's Bar & Grill",
    type: 'Client Concept',
    description: 'Full redesign of a 90-year-old Big Rapids, MI institution. Custom 5-page site with interactive menu, history timeline, and photo gallery — replacing a dated Wix site.',
    tags: ['Next.js', 'Tailwind CSS', 'Vercel'],
    live: 'https://schubergsbar-site.vercel.app',
    color: '#f59e0b',
  },
  {
    title: "Belle's Coffeehouse",
    type: 'Client Concept',
    description: 'Modern rustic site for a downtown coffee shop. Full menu, hours, about section, and contact — built to replace a Facebook-only presence.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    live: 'https://belles-mockup.vercel.app',
    color: '#d97706',
  },
  {
    title: 'Apex Excavating & Underground',
    type: 'Client Concept',
    description: 'Bold industrial site for a Northern Michigan excavating contractor. Services, project types, contact form, and quote request — built to get them their first web leads.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    live: 'https://apex-mockup.vercel.app',
    color: '#d4621a',
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

// ─── OCEAN CANVAS — single unified draw loop ──────────────────────────────────

function OceanCanvas({ progressRef }) {
  const canvasRef  = useRef(null)
  const ripplesRef = useRef([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    let t = 0

    // Click ripples + fish flee away from click point
    const handleClick = (e) => {
      ripplesRef.current.push({ x: e.clientX, y: e.clientY, age: 0 })
      fishState.forEach(f => {
        const fy = f._sy || 0
        const dist = Math.hypot(f.x - e.clientX, fy - e.clientY)
        if (dist < 220) {
          // Flee direction: away from click point
          const fleeDir = f.x < e.clientX ? -1 : 1  // swim away left or right
          const origSpeed = f._baseSpeed || f.speed
          f._baseSpeed = origSpeed
          f.dir = fleeDir       // flip to face flee direction
          f.speed = origSpeed * 4.5
          setTimeout(() => {
            f.speed = origSpeed
            // don't reset dir — let them keep swimming the new way naturally
          }, 1400)
        }
      })
    }
    window.addEventListener('click', handleClick)

    // Fish state
    const fishDefs = [
      // Each fish has a worldY (0=surface, 1=bottom) — fish appear at that depth
      // and scroll off screen naturally as camera moves down. No fading.
      // SHALLOW
      { type:'clown',     w:32,  h:18, color:'#f97316', stripe:'#ffffff', fin:'#ea580c', worldY:0.28, screenY:0.35, speed:0.7,  dir:1  },
      { type:'tang',      w:36,  h:22, color:'#2563eb', stripe:'#facc15', fin:'#1d4ed8', worldY:0.32, screenY:0.55, speed:0.5,  dir:-1 },
      { type:'parrot',    w:42,  h:22, color:'#0d9488', stripe:'#5eead4', fin:'#0f766e', worldY:0.36, screenY:0.70, speed:0.6,  dir:1  },
      { type:'damsel',    w:28,  h:16, color:'#eab308', stripe:'#fde047', fin:'#ca8a04', worldY:0.30, screenY:0.45, speed:0.8,  dir:-1 },
      { type:'surgeon',   w:38,  h:20, color:'#38bdf8', stripe:'#7dd3fc', fin:'#0284c7', worldY:0.40, screenY:0.65, speed:0.55, dir:1  },
      { type:'clown',     w:28,  h:16, color:'#ef4444', stripe:'#fca5a5', fin:'#dc2626', worldY:0.44, screenY:0.30, speed:0.9,  dir:-1 },
      // MID
      { type:'tuna',      w:72,  h:26, color:'#1e3a5f', stripe:'#64748b', fin:'#0f2744', worldY:0.48, screenY:0.40, speed:0.9,  dir:1  },
      { type:'barracuda', w:90,  h:16, color:'#475569', stripe:'#94a3b8', fin:'#334155', worldY:0.52, screenY:0.25, speed:1.1,  dir:-1 },
      { type:'grouper',   w:58,  h:30, color:'#78350f', stripe:'#a16207', fin:'#5c2d04', worldY:0.54, screenY:0.60, speed:0.6,  dir:1  },
      { type:'mahi',      w:64,  h:28, color:'#065f46', stripe:'#f59e0b', fin:'#047857', worldY:0.58, screenY:0.75, speed:0.7,  dir:-1 },
      { type:'shark',     w:120, h:40, color:'#374151', belly:'#d1d5db',  fin:'#1f2937', worldY:0.62, screenY:0.50, speed:0.5,  dir:1  },
      { type:'barracuda', w:80,  h:14, color:'#334155', stripe:'#64748b', fin:'#1e293b', worldY:0.56, screenY:0.35, speed:1.3,  dir:-1 },
      // DEEP
      { type:'oarfish',   w:160, h:14, color:'#94a3b8', stripe:'#e2e8f0', fin:'#64748b', worldY:0.72, screenY:0.45, speed:0.25, dir:-1 },
      { type:'dragon',    w:80,  h:18, color:'#0c1445', glow:'#38bdf8',   fin:'#1e3a8a', worldY:0.78, screenY:0.60, speed:0.4,  dir:1  },
      { type:'jelly',     w:44,  h:54, color:'#7c3aed', glow:'#c4b5fd',   fin:'#6d28d9', worldY:0.84, screenY:0.35, speed:0.15, dir:-1 },
      { type:'shark',     w:100, h:34, color:'#1f2937', belly:'#9ca3af',   fin:'#111827', worldY:0.90, screenY:0.55, speed:0.45, dir:1  },
      { type:'jelly',     w:36,  h:44, color:'#4c1d95', glow:'#a78bfa',   fin:'#5b21b6', worldY:0.95, screenY:0.70, speed:0.12, dir:1  },
    ]

    const W0 = window.innerWidth
    const fishState = fishDefs.map((f) => ({
      ...f,
      x: f.dir === 1 ? -f.w - 50 - Math.random()*300 : W0 + 50 + Math.random()*300,
      wobble: Math.random() * Math.PI * 2,
    }))

    // Bubbles
    const bubbles = Array.from({length:16}, () => ({
      x: Math.random(),
      y: 0.7 + Math.random()*0.3,
      size: 2 + Math.random()*5,
      speed: 0.00015 + Math.random()*0.0003,
      drift: Math.random()*Math.PI*2,
      opacity: 0.15 + Math.random()*0.3,
    }))

    // Seaweed
    const weeds = [0.02, 0.06, 0.10, 0.87, 0.92, 0.97].map((x,i) => ({
      x, h: 0.12 + Math.random()*0.1,
      color: ['#065f46','#047857','#064e3b'][i%3],
      phase: Math.random()*Math.PI*2,
    }))

    // Bioluminescent particles
    const particles = Array.from({length:22}, (_,i) => ({
      x: Math.random(), y: Math.random(),
      size: 1.5 + (i%3)*0.6,
      color: ['#38bdf8','#67e8f9','#86efac','#c4b5fd','#a5f3fc'][i%5],
      phase: Math.random()*Math.PI*2,
      speed: 0.3 + Math.random()*0.5,
    }))

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const lerp = (a,b,t) => a+(b-a)*t
    const clamp = (v,lo,hi) => Math.max(lo,Math.min(hi,v))
    const ease = (t) => t*t*(3-2*t) // smoothstep

    // ── Draw fish ──────────────────────────────────────────────────────────────
    const drawFish = (ctx, f, opacity, W, H) => {
      if (opacity <= 0) return
      ctx.save()
      ctx.globalAlpha = opacity

      const px = f.x
      const py = f.screenY + Math.sin(f.wobble) * 5
      ctx.translate(px, py)
      if (f.dir === 1) ctx.scale(-1, 1) // flip for rightward swimmers

      switch(f.type) {
        case 'clown': {
          ctx.fillStyle = f.color
          ctx.beginPath(); ctx.ellipse(0,-9,14,8,0,0,Math.PI*2); ctx.fill()
          ctx.fillStyle = f.stripe; ctx.globalAlpha = opacity*0.9
          ctx.fillRect(-4,-17,3,16); ctx.fillRect(3,-16,2.5,14)
          ctx.fillStyle = f.color; ctx.globalAlpha = opacity
          ctx.beginPath(); ctx.moveTo(14,-9); ctx.lineTo(20,-4); ctx.lineTo(20,-14); ctx.fill()
          ctx.fillStyle='white'; ctx.beginPath(); ctx.arc(-8,-11,2.5,0,Math.PI*2); ctx.fill()
          ctx.fillStyle='#1e293b'; ctx.beginPath(); ctx.arc(-8.5,-11,1.2,0,Math.PI*2); ctx.fill()
          break
        }
        case 'tang': {
          ctx.fillStyle = f.color
          ctx.beginPath(); ctx.ellipse(0,-11,16,10,0,0,Math.PI*2); ctx.fill()
          ctx.strokeStyle = f.stripe; ctx.lineWidth=2.5; ctx.globalAlpha=opacity*0.8
          ctx.beginPath(); ctx.moveTo(-10,-2); ctx.quadraticCurveTo(0,-25,10,-2); ctx.stroke()
          ctx.globalAlpha = opacity
          ctx.fillStyle = f.fin
          ctx.beginPath(); ctx.moveTo(16,-11); ctx.lineTo(22,-5); ctx.lineTo(22,-17); ctx.fill()
          ctx.fillStyle='white'; ctx.beginPath(); ctx.arc(-9,-13,3,0,Math.PI*2); ctx.fill()
          ctx.fillStyle='#1e293b'; ctx.beginPath(); ctx.arc(-9,-13,1.5,0,Math.PI*2); ctx.fill()
          break
        }
        case 'parrot': {
          ctx.fillStyle = f.color
          ctx.beginPath(); ctx.ellipse(0,-11,18,10,0,0,Math.PI*2); ctx.fill()
          ctx.fillStyle = f.fin
          ctx.beginPath(); ctx.moveTo(18,-11); ctx.lineTo(25,-5); ctx.lineTo(25,-17); ctx.fill()
          ctx.strokeStyle=f.stripe; ctx.lineWidth=3; ctx.globalAlpha=opacity*0.8
          ctx.beginPath(); ctx.moveTo(-8,-2); ctx.quadraticCurveTo(0,-24,8,-2); ctx.stroke()
          ctx.globalAlpha=opacity
          ctx.fillStyle='white'; ctx.beginPath(); ctx.arc(-10,-10,3,0,Math.PI*2); ctx.fill()
          ctx.fillStyle='#1e293b'; ctx.beginPath(); ctx.arc(-10,-10,1.5,0,Math.PI*2); ctx.fill()
          break
        }
        case 'damsel': {
          ctx.fillStyle = f.color
          ctx.beginPath(); ctx.ellipse(0,-8,12,7,0,0,Math.PI*2); ctx.fill()
          ctx.fillStyle=f.fin
          ctx.beginPath(); ctx.moveTo(12,-8); ctx.lineTo(17,-4); ctx.lineTo(17,-12); ctx.fill()
          ctx.fillStyle='white'; ctx.beginPath(); ctx.arc(-6,-9,2.2,0,Math.PI*2); ctx.fill()
          ctx.fillStyle='#1e293b'; ctx.beginPath(); ctx.arc(-6,-9,1.1,0,Math.PI*2); ctx.fill()
          break
        }
        case 'surgeon': {
          ctx.fillStyle=f.color
          ctx.beginPath(); ctx.ellipse(0,-10,16,9,0,0,Math.PI*2); ctx.fill()
          ctx.fillStyle=f.fin
          ctx.beginPath(); ctx.moveTo(16,-10); ctx.lineTo(22,-5); ctx.lineTo(22,-15); ctx.fill()
          ctx.strokeStyle=f.stripe; ctx.lineWidth=2; ctx.globalAlpha=opacity*0.7
          ctx.beginPath(); ctx.moveTo(-8,-2); ctx.quadraticCurveTo(0,-22,8,-2); ctx.stroke()
          ctx.globalAlpha=opacity
          ctx.fillStyle='white'; ctx.beginPath(); ctx.arc(-8,-11,3,0,Math.PI*2); ctx.fill()
          ctx.fillStyle='#1e293b'; ctx.beginPath(); ctx.arc(-8,-11,1.5,0,Math.PI*2); ctx.fill()
          break
        }
        case 'tuna': {
          ctx.fillStyle=f.color
          ctx.beginPath(); ctx.ellipse(0,-13,32,11,0,0,Math.PI*2); ctx.fill()
          ctx.fillStyle=f.stripe; ctx.globalAlpha=opacity*0.2
          ctx.beginPath(); ctx.ellipse(0,-9,30,5,0,0,Math.PI*2); ctx.fill()
          ctx.globalAlpha=opacity
          ctx.fillStyle=f.fin
          ctx.beginPath(); ctx.moveTo(32,-13); ctx.lineTo(42,-6); ctx.lineTo(42,-20); ctx.fill()
          ctx.beginPath(); ctx.moveTo(22,-4); ctx.lineTo(30,-2); ctx.lineTo(28,-7); ctx.fill()
          ctx.beginPath(); ctx.moveTo(22,-22); ctx.lineTo(30,-24); ctx.lineTo(28,-19); ctx.fill()
          ctx.fillStyle='white'; ctx.globalAlpha=opacity*0.8
          ctx.beginPath(); ctx.arc(-20,-15,4,0,Math.PI*2); ctx.fill()
          ctx.fillStyle='#0f172a'; ctx.globalAlpha=opacity
          ctx.beginPath(); ctx.arc(-20,-15,2,0,Math.PI*2); ctx.fill()
          break
        }
        case 'barracuda': {
          ctx.fillStyle=f.color
          ctx.beginPath(); ctx.ellipse(0,-8,44,6,0,0,Math.PI*2); ctx.fill()
          ctx.fillStyle=f.stripe; ctx.globalAlpha=opacity*0.25
          ctx.beginPath(); ctx.ellipse(0,-8,44,3,0,0,Math.PI*2); ctx.fill()
          ctx.globalAlpha=opacity
          ctx.fillStyle=f.fin
          ctx.beginPath(); ctx.moveTo(44,-8); ctx.lineTo(52,-4); ctx.lineTo(52,-12); ctx.fill()
          // pointy mouth
          ctx.fillStyle=f.stripe; ctx.globalAlpha=opacity*0.85
          ctx.beginPath(); ctx.moveTo(-44,-7); ctx.lineTo(-52,-8); ctx.lineTo(-44,-9); ctx.fill()
          ctx.globalAlpha=opacity
          ctx.fillStyle='white'; ctx.beginPath(); ctx.arc(-36,-9,3,0,Math.PI*2); ctx.fill()
          ctx.fillStyle='#0f172a'; ctx.beginPath(); ctx.arc(-36,-9,1.5,0,Math.PI*2); ctx.fill()
          break
        }
        case 'grouper': {
          ctx.fillStyle=f.color
          ctx.beginPath(); ctx.ellipse(0,-15,26,13,0,0,Math.PI*2); ctx.fill()
          ctx.fillStyle=f.stripe; ctx.globalAlpha=opacity*0.12
          for(const ox of [-10,0,10,20]) { ctx.beginPath(); ctx.ellipse(ox,-15,4,6,0,0,Math.PI*2); ctx.fill() }
          ctx.globalAlpha=opacity
          ctx.fillStyle=f.fin
          ctx.beginPath(); ctx.moveTo(26,-15); ctx.lineTo(34,-8); ctx.lineTo(34,-22); ctx.fill()
          ctx.fillStyle='white'; ctx.beginPath(); ctx.arc(-18,-17,4,0,Math.PI*2); ctx.fill()
          ctx.fillStyle='#1e293b'; ctx.beginPath(); ctx.arc(-18,-17,2,0,Math.PI*2); ctx.fill()
          break
        }
        case 'mahi': {
          ctx.fillStyle=f.color
          ctx.beginPath(); ctx.ellipse(0,-16,28,11,0,0,Math.PI*2); ctx.fill()
          ctx.strokeStyle=f.stripe; ctx.lineWidth=4; ctx.lineCap='round'; ctx.globalAlpha=opacity*0.85
          ctx.beginPath(); ctx.moveTo(-24,-22); ctx.quadraticCurveTo(-4,-28,16,-20); ctx.quadraticCurveTo(22,-18,28,-16); ctx.stroke()
          ctx.globalAlpha=opacity
          ctx.fillStyle=f.fin
          ctx.beginPath(); ctx.moveTo(28,-16); ctx.lineTo(36,-10); ctx.lineTo(36,-22); ctx.fill()
          ctx.fillStyle='white'; ctx.beginPath(); ctx.arc(-22,-17,4,0,Math.PI*2); ctx.fill()
          ctx.fillStyle='#1e293b'; ctx.beginPath(); ctx.arc(-22,-17,2,0,Math.PI*2); ctx.fill()
          break
        }
        case 'shark': {
          ctx.fillStyle=f.color
          ctx.beginPath(); ctx.ellipse(0,-20,52,14,0,0,Math.PI*2); ctx.fill()
          ctx.fillStyle=f.belly; ctx.globalAlpha=opacity*0.55
          ctx.beginPath(); ctx.ellipse(0,-14,48,7,0,0,Math.PI*2); ctx.fill()
          ctx.globalAlpha=opacity
          ctx.fillStyle=f.fin
          // tail
          ctx.beginPath(); ctx.moveTo(52,-20); ctx.lineTo(68,-8); ctx.lineTo(64,-20); ctx.lineTo(68,-32); ctx.closePath(); ctx.fill()
          // dorsal fin — iconic
          ctx.beginPath(); ctx.moveTo(8,-34); ctx.lineTo(20,-52); ctx.lineTo(32,-34); ctx.fill()
          // pec fins
          ctx.beginPath(); ctx.moveTo(-4,-28); ctx.lineTo(-24,-40); ctx.lineTo(6,-30); ctx.fill()
          ctx.fillStyle='white'; ctx.beginPath(); ctx.arc(-40,-22,5,0,Math.PI*2); ctx.fill()
          ctx.fillStyle='#0f172a'; ctx.beginPath(); ctx.arc(-40,-22,3,0,Math.PI*2); ctx.fill()
          ctx.fillStyle='white'; ctx.globalAlpha=opacity*0.4
          ctx.beginPath(); ctx.arc(-40,-23,1,0,Math.PI*2); ctx.fill()
          // gills
          ctx.strokeStyle=f.belly; ctx.lineWidth=1.5; ctx.globalAlpha=opacity*0.35
          for(const gx of [-18,-12,-6]) {
            ctx.beginPath(); ctx.moveTo(gx,-28); ctx.quadraticCurveTo(gx+1,-21,gx,-14); ctx.stroke()
          }
          ctx.globalAlpha=opacity
          break
        }
        case 'angler': {
          // Scale down — anglerfish are small, creepy deep sea fish
          ctx.save()
          ctx.scale(0.55, 0.55)

          // ── Lure light glow ──
          const lureGrd = ctx.createRadialGradient(26,-54,0,26,-54,60)
          lureGrd.addColorStop(0,  `rgba(167,139,250,0.35)`)
          lureGrd.addColorStop(0.4,`rgba(167,139,250,0.12)`)
          lureGrd.addColorStop(1,  'transparent')
          ctx.fillStyle=lureGrd; ctx.globalAlpha=opacity
          ctx.fillRect(-34,-114,120,120)

          // ── Body — teardrop/oval, wider at back, narrowing to front ──
          ctx.globalAlpha=opacity
          ctx.fillStyle=f.color
          ctx.beginPath()
          ctx.moveTo(-30,-8)
          ctx.quadraticCurveTo(-35,-40,0,-44)
          ctx.quadraticCurveTo(35,-44,40,-20)
          ctx.quadraticCurveTo(44,6,30,20)
          ctx.quadraticCurveTo(10,30,-10,26)
          ctx.quadraticCurveTo(-30,20,-38,4)
          ctx.quadraticCurveTo(-42,-4,-30,-8)
          ctx.fill()

          // belly highlight
          ctx.fillStyle='#3a2a80'; ctx.globalAlpha=opacity*0.5
          ctx.beginPath(); ctx.ellipse(8,4,22,14,0.2,0,Math.PI*2); ctx.fill()
          ctx.globalAlpha=opacity

          // ── Huge open mouth at the FRONT (left side) ──
          ctx.fillStyle='#08041a'
          ctx.beginPath()
          ctx.moveTo(-28,-12)
          ctx.quadraticCurveTo(-50,-4,-44,10)
          ctx.quadraticCurveTo(-40,22,-24,24)
          ctx.quadraticCurveTo(-10,26,0,18)
          ctx.quadraticCurveTo(6,12,-2,4)
          ctx.quadraticCurveTo(-10,0,-18,-4)
          ctx.quadraticCurveTo(-24,-8,-28,-12)
          ctx.fill()

          // ── Upper teeth ──
          ctx.fillStyle='#ddeeff'; ctx.globalAlpha=opacity*0.92
          for(const [tx,ty,len] of [[-42,-2,10],[-36,-8,11],[-30,-12,10],[-24,-14,9],[-16,-12,8],[-8,-8,7]]) {
            ctx.beginPath()
            ctx.moveTo(tx,ty); ctx.lineTo(tx-2,ty+len); ctx.lineTo(tx+2,ty+len)
            ctx.closePath(); ctx.fill()
          }
          // ── Lower teeth ──
          for(const [tx,ty,len] of [[-42,12,10],[-36,18,11],[-28,22,10],[-20,22,9],[-12,18,8],[-4,12,7]]) {
            ctx.beginPath()
            ctx.moveTo(tx,ty); ctx.lineTo(tx-2,ty-len); ctx.lineTo(tx+2,ty-len)
            ctx.closePath(); ctx.fill()
          }
          ctx.globalAlpha=opacity

          // ── Lure spine — grows from TOP of head, curves forward ──
          ctx.strokeStyle=f.glow; ctx.lineWidth=2.5; ctx.lineCap='round'
          ctx.beginPath()
          ctx.moveTo(2,-44)           // base: top of head
          ctx.quadraticCurveTo(18,-66,26,-54)  // curves up then forward to tip
          ctx.stroke()

          // ── Lure bulb — pulsing ──
          const pulse = 0.7+Math.sin(t*3.5)*0.3
          const lb = ctx.createRadialGradient(26,-54,0,26,-54,10)
          lb.addColorStop(0,'#ffffff'); lb.addColorStop(0.4,f.glow); lb.addColorStop(1,'transparent')
          ctx.fillStyle=lb; ctx.globalAlpha=opacity*pulse
          ctx.beginPath(); ctx.arc(26,-54,10,0,Math.PI*2); ctx.fill()
          ctx.fillStyle='#ffffff'; ctx.globalAlpha=opacity
          ctx.beginPath(); ctx.arc(26,-54,3.5,0,Math.PI*2); ctx.fill()

          // ── Eye — large, on the upper front of body ──
          ctx.fillStyle='#fef08a'
          ctx.beginPath(); ctx.arc(0,-24,10,0,Math.PI*2); ctx.fill()
          ctx.fillStyle='#060212'
          ctx.beginPath(); ctx.arc(-1,-24,6,0,Math.PI*2); ctx.fill()
          ctx.fillStyle='white'; ctx.globalAlpha=opacity*0.55
          ctx.beginPath(); ctx.arc(-3,-27,2.5,0,Math.PI*2); ctx.fill()
          ctx.globalAlpha=opacity

          // ── Tail fin ──
          ctx.fillStyle=f.fin
          ctx.beginPath()
          ctx.moveTo(40,-18); ctx.lineTo(58,-4); ctx.lineTo(54,-18); ctx.lineTo(58,-32); ctx.closePath(); ctx.fill()

          // ── Dorsal fin ──
          ctx.globalAlpha=opacity*0.8
          ctx.beginPath()
          ctx.moveTo(14,-44); ctx.lineTo(24,-60); ctx.lineTo(34,-44); ctx.fill()

          // ── Pectoral fin ──
          ctx.beginPath()
          ctx.moveTo(10,20); ctx.lineTo(-2,36); ctx.lineTo(22,30); ctx.fill()
          ctx.globalAlpha=opacity

          ctx.restore()
          break
        }
        case 'oarfish': {
          // Very long ribbon
          ctx.strokeStyle=f.color; ctx.lineWidth=6; ctx.lineCap='round'
          ctx.beginPath()
          for(let i=0;i<=f.w;i+=2) {
            const oy = Math.sin(i*0.05+t*0.5)*4
            i===0 ? ctx.moveTo(-f.w/2+i,-8+oy) : ctx.lineTo(-f.w/2+i,-8+oy)
          }
          ctx.stroke()
          // red dorsal
          ctx.strokeStyle='#ef4444'; ctx.lineWidth=2.5; ctx.globalAlpha=opacity*0.8
          ctx.beginPath()
          for(let i=0;i<=f.w-10;i+=2) {
            const oy = Math.sin(i*0.05+t*0.5)*4
            i===0 ? ctx.moveTo(-f.w/2+i,-12+oy) : ctx.lineTo(-f.w/2+i,-12+oy)
          }
          ctx.stroke()
          ctx.globalAlpha=opacity
          // head
          ctx.fillStyle=f.color; ctx.beginPath(); ctx.ellipse(-f.w/2,-8,8,5,0,0,Math.PI*2); ctx.fill()
          ctx.fillStyle='white'; ctx.beginPath(); ctx.arc(-f.w/2-4,-9,2,0,Math.PI*2); ctx.fill()
          ctx.fillStyle='#0f172a'; ctx.beginPath(); ctx.arc(-f.w/2-4,-9,1,0,Math.PI*2); ctx.fill()
          break
        }
        case 'dragon': {
          const hw = f.w/2
          ctx.strokeStyle=f.color; ctx.lineWidth=8; ctx.lineCap='round'
          ctx.beginPath()
          for(let i=0;i<=f.w;i+=2) {
            const oy = Math.sin(i*0.08+t*1.2)*5
            i===0 ? ctx.moveTo(-hw+i,-9+oy) : ctx.lineTo(-hw+i,-9+oy)
          }
          ctx.stroke()
          // glowing dots along body
          for(let i=0;i<7;i++) {
            const ix = -hw + (i+1)*(f.w/8)
            const oy = Math.sin(ix*0.08+t*1.2)*5
            ctx.fillStyle=f.glow; ctx.globalAlpha=opacity*0.9
            ctx.beginPath(); ctx.arc(ix,-9+oy,3,0,Math.PI*2); ctx.fill()
          }
          ctx.globalAlpha=opacity
          ctx.fillStyle=f.fin
          ctx.beginPath(); ctx.moveTo(hw,-9); ctx.lineTo(hw+8,-4); ctx.lineTo(hw+8,-14); ctx.fill()
          ctx.fillStyle='white'; ctx.globalAlpha=opacity*0.7
          ctx.beginPath(); ctx.arc(-hw+6,-10,3,0,Math.PI*2); ctx.fill()
          ctx.fillStyle='#0f172a'; ctx.globalAlpha=opacity
          ctx.beginPath(); ctx.arc(-hw+6,-10,1.5,0,Math.PI*2); ctx.fill()
          break
        }
        case 'jelly': {
          // Bell
          ctx.fillStyle=f.color; ctx.globalAlpha=opacity*0.4
          ctx.beginPath(); ctx.ellipse(0,-18,20,18,0,0,Math.PI*2); ctx.fill()
          ctx.fillStyle=f.glow; ctx.globalAlpha=opacity*0.12
          ctx.beginPath(); ctx.ellipse(0,-20,16,12,0,0,Math.PI*2); ctx.fill()
          ctx.globalAlpha=opacity*0.5
          ctx.strokeStyle=f.glow; ctx.lineWidth=1.5
          ctx.beginPath(); ctx.moveTo(-20,-18); ctx.quadraticCurveTo(0,2,20,-18); ctx.stroke()
          // Tentacles
          ctx.globalAlpha=opacity*0.6
          for(let i=0;i<6;i++) {
            const tx=-13+i*5
            ctx.strokeStyle=f.glow; ctx.lineWidth=1.5; ctx.lineCap='round'
            ctx.beginPath(); ctx.moveTo(tx,0)
            ctx.quadraticCurveTo(tx+Math.sin(t*1.2+i)*6,14,tx+Math.sin(t*0.8+i+1)*4,26)
            ctx.stroke()
          }
          ctx.globalAlpha=opacity
          break
        }
        default: break
      }
      ctx.restore()
    }

    const draw = (ts) => {
      t = ts / 1000
      const p = clamp(progressRef.current, 0, 1)
      const W = canvas.width
      const H = canvas.height

      // ── Waterline position: camera descends as scroll increases ──
      // At p=0: waterline at 62% of screen
      // At p=0.20: waterline exits top (fully underwater)
      const waterlineY = H * (0.62 - p * (0.62 / 0.20))

      // ─────────────────────────────────────────────────────────────────────────
      // 1. SKY
      // ─────────────────────────────────────────────────────────────────────────
      if (waterlineY > 0) {
        const sky = ctx.createLinearGradient(0, 0, 0, waterlineY)
        sky.addColorStop(0,    '#0f0524')
        sky.addColorStop(0.25, '#2d1b4e')
        sky.addColorStop(0.55, '#7b2d5e')
        sky.addColorStop(0.78, '#c45c35')
        sky.addColorStop(0.90, '#e8843a')
        sky.addColorStop(1,    '#f4a94e')
        ctx.fillStyle = sky
        ctx.fillRect(0, 0, W, waterlineY)

        // Horizon glow
        const hglow = ctx.createRadialGradient(W/2, waterlineY, 0, W/2, waterlineY, W*0.5)
        hglow.addColorStop(0,    'rgba(255,210,100,0.5)')
        hglow.addColorStop(0.35, 'rgba(244,169,78,0.2)')
        hglow.addColorStop(1,    'transparent')
        ctx.fillStyle = hglow
        ctx.fillRect(0, 0, W, waterlineY + 40)

        // Sun — half submerged
        const sunR = Math.min(W, H) * 0.044
        ctx.save()
        ctx.beginPath(); ctx.rect(0, 0, W, waterlineY); ctx.clip()
        ctx.beginPath(); ctx.arc(W/2, waterlineY + 3, sunR, 0, Math.PI*2)
        ctx.fillStyle = '#ffd27a'; ctx.globalAlpha = 0.95; ctx.fill()
        for (let r=1;r<=3;r++) {
          ctx.beginPath(); ctx.arc(W/2, waterlineY+3, sunR*(1+r*0.4), 0, Math.PI*2)
          ctx.fillStyle = `rgba(244,169,78,${0.1/r})`; ctx.fill()
        }
        ctx.restore()
        ctx.globalAlpha = 1

        // Stars
        const starA = Math.max(0, 0.8 - p*5)
        if (starA > 0) {
          [[0.08,0.07],[0.19,0.04],[0.31,0.09],[0.42,0.02],[0.55,0.05],[0.68,0.08],[0.80,0.03],[0.92,0.06],
           [0.14,0.13],[0.26,0.10],[0.49,0.15],[0.63,0.11]].forEach(([sx,sy],i) => {
            const tw = 0.4 + 0.5*Math.sin(t*(1.5+i*0.3)+i)
            ctx.beginPath(); ctx.arc(sx*W, sy*waterlineY, 1+(i%3)*0.4, 0, Math.PI*2)
            ctx.fillStyle = `rgba(255,255,255,${starA*tw})`; ctx.fill()
          })
        }

        // Clouds
        [[0.18,0.18,0.085,0.032,'#6b2d5e',0.5],[0.63,0.13,0.10,0.034,'#5a2550',0.45],[0.84,0.22,0.075,0.028,'#6b2d5e',0.4]].forEach(([cx,cy,rx,ry,col,op]) => {
          const cloudY = cy * waterlineY
          if (cloudY > 0) {
            ctx.beginPath(); ctx.ellipse(cx*W, cloudY, rx*W, ry*waterlineY, 0, 0, Math.PI*2)
            ctx.fillStyle=col; ctx.globalAlpha=op; ctx.fill(); ctx.globalAlpha=1
          }
        })

        // Islands
        const isc = Math.min(1, waterlineY / H)
        if (isc > 0.04) {
          // Left island
          ctx.fillStyle='#1a0a2e'; ctx.globalAlpha=0.9
          ctx.beginPath()
          ctx.moveTo(0, waterlineY)
          ctx.quadraticCurveTo(W*0.04, waterlineY-120*isc, W*0.09, waterlineY-105*isc)
          ctx.quadraticCurveTo(W*0.13, waterlineY-135*isc, W*0.18, waterlineY-90*isc)
          ctx.quadraticCurveTo(W*0.22, waterlineY-55*isc,  W*0.27, waterlineY)
          ctx.fill()
          // Right island
          ctx.beginPath()
          ctx.moveTo(W, waterlineY)
          ctx.quadraticCurveTo(W*0.96, waterlineY-120*isc, W*0.91, waterlineY-110*isc)
          ctx.quadraticCurveTo(W*0.87, waterlineY-140*isc, W*0.82, waterlineY-95*isc)
          ctx.quadraticCurveTo(W*0.78, waterlineY-60*isc,  W*0.73, waterlineY)
          ctx.fill()
          ctx.globalAlpha=1

          // Palm trees
          const drawPalm = (bx, by, lean) => {
            ctx.strokeStyle='#0d0618'; ctx.lineWidth=4*isc; ctx.lineCap='round'
            ctx.beginPath(); ctx.moveTo(bx,by); ctx.quadraticCurveTo(bx+lean*12,by-55*isc,bx+lean*22,by-95*isc); ctx.stroke()
            const tx=bx+lean*22, ty=by-95*isc
            const fronds=[[-26,-14],[-16,-27],[-3,-32],[11,-27],[23,-15],[27,-3]]
            fronds.forEach(([fx,fy]) => {
              ctx.beginPath(); ctx.moveTo(tx,ty); ctx.quadraticCurveTo(tx+fx*0.5*isc,ty+fy*0.5*isc,tx+fx*isc,ty+fy*isc)
              ctx.lineWidth=2.5*isc; ctx.stroke()
            })
          }
          drawPalm(W*0.08, waterlineY-98*isc, -1)
          drawPalm(W*0.92, waterlineY-108*isc, 1)

          // Sandy beaches
          if (isc > 0.08) {
            const sandGrd = ctx.createLinearGradient(0,waterlineY,0,waterlineY+110*isc)
            sandGrd.addColorStop(0,'#c8843a'); sandGrd.addColorStop(1,'#7a4820')
            ctx.fillStyle=sandGrd; ctx.globalAlpha=Math.min(1,isc*1.8)
            ctx.beginPath()
            ctx.moveTo(0,waterlineY); ctx.quadraticCurveTo(W*0.13,waterlineY+85*isc,W*0.27,waterlineY)
            ctx.lineTo(W*0.27,waterlineY+110*isc); ctx.lineTo(0,waterlineY+110*isc); ctx.fill()
            ctx.beginPath()
            ctx.moveTo(W,waterlineY); ctx.quadraticCurveTo(W*0.87,waterlineY+85*isc,W*0.73,waterlineY)
            ctx.lineTo(W*0.73,waterlineY+110*isc); ctx.lineTo(W,waterlineY+110*isc); ctx.fill()
            ctx.globalAlpha=1
          }
        }
      }

      // ─────────────────────────────────────────────────────────────────────────
      // 2. OCEAN (below waterline)
      // ─────────────────────────────────────────────────────────────────────────
      const oceanTop = Math.max(0, waterlineY)
      if (oceanTop < H) {
        // Instead of a shifting gradient, interpolate a SINGLE solid color based on p
        // This guarantees zero jumping — color changes are perfectly linear with scroll
        const lerpC = (c1, c2, t) => {
          const r1=parseInt(c1.slice(1,3),16), g1=parseInt(c1.slice(3,5),16), b1=parseInt(c1.slice(5,7),16)
          const r2=parseInt(c2.slice(1,3),16), g2=parseInt(c2.slice(3,5),16), b2=parseInt(c2.slice(5,7),16)
          const r=Math.round(r1+(r2-r1)*t), g=Math.round(g1+(g2-g1)*t), b=Math.round(b1+(b2-b1)*t)
          return `rgb(${r},${g},${b})`
        }
        // Color journey from surface to abyss — many fine steps so each transition is tiny
        const colorStops = [
          [0.00, '#1a7a9a'], [0.08, '#136a8a'], [0.16, '#0d5478'],
          [0.24, '#084068'], [0.32, '#053260'], [0.40, '#032855'],
          [0.48, '#021e48'], [0.56, '#01143a'], [0.64, '#010c2e'],
          [0.72, '#010820'], [0.80, '#010614'], [0.90, '#01040e'],
          [1.00, '#010204'],
        ]
        // Find which two stops p sits between and interpolate
        let c1 = colorStops[0][1], c2 = colorStops[1][1], segT = 0
        for (let i = 0; i < colorStops.length - 1; i++) {
          if (p >= colorStops[i][0] && p <= colorStops[i+1][0]) {
            const segLen = colorStops[i+1][0] - colorStops[i][0]
            segT = segLen > 0 ? (p - colorStops[i][0]) / segLen : 0
            c1 = colorStops[i][1]; c2 = colorStops[i+1][1]
            break
          }
        }
        const topColor = lerpC(c1, c2, segT)

        // Gradient from interpolated top color to slightly darker at bottom of screen
        const og = ctx.createLinearGradient(0, oceanTop, 0, H)
        og.addColorStop(0, topColor)
        og.addColorStop(1, lerpC(c1, c2, Math.min(1, segT + 0.08)))
        ctx.fillStyle = og
        ctx.fillRect(0, oceanTop, W, H - oceanTop)

        // Darkness overlay — starts at p=0.40, very gradual
        if (p > 0.40) {
          const td = clamp((p-0.40)/0.60, 0, 1)
          ctx.fillStyle=`rgba(0,1,6,${td*td*0.85})`
          ctx.fillRect(0, oceanTop, W, H-oceanTop)
        }

        // Sun reflection — fades as we submerge
        if (waterlineY > -20 && p < 0.18) {
          const ra = (1 - p/0.18) * (waterlineY > 0 ? 1 : Math.max(0, 1+waterlineY/20))
          const refl = ctx.createRadialGradient(W/2, oceanTop, 0, W/2, oceanTop, W*0.32)
          refl.addColorStop(0,  `rgba(255,210,122,${0.28*ra})`)
          refl.addColorStop(0.4,`rgba(244,169,78,${0.1*ra})`)
          refl.addColorStop(1,   'transparent')
          ctx.fillStyle=refl; ctx.fillRect(0, oceanTop, W, Math.min(H*0.22, H-oceanTop))
        }
      }

      // ─────────────────────────────────────────────────────────────────────────
      // 3. WATERLINE WAVES + UNDERWATER RIPPLES
      // ─────────────────────────────────────────────────────────────────────────
      if (waterlineY > -100 && waterlineY < H+20) {
        const wa = waterlineY < 0 ? Math.max(0, 1+waterlineY/100) : 1

        // Deep swell
        ctx.beginPath(); ctx.moveTo(0,H)
        for(let x=0;x<=W;x+=4) { const y=waterlineY+Math.sin(x*0.004+t*0.65)*20+Math.sin(x*0.009-t*0.38)*11; x===0?ctx.moveTo(x,y):ctx.lineTo(x,y) }
        ctx.lineTo(W,H); ctx.lineTo(0,H); ctx.closePath()
        ctx.fillStyle=`rgba(0,25,55,${0.32*wa})`; ctx.fill()

        // Mid wave
        ctx.beginPath()
        for(let x=0;x<=W;x+=3) { const y=waterlineY+Math.sin(x*0.007-t*1.05)*13+Math.sin(x*0.013+t*0.55)*8; x===0?ctx.moveTo(x,y):ctx.lineTo(x,y) }
        ctx.lineTo(W,H); ctx.lineTo(0,H); ctx.closePath()
        ctx.fillStyle=`rgba(26,107,138,${0.42*wa})`; ctx.fill()

        // Ripple
        ctx.beginPath()
        for(let x=0;x<=W;x+=2) { const y=waterlineY+Math.sin(x*0.012+t*1.75)*7+Math.sin(x*0.02-t*1.15)*4; x===0?ctx.moveTo(x,y):ctx.lineTo(x,y) }
        ctx.lineTo(W,H); ctx.lineTo(0,H); ctx.closePath()
        ctx.fillStyle=`rgba(255,255,255,${0.07*wa})`; ctx.fill()

        // Foam crest
        ctx.beginPath()
        for(let x=0;x<=W;x+=2) { const y=waterlineY+Math.sin(x*0.016+t*2.1)*5+Math.sin(x*0.026-t*1.45)*2; x===0?ctx.moveTo(x,y):ctx.lineTo(x,y) }
        ctx.strokeStyle=`rgba(255,255,255,${0.32*wa})`; ctx.lineWidth=1.8; ctx.stroke()
      }

      // ─── UNDERWATER CAUSTIC RIPPLES — light patterns on the ocean floor ────────
      // These are the shimmering light patterns you see underwater on sandy bottoms
      // Visible in shallow to mid water only
      if (p > 0.18 && p < 0.65) {
        const causticA = Math.min(0.06, (p-0.18)*0.3) * Math.max(0, 1-(p-0.35)/0.3)
        if (causticA > 0) {
          // Multiple overlapping sine-based caustic lines
          for(let layer=0;layer<3;layer++) {
            const freq1 = 0.018 + layer*0.006
            const freq2 = 0.024 + layer*0.008
            const speed1 = 0.8 + layer*0.3
            const speed2 = 1.1 + layer*0.2
            const offset = layer * 60
            ctx.beginPath()
            for(let x=0;x<=W;x+=3) {
              const y = H*0.3 + Math.sin(x*freq1+t*speed1+offset)*H*0.08
                      + Math.sin(x*freq2-t*speed2+offset)*H*0.05
              x===0 ? ctx.moveTo(x,y) : ctx.lineTo(x,y)
            }
            ctx.strokeStyle=`rgba(100,200,255,${causticA})`
            ctx.lineWidth=1.5; ctx.stroke()
          }
        }
      }

      // ─── UNDERWATER DEPTH RIPPLES — subtle horizontal bands as you dive ───────
      // Creates a sense of moving through layers of water
      if (p > 0.20) {
        const ripA = Math.min(0.04, (p-0.20)*0.15)
        for(let layer=0;layer<5;layer++) {
          const baseY = H*(0.2+layer*0.18) + Math.sin(t*0.3+layer)*H*0.02
          ctx.beginPath()
          for(let x=0;x<=W;x+=3) {
            const y = baseY + Math.sin(x*0.006+t*0.5+layer*1.2)*12
                            + Math.sin(x*0.011-t*0.3+layer*0.8)*7
            x===0 ? ctx.moveTo(x,y) : ctx.lineTo(x,y)
          }
          ctx.strokeStyle=`rgba(26,107,200,${ripA*(1-layer*0.15)})`
          ctx.lineWidth=1; ctx.stroke()
        }
      }

      // ─────────────────────────────────────────────────────────────────────────
      // 4. LIGHT RAYS (underwater sun shafts)
      // ─────────────────────────────────────────────────────────────────────────
      if (p > 0.05 && p < 0.45) {
        const rayA = Math.min(1, (p-0.05)*8) * Math.max(0, 1-p*2.5) * 0.06
        if (rayA > 0) {
          for(let i=0;i<6;i++) {
            const rx = W*(0.1+i*0.16) + Math.sin(t*0.4+i)*30
            const angle = (-18+i*7) * Math.PI/180
            ctx.save()
            ctx.translate(rx, 0); ctx.rotate(angle)
            const rg = ctx.createLinearGradient(0,0,0,H*0.7)
            rg.addColorStop(0,`rgba(255,255,255,${rayA})`); rg.addColorStop(1,'transparent')
            ctx.fillStyle=rg; ctx.fillRect(-35,0,70,H*0.7)
            ctx.restore()
          }
        }
      }

      // ─────────────────────────────────────────────────────────────────────────
      // 5. BUBBLES
      // ─────────────────────────────────────────────────────────────────────────
      if (p > 0.14) {
        const bA = Math.min(1,(p-0.14)*7)
        bubbles.forEach(b => {
          b.y -= b.speed
          if (b.y < -0.05) b.y = 1.05
          b.drift += 0.008
          b.x += Math.sin(b.drift)*0.0003
          ctx.beginPath(); ctx.arc(b.x*W, b.y*H, b.size, 0, Math.PI*2)
          ctx.strokeStyle=`rgba(255,255,255,${b.opacity*bA*0.6})`; ctx.lineWidth=1; ctx.stroke()
        })
      }

      // ─────────────────────────────────────────────────────────────────────────
      // 7. BIOLUMINESCENT PARTICLES
      // ─────────────────────────────────────────────────────────────────────────
      if (p > 0.42) {
        const bpA = Math.min(1,(p-0.42)*4)
        particles.forEach(part => {
          const px2 = part.x*W + Math.sin(t*part.speed+part.phase)*8
          const py2 = part.y*H + Math.cos(t*part.speed*0.7+part.phase)*6
          const pa = (0.4+0.5*Math.sin(t*part.speed*2+part.phase)) * bpA
          const gr = ctx.createRadialGradient(px2,py2,0,px2,py2,part.size*2.5)
          gr.addColorStop(0,part.color); gr.addColorStop(1,'transparent')
          ctx.fillStyle=gr; ctx.globalAlpha=pa*0.6
          ctx.beginPath(); ctx.arc(px2,py2,part.size*2.5,0,Math.PI*2); ctx.fill()
          ctx.fillStyle=part.color; ctx.globalAlpha=pa
          ctx.beginPath(); ctx.arc(px2,py2,part.size,0,Math.PI*2); ctx.fill()
        })
        ctx.globalAlpha=1
      }

      // ─────────────────────────────────────────────────────────────────────────
      // 8. FISH — world-space camera. Each fish has a fixed worldY depth.
      //    screenY = fish.screenY * H + (fish.worldY - p) * H * 4
      //    As p increases (camera dives), fish naturally scroll upward off screen.
      //    No opacity fading — fish simply enter/exit the viewport naturally.
      // ─────────────────────────────────────────────────────────────────────────
      fishState.forEach(f => {
        f.x += f.speed * f.dir
        const CW = canvas.width
        if (f.dir===1  && f.x > CW+f.w+50) f.x = -f.w-50
        if (f.dir===-1 && f.x < -f.w-50)   f.x = CW+f.w+50
        f.wobble += 0.018

        // Camera offset: how far this fish is from current scroll depth
        const depthDelta = f.worldY - p
        // screenY: fish sits at its screenY position when camera is exactly at its depth
        // As camera moves away, fish slides up/down proportionally
        const sy = f.screenY * H + depthDelta * H * 3.5

        // Only draw if on screen (with margin)
        if (sy < -80 || sy > H + 80) return

        // No opacity tricks — fully opaque when visible, gone when off screen
        // Slight fade only at very edges of viewport (top/bottom 80px)
        const edgeFade = Math.min(1,
          Math.min((sy + 80) / 80, (H + 80 - sy) / 80)
        )
        if (edgeFade <= 0) return

        const fishForDraw = { ...f, screenY: sy }
        f._sy = sy  // store for click scatter
        drawFish(ctx, fishForDraw, edgeFade, W, H)
      })

      // ─────────────────────────────────────────────────────────────────────────
      // 9. RIPPLES (click effects)
      // ─────────────────────────────────────────────────────────────────────────
      ripplesRef.current = ripplesRef.current.filter(r => r.age < 1)
      ripplesRef.current.forEach(r => {
        r.age += 0.025
        const maxR = 120
        const rad = r.age * maxR
        const alpha = Math.max(0, 1 - r.age) * 0.6
        // Outer ring
        ctx.beginPath(); ctx.arc(r.x, r.y, rad, 0, Math.PI*2)
        ctx.strokeStyle = `rgba(100,200,255,${alpha})`
        ctx.lineWidth = 2; ctx.stroke()
        // Inner ring
        if (r.age > 0.1) {
          ctx.beginPath(); ctx.arc(r.x, r.y, rad * 0.6, 0, Math.PI*2)
          ctx.strokeStyle = `rgba(150,230,255,${alpha * 0.5})`
          ctx.lineWidth = 1; ctx.stroke()
        }
      })

      animId = requestAnimationFrame(draw)
    }

    animId = requestAnimationFrame(draw)
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize',resize); window.removeEventListener('click',handleClick) }
  }, [])

  return (
    <canvas ref={canvasRef} style={{
      position:'fixed', inset:0, zIndex:0, display:'block', width:'100%', height:'100%',
    }}/>
  )
}

// ─── DEPTH INDICATOR ──────────────────────────────────────────────────────────

function DepthIndicator({ progress }) {
  const labels = ['0m · Surface','10m · Sunlit','50m · Twilight','200m · Midnight','1000m · Abyss']
  const idx = Math.min(Math.floor(progress*5),4)
  return (
    <div style={{ position:'fixed', right:'20px', top:'50%', transform:'translateY(-50%)', zIndex:50, display:'flex', flexDirection:'column', alignItems:'flex-end', gap:'6px' }}>
      <div style={{ width:'2px', height:'100px', background:'rgba(255,255,255,0.08)', borderRadius:'2px', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', top:0, left:0, right:0, height:`${progress*100}%`, background:'linear-gradient(to bottom,#67e8f9,#0369a1)', borderRadius:'2px', transition:'height 0.2s ease' }}/>
      </div>
      <span style={{ fontFamily:'var(--font-mono)', fontSize:'9px', color:'rgba(255,255,255,0.35)', textAlign:'right', maxWidth:'90px', lineHeight:1.3 }}>{labels[idx]}</span>
    </div>
  )
}

// ─── NAVBAR ───────────────────────────────────────────────────────────────────

function Navbar({ progress }) {
  const linkOpacity = Math.max(0, 1 - progress * 8)
  return (
    <nav style={{ position:'fixed', top:0, left:0, right:0, zIndex:100, padding:'0 32px', height:'60px', display:'flex', alignItems:'center', justifyContent:'space-between', background:'transparent' }}>
      <span style={{ fontFamily:'var(--font-mono)', fontSize:'14px', color:'#67e8f9', letterSpacing:'0.05em' }}>cartery.dev</span>
      <div style={{ display:'flex', gap:'28px', opacity: linkOpacity, pointerEvents: linkOpacity < 0.1 ? 'none' : 'auto', transition:'opacity 0.1s' }}>
        {[['#work','Work'],['#about','About'],['#contact','Contact']].map(([h,label])=>(
          <a key={h} href={h} style={{ fontSize:'13px', color:'rgba(255,255,255,0.75)', textDecoration:'none', transition:'color 0.2s' }}
            onMouseEnter={e=>e.target.style.color='#67e8f9'} onMouseLeave={e=>e.target.style.color='rgba(255,255,255,0.75)'}>
            {label}
          </a>
        ))}
      </div>
      <a href="mailto:carteryax@gmail.com" style={{ fontSize:'13px', fontWeight:600, color:'#020e1a', background:'#38bdf8', padding:'8px 18px', borderRadius:'8px', textDecoration:'none', transition:'background 0.2s' }}
        onMouseEnter={e=>e.target.style.background='#67e8f9'} onMouseLeave={e=>e.target.style.background='#38bdf8'}>
        Hire me
      </a>
    </nav>
  )
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────

export default function OceanPortfolio() {
  const [scrollY,    setScrollY]    = useState(0)
  const [maxScroll,  setMaxScroll]  = useState(1)
  const [formData,    setFormData]    = useState({ name:'', email:'', message:'' })
  const [formStatus,  setFormStatus]  = useState('idle')
  const progressRef = useRef(0)

  useEffect(() => {
    const update = () => {
      const ms = document.body.scrollHeight - window.innerHeight
      const sy = window.scrollY
      setScrollY(sy); setMaxScroll(ms)
      progressRef.current = ms > 0 ? Math.min(sy/ms, 1) : 0
    }
    window.addEventListener('scroll', update, { passive:true })
    window.addEventListener('resize', update)
    update()
    return () => { window.removeEventListener('scroll',update); window.removeEventListener('resize',update) }
  }, [])

  const progress = maxScroll > 0 ? Math.min(scrollY/maxScroll, 1) : 0

  const handleSubmit = async (e) => {
    e.preventDefault(); setFormStatus('sending')
    try {
      const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', { method:'POST', headers:{ 'Content-Type':'application/json', Accept:'application/json' }, body:JSON.stringify(formData) })
      setFormStatus(res.ok?'success':'error')
      if (res.ok) setFormData({ name:'', email:'', message:'' })
    } catch { setFormStatus('error') }
  }

  const glass = { background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.09)', borderRadius:'16px', backdropFilter:'blur(14px)', padding:'28px' }
  const sec   = (x={}) => ({ position:'relative', zIndex:10, padding:'90px 0', ...x })
  const cont  = { maxWidth:'900px', margin:'0 auto', padding:'0 32px', width:'100%' }

  return (
    <>
      <OceanCanvas progressRef={progressRef} />
      <DepthIndicator progress={progress} />
      <Navbar progress={progress} />

      <div style={{ position:'relative', zIndex:10 }}>

        {/* HERO */}
        <section style={{ ...sec(), minHeight:'100vh', display:'flex', alignItems:'flex-start', justifyContent:'center', paddingTop:'100px', paddingBottom:'0px' }}>
          <div style={{ ...cont, textAlign:'center' }}>
            <style>{`
              @keyframes ripple   { 0%,100%{width:50px;opacity:0.3} 50%{width:130px;opacity:0.9} }
              @keyframes pulse    { 0%,100%{opacity:1} 50%{opacity:0.35} }
              @keyframes fadeDown { 0%{opacity:0;transform:translateY(-8px)} 50%{opacity:1} 100%{opacity:0;transform:translateY(8px)} }
            `}</style>
            <div style={{ width:'80px', height:'3px', margin:'0 auto 36px', background:'linear-gradient(90deg,transparent,rgba(252,211,77,0.8),transparent)', borderRadius:'2px', animation:'ripple 2.2s ease-in-out infinite' }}/>
            <div style={{ display:'inline-flex', alignItems:'center', gap:'8px', background:'rgba(16,185,129,0.12)', border:'1px solid rgba(16,185,129,0.28)', borderRadius:'999px', padding:'6px 16px', marginBottom:'28px' }}>
              <div style={{ width:'6px', height:'6px', borderRadius:'50%', background:'#34d399', animation:'pulse 2s infinite' }}/>
              <span style={{ fontSize:'12px', color:'#6ee7b7', fontWeight:500 }}>Available for new projects</span>
            </div>
            <p style={{ fontFamily:'var(--font-mono)', color:'#fcd34d', fontSize:'13px', marginBottom:'12px', letterSpacing:'0.12em' }}>Hi, I'm</p>
            <h1 style={{ fontSize:'clamp(52px,10vw,96px)', fontWeight:800, color:'#ffffff', lineHeight:1.05, marginBottom:'16px', letterSpacing:'-0.02em', textShadow:'0 2px 20px rgba(0,0,0,0.5)' }}>Carter Yax</h1>
            <h2 style={{ fontSize:'clamp(18px,3vw,28px)', fontWeight:500, color:'rgba(255,255,255,0.92)', marginBottom:'20px', lineHeight:1.4, textShadow:'0 1px 10px rgba(0,0,0,0.4)' }}>
              I build websites & web apps{' '}<span style={{ color:'#fcd34d' }}>for Michigan businesses.</span>
            </h2>
            <p style={{ fontSize:'16px', color:'rgba(255,255,255,0.82)', maxWidth:'480px', margin:'0 auto 40px', lineHeight:1.75, textShadow:'0 1px 8px rgba(0,0,0,0.4)' }}>
              Freelance web developer helping small businesses across Michigan get online — restaurants, contractors, shops, and everything in between.
            </p>
            <div style={{ display:'flex', gap:'16px', justifyContent:'center', flexWrap:'wrap', marginBottom:'48px' }}>
              <a href="#work" style={{ padding:'14px 32px', background:'#f59e0b', color:'#0f0a00', fontWeight:700, borderRadius:'12px', textDecoration:'none', fontSize:'14px', boxShadow:'0 0 32px rgba(245,158,11,0.35)' }}>See my work</a>
              <a href="mailto:carteryax@gmail.com" style={{ padding:'14px 32px', background:'rgba(255,255,255,0.1)', border:'1px solid rgba(255,255,255,0.28)', color:'white', fontWeight:600, borderRadius:'12px', textDecoration:'none', fontSize:'14px', backdropFilter:'blur(8px)' }}>Get in touch</a>
            </div>
            <div style={{ display:'flex', gap:'24px', justifyContent:'center' }}>
              {socials.map(s=>(
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" style={{ fontSize:'12px', color:'rgba(255,255,255,0.5)', textDecoration:'none', transition:'color 0.2s', letterSpacing:'0.04em' }}
                  onMouseEnter={e=>e.target.style.color='#fcd34d'} onMouseLeave={e=>e.target.style.color='rgba(255,255,255,0.5)'}>
                  {s.label}
                </a>
              ))}
            </div>
            <div style={{ marginTop:'32px', display:'flex', flexDirection:'column', alignItems:'center', gap:'8px', opacity:0.45 }}>
              <span style={{ fontFamily:'var(--font-mono)', fontSize:'10px', color:'rgba(255,255,255,0.7)', letterSpacing:'0.2em' }}>DIVE IN</span>
              <div style={{ width:'1px', height:'36px', background:'linear-gradient(to bottom,rgba(255,255,255,0.7),transparent)', animation:'fadeDown 1.6s ease-in-out infinite' }}/>
            </div>
          </div>
        </section>

        {/* WORK */}
        <section id="work" style={{...sec(), padding:0, paddingTop:'80px', paddingBottom:'80px'}}>
          <div style={cont}>
            <div style={{ textAlign:'center', marginBottom:'36px' }}>
              <p style={{ fontFamily:'var(--font-mono)', color:'#67e8f9', fontSize:'10px', letterSpacing:'0.22em', marginBottom:'8px' }}>02. WORK</p>
              <h2 style={{ fontSize:'clamp(26px,5vw,42px)', fontWeight:800, color:'white', letterSpacing:'-0.02em', marginBottom:'24px' }}>Selected projects</h2>
              {/* Scroll arrows centered under title */}
              <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'12px' }}>
                <div onClick={() => {
                  const track = document.querySelector('.carousel-track')
                  if (track) track.scrollBy({ left: -(track.offsetWidth * 0.85), behavior:'smooth' })
                }} style={{
                  width:'36px', height:'36px', borderRadius:'50%',
                  background:'rgba(103,232,249,0.08)',
                  border:'1px solid rgba(103,232,249,0.2)',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  color:'#67e8f9', fontSize:'16px', cursor:'pointer',
                  transition:'background 0.2s, border-color 0.2s',
                }}
                  onMouseEnter={e=>{ e.currentTarget.style.background='rgba(103,232,249,0.2)'; e.currentTarget.style.borderColor='rgba(103,232,249,0.6)' }}
                  onMouseLeave={e=>{ e.currentTarget.style.background='rgba(103,232,249,0.08)'; e.currentTarget.style.borderColor='rgba(103,232,249,0.2)' }}
                >←</div>
                <span style={{ fontFamily:'var(--font-mono)', fontSize:'10px', color:'rgba(255,255,255,0.25)', letterSpacing:'0.18em' }}>SCROLL TO BROWSE</span>
                <div onClick={() => {
                  const track = document.querySelector('.carousel-track')
                  if (track) track.scrollBy({ left: track.offsetWidth * 0.85, behavior:'smooth' })
                }} style={{
                  width:'36px', height:'36px', borderRadius:'50%',
                  background:'rgba(103,232,249,0.08)',
                  border:'1px solid rgba(103,232,249,0.2)',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  color:'#67e8f9', fontSize:'16px', cursor:'pointer',
                  transition:'background 0.2s, border-color 0.2s',
                }}
                  onMouseEnter={e=>{ e.currentTarget.style.background='rgba(103,232,249,0.2)'; e.currentTarget.style.borderColor='rgba(103,232,249,0.6)' }}
                  onMouseLeave={e=>{ e.currentTarget.style.background='rgba(103,232,249,0.08)'; e.currentTarget.style.borderColor='rgba(103,232,249,0.2)' }}
                >→</div>
              </div>
            </div>
          </div>

          {/* Full-bleed track */}
          <div style={{ position:'relative', width:'100%' }}
            onMouseMove={e => {
              const el = e.currentTarget
              const track = el.querySelector('.carousel-track')
              const leftArrow = el.querySelector('.carousel-arrow-left')
              const rightArrow = el.querySelector('.carousel-arrow-right')
              const rect = el.getBoundingClientRect()
              const x = e.clientX - rect.left
              const w = rect.width
              const zone = 120 // fixed 120px zone on each edge
              if (x < zone) {
                const speed = (1 - x / zone) * 8
                track._scrollSpeed = -speed
                if (leftArrow) leftArrow.style.opacity = '1'
                if (rightArrow) rightArrow.style.opacity = '0'
              } else if (x > w - zone) {
                const speed = ((x - (w - zone)) / zone) * 8
                track._scrollSpeed = speed
                if (rightArrow) rightArrow.style.opacity = '1'
                if (leftArrow) leftArrow.style.opacity = '0'
              } else {
                track._scrollSpeed = 0
                if (leftArrow) leftArrow.style.opacity = '0'
                if (rightArrow) rightArrow.style.opacity = '0'
              }
            }}
            onMouseLeave={e => {
              const track = e.currentTarget.querySelector('.carousel-track')
              const leftArrow = e.currentTarget.querySelector('.carousel-arrow-left')
              const rightArrow = e.currentTarget.querySelector('.carousel-arrow-right')
              if (track) track._scrollSpeed = 0
              if (leftArrow) leftArrow.style.opacity = '0'
              if (rightArrow) rightArrow.style.opacity = '0'
            }}
          >
            {/* Left arrow overlay */}
            <div className="carousel-arrow-left" style={{
              position:'absolute', left:0, top:0, bottom:'24px', width:'80px',
              background:'linear-gradient(to right, rgba(2,14,26,0.85), transparent)',
              display:'flex', alignItems:'center', justifyContent:'flex-start',
              paddingLeft:'16px',
              opacity:0, transition:'opacity 0.2s',
              pointerEvents:'none', zIndex:10,
            }}>
              <div style={{
                width:'40px', height:'40px', borderRadius:'50%',
                background:'rgba(103,232,249,0.15)',
                border:'1px solid rgba(103,232,249,0.4)',
                display:'flex', alignItems:'center', justifyContent:'center',
                color:'#67e8f9', fontSize:'18px',
              }}>←</div>
            </div>

            {/* Right arrow overlay */}
            <div className="carousel-arrow-right" style={{
              position:'absolute', right:0, top:0, bottom:'24px', width:'80px',
              background:'linear-gradient(to left, rgba(2,14,26,0.85), transparent)',
              display:'flex', alignItems:'center', justifyContent:'flex-end',
              paddingRight:'16px',
              opacity:0, transition:'opacity 0.2s',
              pointerEvents:'none', zIndex:10,
            }}>
              <div style={{
                width:'40px', height:'40px', borderRadius:'50%',
                background:'rgba(103,232,249,0.15)',
                border:'1px solid rgba(103,232,249,0.4)',
                display:'flex', alignItems:'center', justifyContent:'center',
                color:'#67e8f9', fontSize:'18px',
              }}>→</div>
            </div>
            <div className="carousel-track" ref={el => {
              if (!el) return
              el._scrollSpeed = 0
              if (el._raf) return
              const tick = () => {
                if (el._scrollSpeed) {
                  el.scrollLeft += el._scrollSpeed
                }
                el._raf = requestAnimationFrame(tick)
              }
              el._raf = requestAnimationFrame(tick)
              // no dot tracking needed
              el.addEventListener('scroll', () => {})
            }} style={{
              display:'flex',
              gap:'20px',
              overflowX:'scroll',
              overflowY:'visible',
              paddingLeft:'32px',
              paddingRight:'32px',
              paddingBottom:'24px',
              scrollbarWidth:'none',
              msOverflowStyle:'none',
              WebkitOverflowScrolling:'touch',
            }}>
              {projects.map((p2,i)=>(
                <div key={p2.title} className="project-card" style={{
                  width:'min(340px, calc((100vw - 64px - 40px) / 3))',
                  flexShrink:0,
                  background:'rgba(255,255,255,0.04)',
                  border:'1px solid rgba(255,255,255,0.07)',
                  borderTop:`3px solid ${p2.color}`,
                  borderRadius:'16px',
                  padding:'28px 28px 24px',
                  display:'flex', flexDirection:'column',
                  transition:'transform 0.25s, box-shadow 0.25s',
                }}
                  onMouseEnter={e=>{ e.currentTarget.style.transform='translateY(-6px)'; e.currentTarget.style.boxShadow=`0 20px 60px ${p2.color}22` }}
                  onMouseLeave={e=>{ e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='none' }}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'20px' }}>
                    <span style={{ fontFamily:'var(--font-mono)', fontSize:'10px', color:p2.color, letterSpacing:'0.12em' }}>{p2.type}</span>
                    <span style={{ fontFamily:'var(--font-mono)', fontSize:'11px', color:'rgba(255,255,255,0.15)' }}>0{i+1}</span>
                  </div>
                  <h3 style={{ fontSize:'20px', fontWeight:700, color:'white', marginBottom:'14px', lineHeight:1.25 }}>{p2.title}</h3>
                  <p style={{ fontSize:'13px', color:'rgba(255,255,255,0.48)', lineHeight:1.75, marginBottom:'20px', flex:1 }}>{p2.description}</p>
                  <div style={{ display:'flex', gap:'6px', flexWrap:'wrap', marginBottom:'22px' }}>
                    {p2.tags.map(tag=><span key={tag} style={{ fontSize:'9px', fontFamily:'var(--font-mono)', color:'rgba(255,255,255,0.35)', background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.07)', padding:'3px 9px', borderRadius:'999px' }}>{tag}</span>)}
                  </div>
                  {p2.live&&<a href={p2.live} target="_blank" rel="noopener noreferrer"
                    style={{ display:'block', textAlign:'center', fontSize:'12px', fontWeight:600, color:'#020e1a', background:p2.color, padding:'10px 0', borderRadius:'8px', textDecoration:'none' }}
                    onMouseEnter={e=>e.currentTarget.style.opacity='0.85'}
                    onMouseLeave={e=>e.currentTarget.style.opacity='1'}>
                    View Live Site ↗
                  </a>}
                </div>
              ))}
            </div>


          </div>

        </section>

        {/* ABOUT */}
        <section id="about" style={sec()}>
          <div style={cont}>
            <div style={{ marginBottom:'44px' }}>
              <p style={{ fontFamily:'var(--font-mono)', color:'#67e8f9', fontSize:'10px', letterSpacing:'0.22em', marginBottom:'8px' }}>03. ABOUT</p>
              <h2 style={{ fontSize:'clamp(26px,5vw,42px)', fontWeight:800, color:'white', letterSpacing:'-0.02em' }}>About me</h2>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:'28px' }}>
              <div style={glass}>
                <div style={{ display:'flex', flexDirection:'column', gap:'14px', fontSize:'15px', color:'rgba(255,255,255,0.6)', lineHeight:1.8 }}>
                  <p>I'm Carter — a self-taught frontend developer and Michigan-based freelance web designer. I build fast, polished websites and web apps that help businesses look professional and get found online.</p>
                  <p>I work remotely with small businesses all across Michigan — restaurants, contractors, coffee shops, boutiques, and anyone who needs a real website instead of a Facebook page. From the UP to Detroit, if you're in Michigan I can build your site.</p>
                  <p>Currently open to freelance projects and always happy to hear from new people.</p>
                </div>
                <a href="mailto:carteryax@gmail.com" style={{ display:'inline-block', marginTop:'22px', fontSize:'14px', color:'#67e8f9', textDecoration:'none', fontWeight:500 }}>carteryax@gmail.com →</a>
              </div>
              <div style={glass}>
                <p style={{ fontFamily:'var(--font-mono)', fontSize:'10px', color:'rgba(255,255,255,0.3)', letterSpacing:'0.18em', marginBottom:'18px' }}>TECH I WORK WITH</p>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px' }}>
                  {skills.map(s=><div key={s} style={{ display:'flex', alignItems:'center', gap:'8px', fontSize:'13px', color:'rgba(255,255,255,0.65)' }}><span style={{ color:'#67e8f9', fontSize:'9px', fontFamily:'var(--font-mono)' }}>▹</span>{s}</div>)}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" style={{ ...sec(), paddingBottom:'160px' }}>
          <div style={cont}>
            <div style={{ marginBottom:'44px' }}>
              <p style={{ fontFamily:'var(--font-mono)', color:'#67e8f9', fontSize:'10px', letterSpacing:'0.22em', marginBottom:'8px' }}>04. CONTACT</p>
              <h2 style={{ fontSize:'clamp(26px,5vw,42px)', fontWeight:800, color:'white', letterSpacing:'-0.02em' }}>Let's work together</h2>
              <p style={{ fontSize:'15px', color:'rgba(255,255,255,0.48)', marginTop:'12px', maxWidth:'460px', lineHeight:1.7 }}>Have a project in mind? I'm available for freelance work and always happy to hear from new people.</p>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))', gap:'28px' }}>
              <div style={{ display:'flex', flexDirection:'column', gap:'22px' }}>
                {[{label:'EMAIL',value:'carteryax@gmail.com',href:'mailto:carteryax@gmail.com'},{label:'BASED IN',value:'Michigan',href:null}].map(item=>(
                  <div key={item.label}>
                    <p style={{ fontFamily:'var(--font-mono)', fontSize:'9px', color:'rgba(255,255,255,0.28)', letterSpacing:'0.22em', marginBottom:'6px' }}>{item.label}</p>
                    {item.href?<a href={item.href} style={{ color:'white', textDecoration:'none', fontSize:'15px' }} onMouseEnter={e=>e.target.style.color='#67e8f9'} onMouseLeave={e=>e.target.style.color='white'}>{item.value}</a>:<p style={{ color:'white', fontSize:'15px' }}>{item.value}</p>}
                  </div>
                ))}
                <div>
                  <p style={{ fontFamily:'var(--font-mono)', fontSize:'9px', color:'rgba(255,255,255,0.28)', letterSpacing:'0.22em', marginBottom:'12px' }}>SOCIAL</p>
                  {socials.map(s=><a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" style={{ display:'block', fontSize:'14px', color:'rgba(255,255,255,0.45)', textDecoration:'none', marginBottom:'8px', transition:'color 0.2s' }} onMouseEnter={e=>e.target.style.color='#67e8f9'} onMouseLeave={e=>e.target.style.color='rgba(255,255,255,0.45)'}>{s.label} ↗</a>)}
                </div>
              </div>
              <div style={glass}>
                {formStatus==='success'?(
                  <div style={{ padding:'20px', border:'1px solid rgba(52,211,153,0.3)', borderRadius:'12px', background:'rgba(16,185,129,0.1)', color:'#6ee7b7', fontSize:'14px' }}>Message sent! I'll get back to you soon.</div>
                ):(
                  <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:'14px' }}>
                    {[{name:'name',label:'NAME',type:'text',ph:'Your name'},{name:'email',label:'EMAIL',type:'email',ph:'your@email.com'}].map(f=>(
                      <div key={f.name}>
                        <label style={{ display:'block', fontFamily:'var(--font-mono)', fontSize:'9px', color:'rgba(255,255,255,0.3)', letterSpacing:'0.2em', marginBottom:'8px' }}>{f.label}</label>
                        <input type={f.type} name={f.name} required placeholder={f.ph} value={formData[f.name]} onChange={e=>setFormData({...formData,[f.name]:e.target.value})}
                          style={{ width:'100%', background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:'10px', padding:'11px 14px', color:'white', fontSize:'14px', outline:'none', boxSizing:'border-box' }}/>
                      </div>
                    ))}
                    <div>
                      <label style={{ display:'block', fontFamily:'var(--font-mono)', fontSize:'9px', color:'rgba(255,255,255,0.3)', letterSpacing:'0.2em', marginBottom:'8px' }}>MESSAGE</label>
                      <textarea name="message" required rows={4} placeholder="Tell me about your project..." value={formData.message} onChange={e=>setFormData({...formData,message:e.target.value})}
                        style={{ width:'100%', background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:'10px', padding:'11px 14px', color:'white', fontSize:'14px', outline:'none', resize:'none', boxSizing:'border-box' }}/>
                    </div>
                    {formStatus==='error'&&<p style={{ color:'#f87171', fontSize:'12px' }}>Something went wrong. Try again.</p>}
                    <button type="submit" disabled={formStatus==='sending'} style={{ padding:'13px', background:'#38bdf8', color:'#020e1a', fontWeight:700, borderRadius:'10px', border:'none', fontSize:'14px', cursor:'pointer' }}>
                      {formStatus==='sending'?'Sending...':'Send message'}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer style={{ position:'relative', zIndex:10, borderTop:'1px solid rgba(255,255,255,0.05)', padding:'24px 32px', display:'flex', flexWrap:'wrap', justifyContent:'space-between', alignItems:'center', gap:'12px' }}>
          <p style={{ fontFamily:'var(--font-mono)', fontSize:'10px', color:'rgba(255,255,255,0.22)' }}>© {new Date().getFullYear()} Carter Yax. Built with Next.js & Tailwind.</p>
          <div style={{ display:'flex', gap:'20px' }}>
            {socials.map(s=><a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" style={{ fontSize:'10px', color:'rgba(255,255,255,0.22)', textDecoration:'none', transition:'color 0.2s' }} onMouseEnter={e=>e.target.style.color='#67e8f9'} onMouseLeave={e=>e.target.style.color='rgba(255,255,255,0.22)'}>{s.label}</a>)}
          </div>
        </footer>
      </div>
    </>
  )
}