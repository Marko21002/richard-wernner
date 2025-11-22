import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  credentials: {
    accessKeyId: process.env.ROOT_ACCESS_KEY || process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey:
      process.env.ROOT_SECRET_KEY || process.env.AWS_SECRET_ACCESS_KEY!,
  },
  region: "us-east-1",
  endpoint: process.env.S3_ENDPOINT || "http://127.0.0.1:10000",
  forcePathStyle: true, // Required for S3-compatible services like versitygw
});

const BUCKET = process.env.S3_BUCKET || "mybucket";

export async function uploadImage(
  file: File | Buffer,
  key: string,
  contentType?: string
): Promise<string> {
  const body = file instanceof File ? await file.arrayBuffer() : file;
  const finalContentType =
    contentType ||
    (file instanceof File ? file.type : "image/jpeg") ||
    "image/jpeg";

  await s3Client.send(
    new PutObjectCommand({
      Bucket: BUCKET,
      Key: key,
      Body: Buffer.from(body),
      ContentType: finalContentType,
    })
  );

  // Return the URL to access the file through our API proxy
  // This avoids CORS issues and handles authentication properly
  return `/api/s3/${key}`;
}

export async function uploadFile(
  file: File | Buffer,
  key: string,
  contentType?: string
): Promise<string> {
  const body = file instanceof File ? await file.arrayBuffer() : file;
  
  // Determine content type
  let finalContentType = contentType;
  if (!finalContentType && file instanceof File) {
    finalContentType = file.type || "application/octet-stream";
  }
  if (!finalContentType) {
    finalContentType = "application/octet-stream";
  }

  await s3Client.send(
    new PutObjectCommand({
      Bucket: BUCKET,
      Key: key,
      Body: Buffer.from(body),
      ContentType: finalContentType,
    })
  );

  // Return the URL to access the file through our API proxy
  return `/api/s3/${key}`;
}

export { s3Client, BUCKET };

