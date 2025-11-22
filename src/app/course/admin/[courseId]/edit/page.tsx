"use client";

import Link from "next/link";
import { Footer } from "../../../../components/Footer";
import { CourseDefaults } from "../../../../components/Course";
import { Button } from "@relume_io/relume-ui";
import AdminNavbar from "../../../components/admin-navbar";
import CourseAdminSidebar from "../../../components/course-admin-sidebar";

type Props = {
  params: {
    courseId: string;
  };
};

export default function AdminEditCoursePage({ params }: Props) {
  const courseId = params.courseId || "banking-masterclass";
  const courseTitle = CourseDefaults.heading;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      <AdminNavbar />

      <main className="px-[5%] py-10 md:py-14">
        <div className="mx-auto max-w-6xl space-y-8">
          <header className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="space-y-2">
                <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
                  Admin / Courses / {courseTitle} / Setup guide
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-2xl font-light text-slate-900 font-serif md:text-3xl">
                    Setup guide
                  </h1>
                  <span className="inline-flex items-center rounded-full border border-slate-300 bg-slate-50 px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-[0.16em] text-slate-700">
                    Unpublished
                  </span>
                </div>
                <p className="max-w-2xl text-sm text-slate-600">
                  Configure the curriculum, pricing and presentation for this
                  course. This page is UI-only and does not yet persist changes.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Button
                  variant="secondary"
                  className="border border-slate-300 bg-white px-3 py-1.5 text-xs text-slate-800 hover:bg-slate-50"
                >
                  Preview course
                </Button>
                <Button
                  variant="primary"
                  className="border border-emerald-600/10 bg-emerald-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-emerald-500"
                >
                  Publish (UI only)
                </Button>
              </div>
              <p className="text-[11px] text-slate-500">
                Course ID: <span className="font-mono">{courseId}</span>
              </p>
            </div>
          </header>

          <div className="flex flex-col gap-6 lg:flex-row">
            <CourseAdminSidebar courseId={courseId} />

            <div className="flex-1">
              <div className="space-y-6">
                {/* Customize course section */}
                <section className="space-y-4 rounded-sm border border-slate-200 bg-white p-4 shadow-sm">
                  <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
                    Customize your course
                  </p>

                  <section className="space-y-2 rounded-sm border border-slate-200 bg-slate-50 p-3">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
                        Course title
                      </p>
                      <button className="text-[11px] font-medium text-slate-800 underline underline-offset-2 hover:text-slate-600">
                        Edit title
                      </button>
                    </div>
                    <input
                      type="text"
                      defaultValue={courseTitle}
                      className="mt-1 w-full rounded-sm border border-slate-300 bg-white px-2 py-1.5 text-sm text-slate-900 outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900/10"
                    />
                  </section>

                  <section className="space-y-2 rounded-sm border border-slate-200 bg-slate-50 p-3">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
                        Thumbnail
                      </p>
                      <button className="text-[11px] font-medium text-slate-800 underline underline-offset-2 hover:text-slate-600">
                        Edit image
                      </button>
                    </div>
                    <div className="h-32 w-full overflow-hidden rounded-sm border border-slate-200 bg-slate-100" />
                    <p className="text-[11px] text-slate-500">
                      This image will appear in the catalog, checkout and
                      student dashboard. Image upload is UI-only for now.
                    </p>
                  </section>
                </section>

                {/* Curriculum section */}
                <section className="space-y-4 rounded-sm border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="space-y-1">
                      <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
                        Create your curriculum
                      </p>
                      <p className="text-sm text-slate-700">
                        Outline your modules and lectures for students.
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-[11px]">
                      <Button
                        variant="secondary"
                        className="border border-slate-300 bg-slate-50 px-3 py-1.5 text-[11px] font-medium text-slate-800 hover:bg-slate-100"
                      >
                        Preview curriculum
                      </Button>
                      <Link
                        href={`/course/admin/${courseId}/curriculum`}
                        className="inline-flex items-center rounded-sm border border-slate-900/10 bg-slate-900 px-3 py-1.5 text-[11px] font-medium text-white hover:bg-slate-800"
                      >
                        Edit curriculum
                      </Link>
                    </div>
                  </div>

                  <div className="rounded-sm border border-slate-200 bg-slate-50 p-3 text-xs text-slate-600">
                    <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
                      Curriculum preview
                    </p>
                    <div className="space-y-2">
                      {CourseDefaults.modules.map((module, index) => (
                        <div
                          key={module.title}
                          className="flex items-center justify-between gap-2 rounded-sm bg-white px-3 py-2"
                        >
                          <div>
                            <p className="text-xs font-medium text-slate-900">
                              {module.title}
                            </p>
                            <p className="text-[11px] text-slate-500">
                              {module.lectures.length} lectures
                            </p>
                          </div>
                          <span className="text-[11px] text-slate-500">
                            Module {index + 1}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                {/* Pricing section */}
                <section className="space-y-4 rounded-sm border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="space-y-1">
                      <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
                        Price your course
                      </p>
                      <p className="text-sm text-slate-700">
                        Set how students pay to access the masterclass.
                      </p>
                    </div>
                    <Button
                      variant="secondary"
                      className="border border-slate-300 bg-slate-50 px-3 py-1.5 text-[11px] font-medium text-slate-800 hover:bg-slate-100"
                    >
                      Manage pricing
                    </Button>
                  </div>

                  <div className="grid gap-3 md:grid-cols-3 text-xs text-slate-600">
                    <div className="space-y-1">
                      <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
                        Current price
                      </p>
                      <p className="text-sm font-medium text-slate-900">
                        {CourseDefaults.price}
                      </p>
                      {CourseDefaults.originalPrice && (
                        <p className="text-[11px] text-slate-500 line-through">
                          {CourseDefaults.originalPrice}
                        </p>
                      )}
                    </div>
                    <div className="space-y-1">
                      <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
                        Price description
                      </p>
                      <p>{CourseDefaults.priceDescription}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
                        Access model
                      </p>
                      <p>One-time payment • Lifetime access</p>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
