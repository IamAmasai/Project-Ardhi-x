"use client"

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function TestPage() {
  const [supabaseStatus, setSupabaseStatus] = useState<'checking' | 'connected' | 'error'>('checking')
  const [authStatus, setAuthStatus] = useState<'checking' | 'ready' | 'error'>('checking')
  const [errorMessage, setErrorMessage] = useState<string>('')

  useEffect(() => {
    // Test Supabase connection
    const testSupabase = async () => {
      try {
        // Simple test to see if we can connect to Supabase
        const { data, error } = await supabase.from('profiles').select('count', { count: 'exact', head: true })
        if (error && !error.message.includes('relation') && !error.message.includes('does not exist')) {
          throw error
        }
        setSupabaseStatus('connected')
      } catch (error: any) {
        console.error('Supabase connection error:', error)
        setErrorMessage(`Supabase Error: ${error.message}`)
        setSupabaseStatus('error')
      }
    }

    // Test auth functionality
    const testAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession()
        if (error) throw error
        setAuthStatus('ready')
      } catch (error: any) {
        console.error('Auth test error:', error)
        setErrorMessage(prev => prev + ` | Auth Error: ${error.message}`)
        setAuthStatus('error')
      }
    }

    testSupabase()
    testAuth()
  }, [])

  return (
    <div className="min-h-screen bg-blue-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-900 mb-4">
          ✅ ArdhiX Test Page
        </h1>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">System Status</h2>
          <div className="space-y-2">
            <p className="text-green-600">✅ Next.js is working</p>
            <p className="text-green-600">✅ TypeScript is working</p>
            <p className="text-green-600">✅ Tailwind CSS is working</p>
            <p className="text-green-600">✅ React components are working</p>
            
            <div className="flex items-center space-x-2">
              <span>🗄️ Supabase Connection:</span>
              {supabaseStatus === 'checking' && <span className="text-yellow-600">⏳ Checking...</span>}
              {supabaseStatus === 'connected' && <span className="text-green-600">✅ Connected</span>}
              {supabaseStatus === 'error' && <span className="text-red-600">❌ Error</span>}
            </div>
            
            <div className="flex items-center space-x-2">
              <span>🔐 Supabase Auth:</span>
              {authStatus === 'checking' && <span className="text-yellow-600">⏳ Checking...</span>}
              {authStatus === 'ready' && <span className="text-green-600">✅ Ready</span>}
              {authStatus === 'error' && <span className="text-red-600">❌ Error</span>}
            </div>
          </div>

          {errorMessage && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded">
              <h3 className="font-semibold text-red-800 mb-2">Error Details:</h3>
              <p className="text-red-700 text-sm">{errorMessage}</p>
              <p className="text-red-600 text-xs mt-2">
                Note: If the error mentions "relation does not exist", you need to run the SQL setup script in your Supabase dashboard.
              </p>
            </div>
          )}
          
          <div className="mt-6 p-4 bg-gray-50 rounded">
            <h3 className="font-semibold mb-2">Supabase Configuration:</h3>
            <div className="text-sm space-y-1">
              <p>URL: {process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ Set' : '❌ Missing'}</p>
              <p>Anon Key: {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅ Set' : '❌ Missing'}</p>
              <p>Service Key: Available on server-side</p>
            </div>
          </div>
          
          <div className="mt-6">
            <button 
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={() => alert('Button works!')}
            >
              Test Button
            </button>
          </div>
          
          <div className="mt-6">
            <a href="/dashboard" className="text-blue-600 underline">
              Go to Dashboard
            </a>
            {" | "}
            <a href="/" className="text-blue-600 underline">
              Go to Login
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
