import CourseNavbar from "../../components/navbar";
import StudentSidebar from "../../components/student-sidebar";
import { Footer } from "../../../components/Footer";
import { getCurrentUser } from "@/lib/auth";

export default async function CourseSettingsPage() {
  const user = await getCurrentUser();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      <CourseNavbar />
      <main className="px-[5%] py-10 md:py-14">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 lg:flex-row">
          <section className="flex-1 space-y-6">
            <header className="space-y-2">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
                Account settings
              </p>
              <h1 className="text-2xl font-light text-slate-900 font-serif md:text-3xl">
                Settings &amp; profile
              </h1>
              <p className="max-w-2xl text-sm text-slate-600">
                Manage the basic details for your Werner Finance Academy
                account. These controls are placeholders until the full account
                backend is wired up.
              </p>
            </header>

            <section className="space-y-4 rounded-sm border border-slate-200 bg-white p-4 text-xs text-slate-700 shadow-sm md:text-sm">
              <div className="space-y-1">
                <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
                  Profile
                </p>
                <p className="text-sm text-slate-600">
                  Signed in as{" "}
                  <span className="font-medium text-slate-900">
                    {user?.name || user?.email || "your account"}
                  </span>
                  .
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1">
                  <label className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
                    Display name
                  </label>
                  <input
                    type="text"
                    defaultValue={user?.name ?? ""}
                    className="w-full rounded-sm border border-slate-300 bg-white px-2 py-1.5 text-sm text-slate-900 outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900/10"
                    disabled
                  />
                  <p className="text-[11px] text-slate-500">
                    Editing will be available once profile updates are enabled.
                  </p>
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
                    Email
                  </label>
                  <input
                    type="email"
                    defaultValue={user?.email ?? ""}
                    className="w-full rounded-sm border border-slate-300 bg-slate-50 px-2 py-1.5 text-sm text-slate-900 outline-none"
                    disabled
                  />
                  <p className="text-[11px] text-slate-500">
                    Your course access is linked to this email.
                  </p>
                </div>
              </div>

              <div className="space-y-2 border-t border-slate-200 pt-3">
                <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
                  Password &amp; security
                </p>
                <p className="text-xs text-slate-600">
                  Password changes and additional security controls will appear
                  here once the full account system is connected.
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

