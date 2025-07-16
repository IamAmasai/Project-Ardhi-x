import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { User } from '@/types/auth'

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production'

export interface UserData {
  id: string
  email: string
  password: string
  name: string
  role: string
  avatar?: string
  phone?: string
  nationalId?: string
  bio?: string
  location?: string
  dateJoined: string
  isVerified: boolean
  resetToken?: string
  resetTokenExpiry?: number
}

// In production, replace this with a real database
let users: UserData[] = [
  {
    id: 'admin_001',
    email: 'admin@ardhix.com',
    password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/lewNCopxXzQKBxfHi', // password: admin123
    name: 'Admin User',
    role: 'admin',
    avatar: '/placeholder-user.jpg',
    phone: '+254 700 000 000',
    nationalId: 'KE000000000',
    bio: 'System Administrator',
    location: 'Nairobi, Kenya',
    dateJoined: '2024-01-01',
    isVerified: true,
  }
]

export class AuthService {
  static async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12)
  }

  static async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword)
  }

  static generateToken(userId: string): string {
    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' })
  }

  static verifyToken(token: string): { userId: string } | null {
    try {
      return jwt.verify(token, JWT_SECRET) as { userId: string }
    } catch {
      return null
    }
  }

  static generateResetToken(): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  }

  static async findUserByEmail(email: string): Promise<UserData | null> {
    return users.find(user => user.email.toLowerCase() === email.toLowerCase()) || null
  }

  static async findUserById(id: string): Promise<UserData | null> {
    return users.find(user => user.id === id) || null
  }

  static async createUser(userData: Omit<UserData, 'id' | 'dateJoined' | 'isVerified'>): Promise<UserData> {
    const newUser: UserData = {
      ...userData,
      id: `user_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      dateJoined: new Date().toISOString().split('T')[0],
      isVerified: false, // In production, require email verification
    }
    
    users.push(newUser)
    return newUser
  }

  static async updateUser(id: string, updates: Partial<UserData>): Promise<UserData | null> {
    const userIndex = users.findIndex(user => user.id === id)
    if (userIndex === -1) return null

    users[userIndex] = { ...users[userIndex], ...updates }
    return users[userIndex]
  }

  static async deleteUser(id: string): Promise<boolean> {
    const userIndex = users.findIndex(user => user.id === id)
    if (userIndex === -1) return false

    users.splice(userIndex, 1)
    return true
  }

  static sanitizeUser(user: UserData): User {
    const { password, resetToken, resetTokenExpiry, ...sanitizedUser } = user
    return sanitizedUser
  }
}
