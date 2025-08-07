import { User } from '@/types/auth'
import { UserRegistry } from '@/lib/user-registry'

class AdminUserService {
  static getAllUsers(): User[] {
    return UserRegistry.getAllUsers().sort((a, b) => new Date(b.dateJoined).getTime() - new Date(a.dateJoined).getTime())
  }

  static getUserById(id: string): User | null {
    return UserRegistry.getUserById(id)
  }

  static searchUsers(query: string): User[] {
    const lowerQuery = query.toLowerCase()
    return UserRegistry.getAllUsers().filter(user => 
      user.name.toLowerCase().includes(lowerQuery) ||
      user.email.toLowerCase().includes(lowerQuery) ||
      user.nationalId?.includes(query) ||
      user.phone?.includes(query)
    )
  }

  static updateUserRole(userId: string, newRole: 'user' | 'admin'): boolean {
    const result = UserRegistry.updateUser(userId, { role: newRole })
    return result !== null
  }

  static updateUserVerification(userId: string, isVerified: boolean): boolean {
    const result = UserRegistry.updateUser(userId, { isVerified })
    return result !== null
  }

  static getUserStats() {
    const allUsers = UserRegistry.getAllUsers()
    const total = allUsers.length
    const admins = allUsers.filter(user => user.role === 'admin').length
    const verified = allUsers.filter(user => user.isVerified).length
    const unverified = total - verified

    return {
      total,
      admins,
      users: total - admins,
      verified,
      unverified,
      recentJoins: allUsers.filter(user => {
        const joinDate = new Date(user.dateJoined)
        const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
        return joinDate > thirtyDaysAgo
      }).length
    }
  }

  static filterUsers(filters: {
    role?: 'user' | 'admin' | 'all'
    verified?: boolean | 'all'
    joinedAfter?: string
    joinedBefore?: string
  }) {
    let filtered = [...UserRegistry.getAllUsers()]

    if (filters.role && filters.role !== 'all') {
      filtered = filtered.filter(user => user.role === filters.role)
    }

    if (filters.verified !== 'all' && typeof filters.verified === 'boolean') {
      filtered = filtered.filter(user => user.isVerified === filters.verified)
    }

    if (filters.joinedAfter) {
      const afterDate = new Date(filters.joinedAfter)
      filtered = filtered.filter(user => new Date(user.dateJoined) >= afterDate)
    }

    if (filters.joinedBefore) {
      const beforeDate = new Date(filters.joinedBefore)
      filtered = filtered.filter(user => new Date(user.dateJoined) <= beforeDate)
    }

    return filtered.sort((a, b) => new Date(b.dateJoined).getTime() - new Date(a.dateJoined).getTime())
  }
}

export { AdminUserService }