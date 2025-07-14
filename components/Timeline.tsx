'use client'

import { motion } from 'framer-motion'

interface ScheduleItem {
  time: string
  label: string
}

interface TimelineProps {
  schedule: ScheduleItem[]
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

        <div className="max-w-2xl mx-auto">
          <div className="space-y-4">
            {schedule.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center justify-between p-6 bg-white rounded-lg shadow-md"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center">
                    <span className="text-sm font-semibold">{item.time}</span>
                  </div>
                  <h3 className="text-lg font-serif text-gray-800">{item.label}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}