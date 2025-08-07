import { User, RegisterData } from '@/types/auth'

// In-memory user registry for development (replace with database in production)
let registeredUsers: User[] = [
  // Pre-registered demo users
  {
    id: "admin_001",
    email: "admin@ardhix.com",
    name: "System Admin",
    phone: "+254700000000",
    nationalId: "12345678",
    role: "admin",
    dateJoined: "2024-01-01T10:00:00Z",
    isVerified: true
  },
  {
    id: "user_dennis_001",
    email: "dennis@example.com", 
    name: "Dennis",
    phone: "+254701000000",
    nationalId: "11111111",
    role: "user",
    dateJoined: "2024-06-01T10:00:00Z",
    isVerified: true
  }
]

export class UserRegistry {
  static getAllUsers(): User[] {
    return registeredUsers
  }

  static findUserByEmail(email: string): User | null {
    return registeredUsers.find(user => user.email.toLowerCase() === email.toLowerCase()) || null
  }

  static isUserRegistered(email: string): boolean {
    return this.findUserByEmail(email) !== null
  }

  static registerUser(userData: RegisterData): User {
    const newUser: User = {
      id: `user_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      email: userData.email,
      name: userData.name,
      phone: userData.phone,
      nationalId: userData.nationalId,
      role: "user", // New users start as regular users
      dateJoined: new Date().toISOString(),
      isVerified: false
    }

    registeredUsers.push(newUser)
    return newUser
  }

  static getUserById(id: string): User | null {
    return registeredUsers.find(user => user.id === id) || null
  }

  static updateUser(userId: string, updates: Partial<User>): User | null {
    const userIndex = registeredUsers.findIndex(user => user.id === userId)
    if (userIndex === -1) return null

    registeredUsers[userIndex] = {
      ...registeredUsers[userIndex],
      ...updates
    }
    
    return registeredUsers[userIndex]
  }
}