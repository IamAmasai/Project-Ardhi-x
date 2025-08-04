import { User } from '@/types/auth'

class AdminUserService {
  private static users: User[] = [
    {
      id: 'admin_001',
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'user',
      phone: '+254700000000',
      nationalId: '12345678',
      dateJoined: '2023-01-15',
      isVerified: true,
      avatar: '/placeholder-user.jpg',
      location: 'Nairobi, Kenya'
    },
    {
      id: 'admin_002',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      role: 'admin',
      phone: '+254700000001',
      nationalId: '87654321',
      dateJoined: '2022-11-20',
      isVerified: true,
      avatar: '/placeholder-user.jpg',
      location: 'Mombasa, Kenya'
    },
    {
      id: 'user_003',
      name: 'David Wilson',
      email: 'david.wilson@example.com',
      role: 'user',
      phone: '+254700000002',
      nationalId: '11223344',
      dateJoined: '2023-03-10',
      isVerified: false,
      location: 'Kisumu, Kenya'
    },
    {
      id: 'user_004',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@example.com',
      role: 'user',
      phone: '+254700000003',
      nationalId: '55667788',
      dateJoined: '2023-05-22',
      isVerified: true,
      location: 'Nakuru, Kenya'
    },
    {
      id: 'user_005',
      name: 'Michael Brown',
      email: 'michael.brown@example.com',
      role: 'user',
      phone: '+254700000004',
      nationalId: '99887766',
      dateJoined: '2023-07-15',
      isVerified: false,
      location: 'Eldoret, Kenya'
    }
  ]

  static getAllUsers(): User[] {
    return this.users.sort((a, b) => new Date(b.dateJoined).getTime() - new Date(a.dateJoined).getTime())
  }

  static getUserById(id: string): User | null {
    return this.users.find(user => user.id === id) || null
  }

  static searchUsers(query: string): User[] {
    const lowerQuery = query.toLowerCase()
    return this.users.filter(user => 
      user.name.toLowerCase().includes(lowerQuery) ||
      user.email.toLowerCase().includes(lowerQuery) ||
      user.nationalId?.includes(query) ||
      user.phone?.includes(query)
    )
  }

  static updateUserRole(userId: string, newRole: 'user' | 'admin'): boolean {
    const userIndex = this.users.findIndex(user => user.id === userId)
    if (userIndex !== -1) {
      this.users[userIndex].role = newRole
      return true
    }
    return false
  }

  static updateUserVerification(userId: string, isVerified: boolean): boolean {
    const userIndex = this.users.findIndex(user => user.id === userId)
    if (userIndex !== -1) {
      this.users[userIndex].isVerified = isVerified
      return true
    }
    return false
  }

  static getUserStats() {
    const total = this.users.length
    const admins = this.users.filter(user => user.role === 'admin').length
    const verified = this.users.filter(user => user.isVerified).length
    const unverified = total - verified

    return {
      total,
      admins,
      users: total - admins,
      verified,
      unverified,
      recentJoins: this.users.filter(user => {
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
    let filtered = [...this.users]

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