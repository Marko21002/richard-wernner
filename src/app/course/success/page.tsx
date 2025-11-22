import Link from "next/link";
import { Footer } from "../../components/Footer";
import CourseNavbar from "../components/navbar";

type Props = {
  searchParams: {
    checkout_id?: string;
  };
};

export default function CourseSuccessPage({ searchParams }: Props) {
  const checkoutId = searchParams.checkout_id;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      <CourseNavbar />
      <main className="px-[5%] py-16">
        <div className="mx-auto max-w-xl rounded-sm border border-emerald-100 bg-white p-6 shadow-sm">
          <h1 className="mb-3 text-2xl font-light text-slate-900 font-serif text-center">
            You&apos;re in – welcome to the masterclass
          </h1>
          <p className="mb-4 text-sm text-slate-600 text-center">
            Thank you for enrolling in Professor Werner&apos;s Banking &amp;
            Finance Masterclass. We&apos;ve sent a receipt and access details to
            your email.
          </p>
          {checkoutId && (
            <p className="mb-4 text-[11px] text-slate-500 text-center">
              Your checkout reference is{" "}
              <span className="font-mono break-all">{checkoutId}</span>.
            </p>
          )}

          <div className="mb-6 space-y-2 rounded-sm bg-emerald-50 px-4 py-3 text-left text-[11px] text-emerald-900">
            <p className="font-semibold uppercase tracking-[0.16em]">
              Next steps
            </p>
            <ol className="list-decimal space-y-1 pl-4">
              <li>
                <span className="font-medium">Create your course account</span>{" "}
                (or log in if you already have one).
              </li>
              <li>
                <span className="font-medium">Sign in with the same email</span>{" "}
                you used at checkout so we can link your purchase.
              </li>
              <li>
                <span className="font-medium">Go to your course dashboard</span>{" "}
                and start watching the introductory lecture.
              </li>
            </ol>
          </div>

          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/register"
              className="rounded-sm border border-slate-900/10 bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 text-center"
            >
              Create account
            </Link>
            <Link
              href="/login"
              className="rounded-sm border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50 text-center"
            >
              Log in
            </Link>
          </div>
          <p className="text-xs text-slate-500 text-center">
            Once you&apos;re signed in, you can start watching the course from
            your{" "}
            <Link
              href="/course/lms"
              className="font-medium text-slate-900 underline underline-offset-2 hover:text-slate-700"
            >
              course dashboard
            </Link>
            .
          </p>
          <p className="mt-4 text-[11px] text-slate-500 text-center">
            Need help with access or receipts?{" "}
            <Link
              href="/#contact"
              className="font-medium text-slate-900 underline underline-offset-2 hover:text-slate-700"
            >
              Contact support
            </Link>
            .
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}



