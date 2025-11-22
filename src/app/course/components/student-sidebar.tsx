"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type FormEvent } from "react";

const linkBaseClasses =
  "block rounded-sm px-3 py-2 text-xs transition-colors hover:bg-slate-50";

const linkActiveClasses =
  "bg-slate-900 text-slate-50 hover:bg-slate-800 font-medium";

const linkInactiveClasses = "text-slate-800";

export const StudentSidebar = () => {
  const pathname = usePathname();
  const [isSupportOpen, setIsSupportOpen] = useState(false);

  const isDashboard = pathname === "/course/student";
  const isSettings = pathname === "/course/settings";
  const isBilling = pathname === "/course/billing";

  return (
    <aside className="w-full max-w-xs space-y-4 rounded-sm border border-slate-200 bg-white p-4 text-xs text-slate-600 shadow-sm lg:w-72">
      <div className="space-y-1">
        <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
          Account
        </p>
        <div className="space-y-1.5">
          <Link
            href="/course/student"
            className={`${linkBaseClasses} ${
              isDashboard ? linkActiveClasses : linkInactiveClasses
            }`}
          >
            Dashboard
          </Link>
          <Link
            href="/course/settings"
            className={`${linkBaseClasses} ${
              isSettings ? linkActiveClasses : linkInactiveClasses
            }`}
          >
            Settings &amp; profile
          </Link>
          <Link
            href="/course/billing"
            className={`${linkBaseClasses} ${
              isBilling ? linkActiveClasses : linkInactiveClasses
            }`}
          >
            Billing &amp; receipts
          </Link>
        </div>
      </div>

      <div className="space-y-2 border-t border-slate-200 pt-3">
        <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
          Support
        </p>
        <p className="text-[11px] text-slate-600">
          Questions about access or payments? Open the support panel to see
          contact details and send a message.
        </p>
        <button
          type="button"
          onClick={() => setIsSupportOpen((open) => !open)}
          className="inline-flex w-full items-center justify-center rounded-sm border border-slate-300 bg-slate-50 px-3 py-1.5 text-[11px] font-medium text-slate-800 hover:bg-slate-100"
        >
          {isSupportOpen ? "Hide support details" : "Contact support"}
        </button>
        {isSupportOpen && (
          <div className="space-y-2 pt-2">
            <p className="text-[11px] text-slate-600">
              Email:{" "}
              <a
                href="mailto:support@wernerfinance.academy"
                className="font-medium text-slate-900 underline underline-offset-2 hover:text-slate-700"
              >
                support@wernerfinance.academy
              </a>
            </p>
            <p className="text-[11px] text-slate-600">
              We usually respond within 1–2 business days. Please include the
              email you used at checkout and any relevant details.
            </p>
            <SupportForm />
          </div>
        )}
      </div>
    </aside>
  );
};

const SupportForm = () => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const subject =
      (formData.get("subject") as string | null) ??
      "Werner Finance Academy – course support";
    const message = (formData.get("message") as string | null) ?? "";

    const mailto = `mailto:support@wernerfinance.academy?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(message)}`;

    window.location.href = mailto;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 text-[11px]">
      <div className="space-y-1">
        <label className="block text-[10px] font-medium uppercase tracking-[0.16em] text-slate-500">
          Subject
        </label>
        <input
          name="subject"
          type="text"
          placeholder="Access or billing question"
          className="w-full rounded-sm border border-slate-300 bg-white px-2 py-1 text-[11px] text-slate-900 outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900/10"
        />
      </div>
      <div className="space-y-1">
        <label className="block text-[10px] font-medium uppercase tracking-[0.16em] text-slate-500">
          Message
        </label>
        <textarea
          name="message"
          rows={3}
          placeholder="Briefly describe the issue you’re having with course access or payments."
          className="w-full rounded-sm border border-slate-300 bg-white px-2 py-1 text-[11px] text-slate-900 outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900/10"
        />
      </div>
      <button
        type="submit"
        className="inline-flex w-full items-center justify-center rounded-sm border border-slate-900/10 bg-slate-900 px-3 py-1.5 text-[11px] font-medium text-slate-50 hover:bg-slate-800"
      >
        Open email to support
      </button>
      <p className="text-[10px] text-slate-500">
        This will open your email app with everything filled in so you can
        review and send it.
      </p>
    </form>
  );
};

export default StudentSidebar;
