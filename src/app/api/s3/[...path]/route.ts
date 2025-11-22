import { NextRequest, NextResponse } from "next/server";
import { Readable } from "stream";
import { s3Client, BUCKET } from "@/lib/s3";
import { GetObjectCommand } from "@aws-sdk/client-s3";

// Export route config to ensure proper handling
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const { path } = await params;
    const key = path.join("/");
    console.log("[S3 Proxy] Request received for key:", key);
    console.log("[S3 Proxy] Full URL:", request.url);

    const command = new GetObjectCommand({
      Bucket: BUCKET,
      Key: key,
    });

    const response = await s3Client.send(command);

    if (!response.Body) {
      return new NextResponse("Not Found", { status: 404 });
    }

    // Convert stream to buffer
    // AWS SDK v3 returns Body as a Readable stream (Node.js Readable)
    const stream = response.Body as Readable;
    const chunks: Buffer[] = [];

    // Convert Node.js Readable stream to buffer
    for await (const chunk of stream) {
      chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
    }

    const buffer = Buffer.concat(chunks);

    // Get content type from response or infer from file extension
    let contentType = response.ContentType || "application/octet-stream";

    // If content type is not set or is generic, try to infer from file extension
    if (!contentType || contentType === "application/octet-stream") {
      const extension = key.split(".").pop()?.toLowerCase();
      const contentTypes: Record<string, string> = {
        // Images
        jpg: "image/jpeg",
        jpeg: "image/jpeg",
        png: "image/png",
        gif: "image/gif",
        webp: "image/webp",
        svg: "image/svg+xml",
        // Documents
        pdf: "application/pdf",
        doc: "application/msword",
        docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        xls: "application/vnd.ms-excel",
        xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        ppt: "application/vnd.ms-powerpoint",
        pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        // Text
        txt: "text/plain",
        csv: "text/csv",
        // Archives
        zip: "application/zip",
        rar: "application/x-rar-compressed",
        // Videos
        mp4: "video/mp4",
        webm: "video/webm",
        // Audio
        mp3: "audio/mpeg",
        wav: "audio/wav",
      };
      contentType = contentTypes[extension || ""] || "application/octet-stream";
    }

    // Set appropriate headers based on content type
    const headers: Record<string, string> = {
      "Content-Type": contentType,
      "Content-Length": buffer.length.toString(),
      "Cache-Control": "public, max-age=31536000, immutable",
      "Accept-Ranges": "bytes",
    };

    // For downloads (non-viewable files), add Content-Disposition header
    const downloadTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument",
      "application/vnd.ms-excel",
      "application/vnd.ms-powerpoint",
      "application/zip",
      "application/x-rar-compressed",
    ];

    if (downloadTypes.some((type) => contentType.includes(type))) {
      const fileName = key.split("/").pop() || "download";
      headers["Content-Disposition"] = `inline; filename="${fileName}"`;
    }

    return new NextResponse(buffer, {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error("Error fetching S3 object:", error);
    return new NextResponse("Not Found", { status: 404 });
  }
}
