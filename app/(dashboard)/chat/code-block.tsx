"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface CodeBlockProps {
  code: string;
  language: string;
}

export default function CodeBlock({
  code,
  language,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(code);

    setCopied(true);

    setTimeout(() => setCopied(false), 2000);
  }
const languageNames: Record<string, string> = {
  js: "JavaScript",
  javascript: "JavaScript",
  ts: "TypeScript",
  typescript: "TypeScript",
  jsx: "React JSX",
  tsx: "React TSX",
  py: "Python",
  python: "Python",
  java: "Java",
  c: "C",
  cpp: "C++",
  cs: "C#",
  go: "Go",
  rust: "Rust",
  php: "PHP",
  html: "HTML",
  css: "CSS",
  json: "JSON",
  sql: "SQL",
  bash: "Bash",
  shell: "Shell",
  sh: "Shell",
};

const normalizedLanguage= language.toLowerCase().trim()
  return (
    <div className="my-4 overflow-hidden rounded-xl border border-white/10 shadow-lg">
      <div className="flex items-center justify-between border-b border-white/10 bg-[#181622] px-4 py-2">
        <span className="text-xs text-zinc-400">
          {languageNames[normalizedLanguage] ?? language ?? "Text"}
        </span>

        <button
          onClick={handleCopy}
          className="flex cursor-pointer items-center gap-2 text-xs text-zinc-400 transition hover:text-white cursor-pointer"
        >
          {copied ? (
            <>
              <Check size={14} />
              Copied!
            </>
          ) : (
            <>
              <Copy size={14} />
              Copy
            </>
          )}
        </button>
      </div>

          <div className="overflow-x-auto">
      <SyntaxHighlighter
      wrapLongLines={false}
      showLineNumbers={false}
        language={normalizedLanguage}
        style={oneDark}
        customStyle={{
          margin: 0,
          borderRadius: 0,
          background: "#181622",
          padding: "16px",
        }}
      >
        {code}
      </SyntaxHighlighter>
      </div>
    </div>
  );
}