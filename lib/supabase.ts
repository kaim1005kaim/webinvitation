import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type RSVPData = {
  id?: string
  name: string
  email: string
  attendance: boolean
  guests: number
  allergy?: string
  message?: string
  created_at?: string
}