import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

export const metadata: Metadata = {
  title: "Forgot Password | ArdhiX Land Registry System",
  description: "Reset your password for the ArdhiX Land Registry System",
}

export default function ForgotPasswordPage() {
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
            <h1 className="text-2xl font-bold tracking-tight">Reset Password</h1>
          </div>

          <div className="space-y-4">
            <div className="bg-blue-50 text-blue-800 p-4 rounded-md text-sm mb-6">
              <p>Enter your email address and we'll send you a link to reset your password.</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="email" type="email" placeholder="john.doe@example.com" className="h-10 pl-10" />
              </div>
            </div>

            <Button className="w-full h-12 font-medium transition-all hover:scale-[1.02] active:scale-[0.98]">
              Send Reset Link
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
