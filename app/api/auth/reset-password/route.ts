import { NextRequest, NextResponse } from 'next/server'
import { SupabaseAuthService } from '@/lib/supabase-auth'

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json()

    if (!password) {
      return NextResponse.json(
        { success: false, error: 'Password is required' },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { success: false, error: 'Password must be at least 6 characters long' },
        { status: 400 }
      )
    }

    // Update password via Supabase (user must be authenticated)
    await SupabaseAuthService.updatePassword(password)

    return NextResponse.json({
      success: true,
      message: 'Password updated successfully',
    })
  } catch (error) {
    console.error('Reset password error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update password' },
      { status: 500 }
    )
  }
}
