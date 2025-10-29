import { createReadStream, existsSync } from "fs";
import path from "path";
import { sendStream, createError } from "h3";

export default defineEventHandler((event) => {
  const { filename } = event.context.params!;
  const filePath = path.join(process.cwd(), "server/uploads", filename);

  if (!existsSync(filePath)) {
    throw createError({ statusCode: 404, statusMessage: "File not found" });
  }

  return sendStream(event, createReadStream(filePath));
});
