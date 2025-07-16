"use client"

import { useState } from "react"
import type { Metadata } from "next"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowLeft, Loader2, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from "@/components/auth-provider"
import { forgotPasswordSchema, type ForgotPasswordFormData } from "@/lib/validations"
import { useToast } from "@/hooks/use-toast"

// Extracted success state component
function EmailSentSuccess({ onTryDifferentEmail }: { onTryDifferentEmail: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-radial from-sky-50 to-blue-100 p-4">
      <Card className="w-full max-w-md overflow-hidden shadow-lg border-0 glassmorphism">
        <CardContent className="p-8">
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="p-3 bg-green-100 rounded-full">
                <Mail className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <h1 className="text-2xl font-bold tracking-tight">Check Your Email</h1>
            <p className="text-muted-foreground">
              We've sent password reset instructions to your email address.
              Please check your inbox and follow the instructions.
            </p>
            <div className="space-y-2">
              <Button asChild className="w-full">
                <Link href="/">Return to Login</Link>
              </Button>
              <Button
                variant="outline"
                onClick={onTryDifferentEmail}
                className="w-full"
              >
                Try Different Email
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Extracted form component
function ForgotPasswordForm({ onSuccess }: { onSuccess: () => void }) {
  const [isLoading, setIsLoading] = useState(false)
  const { resetPassword } = useAuth()
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  })

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsLoading(true)
    try {
      const result = await resetPassword(data.email)
      
      if (result.success) {
        onSuccess() // Trigger parent state change
        toast({
          title: "Reset link sent",
          description: "Check your email for password reset instructions.",
        })
      } else {
        setError("root", {
          message: result.error || "Failed to send reset email",
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
            <h1 className="text-2xl font-bold tracking-tight">Reset Password</h1>
          </div>

          <div className="mb-6">
            <p className="text-muted-foreground">
              Enter your email address and we'll send you a link to reset your password.
            </p>
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
                placeholder="Enter your email address"
                className="h-12"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full h-12 text-base font-medium"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending reset link...
                </>
              ) : (
                "Send Reset Link"
              )}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">Remember your password? </span>
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

export default function ForgotPasswordPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)

  if (isSubmitted) {
    return <EmailSentSuccess onTryDifferentEmail={() => setIsSubmitted(false)} />
  }

  return <ForgotPasswordForm onSuccess={() => setIsSubmitted(true)} />
}
