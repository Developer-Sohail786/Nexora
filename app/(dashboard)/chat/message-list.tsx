"use client";

export default function MessageList({ children }: { children?: React.ReactNode }) {
  return (
    <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
      {children}
    </div>
  );
}