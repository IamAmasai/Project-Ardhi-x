import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Validate required environment variables
if (!supabaseUrl) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL environment variable')
}
if (!supabaseAnonKey) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable')
}

// Client-side Supabase client (for frontend)
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Server-side Supabase client (for API routes)
export const supabaseAdmin = createClient(
  supabaseUrl, 
  supabaseServiceKey || supabaseAnonKey, // Fallback to anon key if service key not available
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)

// Database types
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          name: string
          role: string
          avatar?: string
          phone?: string
          national_id?: string
          bio?: string
          location?: string
          date_joined: string
          is_verified: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          name: string
          role?: string
          avatar?: string
          phone?: string
          national_id?: string
          bio?: string
          location?: string
          date_joined?: string
          is_verified?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string
          role?: string
          avatar?: string
          phone?: string
          national_id?: string
          bio?: string
          location?: string
          date_joined?: string
          is_verified?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      properties: {
        Row: {
          id: string
          user_id: string
          title: string
          type: 'residential' | 'commercial' | 'agricultural' | 'industrial'
          location: string
          county: string
          ward?: string
          size: string
          status: 'verified' | 'pending' | 'rejected'
          value: number
          currency: string
          coordinates_lat?: number
          coordinates_lng?: number
          description?: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          type: 'residential' | 'commercial' | 'agricultural' | 'industrial'
          location: string
          county: string
          ward?: string
          size: string
          status?: 'verified' | 'pending' | 'rejected'
          value: number
          currency?: string
          coordinates_lat?: number
          coordinates_lng?: number
          description?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          type?: 'residential' | 'commercial' | 'agricultural' | 'industrial'
          location?: string
          county?: string
          ward?: string
          size?: string
          status?: 'verified' | 'pending' | 'rejected'
          value?: number
          currency?: string
          coordinates_lat?: number
          coordinates_lng?: number
          description?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}