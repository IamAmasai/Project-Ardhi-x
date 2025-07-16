"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, useRef } from "react"
import { useRouter, usePathname } from "next/navigation"
import { User, AuthContextType, RegisterData, Property, UserStats } from "@/types/auth"
import { PropertyService } from "@/lib/property-service"

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()
  const redirectingRef = useRef(false)

  // Check for existing session on mount
  useEffect(() => {
    const checkSession = () => {
      try {
        // Only check localStorage on client side
        if (typeof window !== 'undefined') {
          const storedUser = localStorage.getItem('authUser')
          if (storedUser) {
            const userData = JSON.parse(storedUser)
            setUser(userData)
          }
        }
      } catch (error) {
        console.error("Session check failed:", error)
        // Clear corrupted localStorage only on client side
        if (typeof window !== 'undefined') {
          localStorage.removeItem('authUser')
        }
      } finally {
        setLoading(false)
      }
    }

    checkSession()
  }, [])

  // Protect routes
  useEffect(() => {
    if (!loading && !redirectingRef.current) {
      const publicPaths = ["/", "/auth/sign-up", "/auth/forgot-password", "/auth/reset-password"]
      const isPublicPath = publicPaths.some((path) => pathname === path || pathname.startsWith(path))

      console.log("Route protection check:", { user: !!user, pathname, isPublicPath, loading })

      if (!user && !isPublicPath) {
        console.log("Redirecting to login - no user on protected route")
        redirectingRef.current = true
        router.replace("/")
        setTimeout(() => { redirectingRef.current = false }, 1000)
      }
      // Remove automatic redirect to dashboard when logged in on public routes
      // This allows users to navigate freely once authenticated
    }
  }, [user, loading, pathname, router])

  const login = async (email: string, password: string) => {
    console.log("AuthProvider login function called with:", email)
    setLoading(true)
    try {
      // Simple working mock for development
      const mockUser: User = {
        id: "admin_001",
        email: email,
        name: email.split('@')[0] || "Test User",
        phone: "+254700000000",
        nationalId: "12345678",
        role: "user",
        dateJoined: new Date().toISOString()
      }

      console.log("Setting user data:", mockUser)

      // Only access localStorage on client side
      if (typeof window !== 'undefined') {
        localStorage.setItem('authUser', JSON.stringify(mockUser))
        console.log("Saved user to localStorage")
      }
      
      setUser(mockUser)
      setLoading(false)
      console.log("User state updated, scheduling redirect...")
      
      // Direct redirect after successful login
      setTimeout(() => {
        console.log("Executing redirect to dashboard")
        if (typeof window !== 'undefined') {
          console.log("Current location:", window.location.href)
          window.location.href = "/dashboard"
        }
      }, 100)
      
      return { success: true }
    } catch (error) {
      console.error("Login error:", error)
      setLoading(false)
      return { success: false, error: 'Login failed' }
    }
  }

  const register = async (userData: RegisterData) => {
    setLoading(true)
    try {
      // Simple mock registration for development
      const mockUser: User = {
        id: "admin_001", // Match the sample property data
        email: userData.email,
        name: userData.name,
        phone: userData.phone,
        nationalId: userData.nationalId,
        role: "user",
        dateJoined: new Date().toISOString()
      }

      // Only access localStorage on client side
      if (typeof window !== 'undefined') {
        localStorage.setItem('authUser', JSON.stringify(mockUser))
      }
      
      setUser(mockUser)
      return { success: true }
    } catch (error) {
      console.error("Registration failed:", error)
      return { success: false, error: 'Network error. Please try again.' }
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    try {
      // Only access localStorage on client side
      if (typeof window !== 'undefined') {
        localStorage.removeItem('authUser')
      }
    } catch (error) {
      console.error("Logout error:", error)
    } finally {
      setUser(null)
      router.push("/")
    }
  }

  const updateUser = async (updates: Partial<User>) => {
    if (!user) return { success: false, error: 'No user logged in' }

    try {
      // For now, just update locally - in production, make API call
      const updatedUser = { ...user, ...updates }
      setUser(updatedUser)
      return { success: true }
    } catch (error) {
      console.error("Update user failed:", error)
      return { success: false, error: 'Failed to update user' }
    }
  }

  const uploadAvatar = async (file: File): Promise<string> => {
    // Simulate file upload - in production, upload to cloud storage
    return new Promise((resolve) => {
      setTimeout(() => {
        const newAvatarUrl = `/placeholder-user.jpg?${Date.now()}`
        if (user) {
          setUser({ ...user, avatar: newAvatarUrl })
        }
        resolve(newAvatarUrl)
      }, 1000)
    })
  }

  const resetPassword = async (email: string) => {
    try {
      // Mock password reset for development
      // In production, this would send an actual email
      console.log(`Password reset requested for: ${email}`)
      
      // Simulate successful email sending
      return { success: true }
    } catch (error) {
      console.error("Reset password failed:", error)
      return { success: false, error: 'Network error. Please try again.' }
    }
  }

  const changePassword = async (currentPassword: string, newPassword: string) => {
    try {
      // In production, implement password change API endpoint
      return { success: true }
    } catch (error) {
      console.error("Change password failed:", error)
      return { success: false, error: 'Failed to change password' }
    }
  }

  const getUserStats = (): UserStats => {
    if (!user) {
      return {
        totalProperties: 0,
        verifiedProperties: 0,
        pendingProperties: 0,
        pendingDocuments: 0,
        totalValue: 0,
        currency: 'KES'
      }
    }
    return PropertyService.getUserStats(user.id)
  }

  const getUserProperties = (): Property[] => {
    if (!user) return []
    return PropertyService.getUserProperties(user.id)
  }

  const addProperty = async (propertyData: Omit<Property, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => {
    if (!user) return { success: false, error: 'No user logged in' }

    try {
      PropertyService.addProperty(user.id, propertyData)
      return { success: true }
    } catch (error) {
      console.error("Add property failed:", error)
      return { success: false, error: 'Failed to add property' }
    }
  }

  const value: AuthContextType = {
    user,
    login,
    register,
    logout,
    updateUser,
    uploadAvatar,
    resetPassword,
    changePassword,
    getUserStats,
    getUserProperties,
    addProperty,
    loading,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
