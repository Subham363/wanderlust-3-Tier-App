import { INVALID_CONFIRMPWD_ERRORMESSAGE, INVALID_EMAIL_ERRORMESSAGE, INVALID_PWD_ERRORMESSAGE, INVALID_USERNAME_ERRORMESSAGE } from '@/constants/images';
import { z } from 'zod';

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export const signInSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .regex(emailRegex, 'Invalid email address'),
  password: z.string().min(1, { message: 'Password is required' }),
});

export const signUpSchema = z
  .object({
    username: z.string().min(1, { message: 'Username is required' }),
    email: z
      .string()
      .min(1, { message: 'Email is required' })
      .regex(emailRegex, INVALID_EMAIL_ERRORMESSAGE),
    password: z.string().min(1, { message: 'Password is required' }),
    confirmPassword: z.string().min(1, { message: 'Confirm Password is required' }),
  })
  .refine((data) => data.username.trim().length >= 5, {
    message: INVALID_USERNAME_ERRORMESSAGE,
    path: ['username'],
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: INVALID_CONFIRMPWD_ERRORMESSAGE,
    path: ['confirmPassword'],
  })
  .refine((data) => data.password.trim().length >= 8, {
    message: INVALID_PWD_ERRORMESSAGE,
    path: ['password'],
  });

export type TSignInSchema = z.infer<typeof signInSchema>;
export type TSignUpSchema = z.infer<typeof signUpSchema>;
