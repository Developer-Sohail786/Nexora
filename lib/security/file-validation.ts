import { fileTypeFromBuffer } from "file-type";
import unzipper from "unzipper";

export async function validateFileContent(
  buffer: Buffer,
  extension: string,
) {
  if (extension === "txt") {
    if (buffer.includes(0)) {
      throw new Error("Invalid text file.");
    }

    return true;
  }

  const detected = await fileTypeFromBuffer(buffer);

  if (!detected) {
    throw new Error("Unable to determine file type.");
  }

  if (
    extension === "pdf" &&
    detected.mime !== "application/pdf"
  ) {
    throw new Error("Invalid PDF file.");
  }

  if (extension === "docx") {
    if (detected.mime !== "application/zip") {
      throw new Error("Invalid DOCX file.");
    }

    try {
      const directory =
        await unzipper.Open.buffer(buffer);

      const files = new Set(
        directory.files.map(
          (file) => file.path,
        ),
      );

      if (
        !files.has("[Content_Types].xml") ||
        !files.has("word/document.xml")
      ) {
        throw new Error("Invalid DOCX structure.");
      }
    } catch {
      throw new Error("Invalid DOCX file.");
    }
  }

  return true;
}