"use client";

import { useMemo, useState } from "react";
import { CourseDefaults } from "@/app/components/Course";
import { Button } from "@relume_io/relume-ui";
import {
  RxCheck,
  RxChevronRight,
  RxClock,
  RxLockClosed,
  RxPlay,
  RxVideo,
} from "react-icons/rx";

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

const lectureResources: Record<string, LectureResources> = {
  // Module 1 – Intro lectures
  "0-0": {
    summary:
      "Overview slide deck and a short reading that contrast textbook banking with empirical evidence.",
    files: [
      {
        label: "Lecture 1 – Introduction to Banking Systems (PDF slides)",
        type: "slides",
        href: "#",
      },
      {
        label: "Course syllabus & structure (PDF)",
        type: "pdf",
        href: "#",
      },
    ],
    readings: [
      {
        label:
          "Werner (2014) – Can banks individually create money out of nothing?",
        type: "paper",
        href: "#",
      },
    ],
  },
  "0-1": {
    summary:
      "Background materials distinguishing central bank operations from commercial bank credit creation.",
    files: [
      {
        label: "Central vs Commercial Banks – diagram pack (PDF)",
        type: "slides",
        href: "#",
      },
    ],
    readings: [
      {
        label: "Key institutional definitions used in this lecture",
        type: "reading",
        href: "#",
      },
    ],
  },
  // Fallback example for all other lectures – can be customized later
};

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

  const selectedModule: Module = modules[selectedLecture.moduleIndex];
  const currentLecture: Lecture =
    selectedModule.lectures[selectedLecture.lectureIndex];

  const currentKey = getLectureKey(selectedLecture);
  const isCurrentCompleted = completedLectures.has(currentKey);
  const currentResources = lectureResources[currentKey];

  const remainingLectures = Math.max(0, totalLectures - completedLectures.size);

  const progressPercent = useMemo(() => {
    if (totalLectures === 0) return 0;
    return Math.round((completedLectures.size / totalLectures) * 100);
  }, [completedLectures.size, totalLectures]);

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
    <section className="px-[3%] py-8 md:py-10 lg:py-12 bg-gradient-to-br from-slate-50 to-white text-slate-900">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center rounded-full bg-slate-900 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-white">
                Masterclass
              </span>
              <p className="text-xs font-medium tracking-[0.18em] text-slate-500 uppercase">
                {CourseDefaults.tagline}
              </p>
            </div>
            <h1 className="mt-2 text-2xl font-light leading-tight text-slate-900 md:text-3xl lg:text-4xl font-serif">
              {CourseDefaults.heading}
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-600 md:text-base">
              {CourseDefaults.description}
            </p>
          </div>
          <div className="flex flex-col gap-3 rounded-sm border border-slate-200 bg-white p-4 text-xs md:text-sm md:min-w-[260px] shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <span className="text-slate-500">Course progress</span>
              <span className="font-medium text-slate-900">
                {progressPercent}% complete
              </span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-emerald-500 transition-all"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-slate-500">
              <span>
                <RxVideo className="mr-1 inline-block h-3 w-3" />
                {CourseDefaults.totalLectures} lectures
              </span>
              <span>
                <RxClock className="mr-1 inline-block h-3 w-3" />
                {CourseDefaults.totalHours} total
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              {remainingLectures === 0
                ? "You’ve watched every lecture in this course."
                : `You’re only ${remainingLectures} ${
                    remainingLectures === 1 ? "lecture" : "lectures"
                  } away from finishing.`}
            </p>
          </div>
        </div>

        {/* Main layout */}
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,2fr)]">
          {/* Left: curriculum */}
          <aside className="space-y-3 rounded-sm border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between gap-2">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
                Curriculum
              </p>
              <span className="text-[10px] text-slate-500">
                Click a lecture to start
              </span>
            </div>

            <div className="max-h-[560px] space-y-3 overflow-y-auto pr-1 text-xs md:text-sm">
              {modules.map((module, moduleIndex) => {
                const isModuleLocked = module.isLocked;
                const completedInModule = module.lectures.filter(
                  (_, lectureIndex) =>
                    completedLectures.has(
                      getLectureKey({ moduleIndex, lectureIndex })
                    )
                ).length;
                const moduleProgress =
                  module.lectures.length === 0
                    ? 0
                    : Math.round(
                        (completedInModule / module.lectures.length) * 100
                      );
                return (
                  <div
                    key={module.title}
                    className="space-y-1 rounded-sm border border-slate-200 bg-slate-50 p-2"
                  >
                    <button className="flex w-full items-center justify-between gap-2 rounded-sm bg-white px-2 py-2 text-left">
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
                      <RxChevronRight className="h-4 w-4 text-slate-400" />
                    </button>
                    <div className="flex items-center gap-2 px-1 pb-1 text-[11px] text-slate-500">
                      <div className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-slate-200">
                        <div
                          className="absolute inset-y-0 left-0 rounded-full bg-emerald-500"
                          style={{ width: `${moduleProgress}%` }}
                        />
                      </div>
                      <span>
                        {completedInModule}/{module.lectures.length} done
                      </span>
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
                                ? "bg-sky-50 border-l-sky-500"
                                : "border-l-transparent hover:bg-slate-50"
                            }`}
                            onClick={() =>
                              handleSelectLecture({ moduleIndex, lectureIndex })
                            }
                          >
                            <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-slate-200 text-[10px] bg-white">
                              {isCompleted ? (
                                <RxCheck className="h-4 w-4 text-emerald-500" />
                              ) : isActive ? (
                                <RxPlay className="h-3 w-3 text-sky-600" />
                              ) : (
                                <RxVideo className="h-3 w-3 text-slate-500" />
                              )}
                            </div>
                            <div className="min-w-0 flex-1 space-y-0.5">
                              <div className="flex items-center justify-between gap-2">
                                <p
                                  className={`truncate text-xs md:text-sm ${
                                    isActive
                                      ? "font-semibold text-slate-900"
                                      : "text-slate-700"
                                  }`}
                                >
                                  {lecture.title}
                                </p>
                                <span className="flex-shrink-0 text-[11px] text-slate-500">
                                  {lecture.duration}
                                </span>
                              </div>
                              <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
                                <span>{lecture.slideCount} slides</span>
                                {lecture.preview && (
                                  <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                                    Free preview
                                  </span>
                                )}
                                {isModuleLocked && !lecture.preview && (
                                  <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] text-slate-600">
                                    <RxLockClosed className="h-3 w-3" />
                                    Locked
                                  </span>
                                )}
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-2 flex items-center justify-between gap-3 rounded-sm border border-slate-200 bg-slate-50 px-3 py-2 text-[11px] text-slate-500">
              <span>
                Apply these insights to real economies, not just exam questions.
              </span>
              <span>
                {completedLectures.size} / {totalLectures} lectures
              </span>
            </div>
          </aside>

          {/* Right: player & lecture details */}
          <main className="space-y-4 md:space-y-5">
            {/* Player */}
            <div className="overflow-hidden rounded-sm border border-slate-200 bg-gradient-to-br from-slate-900 to-slate-950 shadow-xl">
              <div className="relative aspect-video w-full bg-black">
                <img
                  src={currentLecture.thumbnail}
                  alt={currentLecture.title}
                  className="h-full w-full object-cover opacity-70"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/20" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-slate-50">
                  <button className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm border border-white/20 transition hover:scale-105 hover:bg-white/20">
                    <RxPlay className="h-7 w-7 text-white" />
                  </button>
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-200/80 mb-2">
                    Now playing
                  </p>
                  <h2 className="max-w-2xl text-lg font-medium leading-snug text-slate-50 md:text-xl">
                    {currentLecture.title}
                  </h2>
                  <p className="mt-2 max-w-2xl text-xs text-slate-200/80 md:text-sm">
                    {currentLecture.description}
                  </p>
                  <div className="mt-3 flex flex-wrap items-center justify-center gap-3 text-[11px] text-slate-200/90">
                    <span className="inline-flex items-center gap-1 rounded-full bg-black/30 px-3 py-1">
                      <RxVideo className="h-3 w-3" />
                      <span>{CourseDefaults.totalLectures} lectures</span>
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-black/30 px-3 py-1">
                      <RxClock className="h-3 w-3" />
                      <span>{CourseDefaults.totalHours} total runtime</span>
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-black/30 px-3 py-1">
                      <span className="h-2 w-2 rounded-full bg-emerald-400" />
                      <span>{CourseDefaults.modules.length} modules</span>
                    </span>
                  </div>
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

              {/* Player controls */}
              <div className="flex flex-col gap-3 border-t border-slate-200 bg-white px-4 py-3 text-xs md:flex-row md:items-center md:justify-between md:text-sm">
                <div className="flex flex-wrap items-center gap-2 md:gap-3">
                  <Button
                    variant="primary"
                    className="flex items-center gap-2 border border-emerald-500/80 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-900 hover:bg-emerald-500/20 md:text-sm"
                    onClick={handleToggleComplete}
                  >
                    <RxCheck
                      className={`h-4 w-4 ${
                        isCurrentCompleted
                          ? "text-emerald-500"
                          : "text-slate-400"
                      }`}
                    />
                    {isCurrentCompleted ? "Completed" : "Mark as complete"}
                  </Button>
                </div>
                <div className="flex items-center justify-between gap-2 md:justify-end">
                  <Button
                    variant="secondary"
                    className="flex items-center gap-1 border border-slate-200 bg-white px-3 py-1 text-xs text-slate-700 hover:bg-slate-50 md:text-sm"
                    onClick={handlePrevLecture}
                  >
                    <RxChevronRight className="h-4 w-4 rotate-180" />
                    Previous
                  </Button>
                  <Button
                    variant="primary"
                    className="flex items-center gap-1 border border-slate-900/10 bg-slate-900 text-xs font-medium text-white hover:bg-slate-800 px-3 py-1 md:text-sm"
                    onClick={handleNextLecture}
                  >
                    Next lecture
                    <RxChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Instructor highlight */}
            <div className="flex items-center gap-3 rounded-sm border border-slate-200 bg-white p-4 shadow-sm">
              <img
                src="/proffesor.jpg"
                alt="Professor Richard Werner"
                className="h-14 w-14 rounded-full object-cover"
              />
              <div className="space-y-1 text-xs text-slate-600">
                <p className="text-sm font-semibold text-slate-900">
                  Professor Richard Werner
                </p>
                <p className="text-[11px] text-slate-600">
                  Economist and banking researcher known for his work on credit
                  creation and quantitative easing.
                </p>
                <button
                  type="button"
                  className="text-[11px] font-medium text-slate-900 underline underline-offset-2 hover:text-slate-700"
                >
                  View full instructor profile
                </button>
              </div>
            </div>

            {/* Lecture details & notes */}
            <div className="space-y-3 rounded-sm border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
                Lecture details & notes
              </p>
              <div className="space-y-2 text-xs text-slate-600 md:text-sm">
                <p className="font-medium text-slate-900">
                  {currentLecture.title}
                </p>
                <p className="text-slate-500">{currentLecture.description}</p>
                <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-slate-500">
                  <span>
                    <RxClock className="mr-1 inline-block h-3 w-3" />
                    {currentLecture.duration}
                  </span>
                  <span>
                    <RxVideo className="mr-1 inline-block h-3 w-3" />
                    {currentLecture.slideCount} slides
                  </span>
                </div>
                <div className="flex flex-wrap gap-1 pt-1">
                  {currentLecture.topics.map((topic) => (
                    <span
                      key={topic}
                      className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] uppercase tracking-[0.16em] text-slate-600"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
                {currentResources && (
                  <div className="mt-3 space-y-2 border-t border-slate-200 pt-3">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                      Additional info & files
                    </p>
                    {currentResources.summary && (
                      <p className="text-[11px] text-slate-600">
                        {currentResources.summary}
                      </p>
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
                                Open
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
                            Suggested readings & links
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
                )}
                <div className="mt-3 space-y-1 border-t border-slate-200 pt-3">
                  <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
                    Personal notes
                  </p>
                  <textarea
                    className="min-h-[96px] w-full rounded-sm border border-slate-200 bg-slate-50 p-2 text-xs text-slate-800 outline-none ring-0 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30 md:text-sm"
                    placeholder="Capture key insights, questions, or real-world examples you want to remember from this lecture."
                  />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </section>
  );
};
