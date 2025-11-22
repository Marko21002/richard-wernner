"use client";

import { useState, use, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Navbar2 } from "../../../../../../components/Navbar2";
import { Footer } from "../../../../../../components/Footer";
import { CourseDefaults } from "../../../../../../components/Course";
import { Button } from "@relume_io/relume-ui";
import RichTextEditor from "./RichTextEditor";

interface UploadedFile {
  url: string;
  fileName: string;
  fileSize: number;
  contentType: string;
  key: string;
}

type Props = {
  params: Promise<{
    courseId: string;
    moduleIndex: string;
    lessonIndex: string;
  }>;
};

export default function AdminLessonEditPage({ params }: Props) {
  const { courseId, moduleIndex: moduleIndexStr, lessonIndex: lessonIndexStr } =
    use(params);
  const moduleIndex = Number(moduleIndexStr) || 0;
  const lessonIndex = Number(lessonIndexStr) || 0;

  const module = CourseDefaults.modules[moduleIndex];
  const lesson = module?.lectures[lessonIndex];

  const safeModuleTitle = module?.title ?? `Section ${moduleIndex + 1}`;
  const safeLessonTitle = lesson?.title ?? "Selected lesson";

  const initialContent =
    lesson?.description ??
    "<p>Start writing your lesson content here. Use headings, bullet points and examples to make the material clear for students.</p>";

  const [content, setContent] = useState(initialContent);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  // Load existing lesson data
  useEffect(() => {
    const loadLesson = async () => {
      try {
        const response = await fetch(
          `/api/lesson/${courseId}/${moduleIndex}/${lessonIndex}`
        );
        if (response.ok) {
          const data = await response.json();
          console.log("Loaded lesson data:", data);
          // Always set content, even if null (to clear default content)
          if (data.content !== null && data.content !== undefined) {
            setContent(data.content);
          } else {
            // If no saved content, keep the initial content
            // Don't overwrite with initialContent again to avoid resetting
          }
          if (data.files && Array.isArray(data.files) && data.files.length > 0) {
            setUploadedFiles(data.files);
          } else {
            // Clear files if none exist
            setUploadedFiles([]);
          }
        } else {
          console.error("Failed to load lesson:", response.status, response.statusText);
        }
      } catch (error) {
        console.error("Error loading lesson:", error);
      } finally {
        setLoading(false);
      }
    };

    loadLesson();
  }, [courseId, moduleIndex, lessonIndex]);

  const handleFileUpload = async (file: File) => {
    if (!file) return;

    setUploading(true);
    setUploadError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(
        `/api/lesson/${courseId}/${moduleIndex}/${lessonIndex}/file`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to upload file");
      }

      const data = await response.json();
      setUploadedFiles((prev) => [...prev, data]);
      
      // Insert file link into rich text editor
      const fileLink = `<a href="${data.url}" target="_blank" rel="noopener noreferrer">${data.fileName}</a>`;
      setContent((prev) => prev + `<p>${fileLink}</p>`);
    } catch (error) {
      setUploadError(
        error instanceof Error ? error.message : "Failed to upload file"
      );
    } finally {
      setUploading(false);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
  };

  const handleRemoveFile = (fileToRemove: UploadedFile) => {
    // Remove file from the list
    setUploadedFiles((prev) => prev.filter((file) => file.key !== fileToRemove.key));
    
    // Remove file link from content if it exists
    // This is a simple approach - remove any link that matches the file URL
    const fileUrlPattern = new RegExp(`<a[^>]*href=["']${fileToRemove.url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["'][^>]*>.*?</a>`, 'gi');
    setContent((prev) => prev.replace(fileUrlPattern, ''));
  };

  const handleSave = async () => {
    setSaving(true);
    setSaveSuccess(false);
    setUploadError(null);

    try {
      const payload = {
        content,
        files: uploadedFiles,
      };
      console.log("Saving lesson:", payload);

      const response = await fetch(
        `/api/lesson/${courseId}/${moduleIndex}/${lessonIndex}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        console.error("Save error:", error);
        throw new Error(error.error || "Failed to save lesson");
      }

      const result = await response.json();
      console.log("Save successful:", result);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error("Save failed:", error);
      setUploadError(
        error instanceof Error ? error.message : "Failed to save lesson"
      );
    } finally {
      setSaving(false);
    }
  };

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
                  onClick={handleSave}
                  disabled={saving || loading}
                  className="border border-emerald-600/10 bg-emerald-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {saving ? "Saving..." : saveSuccess ? "Saved!" : "Save changes"}
                </Button>
                {saveSuccess && (
                  <span className="text-xs text-emerald-600">Changes saved successfully</span>
                )}
              </div>
            </div>
          </header>

          <div className="flex flex-col gap-6 lg:flex-row">
            <CourseAdminSidebar courseId={courseId} />

            <div className="flex-1">
              <div className="space-y-4 rounded-sm border border-slate-200 bg-white p-4 shadow-sm">
                <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-3">
                  <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
                    Lesson content
                  </p>
                  <button className="inline-flex items-center gap-1 rounded-sm border border-slate-300 bg-slate-50 px-3 py-1.5 text-[11px] font-medium text-slate-800 hover:bg-slate-100">
                    Published
                  </button>
                </div>

                <p className="text-xs text-slate-500">
                  Create your lesson content with rich text formatting. Add text,
                  images, videos, and file links using the toolbar buttons.
                </p>

                <RichTextEditor
                  content={content}
                  onChange={setContent}
                  placeholder="Start writing your lesson content here. Use headings, bullet points, images, videos, and file links to create engaging content for students."
                />

                {/* File Upload Section */}
                <div className="space-y-3 border-t border-slate-200 pt-4">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
                      File Uploads
                    </p>
                  </div>
                  <p className="text-xs text-slate-500">
                    Upload files (PDFs, documents, images, etc.) to attach to this lesson. Files will be stored in S3.
                  </p>
                  
                  <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    className="rounded-sm border-2 border-dashed border-slate-300 bg-slate-50 p-6 text-center transition-colors hover:border-slate-400"
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      onChange={handleFileInputChange}
                      className="hidden"
                      disabled={uploading}
                    />
                    <div className="space-y-2">
                      <p className="text-sm text-slate-600">
                        Drag and drop files here, or{" "}
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          disabled={uploading}
                          className="text-emerald-600 underline hover:text-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          browse
                        </button>
                      </p>
                      <p className="text-xs text-slate-500">
                        Maximum file size: 50MB
                      </p>
                    </div>
                    {uploading && (
                      <p className="mt-2 text-xs text-slate-600">Uploading...</p>
                    )}
                    {uploadError && (
                      <p className="mt-2 text-xs text-red-600">{uploadError}</p>
                    )}
                  </div>

                  {uploadedFiles.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-xs font-medium text-slate-700">
                        Uploaded Files ({uploadedFiles.length})
                      </p>
                      <div className="space-y-1">
                        {uploadedFiles.map((file, index) => (
                          <div
                            key={file.key || index}
                            className="flex items-center justify-between gap-2 rounded-sm border border-slate-200 bg-white p-2 text-xs"
                          >
                            <div className="flex items-center gap-2 min-w-0 flex-1">
                              <span className="text-slate-500 flex-shrink-0">📎</span>
                              <a
                                href={file.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-slate-700 hover:text-emerald-600 hover:underline truncate"
                              >
                                {file.fileName}
                              </a>
                            </div>
                            <div className="flex items-center gap-2 flex-shrink-0">
                              <span className="text-slate-500">
                                {formatFileSize(file.fileSize)}
                              </span>
                              <button
                                type="button"
                                onClick={() => handleRemoveFile(file)}
                                className="inline-flex items-center justify-center rounded-sm border border-red-200 bg-white px-2 py-1 text-[10px] font-medium text-red-600 hover:bg-red-50 hover:border-red-300 transition-colors"
                                title="Remove file"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Video Upload Section (Disabled) */}
                <div className="space-y-3 border-t border-slate-200 pt-4">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
                      Video Upload
                    </p>
                    <span className="rounded-sm bg-slate-100 px-2 py-1 text-[10px] font-medium text-slate-500">
                      Coming Soon
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">
                    Video upload functionality will be available in a future update.
                  </p>
                  <div className="rounded-sm border border-slate-200 bg-slate-50 p-6 text-center opacity-50">
                    <input
                      ref={videoInputRef}
                      type="file"
                      accept="video/*"
                      disabled
                      className="hidden"
                    />
                    <div className="space-y-2">
                      <p className="text-sm text-slate-600">
                        Video upload is currently disabled
                      </p>
                      <p className="text-xs text-slate-500">
                        Use the video button in the rich text editor to embed videos from YouTube, Vimeo, etc.
                      </p>
                    </div>
                  </div>
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
              <span>Click "Save changes" to sync lesson content and files with the LMS.</span>
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



