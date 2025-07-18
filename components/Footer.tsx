'use client'

import { motion } from 'framer-motion'

interface FooterProps {
  copyright?: string
}

export default function Footer({ copyright }: FooterProps) {
  return (
    <footer className="bg-primary text-white">
      <div className="container mx-auto section-padding">
        <div className="text-center">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="border-t border-white/20 pt-8 text-white/60"
          >
            <p className="mb-3 text-sm">
              ご相談や不明点があればお気軽に新郎新婦にご連絡ください！
            </p>
            <p className="text-sm">{copyright || '© 2024 Wedding Invitation. All rights reserved.'}</p>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}