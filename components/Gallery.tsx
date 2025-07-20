'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

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
  const [isMobile, setIsMobile] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const [swiper, setSwiper] = useState<SwiperType | null>(null)

  useEffect(() => {
    setIsClient(true)
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

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

        {/* スライダー式ギャラリー */}
        {isClient && (
          <div className="w-full max-w-md mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-lg"
            >
              {/* プロフィールヘッダー */}
              <div className="flex items-center space-x-3 px-4 py-3 bg-white border-b border-gray-200">
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
              </div>

              {/* Swiper スライダー */}
              <div className="relative">
                <Swiper
                  modules={[Navigation, Pagination, Autoplay]}
                  spaceBetween={0}
                  slidesPerView={1}
                  navigation={{
                    nextEl: '.swiper-button-next-custom',
                    prevEl: '.swiper-button-prev-custom',
                  }}
                  pagination={{ 
                    clickable: true,
                    el: '.swiper-pagination-custom',
                  }}
                  autoplay={{ delay: 6000, disableOnInteraction: false }}
                  onSwiper={setSwiper}
                  className="relative aspect-square"
                >
                  {photos.map((photo, index) => (
                    <SwiperSlide key={index}>
                      <div 
                        className="relative aspect-square cursor-pointer"
                        onClick={() => setSelectedImage(index)}
                      >
                        <img
                          src={photo.src}
                          alt={photo.alt}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>

                {/* カスタムナビゲーションボタン - デスクトップのみ */}
                {!isMobile && (
                  <>
                    <button className="swiper-button-prev-custom absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all">
                      <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button className="swiper-button-next-custom absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all">
                      <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </>
                )}

                {/* カスタムページネーション */}
                <div className="swiper-pagination-custom absolute bottom-4 left-0 right-0 flex justify-center gap-1.5 z-10"></div>
              </div>

              {/* 下部ナビゲーションバー - モバイルのみ */}
              {isMobile && (
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
                    onClick={() => window.open('http://hotelemanon.com/', '_blank')}
                  >
                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
                  </button>
                </div>
              )}
            </motion.div>
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

      <style jsx global>{`
        .swiper-pagination-custom .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: rgba(0, 0, 0, 0.3);
          opacity: 1;
          transition: all 0.3s;
        }
        
        .swiper-pagination-custom .swiper-pagination-bullet-active {
          background: rgba(0, 0, 0, 0.8);
          width: 24px;
          border-radius: 4px;
        }
      `}</style>
    </section>
  )
}