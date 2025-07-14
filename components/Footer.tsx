'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface FooterProps {
  copyright?: string
}

export default function Footer({ copyright }: FooterProps) {
  const [copiedUrl, setCopiedUrl] = useState(false)

  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''
  const shareText = '結婚式の招待状をご覧ください'

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopiedUrl(true)
      setTimeout(() => setCopiedUrl(false), 2000)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  const shareOnTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`
    window.open(twitterUrl, '_blank')
  }

  const shareOnFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
    window.open(facebookUrl, '_blank')
  }

  const shareOnLine = () => {
    const lineUrl = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(shareUrl)}`
    window.open(lineUrl, '_blank')
  }

  return (
    <footer className="bg-primary text-white">
      <div className="container mx-auto section-padding">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-serif mb-6">Share Our Joy</h3>
            <p className="text-white/80 mb-8">
              この招待状をシェアして、みんなで一緒にお祝いしましょう
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex justify-center space-x-4 mb-8"
          >
            <button
              onClick={shareOnTwitter}
              className="bg-blue-400 hover:bg-blue-500 text-white p-3 rounded-full transition-colors"
              aria-label="Twitter で共有"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
              </svg>
            </button>

            <button
              onClick={shareOnFacebook}
              className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full transition-colors"
              aria-label="Facebook で共有"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </button>

            <button
              onClick={shareOnLine}
              className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full transition-colors"
              aria-label="LINE で共有"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.373 0 0 4.447 0 9.931c0 4.913 4.356 9.038 10.267 9.838v4.28c0 .344.418.518.675.283l3.627-3.317c3.402-.24 6.089-3.395 6.089-6.877C20.658 4.447 18.627 0 12 0zm6.214 14.643L16.2 16.657a.69.69 0 01-.493.202H8.293a.69.69 0 01-.693-.69v-5.344a.69.69 0 01.693-.69h7.414a.69.69 0 01.693.69v3.818z" />
              </svg>
            </button>

            <button
              onClick={copyToClipboard}
              className="bg-gray-600 hover:bg-gray-700 text-white p-3 rounded-full transition-colors"
              aria-label="URL をコピー"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </button>
          </motion.div>

          {copiedUrl && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-green-500 text-white px-4 py-2 rounded-lg inline-block mb-4"
            >
              URLをコピーしました！
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="border-t border-white/20 pt-8 text-white/60"
          >
            <p>{copyright || '© 2024 Wedding Invitation. All rights reserved.'}</p>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}