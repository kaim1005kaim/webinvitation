'use client'

import { motion } from 'framer-motion'

interface HeroSectionProps {
  names: string
  date: string
  bgImage?: string
}

export default function HeroSection({ names, date, bgImage }: HeroSectionProps) {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {bgImage && (
        <div className="absolute inset-0">
          <img
            src={bgImage}
            alt="Hero background"
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      {/* 背景画像がない場合のグラデーション背景 */}
      {!bgImage && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-accent to-primary/80" />
      )}
      
      <div className="relative z-10 flex h-full items-center justify-center text-center text-white pt-96">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8 -mt-12"
          >
            <h2 className="text-4xl md:text-5xl font-serif tracking-widest mb-6 text-shadow-lg">
              INVITATION
            </h2>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="mb-6 text-5xl md:text-7xl font-serif text-shadow-lg">
              {names}
            </h1>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <p className="text-2xl md:text-4xl font-serif text-shadow-lg">{date}</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
          >
            <div className="animate-bounce">
              <svg
                className="h-8 w-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}