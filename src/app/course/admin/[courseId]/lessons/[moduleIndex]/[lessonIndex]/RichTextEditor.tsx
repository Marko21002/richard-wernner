"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import { useEffect } from "react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import { Iframe } from "./IframeExtension";

interface RichTextEditorProps {
  content: string;
  onChange?: (content: string) => void;
  placeholder?: string;
}

export default function RichTextEditor({
  content,
  onChange,
  placeholder = "Start writing your lesson content here...",
}: RichTextEditorProps) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
      Image.configure({
        inline: true,
        allowBase64: true,
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-blue-600 underline",
        },
      }),
      Iframe,
    ],
    content,
    onUpdate: ({ editor }) => {
      if (onChange) {
        onChange(editor.getHTML());
      }
    },
    editorProps: {
      attributes: {
        class:
          "focus:outline-none min-h-[300px] px-3 py-2 text-sm text-slate-900 [&_p]:mb-2 [&_p:last-child]:mb-0 [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:mb-3 [&_h1]:mt-4 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:mb-2 [&_h2]:mt-3 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:mb-2 [&_h3]:mt-2 [&_ul]:list-disc [&_ul]:ml-6 [&_ul]:mb-2 [&_ol]:list-decimal [&_ol]:ml-6 [&_ol]:mb-2 [&_li]:mb-1 [&_blockquote]:border-l-4 [&_blockquote]:border-slate-300 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-slate-600 [&_hr]:my-4 [&_hr]:border-slate-200 [&_img]:max-w-full [&_img]:rounded [&_img]:my-2 [&_iframe]:max-w-full [&_iframe]:rounded [&_iframe]:my-2",
      },
    },
  });

  // Update editor content when prop changes (e.g., when loading saved content)
  useEffect(() => {
    if (!editor) return;
    
    if (content !== undefined) {
      const currentContent = editor.getHTML();
      // Only update if content actually changed to avoid unnecessary updates
      // Use trim to handle whitespace differences
      if (currentContent.trim() !== content.trim()) {
        // Use setContent with emitUpdate: false to prevent triggering onChange
        // This is important when loading saved content - we don't want to trigger onChange
        editor.commands.setContent(content, false);
      }
    }
  }, [content, editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className="rounded-sm border border-slate-300 bg-white">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 border-b border-slate-200 bg-slate-50 px-2 py-1.5">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={`rounded px-2 py-1 text-xs font-medium transition-colors ${
            editor.isActive("bold")
              ? "bg-slate-200 text-slate-900"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          <strong>B</strong>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={`rounded px-2 py-1 text-xs font-medium transition-colors ${
            editor.isActive("italic")
              ? "bg-slate-200 text-slate-900"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          <em>I</em>
        </button>
        <div className="h-4 w-px bg-slate-300" />
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={`rounded px-2 py-1 text-xs font-medium transition-colors ${
            editor.isActive("heading", { level: 1 })
              ? "bg-slate-200 text-slate-900"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          H1
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={`rounded px-2 py-1 text-xs font-medium transition-colors ${
            editor.isActive("heading", { level: 2 })
              ? "bg-slate-200 text-slate-900"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          H2
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={`rounded px-2 py-1 text-xs font-medium transition-colors ${
            editor.isActive("heading", { level: 3 })
              ? "bg-slate-200 text-slate-900"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          H3
        </button>
        <div className="h-4 w-px bg-slate-300" />
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`rounded px-2 py-1 text-xs font-medium transition-colors ${
            editor.isActive("bulletList")
              ? "bg-slate-200 text-slate-900"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          •
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`rounded px-2 py-1 text-xs font-medium transition-colors ${
            editor.isActive("orderedList")
              ? "bg-slate-200 text-slate-900"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          1.
        </button>
        <div className="h-4 w-px bg-slate-300" />
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`rounded px-2 py-1 text-xs font-medium transition-colors ${
            editor.isActive("blockquote")
              ? "bg-slate-200 text-slate-900"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          "
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          className="rounded px-2 py-1 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-100"
        >
          ─
        </button>
        <div className="h-4 w-px bg-slate-300" />
        <button
          type="button"
          onClick={() => {
            const url = window.prompt("Enter image URL:");
            if (url) {
              editor.chain().focus().setImage({ src: url }).run();
            }
          }}
          className="rounded px-2 py-1 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-100"
        >
          🖼️
        </button>
        <button
          type="button"
          onClick={() => {
            const url = window.prompt("Enter video URL (YouTube, Vimeo, etc.):");
            if (url) {
              // Convert YouTube URL to embed format
              let embedUrl = url;
              if (url.includes("youtube.com/watch")) {
                const videoId = url.split("v=")[1]?.split("&")[0];
                if (videoId) {
                  embedUrl = `https://www.youtube.com/embed/${videoId}`;
                }
              } else if (url.includes("youtu.be/")) {
                const videoId = url.split("youtu.be/")[1]?.split("?")[0];
                if (videoId) {
                  embedUrl = `https://www.youtube.com/embed/${videoId}`;
                }
              } else if (url.includes("vimeo.com/")) {
                const videoId = url.split("vimeo.com/")[1]?.split("?")[0];
                if (videoId) {
                  embedUrl = `https://player.vimeo.com/video/${videoId}`;
                }
              }
              
              // Insert video using iframe extension
              editor.chain().focus().setIframe({ src: embedUrl }).run();
            }
          }}
          className="rounded px-2 py-1 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-100"
          title="Insert video"
        >
          ▶️
        </button>
        <button
          type="button"
          onClick={() => {
            const url = window.prompt("Enter file or resource URL:");
            if (url) {
              const text = window.prompt("Enter link text (or leave empty to use URL):", url) || url;
              editor.chain().focus().setLink({ href: url }).insertContent(text).run();
            }
          }}
          className="rounded px-2 py-1 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-100"
          title="Insert link/file"
        >
          📎
        </button>
        <div className="ml-auto flex items-center gap-1">
          <button
            type="button"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().chain().focus().undo().run()}
            className="rounded px-2 py-1 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ↶
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().chain().focus().redo().run()}
            className="rounded px-2 py-1 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ↷
          </button>
        </div>
      </div>

      {/* Editor */}
      <EditorContent editor={editor} />
    </div>
  );
}

