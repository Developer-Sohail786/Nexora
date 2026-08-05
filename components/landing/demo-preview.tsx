"use client";

import { Send } from "lucide-react";

export default function DemoPreview() {
  return (
    <section className="flex justify-center px-6 pb-20 bg-[#111018]">
      <div className="w-full max-w-xl rounded-2xl border border-white/[0.07] bg-[#1C1926] overflow-hidden">

        {/* Window bar */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/6">
          <div className="h-2.5 w-2.5 rounded-full bg-[#2A2640]" />
          <div className="h-2.5 w-2.5 rounded-full bg-[#2A2640]" />
          <div className="h-2.5 w-2.5 rounded-full bg-[#2A2640]" />
          <span className="ml-2 text-[11px] text-[#5C5870] uppercase tracking-widest">Nexus AI Workspace – Demo</span>
        </div>

        {/* Messages */}
        <div className="px-5 py-5 space-y-5">

          {/* User */}
          <div className="flex items-start gap-3">
            <div className="h-7 w-7 shrink-0 rounded-full bg-[#2A2640] flex items-center justify-center text-[10px] text-[#9490A8]">U</div>
            <div className="rounded-xl rounded-tl-sm bg-[#2A2640] px-4 py-3 text-sm text-white">
              Can you analyze the Q3 financial report and extract the key revenue drivers?
            </div>
          </div>

          {/* AI */}
          <div className="flex items-start gap-3">
            <div className="h-7 w-7 shrink-0 rounded-full bg-[#7C5CFC] flex items-center justify-center text-[10px] font-bold text-white">N</div>
            <div className="flex-1 space-y-2 text-sm text-[#C4BEDD]">
              <p>
  Based on the uploaded document &quot;Q3_Financials.pdf&quot;, here are the primary revenue drivers:
</p>
              <ul className="space-y-1 pl-1">
                <li className="flex items-start gap-2"><span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#7C5CFC]" />Enterprise software subscriptions grew by 24% YoY.</li>
                <li className="flex items-start gap-2"><span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#7C5CFC]" />New API usage tiers accounted for $1.2M in additional MRR.</li>
                <li className="flex items-start gap-2"><span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#7C5CFC]" />Reduced cloud infrastructure costs improved overall margins by 4%.</li>
              </ul>
            </div>
          </div>

        </div>

        {/* Input */}
        <div className="px-5 pb-5">
          <div className="flex items-center gap-3 rounded-lg border border-white/[0.07] bg-[#2A2640] px-4 py-2.5">
            <input
              placeholder="Ask anything about your code or documents..."
              className="flex-1 bg-transparent text-sm text-white placeholder-[#5C5870] outline-none"
              readOnly
            />
            <button className="text-[#7C5CFC]">
              <Send size={15} />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}