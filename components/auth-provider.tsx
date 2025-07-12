"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"

type User = {
  id: string
  name: string
  email: string
  role: string
  avatar?: string
  phone?: string
  nationalId?: string
  bio?: string
  location?: string
  dateJoined?: string
} | null

type AuthContextType = {
  user: User
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  updateUser: (updates: Partial<Exclude<User, null>>) => void
  uploadAvatar: (file: File) => Promise<string>
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  // Simulate checking for an existing session on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        // In a real app, this would be an API call to validate the session
        const storedUser = localStorage.getItem("ardhix_user")

        if (storedUser) {
          setUser(JSON.parse(storedUser))
        }
      } catch (error) {
        console.error("Session check failed:", error)
      } finally {
        setLoading(false)
      }
    }

    checkSession()
  }, [])

  // Protect routes
  useEffect(() => {
    if (!loading) {
      const publicPaths = ["/", "/auth/sign-up", "/auth/forgot-password", "/auth/reset-password"]
      const isPublicPath = publicPaths.some((path) => pathname === path || pathname.startsWith(path))

      if (!user && !isPublicPath) {
        router.push("/")
      }
    }
  }, [user, loading, pathname, router])

  const login = async (email: string, password: string) => {
    setLoading(true)
    try {
      // In a real app, this would be an API call to authenticate
      // Simulating a successful login for demo purposes
      const mockUser = {
        id: "user_123",
        name: "John Doe",
        email: email,
        role: "user",
        avatar: "/placeholder-user.jpg",
        phone: "+254 712 345 678",
        nationalId: "KE123456789",
        bio: "Land registry user with multiple properties in Kenya",
        location: "Nairobi, Kenya",
        dateJoined: "2023-01-15",
      }

      // Store user in localStorage for persistence
      localStorage.setItem("ardhix_user", JSON.stringify(mockUser))
      setUser(mockUser)
      return true
    } catch (error) {
      console.error("Login failed:", error)
      return false
    } finally {
      setLoading(false)
    }
  }

  const updateUser = (updates: Partial<Exclude<User, null>>) => {
    if (!user) return
    
    const updatedUser = { ...user, ...updates }
    setUser(updatedUser)
    localStorage.setItem("ardhix_user", JSON.stringify(updatedUser))
  }

  const uploadAvatar = async (file: File): Promise<string> => {
    // In a real app, this would upload to a file storage service
    // For demo purposes, we'll create a fake URL and update the user
    return new Promise((resolve) => {
      setTimeout(() => {
        const fakeUrl = `/avatars/user_${user?.id}_${Date.now()}.jpg`
        updateUser({ avatar: fakeUrl })
        resolve(fakeUrl)
      }, 1500) // Simulate upload delay
    })
  }

  const logout = () => {
    localStorage.removeItem("ardhix_user")
    setUser(null)
    router.push("/")
  }

  return <AuthContext.Provider value={{ user, login, logout, updateUser, uploadAvatar, loading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
