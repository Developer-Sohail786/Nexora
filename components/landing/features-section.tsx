"use client";

import { Search, FileText, Code2, Lock } from "lucide-react";
import FeatureCard from "./feature-card";

export default function FeaturesSection() {
  return (
    <section className="px-6 py-20 bg-[#111018]">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-white">Powerful capabilities</h2>
        <p className="mt-3 text-sm text-[#7A748F]">
          Everything you need to manage context and generate insights.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 max-w-4xl mx-auto md:grid-cols-2">
        <FeatureCard
          icon={<Search size={18} className="text-[#7A748F]" />}
          title="Semantic Search"
          description="Find exactly what you need across thousands of documents, codebases, and past chats instantly. Nexora understands context, not just keywords."
          preview={
            <div className="rounded-lg border border-white/[0.07] bg-[#17131F] px-3 py-2.5 text-xs text-[#7A748F] font-mono">
              <p className="mb-1">
                <span className="text-[#5C5870]">&gt;</span> search &quot;auth
                middleware implementation&quot;
              </p>
              <p className="text-[#9490A8] mb-1">Found in src/api/auth.ts</p>
              <p className="text-[#C4BEDD]">
                export const authMiddleware = async (req, res, next) =&gt; {"{"}{" "}
                ...
              </p>
            </div>
          }
        />

        <FeatureCard
          icon={<FileText size={18} className="text-[#7A748F]" />}
          title="Document Understanding"
          description="Upload PDFs, Word docs, or spreadsheets. Nexora extracts data, summarizes long reports, and answers specific queries."
          preview={
            <div className="flex gap-2 mt-2">
              <span className="rounded bg-[#2A2640] px-2 py-1 text-[11px] text-[#9490A8]">
                .PDF
              </span>
              <span className="rounded bg-[#2A2640] px-2 py-1 text-[11px] text-[#9490A8]">
                .DOCX
              </span>
              <span className="rounded bg-[#2A2640] px-2 py-1 text-[11px] text-[#9490A8]">
                .CSV
              </span>
            </div>
          }
        />

        <FeatureCard
          icon={<Code2 size={18} className="text-[#7A748F]" />}
          title="Code Assistant"
          description="Refactor, debug, or write boilerplate. Nexora connects to your local repo to understand your specific architecture."
        />

        <FeatureCard
          icon={<Lock size={18} className="text-[#7A748F]" />}
          title="Secure, Private Workspaces"
          description="Your data is never used to train global models. Enterprise-grade encryption and strict access controls ensure your intellectual property remains yours alone."
          link={{ label: "Read our security brief →", href: "#" }}
        />
      </div>
    </section>
  );
}
