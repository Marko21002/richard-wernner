"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  courseId: string;
};

export const CourseAdminSidebar = ({ courseId }: Props) => {
  const pathname = usePathname();
  const base = `/course/admin/${courseId}`;

  const items = [
    {
      key: "dashboard",
      label: "← Back to admin dashboard",
      href: `/course/admin`,
      description: "Return to school & courses overview",
    },
    {
      key: "setup",
      label: "Setup guide",
      href: `${base}/edit`,
      description: "Overview, pricing & purchase flow",
    },
    {
      key: "curriculum",
      label: "Curriculum",
      href: `${base}/curriculum`,
      description: "Sections and lessons",
    },
    {
      key: "students",
      label: "Students",
      href: `${base}/students`,
      description: "Enrollments and access",
    },
  ] as const;

  const getIsActive = (
    itemHref: string,
    key: (typeof items)[number]["key"]
  ) => {
    if (!pathname) return false;

    if (key === "dashboard") {
      return pathname === itemHref;
    }

    if (key === "setup") {
      return pathname === itemHref;
    }

    if (key === "curriculum") {
      return (
        pathname === itemHref ||
        pathname.startsWith(`${base}/curriculum`) ||
        pathname.includes("/lessons/")
      );
    }

    if (key === "students") {
      return pathname.startsWith(`${base}/students`);
    }

    return pathname === itemHref;
  };

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
          const isActive = getIsActive(item.href, item.key);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`block w-full rounded-sm border px-3 py-2 text-left text-xs transition-colors ${
                isActive
                  ? "border-slate-900 bg-slate-900 text-slate-50 shadow-sm"
                  : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
              }`}
            >
              <p className="text-sm font-medium">{item.label}</p>
              <p
                className={`text-[11px] ${
                  isActive ? "text-slate-200" : "text-slate-500"
                }`}
              >
                {item.description}
              </p>
            </Link>
          );
        })}
        <span className="ml-auto text-[11px] text-slate-500">
          Course ID: <span className="font-mono">{courseId}</span>
        </span>
      </nav>
    </aside>
  );
};

export default CourseAdminSidebar;
