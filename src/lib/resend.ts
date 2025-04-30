import { Resend } from "resend";

console.log("Resend API Key:", process.env.RESEND_API_KEY);

if (!process.env.RESEND_API_KEY) {
  throw new Error("RESEND_API_KEY is not defined");
}

export const resend = new Resend(process.env.RESEND_API_KEY);
