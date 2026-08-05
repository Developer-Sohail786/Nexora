export function cleanAIResponse(content: string): string {
  return content
    .replace(/<think>[\s\S]*?<\/think>/g, "")
    .trim();
}