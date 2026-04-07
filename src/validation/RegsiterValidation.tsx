import z from "zod";

export const RegisterUserSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: "Please enter a valid email address" })
      .email({ message: "Please enter a valid emailaddress" }),
    password: z
      .string()
      .min(8, { message: "minimum length of password should be 8" })
      .max(20, { message: "maximum password length should be 20" }),
    confirmPassword: z
      .string()
      .min(8, { message: "minimum length of password should be 8" })
      .max(20, { message: "maximum password length should be 20" }),
    firstName: z
      .string()
      .min(2, { message: "minimum length should be 2" })
      .max(12, { message: "maximum length should be 12" }),
    lastName: z
      .string()
      .min(2, { message: "minimum length should be 5" })
      .max(12, { message: "maximum length should be 12" }),
    role: z
      .enum(["guest", "staff", "admin"], {
        message: "enter a valid role",
      })
      .optional(),
    roomNumber: z.coerce.number(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password don't match",
    path: ["confirmPassword"],
  });

export type RegisterUserSchemaType = z.infer<typeof RegisterUserSchema>;
