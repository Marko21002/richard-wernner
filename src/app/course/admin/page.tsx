/* Admin panel UI for managing Professor Werner's courses.
 * This is front-end only (no real data persistence or APIs).
 */
"use client";

import { useState } from "react";
import Link from "next/link";
import { Footer } from "../../components/Footer";
import { CourseDefaults } from "../../components/Course";
import AdminNavbar from "../components/admin-navbar";
import { Button } from "@relume_io/relume-ui";
import {
  RxPlus,
  RxPencil2,
  RxUpload,
  RxDotsHorizontal,
  RxCheck,
  RxCross2,
} from "react-icons/rx";

type TabKey = "school" | "courses" | "products";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("school");
  const [selectedCourseId] = useState("banking-masterclass");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      <AdminNavbar />

      <main className="px-[5%] py-10 md:py-12 lg:py-16">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 lg:flex-row">
          {/* Sidebar */}
          <aside className="w-full max-w-xs rounded-sm border border-slate-200 bg-white p-4 shadow-sm lg:w-64">
            <div className="mb-4 space-y-1">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
                Admin
              </p>
              <h1 className="text-xl font-light text-slate-900 font-serif">
                Werner Finance Academy
              </h1>
              <p className="text-xs text-slate-500">
                High-level control panel for the school, courses, products and
                students.
              </p>
            </div>

            <nav className="space-y-3 text-sm">
              <div className="space-y-1">
                <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
                  School
                </p>
                <SidebarButton
                  label="School overview"
                  description="General metrics & school profile"
                  active={activeTab === "school"}
                  onClick={() => setActiveTab("school")}
                />
              </div>

              <div className="space-y-1 border-t border-slate-200 pt-3">
                <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
                  Courses
                </p>
                <SidebarButton
                  label="Courses overview"
                  description="Snapshot of all programmes"
                  active={activeTab === "courses"}
                  onClick={() => setActiveTab("courses")}
                />
              </div>

              <div className="space-y-1 border-t border-slate-200 pt-3">
                <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
                  Products
                </p>
                <SidebarButton
                  label="Digital products"
                  description="Workbooks, bundles & extras"
                  active={activeTab === "products"}
                  onClick={() => setActiveTab("products")}
                />
              </div>

              <div className="space-y-2 border-t border-slate-200 pt-3 text-xs text-slate-500">
                <p className="font-medium text-slate-600">Current course</p>
                <p className="text-slate-700">
                  Banking &amp; Finance Masterclass
                </p>
                <p className="text-[11px]">
                  ID: <span className="font-mono">{selectedCourseId}</span>
                </p>
                <div className="pt-2">
                  <p className="mb-1 text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
                    All students
                  </p>
                  <Link
                    href="/course/admin/manage"
                    className="inline-flex w-full items-center justify-center rounded-sm border border-slate-300 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-800 hover:bg-slate-100"
                  >
                    Open student list
                  </Link>
                </div>
              </div>
            </nav>
          </aside>

          {/* Main content */}
          <section className="flex-1 space-y-6">
            {activeTab === "school" && <SchoolOverviewPanel />}
            {activeTab === "courses" && <CoursesOverviewPanel />}
            {activeTab === "products" && <ProductsPanel />}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

const SidebarButton = ({
  label,
  description,
  active,
  onClick,
}: {
  label: string;
  description: string;
  active: boolean;
  onClick: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`w-full rounded-sm border px-3 py-2 text-left transition-colors ${
      active
        ? "border-slate-900 bg-slate-900 text-slate-50 shadow-sm"
        : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
    }`}
  >
    <p className="text-sm font-medium">{label}</p>
    <p
      className={`text-[11px] ${active ? "text-slate-200" : "text-slate-500"}`}
    >
      {description}
    </p>
  </button>
);

const SchoolOverviewPanel = () => {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
          School overview
        </p>
        <h2 className="text-2xl font-light text-slate-900 font-serif">
          Werner Finance Academy at a glance
        </h2>
        <p className="max-w-2xl text-sm text-slate-600">
          High-level summary of the school: reach, activity and commercial
          performance. This is a static UI preview – no live data is being
          changed.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard
          label="Enrolled students"
          value="1,250"
          helper="Across all programmes (sample data)"
        />
        <StatCard
          label="Active courses"
          value="1"
          helper="Banking & Finance Masterclass live"
        />
        <StatCard
          label="Annual revenue run rate"
          value="$420K"
          helper="Based on current pricing & volume (sample)"
        />
      </div>

      <div className="rounded-sm border border-slate-200 bg-white p-4 shadow-sm">
        <div className="mb-3 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
              School profile
            </p>
            <p className="text-sm text-slate-600">
              Core information that appears across the LMS, public website and
              student communication.
            </p>
          </div>
          <Button
            variant="secondary"
            className="flex items-center gap-2 border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-800 hover:bg-slate-100"
          >
            Review branding & copy (UI only)
          </Button>
        </div>

        <dl className="grid gap-4 md:grid-cols-2 text-xs text-slate-600">
          <div className="space-y-1">
            <dt className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
              School name
            </dt>
            <dd className="text-sm font-medium text-slate-900">
              Werner Finance Academy
            </dd>
          </div>
          <div className="space-y-1">
            <dt className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
              Primary instructor
            </dt>
            <dd className="text-sm font-medium text-slate-900">
              Professor Richard A. Werner
            </dd>
          </div>
          <div className="space-y-1">
            <dt className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
              Support email
            </dt>
            <dd>
              <a
                href="mailto:support@wernerfinance.academy"
                className="font-medium text-slate-900 underline underline-offset-2 hover:text-slate-700"
              >
                support@wernerfinance.academy
              </a>
            </dd>
          </div>
          <div className="space-y-1">
            <dt className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
              Default time zone
            </dt>
            <dd className="text-sm font-medium text-slate-900">
              Europe/London (sample)
            </dd>
          </div>
        </dl>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2 rounded-sm border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
            Communications
          </p>
          <p className="text-sm text-slate-700">
            Control the high-level messaging that appears in onboarding emails,
            receipts and student dashboard welcome copy.
          </p>
          <p className="text-[11px] text-slate-500">
            In a future version, this section will let you edit default email
            templates and announcements for all courses.
          </p>
        </div>
        <div className="space-y-2 rounded-sm border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
            Compliance & policies
          </p>
          <p className="text-sm text-slate-700">
            Track the links to your terms, privacy policy and refund policy that
            are surfaced to students.
          </p>
          <p className="text-[11px] text-slate-500">
            This is UI only – hook this up to your legal pages and consent
            tracking in production.
          </p>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({
  label,
  value,
  helper,
}: {
  label: string;
  value: string;
  helper: string;
}) => (
  <div className="rounded-sm border border-slate-200 bg-white p-4 shadow-sm">
    <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
      {label}
    </p>
    <p className="mt-2 text-2xl font-light text-slate-900 font-serif">
      {value}
    </p>
    <p className="mt-1 text-xs text-slate-500">{helper}</p>
  </div>
);

const CoursesOverviewPanel = () => {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
          Courses overview
        </p>
        <h2 className="text-2xl font-light text-slate-900 font-serif">
          Courses at a glance
        </h2>
        <p className="max-w-2xl text-sm text-slate-600">
          High-level summary of Professor Werner&apos;s online programmes. This
          is a static UI preview – no live data is being changed.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard
          label="Active courses"
          value="1"
          helper="Banking & Finance Masterclass"
        />
        <StatCard
          label="Total modules"
          value={CourseDefaults.modules.length.toString()}
          helper="In this course"
        />
        <StatCard
          label="Total lectures"
          value={CourseDefaults.totalLectures.toString()}
          helper={CourseDefaults.totalHours + " of content"}
        />
      </div>

      <div className="space-y-4 rounded-sm border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
              Courses
            </p>
            <p className="text-sm text-slate-600">
              Create and manage courses in your school.
            </p>
          </div>
          <Button
            variant="primary"
            className="flex items-center gap-2 border border-slate-900/10 bg-slate-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-slate-800"
          >
            <RxPlus className="h-4 w-4" />
            New course (UI only)
          </Button>
        </div>

        {/* Top controls, similar to Teachable: filter, search, sort */}
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              className="inline-flex items-center gap-1 rounded-sm border border-slate-300 bg-slate-50 px-3 py-1.5 text-[11px] font-medium text-slate-800 hover:bg-slate-100"
            >
              Filter
            </button>
            <div className="relative">
              <input
                type="text"
                placeholder="Search for courses"
                className="w-56 rounded-sm border border-slate-300 bg-white px-3 py-1.5 text-xs text-slate-900 outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900/10"
              />
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              className="inline-flex items-center gap-1 rounded-sm border border-slate-300 bg-slate-50 px-3 py-1.5 text-[11px] font-medium text-slate-800 hover:bg-slate-100"
            >
              Catalog order
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-1 rounded-sm border border-slate-300 bg-slate-50 px-3 py-1.5 text-[11px] font-medium text-slate-800 hover:bg-slate-100"
            >
              Status
            </button>
          </div>
        </div>

        {/* Courses table, inspired by the Teachable screenshot */}
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse text-left text-xs text-slate-700">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-[11px] uppercase tracking-[0.16em] text-slate-500">
                <th className="px-3 py-2 font-medium">Thumbnail</th>
                <th className="px-3 py-2 font-medium">Name</th>
                <th className="px-3 py-2 font-medium">Author</th>
                <th className="px-3 py-2 font-medium">Creation date</th>
                <th className="px-3 py-2 font-medium">Sales</th>
                <th className="px-3 py-2 font-medium">Enrollments</th>
                <th className="px-3 py-2 font-medium">Status</th>
                <th className="px-3 py-2 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100 last:border-b-0">
                <td className="px-3 py-2">
                  <div className="h-12 w-20 overflow-hidden rounded-sm border border-slate-200 bg-slate-100" />
                </td>
                <td className="px-3 py-2 text-xs text-slate-900">
                  <Link
                    href="/course/admin/banking-masterclass/edit"
                    className="text-xs font-medium text-slate-900 underline underline-offset-2 hover:text-slate-700"
                  >
                    {CourseDefaults.heading}
                  </Link>
                </td>
                <td className="px-3 py-2 text-xs text-slate-700">
                  Professor Richard A. Werner
                </td>
                <td className="px-3 py-2 text-[11px] text-slate-500">
                  11 Nov 25
                </td>
                <td className="px-3 py-2 text-[11px] text-slate-600">$0.00</td>
                <td className="px-3 py-2 text-[11px] text-slate-600">0</td>
                <td className="px-3 py-2 text-[11px]">
                  <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] font-medium text-slate-700">
                    Unpublished
                  </span>
                </td>
                <td className="px-3 py-2 text-right text-[11px]">
                  <div className="inline-flex items-center gap-2">
                    <Link
                      href="/course/admin/banking-masterclass/edit"
                      className="rounded-sm border border-slate-200 bg-slate-50 px-2 py-1 text-[11px] font-medium text-slate-800 hover:bg-slate-100"
                    >
                      Edit course
                    </Link>
                    <Link
                      href="/course/admin/banking-masterclass/curriculum"
                      className="rounded-sm border border-slate-200 bg-white px-2 py-1 text-[11px] font-medium text-slate-700 hover:bg-slate-50"
                    >
                      Curriculum
                    </Link>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex flex-col items-start justify-between gap-2 pt-2 text-[11px] text-slate-500 md:flex-row md:items-center">
          <p>
            0 / 0 products published ·{" "}
            <span className="cursor-default underline-offset-2 hover:underline">
              Upgrade
            </span>
          </p>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <span>Results per page</span>
              <select className="rounded-sm border border-slate-300 bg-white px-1.5 py-0.5 text-[11px] text-slate-800 outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900/10">
                <option>20</option>
                <option>50</option>
                <option>100</option>
              </select>
            </div>
            <p>Showing 1–1 of 1</p>
          </div>
        </div>
      </div>

      {/* Optional: keep card preview section as a marketing-style overview */}
      <div className="rounded-sm border border-slate-200 bg-white p-4 shadow-sm">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
          Course card preview
        </p>
        <div className="grid gap-3 md:grid-cols-2">
          <CourseAdminCard />
          <PlaceholderCourseCard />
        </div>
      </div>
    </div>
  );
};

const CourseAdminCard = () => {
  return (
    <div className="flex flex-col justify-between gap-3 rounded-sm border border-slate-200 bg-slate-50/70 p-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-emerald-700">
            Live
          </p>
          <h3 className="mt-1 text-sm font-medium text-slate-900">
            {CourseDefaults.heading}
          </h3>
          <p className="mt-1 line-clamp-2 text-xs text-slate-600">
            {CourseDefaults.description}
          </p>
        </div>
        <button
          type="button"
          className="rounded-full border border-slate-200 bg-white p-1 text-slate-500 hover:bg-slate-100"
        >
          <RxDotsHorizontal className="h-4 w-4" />
        </button>
      </div>

      <dl className="grid grid-cols-3 gap-2 text-[11px] text-slate-600">
        <div>
          <dt className="text-slate-500">Price</dt>
          <dd className="font-medium text-slate-900">{CourseDefaults.price}</dd>
        </div>
        <div>
          <dt className="text-slate-500">Lectures</dt>
          <dd className="font-medium text-slate-900">
            {CourseDefaults.totalLectures}
          </dd>
        </div>
        <div>
          <dt className="text-slate-500">Certificate</dt>
          <dd className="font-medium text-slate-900">
            {CourseDefaults.certificateIncluded ? "Included" : "None"}
          </dd>
        </div>
      </dl>

      <div className="flex flex-wrap items-center gap-2">
        <Button
          variant="primary"
          className="flex items-center gap-2 border border-slate-900/10 bg-slate-900 px-3 py-1 text-[11px] font-medium text-white hover:bg-slate-800"
        >
          <RxPencil2 className="h-3.5 w-3.5" />
          Edit content
        </Button>
        <Button
          variant="secondary"
          className="border border-slate-200 bg-white px-3 py-1 text-[11px] text-slate-700 hover:bg-slate-50"
        >
          View in LMS
        </Button>
      </div>
    </div>
  );
};

const PlaceholderCourseCard = () => (
  <div className="flex flex-col justify-between gap-3 rounded-sm border border-dashed border-slate-300 bg-slate-50 p-4 text-xs text-slate-500">
    <p className="font-medium text-slate-700">Future course</p>
    <p>
      This block represents an additional programme (for example, a short policy
      masterclass or regional case study series).
    </p>
    <div className="flex items-center gap-2">
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-500">
        <RxPlus className="h-4 w-4" />
      </span>
      <span>
        Click &ldquo;Create new course&rdquo; to configure it (UI only).
      </span>
    </div>
  </div>
);

const EditCoursePanel = () => {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
          Edit course
        </p>
        <h2 className="text-2xl font-light text-slate-900 font-serif">
          Banking &amp; Finance Masterclass
        </h2>
        <p className="max-w-2xl text-sm text-slate-600">
          UI for editing the core course configuration: title, pricing, modules
          and assets. This panel does not currently save anything.
        </p>
      </header>

      <div className="space-y-4 rounded-sm border border-slate-200 bg-white p-4 shadow-sm">
        <h3 className="text-sm font-medium text-slate-900">
          Basic course details
        </h3>
        <div className="grid gap-3 md:grid-cols-2">
          <Field label="Course title">
            <input
              className="w-full rounded-sm border border-slate-300 bg-white px-2 py-1.5 text-sm text-slate-900 outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900/10"
              defaultValue={CourseDefaults.heading}
            />
          </Field>
          <Field label="Tagline">
            <input
              className="w-full rounded-sm border border-slate-300 bg-white px-2 py-1.5 text-sm text-slate-900 outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900/10"
              defaultValue={CourseDefaults.tagline}
            />
          </Field>
        </div>

        <Field label="Short description">
          <textarea
            className="w-full rounded-sm border border-slate-300 bg-white px-2 py-1.5 text-sm text-slate-900 outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900/10"
            rows={3}
            defaultValue={CourseDefaults.description}
          />
        </Field>

        <div className="grid gap-3 md:grid-cols-3">
          <Field label="Price">
            <input
              className="w-full rounded-sm border border-slate-300 bg-white px-2 py-1.5 text-sm text-slate-900 outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900/10"
              defaultValue={CourseDefaults.price}
            />
          </Field>
          <Field label="Original price">
            <input
              className="w-full rounded-sm border border-slate-300 bg-white px-2 py-1.5 text-sm text-slate-900 outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900/10"
              defaultValue={CourseDefaults.originalPrice}
            />
          </Field>
          <Field label="Price description">
            <input
              className="w-full rounded-sm border border-slate-300 bg-white px-2 py-1.5 text-sm text-slate-900 outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900/10"
              defaultValue={CourseDefaults.priceDescription}
            />
          </Field>
        </div>
      </div>

      <div className="space-y-4 rounded-sm border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-sm font-medium text-slate-900">
            Modules &amp; structure
          </h3>
          <Button
            variant="secondary"
            className="flex items-center gap-1 border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-700 hover:bg-slate-100"
          >
            <RxPlus className="h-3 w-3" />
            Add module
          </Button>
        </div>
        <p className="text-xs text-slate-500">
          Preview of modules derived from the current course configuration. In a
          real admin, this would be fully editable.
        </p>

        <div className="space-y-3">
          {CourseDefaults.modules.map((module, index) => (
            <div
              key={module.title}
              className="rounded-sm border border-slate-200 bg-slate-50 p-3"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
                    Module {index + 1}
                  </p>
                  <p className="text-sm font-medium text-slate-900">
                    {module.title}
                  </p>
                  <p className="mt-1 line-clamp-2 text-xs text-slate-600">
                    {module.description}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1 text-[11px] text-slate-600">
                  <span>{module.lectures.length} lectures</span>
                  {module.isLocked && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-medium text-amber-700">
                      <RxLockIcon /> Premium
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Button
          variant="primary"
          className="flex items-center gap-2 border border-emerald-600/10 bg-emerald-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-emerald-500"
        >
          <RxCheck className="h-4 w-4" />
          Save changes (UI only)
        </Button>
        <Button
          variant="secondary"
          className="flex items-center gap-2 border border-slate-200 bg-white px-4 py-1.5 text-sm text-slate-700 hover:bg-slate-50"
        >
          <RxCross2 className="h-4 w-4" />
          Discard
        </Button>
        <p className="text-xs text-slate-500">
          This page is currently a visual prototype – saving does not update any
          real data.
        </p>
      </div>
    </div>
  );
};

const Field = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <label className="space-y-1 text-xs text-slate-600">
    <span className="block text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
      {label}
    </span>
    {children}
  </label>
);

const RxLockIcon = () => (
  <span className="inline-block h-3 w-3 rounded-[2px] border border-amber-500 bg-amber-100" />
);

const ProductsPanel = () => {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
          Digital products (coming soon)
        </p>
        <h2 className="text-2xl font-light text-slate-900 font-serif">
          Workbooks, bundles &amp; add-ons
        </h2>
        <p className="max-w-2xl text-sm text-slate-600">
          This section will eventually let you attach workbooks, Q&amp;A
          replays and other extras to your courses. For now it&apos;s a visual
          preview and not part of the core admin workflow.
        </p>
      </header>

      <div className="rounded-sm border border-dashed border-slate-300 bg-slate-50 p-4 text-xs text-slate-600">
        <p className="mb-1 text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
          Roadmap
        </p>
        <p>
          In a future release, this area will power digital add-ons that plug
          into your checkout and LMS. For now, focus on your{" "}
          <span className="font-medium text-slate-900">
            school overview and courses
          </span>{" "}
          tabs above.
        </p>
      </div>
    </div>
  );
};

const CreateCoursePanel = () => {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
          Create new course
        </p>
        <h2 className="text-2xl font-light text-slate-900 font-serif">
          Draft a new programme
        </h2>
        <p className="max-w-2xl text-sm text-slate-600">
          Use this form to outline a new course concept, upload key assets and
          define its basic structure. This is UI only – it will not persist any
          data yet.
        </p>
      </header>

      <div className="space-y-4 rounded-sm border border-slate-200 bg-white p-4 shadow-sm">
        <div className="grid gap-3 md:grid-cols-2">
          <Field label="Working title">
            <input
              className="w-full rounded-sm border border-slate-300 bg-white px-2 py-1.5 text-sm text-slate-900 outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900/10"
              placeholder="e.g. Regional Monetary Systems & Case Studies"
            />
          </Field>
          <Field label="Slug / ID">
            <input
              className="w-full rounded-sm border border-slate-300 bg-white px-2 py-1.5 text-sm text-slate-900 outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900/10"
              placeholder="e.g. regional-monetary-systems"
            />
          </Field>
        </div>

        <Field label="Short public description">
          <textarea
            className="w-full rounded-sm border border-slate-300 bg-white px-2 py-1.5 text-sm text-slate-900 outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900/10"
            rows={3}
            placeholder="Describe the main promise and audience for this course."
          />
        </Field>

        <div className="grid gap-3 md:grid-cols-3">
          <Field label="Planned price">
            <input
              className="w-full rounded-sm border border-slate-300 bg-white px-2 py-1.5 text-sm text-slate-900 outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900/10"
              placeholder="$297"
            />
          </Field>
          <Field label="Estimated total lectures">
            <input
              className="w-full rounded-sm border border-slate-300 bg-white px-2 py-1.5 text-sm text-slate-900 outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900/10"
              placeholder="e.g. 18"
            />
          </Field>
          <Field label="Estimated total hours">
            <input
              className="w-full rounded-sm border border-slate-300 bg-white px-2 py-1.5 text-sm text-slate-900 outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900/10"
              placeholder="e.g. 6 hours"
            />
          </Field>
        </div>
      </div>

      <div className="space-y-4 rounded-sm border border-slate-200 bg-white p-4 shadow-sm">
        <h3 className="text-sm font-medium text-slate-900">
          Media &amp; files
        </h3>
        <p className="text-xs text-slate-500">
          Upload hero image, intro video placeholder and any reference
          documents. These controls are UI only.
        </p>

        <div className="grid gap-4 md:grid-cols-2">
          <UploadField label="Hero image (thumbnail)">
            <UploadButton />
          </UploadField>
          <UploadField label="Intro video placeholder">
            <UploadButton />
          </UploadField>
          <UploadField label="Syllabus / outline (PDF)">
            <UploadButton />
          </UploadField>
          <UploadField label="Supporting readings bundle (.zip)">
            <UploadButton />
          </UploadField>
        </div>
      </div>

      <div className="space-y-4 rounded-sm border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-sm font-medium text-slate-900">
            Skeleton structure
          </h3>
          <Button
            variant="secondary"
            className="flex items-center gap-1 border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-700 hover:bg-slate-100"
          >
            <RxPlus className="h-3 w-3" />
            Add module row
          </Button>
        </div>
        <p className="text-xs text-slate-500">
          Roughly sketch the first few modules you expect to include. This helps
          plan the scope and marketing copy.
        </p>

        <div className="space-y-2 text-xs text-slate-600">
          <div className="grid grid-cols-[1.5fr,1fr,0.8fr] gap-2 rounded-sm border border-slate-200 bg-slate-50 px-2 py-1.5 font-medium text-[11px] uppercase tracking-[0.16em] text-slate-500">
            <span>Module title</span>
            <span>Target lectures</span>
            <span>Premium?</span>
          </div>
          {[1, 2, 3].map((row) => (
            <div
              key={row}
              className="grid grid-cols-[1.5fr,1fr,0.8fr] gap-2 rounded-sm border border-slate-200 bg-white px-2 py-1.5"
            >
              <input
                className="w-full rounded-sm border border-slate-200 bg-slate-50 px-2 py-1 text-xs text-slate-800 outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900/10"
                placeholder={`Module ${row} title`}
              />
              <input
                className="w-full rounded-sm border border-slate-200 bg-slate-50 px-2 py-1 text-xs text-slate-800 outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900/10"
                placeholder="e.g. 4 lectures"
              />
              <select className="w-full rounded-sm border border-slate-200 bg-slate-50 px-1.5 py-1 text-xs text-slate-800 outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900/10">
                <option>Included</option>
                <option>Premium-only</option>
              </select>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Button
          variant="primary"
          className="flex items-center gap-2 border border-slate-900/10 bg-slate-900 px-4 py-1.5 text-sm font-medium text-white hover:bg-slate-800"
        >
          <RxCheck className="h-4 w-4" />
          Save draft (UI only)
        </Button>
        <Button
          variant="secondary"
          className="flex items-center gap-2 border border-slate-200 bg-white px-4 py-1.5 text-sm text-slate-700 hover:bg-slate-50"
        >
          <RxCross2 className="h-4 w-4" />
          Clear form
        </Button>
        <p className="text-xs text-slate-500">
          In a real admin, this would create a new course entry ready for review
          and publishing.
        </p>
      </div>
    </div>
  );
};

const UploadField = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <div className="space-y-1 text-xs text-slate-600">
    <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
      {label}
    </p>
    {children}
  </div>
);

const UploadButton = () => (
  <button
    type="button"
    className="flex w-full items-center justify-between gap-2 rounded-sm border border-dashed border-slate-300 bg-slate-50 px-3 py-2 text-[11px] text-slate-600 hover:bg-slate-100"
  >
    <span className="flex items-center gap-2">
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-slate-300 bg-white">
        <RxUpload className="h-4 w-4 text-slate-600" />
      </span>
      <span>Click to upload (UI only)</span>
    </span>
    <span className="text-[10px] text-slate-500">PDF, JPG, MP4, ZIP</span>
  </button>
);
