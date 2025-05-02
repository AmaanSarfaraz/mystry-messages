import { z } from "zod";

export const userNameValidation = z
  .string()
  .min(3, { message: "username must be atleast 3 characters long" })
  .max(15, { message: "username should no  more than 15 characters" });

export const signUpSchema = z.object({
  username: userNameValidation,
  email: z.string().email({ message: "enter a valid email address" }),
  password: z
    .string()
    .min(8, { message: "password must be atleast 8 characters" }),
});
