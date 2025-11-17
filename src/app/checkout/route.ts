import { Checkout } from "@polar-sh/nextjs";

export const GET = Checkout({
  accessToken: process.env.POLAR_ACCESS_TOKEN!,
  successUrl: "/course/lms",
  server: process.env.POLAR_ENV === "production" ? "production" : "sandbox",
});



