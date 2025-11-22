"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Navbar2 } from "../../../../../../components/Navbar2";
import { Footer } from "../../../../../../components/Footer";
import { CourseDefaults } from "../../../../../../components/Course";
import { Button } from "@relume_io/relume-ui";

type Props = {
  params: {
    courseId: string;
    moduleIndex: string;
    lessonIndex: string;
  };
};

export default function AdminLessonEditPage({ params }: Props) {
  const { courseId } = params;
  const moduleIndex = Number(params.moduleIndex) || 0;
  const lessonIndex = Number(params.lessonIndex) || 0;

  const module = CourseDefaults.modules[moduleIndex];
  const lesson = module?.lectures[lessonIndex];

  const safeModuleTitle = module?.title ?? `Section ${moduleIndex + 1}`;
  const safeLessonTitle = lesson?.title ?? "Selected lesson";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      <Navbar2 />

      <main className="px-[5%] py-10 md:py-14">
        <div className="mx-auto max-w-6xl space-y-8">
          <header className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="space-y-2">
                <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
                  Courses / {CourseDefaults.heading} / Curriculum
                </p>
                <div className="space-y-1">
                  <h1 className="text-2xl font-light text-slate-900 font-serif md:text-3xl">
                    {safeLessonTitle}
                  </h1>
                  <p className="text-xs text-slate-600">
                    {safeModuleTitle} • Lesson {lessonIndex + 1}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Button
                  variant="secondary"
                  className="border border-slate-300 bg-white px-3 py-1.5 text-xs text-slate-800 hover:bg-slate-50"
                >
                  Preview
                </Button>
                <Button
                  variant="primary"
                  className="border border-emerald-600/10 bg-emerald-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-emerald-500"
                >
                  Save changes (UI only)
                </Button>
              </div>
            </div>
          </header>

          <div className="flex flex-col gap-6 lg:flex-row">
            <CourseAdminSidebar courseId={courseId} />

            <div className="flex-1">
              <section className="grid gap-6 lg:grid-cols-[2.1fr,1.1fr]">
                {/* Left: main content editor */}
                <div className="space-y-4 rounded-sm border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-3">
                    <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
                      Text &amp; images
                    </p>
                    <button className="inline-flex items-center gap-1 rounded-sm border border-slate-300 bg-slate-50 px-3 py-1.5 text-[11px] font-medium text-slate-800 hover:bg-slate-100">
                      Published
                    </button>
                  </div>

                  <p className="text-xs text-slate-500">
                    This is a static prototype of the lesson editor. In a full
                    LMS, this area would be a rich content builder with blocks for
                    text, media and interactive elements.
                  </p>

                  <textarea
                    defaultValue={
                      lesson?.description ??
                      "Start writing your lesson content here. Use headings, bullet points and examples to make the material clear for students."
                    }
                    rows={10}
                    className="w-full resize-none rounded-sm border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900/10"
                  />

                  <div className="rounded-sm border border-dashed border-slate-300 bg-slate-50 px-3 py-3 text-xs text-slate-600">
                    <div className="mb-2 flex items-center justify-between gap-2">
                      <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
                        Lesson summary
                      </p>
                      <Button
                        variant="secondary"
                        className="border border-slate-300 bg-white px-3 py-1.5 text-[11px] font-medium text-slate-800 hover:bg-slate-50"
                      >
                        Add content
                      </Button>
                    </div>
                    <p>
                      Use this area to capture key takeaways, bullet points or
                      discussion prompts that summarise the lesson.
                    </p>
                  </div>

                  <div className="space-y-3 border-t border-slate-200 pt-4 text-[11px] text-slate-600">
                    <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
                      Lesson settings
                    </p>
                    <div className="grid gap-3 md:grid-cols-3">
                      <div className="space-y-1">
                        <p className="font-medium text-slate-700">Duration</p>
                        <p>{lesson?.duration ?? "18 mins"}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="font-medium text-slate-700">Slides</p>
                        <p>{lesson?.slideCount ?? 20} slides</p>
                      </div>
                      <div className="space-y-1">
                        <p className="font-medium text-slate-700">
                          Preview status
                        </p>
                        <p>
                          {lesson?.preview
                            ? "Available as free preview"
                            : "Locked to enrolled students"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: add content palette */}
                <aside className="space-y-4 rounded-sm border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
                      Add content
                    </p>
                    <button className="text-[11px] font-medium text-slate-700 underline underline-offset-2 hover:text-slate-500">
                      Close
                    </button>
                  </div>

                  <div className="space-y-4 text-[11px] text-slate-700">
                    <div className="grid grid-cols-2 gap-2">
                      <PaletteButton label="Text & images" />
                      <PaletteButton label="Video" />
                      <PaletteButton label="Audio" />
                      <PaletteButton label="PDF / files" />
                      <PaletteButton label="Banner image" />
                      <PaletteButton label="Resource link" />
                      <PaletteButton label="Code example" />
                      <PaletteButton label="Embed media" />
                    </div>

                    <div className="pt-2">
                      <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.16em] text-slate-500">
                        Educational tools
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        <PaletteButton label="Quiz" />
                        <PaletteButton label="Open-ended" />
                      </div>
                    </div>

                    <div className="pt-2">
                      <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.16em] text-slate-500">
                        Marketing tools
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        <PaletteButton label="Upsell" />
                        <PaletteButton label="Referrals" />
                      </div>
                    </div>

                    <div className="pt-2">
                      <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.16em] text-slate-500">
                        Advanced
                      </p>
                      <PaletteButton label="Custom code" />
                    </div>
                  </div>
                </aside>
              </section>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 text-[11px] text-slate-500">
            <div className="flex items-center gap-2">
              <Link
                href={`/course/admin/${courseId}/curriculum`}
                className="text-[11px] font-medium text-slate-800 underline underline-offset-2 hover:text-slate-600"
              >
                Back to curriculum
              </Link>
              <span>•</span>
              <span>Changes here are visual only and will not be saved.</span>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

const CourseAdminSidebar = ({ courseId }: { courseId: string }) => {
  const pathname = usePathname();
  const base = `/course/admin/${courseId}`;

  const items = [
    {
      label: "Setup guide",
      href: `${base}/edit`,
      description: "Overview, pricing & purchase flow",
    },
    {
      label: "Curriculum",
      href: `${base}/curriculum`,
      description: "Sections and lessons",
    },
    {
      label: "Students",
      href: `${base}/students`,
      description: "Enrollments and access",
    },
  ];

  return (
    <aside className="w-full max-w-xs space-y-4 rounded-sm border border-slate-200 bg-white p-4 text-xs text-slate-600 shadow-sm lg:w-64">
      <div className="space-y-1">
        <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
          Course admin
        </p>
        <p className="text-xs text-slate-600">
          Navigate between setup, curriculum and students.
        </p>
      </div>

      <nav className="space-y-1">
      {items.map((item) => {
        const isActive =
          pathname === item.href ||
          (item.href.endsWith("/curriculum") &&
            (pathname?.includes("/curriculum") ||
              pathname?.includes("/lessons/"))) ||
          pathname === item.href;

        return (
            <button
              key={item.href}
              type="button"
              className={`w-full rounded-sm border px-3 py-2 text-left transition-colors ${
                isActive
                  ? "border-slate-900 bg-slate-900 text-slate-50 shadow-sm"
                  : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
              }`}
              onClick={() => {
                window.location.href = item.href;
              }}
            >
              <p className="text-sm font-medium">{item.label}</p>
              <p
                className={`text-[11px] ${
                  isActive ? "text-slate-200" : "text-slate-500"
                }`}
              >
                {item.description}
              </p>
            </button>
        );
      })}
      <span className="ml-auto text-[11px] text-slate-500">
        Course ID: <span className="font-mono">{courseId}</span>
      </span>
      </nav>
    </aside>
  );
};

const PaletteButton = ({ label }: { label: string }) => (
  <button
    type="button"
    className="flex h-16 flex-col items-start justify-center gap-1 rounded-sm border border-slate-200 bg-slate-50 px-3 text-left hover:border-slate-300 hover:bg-slate-100"
  >
    <span className="text-[11px] font-medium text-slate-800">{label}</span>
    <span className="text-[10px] text-slate-500">
      UI-only block representing {label.toLowerCase()} content.
    </span>
  </button>
);


