import { User } from '@/types/auth'

export const isAdmin = (user: User | null): boolean => {
  return user?.role === 'admin'
}

export const canAccessAdminPanel = (user: User | null): boolean => {
  return isAdmin(user)
}

export const canManageUsers = (user: User | null): boolean => {
  return isAdmin(user)
}

export const canViewAllDocuments = (user: User | null): boolean => {
  return isAdmin(user)
}

export const canViewAllSystemActivity = (user: User | null): boolean => {
  return isAdmin(user)
}

export const canManageDocument = (user: User | null, documentUserId?: string): boolean => {
  if (!user) return false
  if (isAdmin(user)) return true
  return user.id === documentUserId
}

export const canViewUserData = (user: User | null, targetUserId: string): boolean => {
  if (!user) return false
  if (isAdmin(user)) return true
  return user.id === targetUserId
}