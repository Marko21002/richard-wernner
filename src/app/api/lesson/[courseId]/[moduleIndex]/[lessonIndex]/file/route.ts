import { NextRequest, NextResponse } from "next/server";
import { uploadFile } from "@/lib/s3";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ courseId: string; moduleIndex: string; lessonIndex: string }> }
) {
  try {
    const { courseId, moduleIndex, lessonIndex } = await params;
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    // Validate file size (max 50MB)
    const maxSize = 50 * 1024 * 1024; // 50MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: "File size must be less than 50MB" },
        { status: 400 }
      );
    }

    const fileExtension = file.name.split(".").pop() || "bin";
    const timestamp = Date.now();
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const key = `courses/${courseId}/lessons/${moduleIndex}/${lessonIndex}/files/${timestamp}-${sanitizedName}`;

    const url = await uploadFile(file, key, file.type);

    return NextResponse.json({
      success: true,
      url,
      key,
      fileName: file.name,
      fileSize: file.size,
      contentType: file.type,
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
}

