import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { rsvpSchema } from '@/lib/validations'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate the request body
    const validatedData = rsvpSchema.parse(body)
    
    // Insert into Supabase
    const { data, error } = await supabase
      .from('rsvp')
      .insert({
        name: validatedData.name,
        email: validatedData.email,
        attendance: validatedData.attendance,
        guests: validatedData.guests,
        allergy: validatedData.allergy || null,
        message: validatedData.message || null,
      })
      .select()
      .single()
    
    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'データベースエラーが発生しました' },
        { status: 500 }
      )
    }
    
    return NextResponse.json(
      { message: 'RSVP が正常に送信されました', data },
      { status: 201 }
    )
  } catch (error) {
    console.error('API error:', error)
    
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'バリデーションエラーが発生しました' },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { error: 'サーバーエラーが発生しました' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({ message: 'RSVP API is working' })
}