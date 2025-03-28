import { z } from 'zod';

export const createAccountSchema = z.object({
  firstname: z.string().trim().min(2).max(50),
  lastname: z.string().trim().min(2).max(50),
  email: z.string().email(),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .refine(
      (val) =>
        /[a-z]/.test(val) && /[A-Z]/.test(val) && /[^a-zA-Z0-9]/.test(val),
      {
        message:
          'Password must include uppercase, lowercase, and a symbol character',
      }
    ),
  nid: z.string().trim().length(16),
  nid_expire_date: z.string().regex(/^(0?[1-9]|1[0-2])\/\d{4}$/, {
    message: 'Expire date must be in MM/YYYY format',
  }),
  government: z.string().trim().min(2).max(50),
  city: z.string().trim().min(2).max(50),
  address: z.string().trim().min(2).max(50),
  job: z.string().optional(),
});

export type CreateAccountDto = z.infer<typeof createAccountSchema>;
