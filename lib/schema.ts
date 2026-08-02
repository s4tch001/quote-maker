import * as z from 'zod';

/*
|--------------------------------------------------------------------------
| Zod Schemas
|--------------------------------------------------------------------------
*/

/*
 * Base schema contains only the fields
 * that belong to the actual signup payload.
 */
export const signupBaseSchema = z.object({
  name: z.string().trim().min(3, 'Minimum of 3 characters').max(100),
  email: z.email('Invalid email address').max(254).transform((value) => value.toLowerCase()),
  password: z.string().min(8, 'Minimum of 8 characters').max(128),
});

/*
 * Form schema extends the base schema
 * by adding confirmPassword.
 */
export const signupFormSchema = signupBaseSchema
  .extend({
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

/*
 * Payload schema is simply the base schema.
 * No need to remove confirmPassword because
 * it was never part of this schema.
 */
export const signupPayloadSchema = signupBaseSchema;

// Shared login validation runs in both the browser and the Auth.js server flow.
export const loginSchema = z.object({
  email: z
    .email('Invalid email address')
    .max(254)
    .transform((value) => value.toLowerCase()),
  // Bound the password input before it reaches bcrypt.
  password: z.string().min(1, 'Password is required').max(128),
});

/*
|--------------------------------------------------------------------------
| TypeScript Types
|--------------------------------------------------------------------------
*/

export type SignupForm = z.infer<typeof signupFormSchema>;

export type SignupPayload = z.infer<typeof signupPayloadSchema>;

export type LoginForm = z.infer<typeof loginSchema>;
