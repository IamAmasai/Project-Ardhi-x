import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

export const metadata: Metadata = {
  title: "Reset Password | ArdhiX Land Registry System",
  description: "Create a new password for the ArdhiX Land Registry System",
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-radial from-sky-50 to-blue-100 p-4">
      <Card className="w-full max-w-md overflow-hidden shadow-lg border-0 glassmorphism">
        <CardContent className="p-8">
          <div className="flex items-center mb-6">
            <Button variant="ghost" size="icon" asChild className="mr-2">
              <Link href="/">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back to login</span>
              </Link>
            </Button>
            <h1 className="text-2xl font-bold tracking-tight">Create New Password</h1>
          </div>

          <div className="space-y-4">
            <div className="bg-blue-50 text-blue-800 p-4 rounded-md text-sm mb-6">
              <p>Create a new password for your account. Your password must be at least 8 characters long.</p>
            </div>

            <div className="space-y-2 relative">
              <Label htmlFor="password">New Password</Label>
              <div className="relative">
                <Input id="password" type="password" placeholder="create a strong password" className="h-10 pr-10" />
                <button
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  aria-label="Toggle password visibility"
                  type="button"
                >
                  <Eye className="h-5 w-5" />
                </button>
              </div>
              <p className="text-xs text-foreground/60 mt-1">
                Password must be at least 8 characters with uppercase, lowercase, number and special character
              </p>
            </div>

            <div className="space-y-2 relative">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <div className="relative">
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="confirm your password"
                  className="h-10 pr-10"
                />
                <button
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  aria-label="Toggle confirm password visibility"
                  type="button"
                >
                  <EyeOff className="h-5 w-5" />
                </button>
              </div>
            </div>

            <Button className="w-full h-12 font-medium transition-all hover:scale-[1.02] active:scale-[0.98]">
              Reset Password
            </Button>

            <div className="text-center text-sm">
              Remember your password?{" "}
              <Link href="/" className="text-primary hover:underline">
                Sign In
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
