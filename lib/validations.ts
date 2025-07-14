import { z } from 'zod'

export const rsvpSchema = z.object({
  name: z.string().min(1, '名前を入力してください'),
  email: z.string().email('有効なメールアドレスを入力してください'),
  attendance: z.boolean(),
  guests: z.number().min(0, '同行者数は0以上を入力してください').max(5, '同行者数は5人以下にしてください'),
  allergy: z.string().optional(),
  message: z.string().optional(),
})

export type RSVPFormData = z.infer<typeof rsvpSchema>