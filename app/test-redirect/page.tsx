"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function TestRedirect() {
  const router = useRouter()

  useEffect(() => {
    console.log("Test redirect page loaded")
    setTimeout(() => {
      console.log("Attempting redirect to dashboard")
      router.push("/dashboard")
    }, 1000)
  }, [router])

  return (
    <div>
      <h1>Test Redirect Page</h1>
      <p>This page should redirect to dashboard in 1 second...</p>
    </div>
  )
}
