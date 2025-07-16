"use client"

export default function TestPage() {
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
