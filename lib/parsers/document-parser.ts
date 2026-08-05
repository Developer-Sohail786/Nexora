import mammoth from "mammoth";
import * as pdfjsLib from "pdfjs-dist";

export async function extractText(file: File): Promise<string> {
  const type = file.type;

  switch (type) {
    case "text/plain":
      return extractTxt(file);

    case "application/pdf":
      return extractPdf(file);

    case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      return extractDocx(file);

    default:
      throw new Error("Unsupported file type");
  }
}

async function extractTxt(file: File): Promise<string> {
  return file.text();
}

async function extractPdf(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();

  const pdf = await pdfjsLib.getDocument({
    data: arrayBuffer,
  }).promise;

  let text = "";

  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    const page = await pdf.getPage(pageNum);

    const content = await page.getTextContent();

    text += content.items
      .map((item) => ("str" in item ? item.str : ""))
      .join(" ")
      .trim();

    text += "\n";
  }

  return text.trim();
}

async function extractDocx(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();

  const { value } = await mammoth.extractRawText({
    buffer: Buffer.from(arrayBuffer),
  });

  return value.trim();
}
