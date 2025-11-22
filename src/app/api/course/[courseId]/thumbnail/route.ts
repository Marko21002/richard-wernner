import { NextRequest, NextResponse } from "next/server";
import { uploadImage } from "@/lib/s3";
import { getDb } from "@/lib/db";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ courseId: string }> }
) {
  try {
    const { courseId } = await params;
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "File must be an image" },
        { status: 400 }
      );
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: "File size must be less than 10MB" },
        { status: 400 }
      );
    }
    const fileExtension = file.name.split(".").pop() || "jpg";
    const timestamp = Date.now();
    const key = `courses/${courseId}/thumbnail-${timestamp}.${fileExtension}`;

    const url = await uploadImage(file, key, file.type);

    // Save thumbnail URL to database
    const db = getDb();
    const existing = db
      .prepare("SELECT id FROM courses WHERE id = ?")
      .get(courseId) as { id: string } | undefined;

    if (existing) {
      db.prepare(
        "UPDATE courses SET thumbnail_url = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?"
      ).run(url, courseId);
    } else {
      db.prepare(
        "INSERT INTO courses (id, thumbnail_url) VALUES (?, ?)"
      ).run(courseId, url);
    }

    return NextResponse.json({
      success: true,
      url,
      key,
    });
  } catch (error) {
    console.error("Error uploading thumbnail:", error);
    return NextResponse.json(
      { error: "Failed to upload image" },
      { status: 500 }
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ courseId: string }> }
) {
  try {
    const { courseId } = await params;
    const db = getDb();
    const course = db
      .prepare("SELECT thumbnail_url FROM courses WHERE id = ?")
      .get(courseId) as { thumbnail_url: string | null } | undefined;

    let thumbnailUrl = course?.thumbnail_url || null;

    // Convert old direct S3 URLs to proxy URLs
    if (thumbnailUrl && thumbnailUrl.startsWith("http://127.0.0.1:10000/")) {
      // Extract the key from the old URL format: http://127.0.0.1:10000/mybucket/courses/...
      const urlParts = thumbnailUrl.replace("http://127.0.0.1:10000/", "").split("/");
      // Remove the bucket name (first part) and join the rest
      const key = urlParts.slice(1).join("/");
      thumbnailUrl = `/api/s3/${key}`;
      
      // Update the database with the new URL format
      db.prepare(
        "UPDATE courses SET thumbnail_url = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?"
      ).run(thumbnailUrl, courseId);
    }

    return NextResponse.json({
      thumbnailUrl,
    });
  } catch (error) {
    console.error("Error fetching thumbnail:", error);
    return NextResponse.json(
      { error: "Failed to fetch thumbnail" },
      { status: 500 }
    );
  }
}

