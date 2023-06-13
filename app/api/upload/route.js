import mime from "mime-types";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
const bucketName = "mon-next-ecommerce";

export const POST = async (req, res) => {
  const formData = await req.formData();
  const files = formData.getAll("file");

  const client = new S3Client({
    region: "ap-south-1",
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    },
  });

  const links = [];

  for (const file of files) {
    const ext = file.type.split("/").pop();
    const newFileName = Date.now() + "." + ext;
    //console.log({ ext, newFileName });
    const buffer = await file.arrayBuffer();
    await client.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: newFileName,
        Body: Buffer.from(buffer),
        ACL: "public-read",
        ContentType: mime.lookup(file.type),
      })
    );
    const link = `https://${bucketName}.s3.ap-south-1.amazonaws.com/${newFileName}`;
    links.push(link);
  }
  return new Response(JSON.stringify(links), { status: 200 });
};
