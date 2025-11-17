import { Navbar2 } from "../../components/Navbar2";
import { Footer } from "../../components/Footer";
import { getCurrentUser } from "@/lib/auth";
import Link from "next/link";

const enrolledCourses = [
  {
    id: "banking-masterclass",
    title: "Banking & Finance Masterclass",
    tagline: "Professor Richard Werner",
    progress: 42,
    nextLecture: "Money Creation Mechanics – Fractional Reserve Banking",
    href: "/course/lms",
  },
];

const recommendedCourses = [
  {
    id: "policy-lab",
    title: "Monetary Policy Lab (Coming soon)",
    level: "Advanced",
    duration: "4 weeks",
  },
  {
    id: "regional-case-studies",
    title: "Regional Banking Case Studies (Coming soon)",
    level: "Intermediate",
    duration: "Self-paced",
  },
];

export default async function StudentDashboardPage() {
  const user = await getCurrentUser();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      <Navbar2 />
      <main className="px-[5%] py-10 md:py-14">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 lg:flex-row">
          {/* Main column */}
          <section className="flex-1 space-y-6">
            <header className="space-y-2">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
                Student dashboard
              </p>
              <h1 className="text-2xl font-light text-slate-900 font-serif md:text-3xl">
                {user?.name
                  ? `Welcome back, ${user.name}`
                  : "Welcome back to R.W Academy"}
              </h1>
              <p className="max-w-2xl text-sm text-slate-600">
                View your active courses, pick up where you left off, and
                explore new programmes by Professor Werner.
              </p>
            </header>

            {/* Enrolled courses */}
            <div className="space-y-3 rounded-sm border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between gap-2">
                <h2 className="text-sm font-medium text-slate-900">
                  Your courses
                </h2>
                <p className="text-xs text-slate-500">
                  {enrolledCourses.length} active course
                  {enrolledCourses.length !== 1 ? "s" : ""}
                </p>
              </div>
              <div className="space-y-3">
                {enrolledCourses.map((course) => (
                  <Link
                    key={course.id}
                    href={course.href}
                    className="flex flex-col gap-3 rounded-sm border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700 transition hover:border-slate-300 hover:bg-slate-100/80"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
                          Enrolled
                        </p>
                        <h3 className="mt-1 text-base font-medium text-slate-900">
                          {course.title}
                        </h3>
                        <p className="text-xs text-slate-600">
                          {course.tagline}
                        </p>
                      </div>
                      <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-medium text-emerald-700">
                        In progress
                      </span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[11px] text-slate-600">
                        <span>Course progress</span>
                        <span>{course.progress}% complete</span>
                      </div>
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
                        <div
                          className="h-full rounded-full bg-emerald-500"
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-600">
                      Next up:{" "}
                      <span className="font-medium text-slate-900">
                        {course.nextLecture}
                      </span>
                    </p>
                    <span className="text-[11px] font-medium text-slate-900 underline underline-offset-2">
                      Resume course
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Recommended / other courses */}
            <div className="space-y-3 rounded-sm border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between gap-2">
                <h2 className="text-sm font-medium text-slate-900">
                  Explore other programmes
                </h2>
                <p className="text-xs text-slate-500">
                  Early access coming soon
                </p>
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                {recommendedCourses.map((course) => (
                  <div
                    key={course.id}
                    className="space-y-2 rounded-sm border border-dashed border-slate-300 bg-slate-50 p-3 text-xs text-slate-600"
                  >
                    <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
                      Upcoming
                    </p>
                    <h3 className="text-sm font-medium text-slate-900">
                      {course.title}
                    </h3>
                    <p>
                      Level: <span className="font-medium">{course.level}</span>{" "}
                      • {course.duration}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      Join the waitlist when enrollment opens to be notified
                      first.
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Sidebar */}
          <aside className="w-full max-w-xs space-y-4 rounded-sm border border-slate-200 bg-white p-4 text-xs text-slate-600 shadow-sm lg:w-72">
            <div className="space-y-1">
              <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
                Account
              </p>
              <div className="space-y-1.5">
                <Link
                  href="/course/student"
                  className="block rounded-sm bg-slate-900 px-3 py-2 text-xs font-medium text-slate-50 hover:bg-slate-800"
                >
                  Dashboard
                </Link>
                <Link
                  href="/course/settings"
                  className="block rounded-sm px-3 py-2 text-xs text-slate-800 hover:bg-slate-50"
                >
                  Settings &amp; profile
                </Link>
                <Link
                  href="/course/billing"
                  className="block rounded-sm px-3 py-2 text-xs text-slate-800 hover:bg-slate-50"
                >
                  Billing &amp; receipts
                </Link>
              </div>
            </div>

            <div className="space-y-1 border-t border-slate-200 pt-3">
              <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
                Support
              </p>
              <p className="text-[11px] text-slate-600">
                Questions about access or payments? Visit the FAQ in the main
                site or contact the support team.
              </p>
              <Link
                href="/#contact"
                className="inline-flex rounded-sm border border-slate-300 bg-slate-50 px-3 py-1.5 text-[11px] font-medium text-slate-800 hover:bg-slate-100"
              >
                Contact support
              </Link>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
}
