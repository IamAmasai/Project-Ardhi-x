"use client"

import { useState } from "react"
import type { Metadata } from "next"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Fingerprint, Smartphone, Eye, EyeOff, Lock, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from "@/components/auth-provider"
import { loginSchema, type LoginFormData } from "@/lib/validations"
import { useToast } from "@/hooks/use-toast"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
  const { toast } = useToast()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    console.log("Login form submitted with:", data.email)
    setIsLoading(true)
    try {
      console.log("Calling login function...")
      const result = await login(data.email, data.password)
      console.log("Login result:", result)
      
      if (result.success) {
        console.log("Login successful, showing toast")
        toast({
          title: "Welcome back!",
          description: "You have been successfully logged in.",
        })
        // Redirect will be handled automatically by AuthProvider
      } else {
        setError("root", {
          message: result.error || "Login failed",
        })
      }
    } catch (error) {
      setError("root", {
        message: "An unexpected error occurred",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-radial from-sky-50 to-blue-100 p-4">
      <Card className="w-full max-w-md overflow-hidden shadow-lg border-0 glassmorphism">
        <CardContent className="p-8">
          <div className="flex flex-col items-center space-y-2 mb-8">
            <h1 className="text-3xl font-bold tracking-tight">ArdhiX</h1>
            <p className="text-sm text-muted-foreground">Secure Land Registry System</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {errors.root && (
              <Alert variant="destructive">
                <AlertDescription>{errors.root.message}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="h-12"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="h-12 pr-10"
                  {...register("password")}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-12 w-12"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password.message}</p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember" className="text-sm">
                  Remember me
                </Label>
              </div>
              <Link
                href="/auth/forgot-password"
                className="text-sm text-primary hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full h-12 text-base font-medium"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                className="h-12 transition-all hover:scale-[1.02] active:scale-[0.98]"
                disabled
              >
                <Fingerprint className="mr-2 h-4 w-4" />
                Biometric
              </Button>
              <Button
                variant="outline"
                className="h-12 transition-all hover:scale-[1.02] active:scale-[0.98]"
                disabled
              >
                <Smartphone className="mr-2 h-4 w-4" />
                SMS
              </Button>
            </div>

            <div className="mt-6 text-center text-sm">
              <span className="text-muted-foreground">Don't have an account? </span>
              <Link
                href="/auth/sign-up"
                className="text-primary font-medium hover:underline"
              >
                Sign up
              </Link>
            </div>

            <div className="mt-4 text-center">
              <p className="text-xs text-muted-foreground">
                Demo credentials: admin@ardhix.com / admin123
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
