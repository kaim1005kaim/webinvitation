'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { rsvpSchema, type RSVPFormData } from '@/lib/validations'

export default function RsvpForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset
  } = useForm<RSVPFormData>({
    resolver: zodResolver(rsvpSchema),
    defaultValues: {
      attendance: 'both' as const,
      relation: 'groom' as const,
      hasGuests: false,
      guests: 0
    }
  })

  const attendance = watch('attendance')
  const hasGuests = watch('hasGuests')

  const onSubmit = async (data: RSVPFormData) => {
    setIsSubmitting(true)
    setSubmitError('')

    try {
      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('送信に失敗しました')
      }

      setSubmitSuccess(true)
      reset()
    } catch (error) {
      setSubmitError('送信中にエラーが発生しました。もう一度お試しください。')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="rsvp" className="section-padding bg-neutral">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-serif text-primary">
            出欠のご連絡
          </h2>
        </motion.div>

        {/* 期限の追加 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <div className="bg-red-50 border-2 border-red-400 rounded-lg p-4 max-w-md mx-auto">
            <p className="text-red-700 font-bold text-lg">
              ⚠️ ご回答期限：2025年10月31日（金）
            </p>
            <p className="text-red-600 text-sm mt-1">
              恐れ入りますが、上記期限までにご回答をお願いいたします
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          {submitSuccess ? (
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <svg
                className="w-16 h-16 text-green-500 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="text-2xl font-serif text-primary mb-2">
                ありがとうございます
              </h3>
              <p className="text-gray-600">
                出欠のご連絡を受け付けました。当日お会いできることを楽しみにしております。
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="bg-white rounded-lg shadow-lg p-8"
            >
              <div className="space-y-6">
                {/* Attendance */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    出欠 <span className="text-red-500">*</span>
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        {...register('attendance')}
                        type="radio"
                        value="both"
                        className="mr-2 text-primary focus:ring-primary"
                      />
                      <span>出席（両部）</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        {...register('attendance')}
                        type="radio"
                        value="part1"
                        className="mr-2 text-primary focus:ring-primary"
                      />
                      <span>出席（1部）</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        {...register('attendance')}
                        type="radio"
                        value="part2"
                        className="mr-2 text-primary focus:ring-primary"
                      />
                      <span>出席（2部）</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        {...register('attendance')}
                        type="radio"
                        value="absent"
                        className="mr-2 text-primary focus:ring-primary"
                      />
                      <span>欠席</span>
                    </label>
                  </div>
                </div>

                {/* Relation */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ご関係 <span className="text-red-500">*</span>
                  </label>
                  <div className="flex space-x-4">
                    <label className="flex items-center">
                      <input
                        {...register('relation')}
                        type="radio"
                        value="groom"
                        className="mr-2 text-primary focus:ring-primary"
                      />
                      <span>新郎側</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        {...register('relation')}
                        type="radio"
                        value="bride"
                        className="mr-2 text-primary focus:ring-primary"
                      />
                      <span>新婦側</span>
                    </label>
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    お名前 <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register('name')}
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="山田 太郎"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                  )}
                </div>

                {/* Name Romaji */}
                <div>
                  <label htmlFor="nameRomaji" className="block text-sm font-medium text-gray-700 mb-2">
                    お名前（ローマ字） <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register('nameRomaji')}
                    type="text"
                    id="nameRomaji"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Taro Yamada"
                  />
                  {errors.nameRomaji && (
                    <p className="mt-1 text-sm text-red-600">{errors.nameRomaji.message}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    メールアドレス <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register('email')}
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="yamada@example.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                  )}
                </div>

                {/* Guests (only show if attending) */}
                {attendance !== 'absent' && (
                  <div>
                    <label htmlFor="guests" className="block text-sm font-medium text-gray-700 mb-2">
                      同行者数
                    </label>
                    <input
                      {...register('guests', { valueAsNumber: true })}
                      type="number"
                      id="guests"
                      min="0"
                      max="5"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="0"
                    />
                    {errors.guests && (
                      <p className="mt-1 text-sm text-red-600">{errors.guests.message}</p>
                    )}
                  </div>
                )}

                {/* Allergy */}
                {attendance !== 'absent' && (
                  <div>
                    <label htmlFor="allergy" className="block text-sm font-medium text-gray-700 mb-2">
                      食物アレルギー / 制限事項
                    </label>
                    <textarea
                      {...register('allergy')}
                      id="allergy"
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="アレルギーや食事制限がある場合はご記入ください"
                    />
                  </div>
                )}

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    メッセージ
                  </label>
                  <textarea
                    {...register('message')}
                    id="message"
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="新郎新婦へのメッセージをどうぞ"
                  />
                </div>

                {/* Error message */}
                {submitError && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                    {submitError}
                  </div>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? '送信中...' : '送信する'}
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}