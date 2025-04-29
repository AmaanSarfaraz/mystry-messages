import { z } from "zod";

export const messageSchema = z.object({
  content: z
    .string()
    .min(20, { message: "message should be atleast 20 characters" })
    .max(300, { message: "message should no more than 300 characters" }),
});
