"use client";

import { use } from "react";
import Link from "next/link";
import { Footer } from "../../../../components/Footer";
import { CourseDefaults } from "../../../../components/Course";
import { Button } from "@relume_io/relume-ui";
import AdminNavbar from "../../../components/admin-navbar";
import CourseAdminSidebar from "../../../components/course-admin-sidebar";
type Props = {
  params: Promise<{
    courseId: string;
  }>;
};

export default function AdminCurriculumPage({ params }: Props) {
  const { courseId } = use(params);
  const finalCourseId = courseId || "banking-masterclass";
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
                  Admin / Courses / {courseTitle} / Curriculum
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-2xl font-light text-slate-900 font-serif md:text-3xl">
                    Curriculum
                  </h1>
                  <span className="inline-flex items-center rounded-full border border-slate-300 bg-slate-50 px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-[0.16em] text-slate-700">
                    Unpublished
                  </span>
                </div>
                <p className="max-w-2xl text-sm text-slate-600">
                  Arrange sections and lessons for this course. All controls are
                  UI-only and do not modify real data.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2"></div>
              <p className="text-[11px] text-slate-500">
                Course ID: <span className="font-mono">{finalCourseId}</span>
              </p>
            </div>
          </header>

          <div className="flex flex-col gap-6 lg:flex-row">
            <CourseAdminSidebar courseId={finalCourseId} />

            <div className="flex-1">
              <section className="grid gap-6 lg:grid-cols-[2.1fr,1.1fr]">
                {/* Left: simple list of sections & lessons */}
                <div className="space-y-4 rounded-sm border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="space-y-1">
                      <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
                        Curriculum
                      </p>
                      <p className="text-sm text-slate-700">
                        Click a lesson to open its editor on a separate page.
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-[11px]">
                      <Button
                        variant="primary"
                        className="border border-slate-900/10 bg-slate-900 px-3 py-1.5 text-[11px] font-medium text-white hover:bg-slate-800"
                      >
                        New lesson
                      </Button>
                      <Button
                        variant="secondary"
                        className="border border-slate-300 bg-slate-50 px-3 py-1.5 text-[11px] font-medium text-slate-800 hover:bg-slate-100"
                      >
                        Bulk upload
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {CourseDefaults.modules.map((module, moduleIndex) => (
                      <div
                        key={module.title}
                        className="rounded-sm border border-slate-200 bg-slate-50"
                      >
                        <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-4 py-3">
                          <div>
                            <p className="text-sm font-medium text-slate-900">
                              {module.title}
                            </p>
                            <p className="text-xs text-slate-600">
                              {module.description}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 text-[11px] text-slate-600">
                            <span>{module.lectures.length} lessons</span>
                            {module.isLocked && (
                              <span className="inline-flex items-center rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-medium text-amber-700">
                                Premium
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="space-y-0.5 px-4 py-3 bg-white">
                          {module.lectures.map((lecture, lectureIndex) => (
                            <Link
                              key={lecture.title + lectureIndex}
                              href={`/course/admin/${finalCourseId}/lessons/${moduleIndex}/${lectureIndex}`}
                              className="flex items-center justify-between gap-3 rounded-sm border border-slate-100 bg-slate-50 px-3 py-2 text-xs text-slate-700 hover:border-slate-300 hover:bg-slate-100"
                            >
                              <div className="space-y-0.5">
                                <p className="font-medium text-slate-900">
                                  {lecture.title}
                                </p>
                                <p className="text-[11px] text-slate-600 line-clamp-1">
                                  {lecture.description}
                                </p>
                                <p className="text-[11px] text-slate-500">
                                  {lecture.duration} • {lecture.slideCount}{" "}
                                  slides
                                </p>
                              </div>
                              <div className="flex flex-col items-end gap-1 text-[11px] text-slate-600">
                                <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700">
                                  Published
                                </span>
                                <span className="text-[11px] font-medium text-slate-700 underline underline-offset-2">
                                  Edit
                                </span>
                              </div>
                            </Link>
                          ))}
                        </div>

                        <div className="flex items-center justify-between gap-3 border-t border-slate-200 bg-slate-50 px-4 py-2 text-[11px] text-slate-600">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="secondary"
                              className="border border-slate-300 bg-white px-2 py-1 text-[11px] font-medium text-slate-800 hover:bg-slate-50"
                            >
                              + New lesson
                            </Button>
                          </div>
                          <p>
                            Section {moduleIndex + 1} • {module.lectures.length}{" "}
                            lessons
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: outline summary */}
                <aside className="space-y-4 rounded-sm border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
                      Outline
                    </p>
                    <span className="text-[11px] text-slate-500">
                      Read-only preview
                    </span>
                  </div>

                  <div className="space-y-5 text-[11px] text-slate-700">
                    {CourseDefaults.modules.map((module) => (
                      <div key={module.title} className="space-y-2">
                        <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-slate-500">
                          {module.title}
                        </p>
                        <ul className="space-y-1">
                          {module.lectures.map((lecture) => (
                            <li key={lecture.title} className="text-[11px]">
                              {lecture.title}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </aside>
              </section>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 text-[11px] text-slate-500">
            <div className="flex items-center gap-2">
              <Link
                href={`/course/admin/${finalCourseId}/edit`}
                className="text-[11px] font-medium text-slate-800 underline underline-offset-2 hover:text-slate-600"
              >
                Back to setup guide
              </Link>
              <span>•</span>
              <span>Remember to review pricing before publishing.</span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Button
                variant="secondary"
                className="border border-slate-300 bg-white px-3 py-1.5 text-[11px] font-medium text-slate-800 hover:bg-slate-50"
              >
                Save draft (UI only)
              </Button>
              <Button
                variant="primary"
                className="border border-emerald-600/10 bg-emerald-600 px-3 py-1.5 text-[11px] font-medium text-white hover:bg-emerald-500"
              >
                Publish course (UI only)
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
