import { z } from 'zod'

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Invalid email address'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters'),
})

export const registerSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .min(2, 'Name must be at least 2 characters'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Invalid email address'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters'),
  confirmPassword: z
    .string()
    .min(1, 'Please confirm your password'),
  phone: z
    .string()
    .optional()
    .refine((val) => !val || /^\+254\s?\d{3}\s?\d{3}\s?\d{3}$/.test(val), {
      message: 'Phone number must be in format +254 XXX XXX XXX',
    }),
  nationalId: z
    .string()
    .optional()
    .refine((val) => !val || /^[A-Z]{2}\d{8,10}$/.test(val), {
      message: 'National ID must be in format KE12345678',
    }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Invalid email address'),
})

export const resetPasswordSchema = z.object({
  password: z
    .string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters'),
  confirmPassword: z
    .string()
    .min(1, 'Please confirm your password'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

export const changePasswordSchema = z.object({
  currentPassword: z
    .string()
    .min(1, 'Current password is required'),
  newPassword: z
    .string()
    .min(1, 'New password is required')
    .min(6, 'Password must be at least 6 characters'),
  confirmPassword: z
    .string()
    .min(1, 'Please confirm your new password'),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

export type LoginFormData = z.infer<typeof loginSchema>
export type RegisterFormData = z.infer<typeof registerSchema>
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>
export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>
