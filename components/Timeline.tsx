'use client'

import { motion } from 'framer-motion'

interface TimelineItem {
  time: string
  title: string
  description: string
  icon?: string
}

interface TimelineProps {
  schedule: TimelineItem[]
}

export default function Timeline({ schedule }: TimelineProps) {
  return (
    <section className="section-padding bg-neutral">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-serif text-primary mb-4">
            Timeline
          </h2>
          <p className="text-lg text-gray-600">当日の流れ</p>
        </motion.div>

        <div className="relative">
          {/* Desktop Timeline */}
          <div className="hidden md:block overflow-x-auto pb-6">
            <div className="flex space-x-8 min-w-max mx-auto justify-center">
              {schedule.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center mb-4 relative">
                      <span className="text-2xl">{item.icon || (index + 1)}</span>
                      {index < schedule.length - 1 && (
                        <div className="absolute top-1/2 left-full w-8 h-0.5 bg-primary/30" />
                      )}
                    </div>
                    
                    <div className="bg-white rounded-lg shadow-md p-6 w-64 text-center">
                      <p className="text-sm text-primary font-semibold mb-2">
                        {item.time}
                      </p>
                      <h3 className="text-lg font-serif mb-2">{item.title}</h3>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile Timeline */}
          <div className="md:hidden space-y-6">
            {schedule.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-start space-x-4"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center">
                    <span className="text-lg">{item.icon || (index + 1)}</span>
                  </div>
                  {index < schedule.length - 1 && (
                    <div className="w-0.5 h-24 bg-primary/30 ml-6 mt-2" />
                  )}
                </div>
                
                <div className="flex-grow">
                  <div className="bg-white rounded-lg shadow-md p-4">
                    <p className="text-sm text-primary font-semibold mb-1">
                      {item.time}
                    </p>
                    <h3 className="text-lg font-serif mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}