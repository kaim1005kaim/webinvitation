import { z } from 'zod'

export const rsvpSchema = z.object({
  attendance: z.enum(['both', 'part1', 'part2', 'absent']),
  relation: z.enum(['groom', 'bride']),
  name: z.string().min(1, '名前を入力してください'),
  nameRomaji: z.string().min(1, 'ローマ字を入力してください'),
  email: z.string().email('有効なメールアドレスを入力してください'),
  hasGuests: z.boolean(),
  guests: z.number().int().min(0, '同行者数は0以上を入力してください'),
  guestDetails: z.string().optional(),
  allergy: z.string().optional(),
  message: z.string().optional(),
})

export type RSVPFormData = z.infer<typeof rsvpSchema>