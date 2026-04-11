import z from "zod";

export const UserQuerySchema = z.object({
  Name: z
    .string()
    .min(2, { message: "minimum length should be 2" })
    .max(12, { message: "maximum length should be 12" })
    .optional(),
  roomNumber: z.coerce
    .number()
    .min(100, { message: "no such room number exist" })
    .max(940, { message: "no such room number exist" }),
  //   emergencyType: z.enum(
  //     ["Medical", "Fire/Smoke", "Security", "Maintenance", "Flooding", "Other"],
  //     {
  //       message: "enter a valid emergencytype",
  //     },
  //   ),
  description: z
    .string()
    .min(1, { message: "Enter a valid message" })
    .max(200, { message: "Try to shorter your message" }),
});

export type UserQuerySchemaType = z.infer<typeof UserQuerySchema>;
