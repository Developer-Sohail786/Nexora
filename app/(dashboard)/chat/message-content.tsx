"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import CodeBlock from "./code-block";

interface MessageContentProps {
  content: string;
  isStreaming?: boolean;
  className?: string;
}

export default function MessageContent({
  content,
  isStreaming = false,
  className = "",
}: MessageContentProps) {
  return (
    <div
      className={`
        prose prose-invert max-w-none
        prose-p:leading-7
        prose-p:my-3
        prose-headings:text-white
        prose-headings:font-semibold
        prose-h1:text-3xl
        prose-h2:text-2xl
        prose-h3:text-xl
        prose-strong:text-white
        prose-a:text-[#7C5CFC]
        prose-a:no-underline hover:prose-a:underline
        prose-code:text-[#E8E3FF]
        prose-code:bg-[#252233]
        prose-code:px-1.5
        prose-code:py-0.5
        prose-code:rounded
        prose-pre:bg-transparent
        prose-pre:p-0
        prose-blockquote:border-[#7C5CFC]
        prose-blockquote:text-[#B8B2D1]
        prose-li:marker:text-[#7C5CFC]
        prose-table:border-collapse
        prose-th:border
        prose-td:border
        prose-th:border-white/10
        prose-td:border-white/10
        prose-th:bg-[#252233]
        prose-td:bg-[#1A1725]
        text-sm text-[#C4BEDD]
        ${className}
      `}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ className, children }) {
            const inline = !className;

            if (inline) {
              return (
                <code className="rounded bg-[#252233] px-1.5 py-0.5 font-mono text-sm">
                  {children}
                </code>
              );
            }

            const match =
              /language-(\w+)/.exec(
                className || "",
              );

            return (
              <CodeBlock
                language={
                  match?.[1] ?? "text"
                }
                code={String(children).replace(
                  /\n$/,
                  "",
                )}
              />
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>

      {isStreaming && (
        <span className="ml-0.5 inline-block animate-pulse">
          ▋
        </span>
      )}
    </div>
  );
}