import { NextRequest, NextResponse } from 'next/server'
import { SupabaseAuthService } from '@/lib/supabase-auth'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Email is required' },
        { status: 400 }
      )
    }

    // Send reset password email via Supabase
    await SupabaseAuthService.resetPassword(email)

    return NextResponse.json({
      success: true,
      message: 'If an account with that email exists, a reset link has been sent.',
    })
  } catch (error) {
    console.error('Forgot password error:', error)
    return NextResponse.json({
      success: true,
      message: 'If an account with that email exists, a reset link has been sent.',
    })
  }
}
