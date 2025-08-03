import { NextRequest, NextResponse } from 'next/server'
import { SupabaseAuthService } from '@/lib/supabase-auth'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Sign in with Supabase
    const { user, session, profile } = await SupabaseAuthService.signIn(email, password)

    if (!user || !session || !profile) {
      return NextResponse.json(
        { success: false, error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Convert profile to user format for compatibility
    const userData = SupabaseAuthService.profileToUser(profile)

    const response = NextResponse.json({
      success: true,
      user: userData,
      token: session.access_token,
    })

    // Set HTTP-only cookie for token
    response.cookies.set('auth-token', session.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: session.expires_in || 7 * 24 * 60 * 60, // Use session expiry or 7 days
      path: '/',
    })

    return response
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { success: false, error: 'Invalid email or password' },
      { status: 401 }
    )
  }
}
