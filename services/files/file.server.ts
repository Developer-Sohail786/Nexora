import mammoth from "mammoth";
import { extractText } from "unpdf";

export async function getFileContent(
  data: Buffer,
  type: string,
): Promise<string> {
 

  switch (type.toLowerCase()) {
    case "txt":
      return extractTxt(data);

    case "pdf":
      return extractPdf(data);

    case "docx":
      return extractDocx(data);

    default:
      return "";
  }
}

async function extractTxt(
  data: Buffer,
): Promise<string> {
  return new TextDecoder().decode(data).trim();
}

async function extractPdf(
  data: Buffer,
): Promise<string> {
  const { text } = await extractText(
    new Uint8Array(data),
  );

  return text.join("\n").trim();
}

async function extractDocx(
  data: Buffer,
): Promise<string> {
  const { value } = await mammoth.extractRawText({
    buffer: data,
  });

  return value.trim();
}