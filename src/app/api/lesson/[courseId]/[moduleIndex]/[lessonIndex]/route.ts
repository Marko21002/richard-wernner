import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ courseId: string; moduleIndex: string; lessonIndex: string }> }
) {
  try {
    const { courseId, moduleIndex, lessonIndex } = await params;
    const moduleIndexNum = Number(moduleIndex) || 0;
    const lessonIndexNum = Number(lessonIndex) || 0;

    const db = getDb();
    
    // Get lesson content
    const lesson = db
      .prepare(
        "SELECT * FROM lessons WHERE course_id = ? AND module_index = ? AND lesson_index = ?"
      )
      .get(courseId, moduleIndexNum, lessonIndexNum) as {
      id: number;
      course_id: string;
      module_index: number;
      lesson_index: number;
      content: string | null;
      created_at: string;
      updated_at: string;
    } | undefined;

    if (!lesson) {
      return NextResponse.json({
        content: null,
        files: [],
      });
    }

    // Get lesson files
    const files = db
      .prepare(
        "SELECT file_url, file_name, file_size, content_type, s3_key FROM lesson_files WHERE lesson_id = ? ORDER BY created_at ASC"
      )
      .all(lesson.id) as {
      file_url: string;
      file_name: string;
      file_size: number;
      content_type: string;
      s3_key: string;
    }[];

    // Return content as null if it's empty string or null
    const content = lesson.content && lesson.content.trim() !== "" ? lesson.content : null;

    return NextResponse.json({
      content,
      files: files.map((f) => ({
        url: f.file_url,
        fileName: f.file_name,
        fileSize: f.file_size,
        contentType: f.content_type,
        key: f.s3_key,
      })),
    });
  } catch (error) {
    console.error("Error fetching lesson:", error);
    return NextResponse.json(
      { error: "Failed to fetch lesson" },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ courseId: string; moduleIndex: string; lessonIndex: string }> }
) {
  try {
    const { courseId, moduleIndex, lessonIndex } = await params;
    const moduleIndexNum = Number(moduleIndex) || 0;
    const lessonIndexNum = Number(lessonIndex) || 0;

    const body = await request.json();
    const { content, files } = body;

    if (typeof content !== "string") {
      return NextResponse.json(
        { error: "Content must be a string" },
        { status: 400 }
      );
    }

    if (!Array.isArray(files)) {
      return NextResponse.json(
        { error: "Files must be an array" },
        { status: 400 }
      );
    }

    const db = getDb();

    // Get or create lesson
    let lesson = db
      .prepare(
        "SELECT id FROM lessons WHERE course_id = ? AND module_index = ? AND lesson_index = ?"
      )
      .get(courseId, moduleIndexNum, lessonIndexNum) as { id: number } | undefined;

    if (!lesson) {
      db.prepare(
        "INSERT INTO lessons (course_id, module_index, lesson_index, content) VALUES (?, ?, ?, ?)"
      ).run(courseId, moduleIndexNum, lessonIndexNum, content);
      lesson = db
        .prepare(
          "SELECT id FROM lessons WHERE course_id = ? AND module_index = ? AND lesson_index = ?"
        )
        .get(courseId, moduleIndexNum, lessonIndexNum) as { id: number };
    } else {
      db.prepare(
        "UPDATE lessons SET content = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?"
      ).run(content, lesson.id);
    }

    // Delete existing files and insert new ones
    db.prepare("DELETE FROM lesson_files WHERE lesson_id = ?").run(lesson.id);

    if (files.length > 0) {
      const insertFile = db.prepare(
        "INSERT INTO lesson_files (lesson_id, file_url, file_name, file_size, content_type, s3_key) VALUES (?, ?, ?, ?, ?, ?)"
      );

      const insertMany = db.transaction((files: any[]) => {
        for (const file of files) {
          insertFile.run(
            lesson!.id,
            file.url,
            file.fileName,
            file.fileSize,
            file.contentType,
            file.key
          );
        }
      });

      insertMany(files);
    }

    return NextResponse.json({
      success: true,
      message: "Lesson saved successfully",
    });
  } catch (error) {
    console.error("Error saving lesson:", error);
    return NextResponse.json(
      { error: "Failed to save lesson" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{
      courseId: string;
      moduleIndex: string;
      lessonIndex: string;
    }>;
  }
) {
  try {
    const { courseId, moduleIndex, lessonIndex } = await params;
    const moduleIndexNum = Number(moduleIndex) || 0;
    const lessonIndexNum = Number(lessonIndex) || 0;

    const body = await request.json();
    const { title } = body;

    if (typeof title !== "string") {
      return NextResponse.json(
        { error: "Title must be a string" },
        { status: 400 }
      );
    }

    const db = getDb();

    // Get or create lesson
    let lesson = db
      .prepare(
        "SELECT id FROM lessons WHERE course_id = ? AND module_index = ? AND lesson_index = ?"
      )
      .get(courseId, moduleIndexNum, lessonIndexNum) as { id: number } | undefined;

    if (!lesson) {
      // Create lesson with title
      db.prepare(
        "INSERT INTO lessons (course_id, module_index, lesson_index, title) VALUES (?, ?, ?, ?)"
      ).run(courseId, moduleIndexNum, lessonIndexNum, title);
    } else {
      // Update lesson title
      db.prepare(
        "UPDATE lessons SET title = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?"
      ).run(title, lesson.id);
    }

    return NextResponse.json({
      success: true,
      message: "Lesson title updated successfully",
    });
  } catch (error) {
    console.error("Error updating lesson title:", error);
    return NextResponse.json(
      { error: "Failed to update lesson title" },
      { status: 500 }
    );
  }
}

