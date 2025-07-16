import { NextRequest, NextResponse } from 'next/server'
import { AuthService } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, phone, nationalId } = await request.json()

    if (!validateInput(name, email, password)) {
      return NextResponse.json(
        { success: false, error: 'Name, email, and password are required' },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { success: false, error: 'Password must be at least 6 characters long' },
        { status: 400 }
      )
    }

    const existingUser = await AuthService.findUserByEmail(email)
    if (existingUser) {
      return NextResponse.json(
        { success: false, error: 'User with this email already exists' },
        { status: 409 }
      )
    }

    const hashedPassword = await AuthService.hashPassword(password)

    const newUser = await AuthService.createUser({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: 'user',
      phone,
      nationalId,
      avatar: '/placeholder-user.jpg',
      bio: '',
      location: '',
    })

    const token = AuthService.generateToken(newUser.id)

    const sanitizedUser = AuthService.sanitizeUser(newUser)

    const response = NextResponse.json({
      success: true,
      user: sanitizedUser,
      token,
    })

    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/',
    })

    return response
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

function validateInput(name: string, email: string, password: string): boolean {
  return !!name && !!email && !!password;
}
