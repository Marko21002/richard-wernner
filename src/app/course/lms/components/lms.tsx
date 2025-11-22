"use client";

import { useMemo, useState, useEffect } from "react";
import { CourseDefaults } from "@/app/components/Course";
import { RxCheck, RxChevronRight, RxLockClosed, RxPlay } from "react-icons/rx";

type Module = (typeof CourseDefaults.modules)[number];
type Lecture = Module["lectures"][number];

type SelectedLecture = {
  moduleIndex: number;
  lectureIndex: number;
};

const getLectureKey = ({ moduleIndex, lectureIndex }: SelectedLecture) =>
  `${moduleIndex}-${lectureIndex}`;

type LectureResourceItem = {
  label: string;
  type: "slides" | "pdf" | "paper" | "reading" | "link" | "dataset";
  href?: string;
};

type LectureResources = {
  summary?: string;
  files: LectureResourceItem[];
  readings?: LectureResourceItem[];
};

type UploadedFile = {
  url: string;
  fileName: string;
  fileSize: number;
  contentType: string;
  key: string;
};

const getFileType = (contentType: string, fileName: string): LectureResourceItem["type"] => {
  if (contentType.includes("pdf") || fileName.toLowerCase().endsWith(".pdf")) {
    return "pdf";
  }
  if (contentType.includes("presentation") || fileName.toLowerCase().includes("slide")) {
    return "slides";
  }
  if (contentType.includes("spreadsheet") || fileName.toLowerCase().endsWith(".xls") || fileName.toLowerCase().endsWith(".xlsx") || fileName.toLowerCase().endsWith(".csv")) {
    return "dataset";
  }
  return "link";
};

const getResourceTypeLabel = (type: LectureResourceItem["type"]): string => {
  switch (type) {
    case "slides":
      return "Slides / slide deck";
    case "pdf":
      return "PDF document";
    case "paper":
      return "Academic paper";
    case "reading":
      return "Background reading";
    case "link":
      return "External link";
    case "dataset":
      return "Data / spreadsheet";
    default:
      return "Resource";
  }
};

const COURSE_ID = "banking-masterclass";

export const LMS = () => {
  const modules = CourseDefaults.modules;

  const allLecturesFlat: SelectedLecture[] = useMemo(() => {
    const result: SelectedLecture[] = [];
    modules.forEach((module, moduleIndex) => {
      module.lectures.forEach((_lecture, lectureIndex) => {
        result.push({ moduleIndex, lectureIndex });
      });
    });
    return result;
  }, [modules]);

  const totalLectures = allLecturesFlat.length;

  const [selectedLecture, setSelectedLecture] = useState<SelectedLecture>({
    moduleIndex: 0,
    lectureIndex: 0,
  });

  const [completedLectures, setCompletedLectures] = useState<Set<string>>(
    () => new Set()
  );
  const [lessonContent, setLessonContent] = useState<string | null>(null);
  const [lessonFiles, setLessonFiles] = useState<UploadedFile[]>([]);
  const [loadingLesson, setLoadingLesson] = useState(false);

  const selectedModule: Module = modules[selectedLecture.moduleIndex];
  const currentLecture: Lecture =
    selectedModule.lectures[selectedLecture.lectureIndex];

  const currentKey = getLectureKey(selectedLecture);
  const isCurrentCompleted = completedLectures.has(currentKey);

  // Fetch lesson data from database
  useEffect(() => {
    const fetchLesson = async () => {
      setLoadingLesson(true);
      try {
        const url = `/api/lesson/${COURSE_ID}/${selectedLecture.moduleIndex}/${selectedLecture.lectureIndex}`;
        console.log("Fetching lesson from:", url);
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          console.log("Fetched lesson data:", data);
          setLessonContent(data.content || null);
          setLessonFiles(data.files || []);
        } else {
          console.error("Failed to fetch lesson:", response.status, response.statusText);
          setLessonContent(null);
          setLessonFiles([]);
        }
      } catch (error) {
        console.error("Error fetching lesson:", error);
        setLessonContent(null);
        setLessonFiles([]);
      } finally {
        setLoadingLesson(false);
      }
    };

    fetchLesson();
  }, [selectedLecture.moduleIndex, selectedLecture.lectureIndex]);

  // Convert uploaded files to lecture resources format
  const currentResources: LectureResources | null = useMemo(() => {
    if (lessonFiles.length === 0) {
      return null;
    }

    return {
      files: lessonFiles.map((file) => ({
        label: file.fileName,
        type: getFileType(file.contentType, file.fileName),
        href: file.url,
      })),
    };
  }, [lessonFiles]);

  const remainingLectures = Math.max(0, totalLectures - completedLectures.size);

  const handleToggleComplete = () => {
    setCompletedLectures((prev) => {
      const next = new Set(prev);
      if (next.has(currentKey)) {
        next.delete(currentKey);
      } else {
        next.add(currentKey);
      }
      return next;
    });
  };

  const handleSelectLecture = (selection: SelectedLecture) => {
    setSelectedLecture(selection);
  };

  const handleNextLecture = () => {
    const currentIndexFlat = allLecturesFlat.findIndex(
      (l) =>
        l.moduleIndex === selectedLecture.moduleIndex &&
        l.lectureIndex === selectedLecture.lectureIndex
    );
    if (currentIndexFlat === -1) return;
    const next = allLecturesFlat[currentIndexFlat + 1];
    if (next) {
      setSelectedLecture(next);
    }
  };

  const handlePrevLecture = () => {
    const currentIndexFlat = allLecturesFlat.findIndex(
      (l) =>
        l.moduleIndex === selectedLecture.moduleIndex &&
        l.lectureIndex === selectedLecture.lectureIndex
    );
    if (currentIndexFlat === -1) return;
    const prev = allLecturesFlat[currentIndexFlat - 1];
    if (prev) {
      setSelectedLecture(prev);
    }
  };

  return (
    <section className="px-[3%] py-8 md:py-10 lg:py-12 bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-6xl space-y-6">
        {/* Minimal header */}
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-slate-500">
            {CourseDefaults.tagline}
          </p>
          <h1 className="mt-1 text-2xl font-light leading-tight text-slate-900 md:text-3xl lg:text-4xl font-serif">
            {CourseDefaults.heading}
          </h1>
          <p className="mt-2 max-w-3xl text-sm text-slate-600 md:text-base">
            {CourseDefaults.description}
          </p>
        </div>

        {/* Main layout: player + details / curriculum */}
        <div className="grid gap-6 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] items-start">
          {/* Main content: player, description, downloads */}
          <main className="space-y-5">
            {/* Player */}
            <div className="overflow-hidden rounded-sm border border-slate-200 bg-black shadow-sm">
              <div className="relative aspect-video w-full bg-black">
                <img
                  src={currentLecture.thumbnail}
                  alt={currentLecture.title}
                  className="h-full w-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/10" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-slate-50">
                  <button className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-white/50 bg-black/40 backdrop-blur-sm transition hover:scale-105 hover:bg-black/60">
                    <RxPlay className="h-8 w-8 text-white" />
                  </button>
                  <p className="mb-1 text-[11px] font-medium uppercase tracking-[0.2em] text-slate-200/80">
                    Now playing
                  </p>
                  <h2 className="max-w-2xl text-lg font-medium leading-snug text-slate-50 md:text-xl">
                    {currentLecture.title}
                  </h2>
                </div>
                {selectedModule.isLocked && (
                  <div className="absolute left-4 top-4 flex items-center gap-1 rounded-full bg-amber-500/90 px-3 py-1 text-xs font-medium text-amber-950">
                    <RxLockClosed className="h-3 w-3" />
                    Premium module
                  </div>
                )}
                {currentLecture.preview && (
                  <div className="absolute right-4 top-4 rounded-full bg-emerald-500 px-3 py-1 text-xs font-semibold text-emerald-950">
                    Free preview
                  </div>
                )}
              </div>
            </div>

            {/* Simple controls */}
            <div className="flex flex-col gap-3 rounded-sm border border-slate-200 bg-white px-4 py-3 text-xs md:flex-row md:items-center md:justify-between md:text-sm">
              <div className="flex items-center gap-3">
                <button
                  className="inline-flex items-center gap-2 rounded-sm border border-emerald-500/80 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-900 hover:bg-emerald-500/20 md:text-sm"
                  onClick={handleToggleComplete}
                >
                  <RxCheck
                    className={`h-4 w-4 ${
                      isCurrentCompleted ? "text-emerald-500" : "text-slate-400"
                    }`}
                  />
                  {isCurrentCompleted ? "Marked as completed" : "Mark as complete"}
                </button>
                <p className="text-[11px] text-slate-500 md:text-xs">
                  {remainingLectures === 0
                    ? "You’ve watched every lecture in this course."
                    : `${completedLectures.size} of ${totalLectures} lectures completed`}
                </p>
              </div>
              <div className="flex items-center gap-2 md:justify-end">
                <button
                  className="inline-flex items-center gap-1 rounded-sm border border-slate-200 bg-white px-3 py-1 text-xs text-slate-700 hover:bg-slate-50 md:text-sm"
                  onClick={handlePrevLecture}
                >
                  <RxChevronRight className="h-4 w-4 rotate-180" />
                  Previous
                </button>
                <button
                  className="inline-flex items-center gap-1 rounded-sm border border-slate-900/10 bg-slate-900 px-3 py-1 text-xs font-medium text-white hover:bg-slate-800 md:text-sm"
                  onClick={handleNextLecture}
                >
                  Next lecture
                  <RxChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Rich text description */}
            <section className="space-y-3 rounded-sm border border-slate-200 bg-white p-4 shadow-sm">
              <h3 className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
                Lecture overview
              </h3>
              <div className="prose prose-sm max-w-none text-slate-700">
                <h4 className="mb-1 text-base font-semibold text-slate-900">
                  {currentLecture.title}
                </h4>
                {loadingLesson ? (
                  <p className="text-sm text-slate-500">Loading content...</p>
                ) : lessonContent && lessonContent.trim() !== "" ? (
                  <div
                    dangerouslySetInnerHTML={{ __html: lessonContent }}
                    className="prose prose-sm max-w-none [&_h1]:text-lg [&_h1]:font-bold [&_h1]:mb-2 [&_h1]:mt-3 [&_h2]:text-base [&_h2]:font-bold [&_h2]:mb-2 [&_h2]:mt-2 [&_h3]:text-sm [&_h3]:font-bold [&_h3]:mb-1 [&_h3]:mt-2 [&_p]:mb-2 [&_p:last-child]:mb-0 [&_ul]:list-disc [&_ul]:ml-4 [&_ul]:mb-2 [&_ol]:list-decimal [&_ol]:ml-4 [&_ol]:mb-2 [&_li]:mb-1 [&_a]:text-emerald-600 [&_a]:underline [&_a:hover]:text-emerald-700 [&_img]:max-w-full [&_img]:rounded [&_img]:my-2 [&_iframe]:max-w-full [&_iframe]:rounded [&_iframe]:my-2"
                  />
                ) : (
                  <p>{currentLecture.description}</p>
                )}
              </div>
            </section>

            {/* Downloads / resources */}
            <section className="space-y-3 rounded-sm border border-slate-200 bg-white p-4 shadow-sm">
              <h3 className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
                Downloads & resources
              </h3>
              {currentResources ? (
                <div className="space-y-3 text-xs text-slate-600 md:text-sm">
                  {currentResources.summary && (
                    <p className="text-slate-600">{currentResources.summary}</p>
                  )}
                  {currentResources.files.length > 0 && (
                    <div className="space-y-1.5">
                      <p className="text-[11px] font-medium text-slate-700">
                        Downloadable files
                      </p>
                      {currentResources.files.map((file) => (
                        <div
                          key={file.label}
                          className="flex items-center justify-between gap-3 rounded-sm border border-slate-200 bg-slate-50 px-2 py-2"
                        >
                          <div className="min-w-0">
                            <p className="truncate text-[11px] font-medium text-slate-800">
                              {file.label}
                            </p>
                            <p className="text-[10px] text-slate-500">
                              {getResourceTypeLabel(file.type)}
                            </p>
                          </div>
                          {file.href && (
                            <a
                              href={file.href}
                              className="flex-shrink-0 text-[11px] font-medium text-slate-900 underline-offset-2 hover:underline"
                            >
                              Download
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                  {currentResources.readings &&
                    currentResources.readings.length > 0 && (
                      <div className="space-y-1.5">
                        <p className="text-[11px] font-medium text-slate-700">
                          Suggested readings
                        </p>
                        <ul className="space-y-1.5">
                          {currentResources.readings.map((reading) => (
                            <li
                              key={reading.label}
                              className="space-y-0.5 text-[11px] text-slate-600"
                            >
                              {reading.href ? (
                                <a
                                  href={reading.href}
                                  className="truncate font-medium text-slate-800 underline-offset-2 hover:underline"
                                >
                                  {reading.label}
                                </a>
                              ) : (
                                <span className="truncate font-medium text-slate-800">
                                  {reading.label}
                                </span>
                              )}
                              <p className="text-[10px] text-slate-500">
                                {getResourceTypeLabel(reading.type)}
                              </p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                </div>
              ) : (
                <p className="text-xs text-slate-500 md:text-sm">
                  No downloads are available for this lecture yet. When slide
                  decks or PDFs are added, you&apos;ll find them here.
                </p>
              )}
            </section>
          </main>

          {/* Sidebar: curriculum */}
          <aside className="space-y-3 rounded-sm border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between gap-2">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
                Curriculum
              </p>
              <span className="text-[10px] text-slate-500">
                Click a lecture to play
              </span>
            </div>

            <div className="max-h-[560px] space-y-3 overflow-y-auto pr-1 text-xs md:text-sm">
              {modules.map((module, moduleIndex) => {
                const isModuleLocked = module.isLocked;
                return (
                  <div
                    key={module.title}
                    className="space-y-1 rounded-sm border border-slate-100 bg-slate-50 p-2"
                  >
                    <div className="flex w-full items-center justify-between gap-2 rounded-sm bg-white px-2 py-2 text-left">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.16em] text-slate-600">
                            Module {moduleIndex + 1}
                          </span>
                          {isModuleLocked && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold text-amber-800">
                              <RxLockClosed className="h-3 w-3" />
                              Premium
                            </span>
                          )}
                        </div>
                        <p className="text-xs font-medium text-slate-900">
                          {module.title}
                        </p>
                        <p className="text-[11px] text-slate-600 line-clamp-2">
                          {module.description}
                        </p>
                      </div>
                      <RxChevronRight className="h-4 w-4 text-slate-300" />
                    </div>
                    <div className="divide-y divide-slate-200 rounded-sm bg-white">
                      {module.lectures.map((lecture, lectureIndex) => {
                        const key = getLectureKey({
                          moduleIndex,
                          lectureIndex,
                        });
                        const isActive =
                          selectedLecture.moduleIndex === moduleIndex &&
                          selectedLecture.lectureIndex === lectureIndex;
                        const isCompleted = completedLectures.has(key);
                        return (
                          <button
                            key={lecture.title + lectureIndex}
                            className={`flex w-full items-start gap-2 border-l-2 px-3 py-2 text-left transition-colors ${
                              isActive
                                ? "bg-slate-50 border-l-slate-900"
                                : "border-l-transparent hover:bg-slate-50"
                            }`}
                            onClick={() =>
                              handleSelectLecture({ moduleIndex, lectureIndex })
                            }
                          >
                            <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-[10px]">
                              {isCompleted ? (
                                <RxCheck className="h-4 w-4 text-emerald-500" />
                              ) : isActive ? (
                                <RxPlay className="h-3 w-3 text-slate-900" />
                              ) : (
                                <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                              )}
                            </div>
                            <div className="min-w-0 flex-1 space-y-0.5">
                              <p
                                className={`truncate text-xs md:text-sm ${
                                  isActive
                                    ? "font-semibold text-slate-900"
                                    : "text-slate-700"
                                }`}
                              >
                                {lecture.title}
                              </p>
                              <p className="text-[11px] text-slate-500">
                                {lecture.duration} • {lecture.slideCount} slides
                              </p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};


