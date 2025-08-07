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
  if (isAdmin(user)) {
    // Admins can manage documents but not their own to prevent conflict of interest
    return documentUserId !== undefined && user.id !== documentUserId
  }
  return user.id === documentUserId
}

export const canApproveProperty = (user: User | null, propertyOwnerId?: string): boolean => {
  if (!user) return false
  // Only admins can approve properties, but not their own
  return isAdmin(user) && propertyOwnerId !== undefined && user.id !== propertyOwnerId
}

export const canRejectProperty = (user: User | null, propertyOwnerId?: string): boolean => {
  if (!user) return false
  // Only admins can reject properties, but not their own
  return isAdmin(user) && propertyOwnerId !== undefined && user.id !== propertyOwnerId
}

export const canViewUserData = (user: User | null, targetUserId: string): boolean => {
  if (!user) return false
  if (isAdmin(user)) return true
  return user.id === targetUserId
}