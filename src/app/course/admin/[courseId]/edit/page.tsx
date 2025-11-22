"use client";

import { useState, useRef, useEffect, use } from "react";
import Image from "next/image";
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

export default function AdminEditCoursePage({ params }: Props) {
  const { courseId } = use(params);
  const finalCourseId = courseId || "banking-masterclass";
  const courseTitle = CourseDefaults.heading;
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setUploadError("Please select an image file");
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setUploadError("File size must be less than 10MB");
      return;
    }

    setIsUploading(true);
    setUploadError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(`/api/course/${finalCourseId}/thumbnail`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to upload image");
      }

      const data = await response.json();
      console.log("[Upload] Received URL:", data.url);
      setThumbnailUrl(data.url);
    } catch (error) {
      setUploadError(
        error instanceof Error ? error.message : "Failed to upload image"
      );
    } finally {
      setIsUploading(false);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  // Load existing thumbnail on mount
  useEffect(() => {
    const loadThumbnail = async () => {
      try {
        const response = await fetch(`/api/course/${finalCourseId}/thumbnail`);
        if (response.ok) {
          const data = await response.json();
          console.log("[Load] Thumbnail data:", data);
          if (data.thumbnailUrl) {
            console.log("[Load] Setting thumbnail URL:", data.thumbnailUrl);
            setThumbnailUrl(data.thumbnailUrl);
          }
        }
      } catch (error) {
        console.error("Error loading thumbnail:", error);
      }
    };

    loadThumbnail();
  }, [finalCourseId]);

  // Debug: Log when thumbnailUrl changes
  useEffect(() => {
    if (thumbnailUrl) {
      console.log("[State] Thumbnail URL changed to:", thumbnailUrl);
    }
  }, [thumbnailUrl]);

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
              <p className="text-[11px] text-slate-500">
                Course ID: <span className="font-mono">{finalCourseId}</span>
              </p>
            </div>
          </header>

          <div className="flex flex-col gap-6 lg:flex-row">
            <CourseAdminSidebar courseId={finalCourseId} />

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
                      <button
                        onClick={handleUploadClick}
                        disabled={isUploading}
                        className="text-[11px] font-medium text-slate-800 underline underline-offset-2 hover:text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isUploading ? "Uploading..." : "Edit image"}
                      </button>
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                    <div className="relative h-32 w-full overflow-hidden rounded-sm border border-slate-200 bg-slate-100">
                      {thumbnailUrl ? (
                        <img
                          src={thumbnailUrl}
                          alt="Course thumbnail"
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            console.error(
                              "[Image] Error loading:",
                              thumbnailUrl,
                              e
                            );
                            console.error("[Image] Error event:", e);
                          }}
                          onLoad={() => {
                            console.log(
                              "[Image] Successfully loaded:",
                              thumbnailUrl
                            );
                          }}
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-xs text-slate-400">
                          No thumbnail uploaded
                        </div>
                      )}
                      {isUploading && (
                        <div className="absolute inset-0 z-10 flex items-center justify-center bg-slate-900/50">
                          <div className="text-xs text-white">Uploading...</div>
                        </div>
                      )}
                    </div>
                    {uploadError && (
                      <p className="text-[11px] text-red-600">{uploadError}</p>
                    )}
                    <p className="text-[11px] text-slate-500">
                      This image will appear in the catalog, checkout and
                      student dashboard. Recommended size: 1280x720px (16:9
                      aspect ratio).
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
                        href={`/course/admin/${finalCourseId}/curriculum`}
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
