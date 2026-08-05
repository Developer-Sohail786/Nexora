"use client"
type DashboardHeroProps = {
  name: string;
};

import { MessageSquare, FileText } from "lucide-react";
import { useRef } from "react";
import NewChatButton from "@/components/chat/new-chat-btn";
import { useFileUpload } from "@/hooks/use-file-upload";

export default function DashboardHero({ name }: DashboardHeroProps) {
  const inputRef= useRef<HTMLInputElement>(null)

  const {upload, isUploading}=useFileUpload()

  function handleBrowse(){
    inputRef.current?.click()
  }

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>,){
    const file= e.target.files?.[0]

    if(!file) return

    upload(file)

    e.target.value=""
  }
  return (
    <section className="bg-[#111018] px-6 pt-8 pb-10">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-white">
            Good morning, {name}
          </h1>
          <p className="mt-2 text-sm text-[#7A748F]">
            Here is your daily overview.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#1C1926] px-4 py-2 text-sm text-[#9490A8]">
          <div className="h-4 w-4 rounded-full border border-[#7C5CFC] flex items-center justify-center">
            <div className="h-1.5 w-1.5 rounded-full bg-[#7C5CFC]" />
          </div>
          Pro Tier Active
        </div>
      </div>
<input ref={inputRef} type="file" className="hidden" accept=".pdf,.doc,.docx,.txt,.md" onChange={handleChange}  />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <NewChatButton className="flex items-center gap-4 rounded-xl border border-white/[0.07] bg-[#1C1926] px-5 py-5 text-left transition-all hover:border-white/15 hover:bg-[#222030]">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#2A2640]">
            <MessageSquare size={18} className="text-[#9490A8]" />
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">
              Start a New Chat
            </h3>

            <p className="mt-0.5 text-xs text-[#7A748F]">
              Begin a new session with your preferred AI model.
            </p>
          </div>
        </NewChatButton>

        <button
  type="button"
  onClick={handleBrowse}
  disabled={isUploading}
  className="flex items-center gap-4 rounded-xl border border-white/[0.07] bg-[#1C1926] px-5 py-5 text-left transition-all hover:border-white/15 hover:bg-[#222030]"
>
  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#2A2640]">
    <FileText
      size={18}
      className="text-[#9490A8]"
    />
  </div>

  <div>
    <h3 className="text-sm font-semibold text-white">
      Upload Document
    </h3>

    <p className="mt-0.5 text-xs text-[#7A748F]">
      Analyze PDFs, DOCX, TXT and Markdown files.
    </p>
  </div>
</button>
      </div>
    </section>
  );
}
