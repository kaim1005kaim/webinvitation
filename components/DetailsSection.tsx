'use client'

import { motion } from 'framer-motion'

interface Event {
  title: string
  start: string
  reception: string
  fee: string
  note?: string
}

interface Venue {
  name: string
  jpAddress: string
  enAddress: string
  mapUrl: string
  dressCode: string
}

interface DetailsSectionProps {
  events: Event[]
  venue: Venue
}

export default function DetailsSection({ events, venue }: DetailsSectionProps) {
  return (
    <section id="details" className="section-padding bg-white">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-serif text-primary mb-4">
            Wedding Details
          </h2>
          <p className="text-lg text-gray-600 mb-2">詳細情報</p>
          <p className="text-2xl font-serif text-primary">2025年11月23日（日）</p>
        </motion.div>

        {/* Venue Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="card max-w-3xl mx-auto mb-12"
        >
          <h3 className="text-2xl font-serif text-primary mb-6">会場</h3>
          
          <div className="space-y-4 text-gray-700">
            <div className="flex items-start">
              <svg className="w-5 h-5 mr-3 text-primary mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <div>
                <p className="font-medium text-lg">{venue.name}</p>
                <p className="text-sm mt-1">{venue.jpAddress}</p>
                <p className="text-sm text-gray-500">{venue.enAddress}</p>
                <div className="flex flex-col gap-2">
                  <a
                    href={venue.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline text-sm inline-flex items-center"
                  >
                    地図を見る
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                  <a
                    href="http://hotelemanon.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline text-sm inline-flex items-center"
                  >
                    公式サイト
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            
            <div className="flex items-start">
              <svg className="w-5 h-5 mr-3 text-primary mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              <div>
                <p className="font-medium">ドレスコード</p>
                <p className="text-sm">{venue.dressCode}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Map */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto mb-12"
        >
          <div className="bg-gray-200 rounded-lg overflow-hidden shadow-lg h-96">
            <iframe 
              src={`https://maps.google.com/maps?q=HOTEL+EMANON+東京都渋谷区南平台町7-1&output=embed`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </motion.div>

        {/* Events */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {events.map((event, index) => {
            const eventDate = new Date(event.start);
            const timeString = eventDate.toLocaleTimeString('ja-JP', { 
              hour: '2-digit', 
              minute: '2-digit' 
            });
            
            return (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="card"
              >
                <h3 className="text-2xl font-serif text-primary mb-4">
                  {event.title}
                </h3>
                
                <div className="space-y-3 text-gray-700">
                  <div className="flex items-start">
                    <svg className="w-5 h-5 mr-3 text-primary mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <p className="font-medium">受付時間</p>
                      <p className="text-sm">{event.reception}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <svg className="w-5 h-5 mr-3 text-primary mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <p className="font-medium">開始時間</p>
                      <p className="text-sm">{timeString}〜</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <span className="text-2xl mr-3 text-primary mt-1 font-bold">¥</span>
                    <div>
                      <p className="font-medium">参加費</p>
                      <p className="text-sm">{event.fee}</p>
                    </div>
                  </div>
                  
                  {event.note && (
                    <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">{event.note}</p>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  )
}