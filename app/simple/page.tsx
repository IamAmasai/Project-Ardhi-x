"use client"

export default function SimplePage() {
  return (
    <div style={{ backgroundColor: 'white', minHeight: '100vh', padding: '20px' }}>
      <h1 style={{ color: 'black', fontSize: '24px' }}>🚀 Basic Test Page</h1>
      <p style={{ color: 'black' }}>If you can see this, the basic system works.</p>
      <button 
        style={{ 
          backgroundColor: 'blue', 
          color: 'white', 
          padding: '10px 20px', 
          border: 'none', 
          borderRadius: '5px' 
        }}
        onClick={() => {
          alert('Button clicked!')
          window.location.href = '/'
        }}
      >
        Go to Home
      </button>
    </div>
  )
}
