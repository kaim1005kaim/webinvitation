import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Wedding Invitation | Taro & Hanako',
  description: '私たちの結婚式にご招待します',
  openGraph: {
    title: 'Wedding Invitation | Taro & Hanako',
    description: '私たちの結婚式にご招待します',
    images: ['/images/og-image.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wedding Invitation | Taro & Hanako',
    description: '私たちの結婚式にご招待します',
    images: ['/images/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={`${inter.className} bg-neutral`}>{children}</body>
    </html>
  )
}