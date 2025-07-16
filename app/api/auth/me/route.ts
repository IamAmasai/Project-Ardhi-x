import { NextRequest, NextResponse } from 'next/server'
import { AuthService } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    // Get token from cookie
    const token = request.cookies.get('auth-token')?.value

    if (!token) {
      return NextResponse.json(
        { success: false, error: 'No authentication token' },
        { status: 401 }
      )
    }

    // Verify token
    const decoded = AuthService.verifyToken(token)
    if (!decoded) {
      return NextResponse.json(
        { success: false, error: 'Invalid token' },
        { status: 401 }
      )
    }

    // Get user data
    const user = await AuthService.findUserById(decoded.userId)
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      )
    }

    // Return sanitized user data
    const sanitizedUser = AuthService.sanitizeUser(user)

    return NextResponse.json({
      success: true,
      user: sanitizedUser,
    })
  } catch (error) {
    console.error('Me endpoint error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
