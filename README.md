# Carter Yax — Portfolio Site

Personal portfolio built with Next.js 14 and Tailwind CSS.

## Setup

```bash
npx create-next-app@14 portfolio
# TypeScript=No, ESLint=Yes, Tailwind=Yes, src/=No, App Router=Yes, alias=No
# Copy files in, then:
npm install
npm run dev
```

## Structure

```
app/
  layout.jsx      — fonts, metadata
  page.jsx        — assembles all sections
  globals.css     — tailwind + base styles
components/
  Navbar.jsx      — sticky nav with mobile menu
  Hero.jsx        — intro, socials, CTAs
  Work.jsx        — 3 project cards
  About.jsx       — bio + skills
  Contact.jsx     — form + footer
tailwind.config.js
```

## To customise

- Add projects in `components/Work.jsx`
- Update bio in `components/About.jsx`
- Wire up contact form: go to formspree.io, get a free form ID, replace YOUR_FORM_ID in `components/Contact.jsx`

## Deploy

```bash
git init && git add . && git commit -m "initial"
# push to GitHub, import to vercel.com
```
