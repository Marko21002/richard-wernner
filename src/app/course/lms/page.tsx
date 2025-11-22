import { Footer } from "../../components/Footer";
import { LMS } from "./components/lms";
import { getCurrentUser } from "@/lib/auth";
import Link from "next/link";
import CourseNavbar from "../components/navbar";

export default async function LMSPage() {
  const user = await getCurrentUser();
  // TODO: Wire this to a real `has_bought_course` flag once backend is ready.
  const accessState: "guest" | "no-access" | "enrolled" = user
    ? "enrolled"
    : "guest";

  return (
    <div className="">
      <CourseNavbar />
      {accessState === "enrolled" ? (
        <LMS />
      ) : (
        <section className="bg-slate-50 px-[5%] py-20">
          <div className="mx-auto max-w-xl rounded-sm border border-slate-200 bg-white p-6 text-center shadow-sm">
            <h1 className="mb-3 text-2xl font-light text-slate-900 font-serif">
              {accessState === "guest"
                ? "Unlock this course"
                : "This course isn&apos;t unlocked yet"}
            </h1>
            <p className="mb-6 text-sm text-slate-600">
              {accessState === "guest"
                ? "Create an account or log in with the email you used at checkout to watch Professor Werner&apos;s Banking & Finance Masterclass."
                : "Hi there, your account is set up but this course is not yet linked to your email. Complete your purchase or contact support if you think this is a mistake."}
            </p>
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/login"
                className="rounded-sm border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50"
              >
                Log in
              </Link>
              <Link
                href="/register"
                className="rounded-sm border border-slate-900/10 bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
              >
                Create account
              </Link>
            </div>
            <p className="text-xs text-slate-500">
              Ready to enroll? You&apos;ll be taken to a secure checkout page.
            </p>
            <div className="mt-4">
              <Link
                href="https://buy.polar.sh/polar_cl_zPyR4fHIjxLukXVA8Q4vUz7yFrBpoNnFGNB8z1DtA6Q"
                target="_blank"
                className="inline-flex items-center justify-center rounded-sm border border-emerald-600/10 bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-500"
              >
                Go to secure checkout
              </Link>
            </div>
          </div>
        </section>
      )}
      <Footer />
    </div>
  );
}
