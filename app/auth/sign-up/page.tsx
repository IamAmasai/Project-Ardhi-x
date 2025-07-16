"use client"

import { useState } from "react"
import type { Metadata } from "next"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeOff, ArrowLeft, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from "@/components/auth-provider"
import { registerSchema, type RegisterFormData } from "@/lib/validations"
import { useToast } from "@/hooks/use-toast"

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { register: registerUser } = useAuth()
  const { toast } = useToast()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true)
    try {
      const result = await registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
        phone: data.phone,
        nationalId: data.nationalId,
      })
      
      if (result.success) {
        toast({
          title: "Account created successfully!",
          description: "Welcome to ArdhiX. You can now access your dashboard.",
        })
        router.push("/dashboard")
      } else {
        setError("root", {
          message: result.error || "Registration failed",
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
          <div className="flex items-center mb-6">
            <Button variant="ghost" size="icon" asChild className="mr-2">
              <Link href="/">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back to login</span>
              </Link>
            </Button>
            <h1 className="text-2xl font-bold tracking-tight">Create Account</h1>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {errors.root && (
              <Alert variant="destructive">
                <AlertDescription>{errors.root.message}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="John Doe"
                className="h-10"
                {...register("name")}
              />
              {errors.name && (
                <p className="text-sm text-destructive">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="john.doe@example.com"
                className="h-10"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number (Optional)</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+254 712 345 678"
                className="h-10"
                {...register("phone")}
              />
              {errors.phone && (
                <p className="text-sm text-destructive">{errors.phone.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="nationalId">National ID (Optional)</Label>
              <Input
                id="nationalId"
                placeholder="KE123456789"
                className="h-10"
                {...register("nationalId")}
              />
              {errors.nationalId && (
                <p className="text-sm text-destructive">{errors.nationalId.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  className="h-10 pr-10"
                  {...register("password")}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-10 w-10"
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

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  className="h-10 pr-10"
                  {...register("confirmPassword")}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-10 w-10"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {errors.confirmPassword && (
                <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="terms" required />
              <Label htmlFor="terms" className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                I agree to the{" "}
                <Link href="/terms" className="text-primary hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
              </Label>
            </div>

            <Button
              type="submit"
              className="w-full h-12 text-base font-medium"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                "Create Account"
              )}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">Already have an account? </span>
            <Link
              href="/"
              className="text-primary font-medium hover:underline"
            >
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
