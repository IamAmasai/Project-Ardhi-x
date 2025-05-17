import type { Metadata } from "next"
import Link from "next/link"
import { Fingerprint, Smartphone, Eye, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

export const metadata: Metadata = {
  title: "Login | ArdhiX Land Registry System",
  description: "Login to the ArdhiX Land Registry System",
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-radial from-sky-50 to-blue-100 p-4">
      <Card className="w-full max-w-md overflow-hidden shadow-lg border-0 glassmorphism">
        <CardContent className="p-8">
          <div className="flex flex-col items-center space-y-2 mb-8">
            <h1 className="text-3xl font-bold tracking-tight">ArdhiX</h1>
            <p className="text-sm text-muted-foreground">Secure Land Registry System</p>
          </div>

          <div className="space-y-4">
            <Button
              variant="outline"
              className="w-full flex items-center justify-center gap-2 h-12 transition-all hover:scale-[1.02] active:scale-[0.98]"
              asChild
            >
              <Link href="/dashboard">
                <Fingerprint className="h-5 w-5" />
                <span>Sign in with Digital ID</span>
              </Link>
            </Button>

            <Button
              variant="outline"
              className="w-full flex items-center justify-center gap-2 h-12 transition-all hover:scale-[1.02] active:scale-[0.98]"
              asChild
            >
              <Link href="/dashboard">
                <Smartphone className="h-5 w-5" />
                <span>Sign in with Mobile</span>
              </Link>
            </Button>

            <div className="relative my-6">
              <Separator />
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-xs text-muted-foreground">
                Or continue with
              </span>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email or Username</Label>
                <Input id="email" type="text" placeholder="Enter your email or username" className="h-12" />
              </div>

              <div className="space-y-2 relative">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link href="/auth/forgot-password" className="text-xs text-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Input id="password" type="password" placeholder="Enter your password" className="h-12 pr-10" />
                  <button
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    aria-label="Toggle password visibility"
                  >
                    <Eye className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember" className="text-sm">
                  Remember me
                </Label>
              </div>

              <Button className="w-full h-12 font-medium transition-all hover:scale-[1.02] active:scale-[0.98]" asChild>
                <Link href="/dashboard">
                  <Lock className="mr-2 h-4 w-4" />
                  Sign In
                </Link>
              </Button>

              <div className="text-center text-sm">
                Don't have an account?{" "}
                <Link href="/auth/sign-up" className="text-primary hover:underline">
                  Sign Up
                </Link>
              </div>

              <p className="text-xs text-center text-muted-foreground mt-6">
                By signing in, you agree to our{" "}
                <Link href="/terms" className="text-primary hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
