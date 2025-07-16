import { NextRequest, NextResponse } from 'next/server'
import { AuthService } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Email is required' },
        { status: 400 }
      )
    }

    // Find user
    const user = await AuthService.findUserByEmail(email)
    if (!user) {
      // Don't reveal if user exists or not for security
      return NextResponse.json({
        success: true,
        message: 'If an account with that email exists, a reset link has been sent.',
      })
    }

    // Generate reset token
    const resetToken = AuthService.generateResetToken()
    const resetTokenExpiry = Date.now() + 3600000 // 1 hour

    // Update user with reset token
    await AuthService.updateUser(user.id, {
      resetToken,
      resetTokenExpiry,
    })

    // In production, send email with reset link
    console.log(`Reset token for ${email}: ${resetToken}`)
    console.log(`Reset URL: ${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password?token=${resetToken}`)

    return NextResponse.json({
      success: true,
      message: 'If an account with that email exists, a reset link has been sent.',
    })
  } catch (error) {
    console.error('Forgot password error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
