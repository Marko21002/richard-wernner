import CourseNavbar from "../../components/navbar";
import StudentSidebar from "../../components/student-sidebar";
import { Footer } from "../../../components/Footer";
import { getCurrentUser } from "@/lib/auth";
import Link from "next/link";

export default async function CourseBillingPage() {
  const user = await getCurrentUser();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      <CourseNavbar />
      <main className="px-[5%] py-10 md:py-14">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 lg:flex-row">
          <section className="flex-1 space-y-6">
            <header className="space-y-2">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
                Billing &amp; receipts
              </p>
              <h1 className="text-2xl font-light text-slate-900 font-serif md:text-3xl">
                Your purchase details
              </h1>
              <p className="max-w-2xl text-sm text-slate-600">
                This page will eventually show invoices, payment methods, and
                VAT details for your Werner Finance Academy purchases. For now,
                use the information in your checkout receipt email.
              </p>
            </header>

            <section className="space-y-3 rounded-sm border border-slate-200 bg-white p-4 text-xs text-slate-700 shadow-sm md:text-sm">
              <div className="space-y-1">
                <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
                  Current account
                </p>
                <p>
                  Signed in as{" "}
                  <span className="font-medium text-slate-900">
                    {user?.email || "your email"}
                  </span>
                  .
                </p>
              </div>

              <div className="space-y-2 border-t border-slate-200 pt-3">
                <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
                  Receipts &amp; invoices
                </p>
                <p>
                  A receipt for your Banking &amp; Finance Masterclass purchase
                  is sent automatically by our payment provider. If you need a
                  corrected invoice (e.g. with VAT details or company name),
                  please reach out to the support team.
                </p>
                <Link
                  href="/#contact"
                  className="inline-flex rounded-sm border border-slate-300 bg-slate-50 px-3 py-1.5 text-[11px] font-medium text-slate-800 hover:bg-slate-100"
                >
                  Contact support about billing
                </Link>
              </div>

              <div className="space-y-2 border-t border-slate-200 pt-3">
                <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
                  Manage subscription
                </p>
                <p>
                  The masterclass is currently a one-time purchase with lifetime
                  access. If this changes in the future, controls for updating
                  payment details or cancelling a subscription will appear here.
                </p>
              </div>
            </section>
          </section>

          <StudentSidebar />
        </div>
      </main>
      <Footer />
    </div>
  );
}

