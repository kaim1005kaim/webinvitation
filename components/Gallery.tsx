'use client'

import { useState } from 'react'
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

  return (
    <section className="section-padding bg-white">
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
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {story}
            </p>
          </motion.div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {photos.map((photo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="relative aspect-square cursor-pointer overflow-hidden rounded-lg group"
              onClick={() => setSelectedImage(index)}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            </motion.div>
          ))}
        </div>

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