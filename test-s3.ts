import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const client = new S3Client({
  credentials: {
    accessKeyId: process.env.ROOT_ACCESS_KEY!,
    secretAccessKey: process.env.ROOT_SECRET_KEY!,
  },
  region: "us-east-1",
  endpoint: "http://127.0.0.1:10000",
  forcePathStyle: true, // Required for S3-compatible services like versitygw
});

const bucket = "mybucket";

// Write first file
const data1 = JSON.stringify({ name: "John", age: 30 });
await client.send(
  new PutObjectCommand({
    Bucket: bucket,
    Key: "data.json",
    Body: data1,
    ContentType: "application/json",
  })
);

console.log("✓ Wrote data.json");

// Write second file using writer pattern (chunked)
const chunks = ['{"hello": ', '"world"}'];
const data2 = chunks.join("");

await client.send(
  new PutObjectCommand({
    Bucket: bucket,
    Key: "hello-world.json",
    Body: data2,
    ContentType: "application/json",
  })
);

console.log("✓ Wrote hello-world.json");
console.log("Done!");
