'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Photo {
  src: string
  alt: string
  caption?: string
}

interface GalleryProps {
  photos: Photo[]
  story?: string
}

export default function Gallery({ photos, story }: GalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const [isPlaying, setIsPlaying] = useState(true)

  useEffect(() => {
    setIsClient(true)
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (isMobile && isPlaying) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % photos.length)
      }, 6000) // 6秒ごとに切り替え
      return () => clearInterval(interval)
    }
  }, [isMobile, photos.length, isPlaying])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % photos.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + photos.length) % photos.length)
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  return (
    <section id="story" className="section-padding bg-white">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-serif text-primary mb-4">
            Our Story
          </h2>
          <p className="text-lg text-gray-600">私たちのストーリー</p>
        </motion.div>

        {story && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto mb-12 text-center"
          >
            <p className="text-gray-700 leading-relaxed whitespace-pre-line font-serif text-lg md:text-lg text-sm px-4 md:px-0">
              {story}
            </p>
          </motion.div>
        )}

        {/* モバイル用インスタグラム風UI */}
        {isClient && isMobile ? (
          <div className="w-full bg-white border-t border-gray-200 max-w-md mx-auto">
            {/* ストーリーサークル */}
            <div className="flex space-x-4 p-4 bg-white border-b border-gray-200 overflow-x-auto">
              {photos.slice(0, 4).map((photo, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center flex-shrink-0"
                >
                  <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 p-0.5 cursor-pointer relative"
                       onClick={() => setSelectedImage(index)}>
                    <div className="w-full h-full rounded-full bg-white p-0.5">
                      <img
                        src={photo.src}
                        alt={photo.alt}
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                    {index === 0 && (
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-gray-600 mt-1">
                    {index === 0 ? 'You' : '私たち'}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* プロフィールヘッダー */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex items-center space-x-3 px-4 py-3 bg-white border-b border-gray-200"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 p-0.5">
                <div className="w-full h-full rounded-full bg-white p-0.5">
                  <img
                    src={photos[0].src}
                    alt={photos[0].alt}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900">Our Gallery</h3>
                <p className="text-xs text-gray-500">Kanagawa</p>
              </div>
              <div className="flex-1"></div>
              <div className="text-gray-400">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                </svg>
              </div>
            </motion.div>

            {/* グリッド */}
            <div className="grid grid-cols-3 gap-0.5 p-0.5">
              {photos.map((photo, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="relative aspect-square cursor-pointer overflow-hidden group"
                  onClick={() => setSelectedImage(index)}
                >
                  <img
                    src={photo.src}
                    alt=""
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                </motion.div>
              ))}
            </div>

            {/* 下部ナビゲーションバー */}
            <div className="flex items-center justify-around py-3 bg-white border-t border-gray-200">
              <button 
                className="p-2"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                <svg className="w-6 h-6 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                </svg>
              </button>
              <button 
                className="p-2"
                onClick={() => document.getElementById('details')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              <button 
                className="p-2"
                onClick={() => document.getElementById('rsvp')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
              <button 
                className="p-2 relative"
                onClick={() => document.getElementById('story')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
              </button>
              <button 
                className="p-2 relative"
                onClick={() => window.open('https://www.google.com/maps/search/おすすめの場所+神奈川', '_blank')}
              >
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
              </button>
            </div>
          </div>
        ) : (
          /* デスクトップ用インスタグラム風UI */
          <div className="max-w-md mx-auto bg-white border border-gray-200 rounded-lg overflow-hidden shadow-lg">
            {/* ストーリーサークル */}
            <div className="flex justify-center space-x-4 p-4 bg-white border-b border-gray-200">
              {photos.slice(0, 4).map((photo, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center"
                >
                  <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 p-0.5 cursor-pointer relative"
                       onClick={() => setSelectedImage(index)}>
                    <div className="w-full h-full rounded-full bg-white p-0.5">
                      <img
                        src={photo.src}
                        alt={photo.alt}
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                    {index === 0 && (
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-gray-600 mt-1">
                    {index === 0 ? 'You' : '私たち'}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* プロフィールヘッダー */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex items-center space-x-3 px-4 py-3 bg-white border-b border-gray-200"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 p-0.5">
                <div className="w-full h-full rounded-full bg-white p-0.5">
                  <img
                    src={photos[0].src}
                    alt={photos[0].alt}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900">Our Gallery</h3>
                <p className="text-xs text-gray-500">Kanagawa</p>
              </div>
              <div className="flex-1"></div>
              <div className="text-gray-400">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                </svg>
              </div>
            </motion.div>

            {/* グリッド */}
            <div className="grid grid-cols-3 gap-0.5 p-0.5">
              {photos.map((photo, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="relative aspect-square cursor-pointer overflow-hidden group"
                  onClick={() => setSelectedImage(index)}
                >
                  <img
                    src={photo.src}
                    alt=""
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                </motion.div>
              ))}
            </div>

            {/* 下部ナビゲーションバー */}
            <div className="flex items-center justify-around py-3 bg-white border-t border-gray-200">
              <button 
                className="p-2"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                <svg className="w-6 h-6 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                </svg>
              </button>
              <button 
                className="p-2"
                onClick={() => document.getElementById('details')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              <button 
                className="p-2"
                onClick={() => document.getElementById('rsvp')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
              <button 
                className="p-2 relative"
                onClick={() => document.getElementById('story')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
              </button>
              <button 
                className="p-2 relative"
                onClick={() => window.open('https://www.google.com/maps/search/おすすめの場所+神奈川', '_blank')}
              >
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
              </button>
            </div>
          </div>
        )}

        {/* Lightbox */}
        <AnimatePresence>
          {selectedImage !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="relative max-w-4xl max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={photos[selectedImage].src}
                  alt={photos[selectedImage].alt}
                  className="object-contain max-h-[85vh] w-auto max-w-full"
                />
                {photos[selectedImage].caption && (
                  <p className="text-white text-center mt-4">
                    {photos[selectedImage].caption}
                  </p>
                )}
                
                {/* Navigation */}
                <button
                  className="absolute top-1/2 -left-12 -translate-y-1/2 text-white p-2 hover:bg-white/10 rounded-full transition-colors"
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedImage((prev) => 
                      prev === 0 ? photos.length - 1 : prev! - 1
                    )
                  }}
                >
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                <button
                  className="absolute top-1/2 -right-12 -translate-y-1/2 text-white p-2 hover:bg-white/10 rounded-full transition-colors"
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedImage((prev) => 
                      prev === photos.length - 1 ? 0 : prev! + 1
                    )
                  }}
                >
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                
                {/* Close button */}
                <button
                  className="absolute top-4 right-4 text-white p-2 hover:bg-white/10 rounded-full transition-colors"
                  onClick={() => setSelectedImage(null)}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}