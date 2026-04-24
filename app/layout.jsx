import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const mono  = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' })

export const metadata = {
  title: 'Carter Yax — Michigan Freelance Web Developer',
  description: 'Freelance web developer helping small businesses across Michigan get online. Restaurants, contractors, shops, and more. Fast, modern websites built with React and Next.js.',
  keywords: 'Michigan web developer, freelance web designer Michigan, small business website Michigan, web developer Michigan, Michigan website design',
  metadataBase: new URL('https://cartery.dev'),
  openGraph: {
    title: 'Carter Yax — Michigan Freelance Web Developer',
    description: 'Freelance web developer helping small businesses across Michigan get online. Fast, modern websites for restaurants, contractors, shops, and more.',
    url: 'https://cartery.dev',
    siteName: 'Carter Yax',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Carter Yax — Michigan Freelance Web Developer',
    description: 'Freelance web developer helping small businesses across Michigan get online.',
    creator: '@CarterJYreal',
  },
  alternates: {
    canonical: 'https://cartery.dev',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  )
}