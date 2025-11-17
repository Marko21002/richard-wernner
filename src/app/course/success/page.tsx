import Link from "next/link";
import { Navbar2 } from "../../components/Navbar2";
import { Footer } from "../../components/Footer";

type Props = {
  searchParams: {
    checkout_id?: string;
  };
};

export default function CourseSuccessPage({ searchParams }: Props) {
  const checkoutId = searchParams.checkout_id;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      <Navbar2 />
      <main className="px-[5%] py-16">
        <div className="mx-auto max-w-xl rounded-sm border border-emerald-100 bg-white p-6 text-center shadow-sm">
          <h1 className="mb-3 text-2xl font-light text-slate-900 font-serif">
            Payment successful
          </h1>
          <p className="mb-4 text-sm text-slate-600">
            Thank you for enrolling in Professor Werner&apos;s Banking &amp;
            Finance Masterclass.
          </p>
          {checkoutId && (
            <p className="mb-4 text-[11px] text-slate-500">
              Your checkout reference is{" "}
              <span className="font-mono break-all">{checkoutId}</span>.
            </p>
          )}
          <p className="mb-6 text-sm text-slate-600">
            Next, create an account or log in with your email so you can access
            the course dashboard.
          </p>
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/register"
              className="rounded-sm border border-slate-900/10 bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
            >
              Create account
            </Link>
            <Link
              href="/login"
              className="rounded-sm border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50"
            >
              Log in
            </Link>
          </div>
          <p className="text-xs text-slate-500">
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
        </div>
      </main>
      <Footer />
    </div>
  );
}



