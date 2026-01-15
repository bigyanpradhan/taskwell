import { z } from "zod";

export const loginSchema = z.object({
  email: z.email({
    required_error: "Email is mandatory.",
  }),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters long.",
    })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
      message:
        "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one number.",
    }),
});
