"use client";

import {
  LayoutDashboard,
  MessageSquare,
  Folder,
  BarChart3,
  Gem,
  Settings,
  HelpCircle,
  LogOut,
  Plus,
  X,
  Menu,
} from "lucide-react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useCreateChat } from "@/hooks/use-create-chat";
import { usePathname } from "next/navigation";
import ChatActions from "./sidebar-chat-actions";
import { useState } from "react";

type Chat = {
  id: string;
  title: string;
  createdAt: Date;
  userId: string;
};

export default function Sidebar({ chats }: { chats: Chat[] }) {
  const { createChat } = useCreateChat();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  function isActive(path: string) {
    if (path === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(path);
  }

  const sidebarContent = (
    <aside className="flex h-full w-[220px] shrink-0 flex-col bg-[#17131F] border-r border-white/[0.06]">
      {/* Brand */}
      <div className="flex items-center gap-3 px-4 pb-4 pt-5">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#7C5CFC] shadow-[0_0_16px_rgba(124,92,252,0.5)]">
          <svg
            viewBox="0 0 16 16"
            fill="none"
            className="h-4 w-4"
            aria-hidden="true"
          >
            <path d="M8 1L14 8L8 15L2 8L8 1Z" fill="white" fillOpacity={0.9} />
          </svg>
        </div>
        <div className="min-w-0 leading-tight">
          <p className="text-sm font-semibold text-[#a796e9]">
            Nexora Workspace
          </p>
          <p className="text-[10px] text-[#7A748F]">AI-Powered Productivity</p>
        </div>
        {/* Close button — mobile only */}
        <button
  type="button"
  aria-label="Close sidebar"
  onClick={() => setOpen(false)}
  className="ml-auto rounded md:hidden text-[#7A748F] transition hover:text-white focus:outline-none focus:ring-2 focus:ring-[#7C5CFC] focus:ring-offset-2 focus:ring-offset-[#17131F]"
>
          <X
  aria-hidden="true"
  size={16}
/>
        </button>
      </div>

      {/* New Chat */}
      <div className="px-3 pb-4">
       <button
  type="button"
  aria-label="Create new conversation"
  onClick={createChat}
          className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#7C5CFC] px-3 py-2 text-sm font-medium text-white transition-all hover:bg-[#6B4EE8] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#7C5CFC] focus:ring-offset-2 focus:ring-offset-[#17131F]"
        >
          <Plus
  aria-hidden="true"
  size={15}
/>
          New Chat
        </button>
      </div>

      {/* Main Nav */}
      <nav aria-label="Main navigation" className="flex flex-col gap-0.5 px-3">
        <Link
          href="/dashboard"
          onClick={() => setOpen(false)}
          className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all ${isActive("/dashboard") ? "bg-[#7C5CFC] text-white shadow-[0_0_12px_rgba(124,92,252,0.35)]" : "text-[#A09BB5] hover:bg-white/5 hover:text-white"}`}
        >
          <LayoutDashboard
            size={17}
            className={isActive("/dashboard") ? "text-white" : "text-[#7C5CFC]"}
          />
          Dashboard
        </Link>
        <Link
          href={chats.length ? `/chat/${chats[0].id}` : "/dashboard"}
          onClick={() => setOpen(false)}
          className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all ${pathname.startsWith("/chat") ? "bg-[#7C5CFC] text-white shadow-[0_0_12px_rgba(124,92,252,0.35)]" : "text-[#A09BB5] hover:bg-white/5 hover:text-white"}`}
        >
          <MessageSquare
            size={17}
            className={
              pathname.startsWith("/chat") ? "text-white" : "text-[#7C5CFC]"
            }
          />
          Chats
        </Link>
        <Link
          href="/files"
          onClick={() => setOpen(false)}
          className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all ${isActive("/files") ? "bg-[#7C5CFC] text-white shadow-[0_0_12px_rgba(124,92,252,0.35)]" : "text-[#A09BB5] hover:bg-white/5 hover:text-white"}`}
        >
          <Folder
            size={17}
            className={isActive("/files") ? "text-white" : "text-[#7C5CFC]"}
          />
          Files
        </Link>
        <Link
          href="/analytics"
          onClick={() => setOpen(false)}
          className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all ${
            isActive("/analytics")
              ? "bg-[#7C5CFC] text-white shadow-[0_0_12px_rgba(124,92,252,0.35)]"
              : "text-[#A09BB5] hover:bg-white/5 hover:text-white"
          }`}
        >
          <BarChart3
            size={17}
            className={isActive("/analytics") ? "text-white" : "text-[#7C5CFC]"}
          />
          Analytics
        </Link>
        <Link
          href="/pricing"
          onClick={() => setOpen(false)}
          className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all ${
            isActive("/pricing")
              ? "bg-[#7C5CFC] text-white shadow-[0_0_12px_rgba(124,92,252,0.35)]"
              : "text-[#A09BB5] hover:bg-white/5 hover:text-white"
          }`}
        >
          <Gem
            size={17}
            className={isActive("/pricing") ? "text-white" : "text-[#7C5CFC]"}
          />
          Pricing
        </Link>
        <Link
          href="/settings"
          onClick={() => setOpen(false)}
          className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all ${isActive("/settings") ? "bg-[#7C5CFC] text-white shadow-[0_0_12px_rgba(124,92,252,0.35)]" : "text-[#A09BB5] hover:bg-white/5 hover:text-white"}`}
        >
          <Settings
            size={17}
            className={isActive("/settings") ? "text-white" : "text-[#7C5CFC]"}
          />
          Settings
        </Link>
      </nav>

      {/* Recent */}
      <div
  aria-label="Recent conversations"
  className="mt-6 flex-1 overflow-y-auto px-3"
>
        <p className="mb-1 px-3 text-[10px] font-semibold uppercase tracking-widest text-[#4E4860]">
          Recent
        </p>
        {chats.length === 0 ? (
          <p className="px-3 py-2 text-xs text-[#7A748F]">No chats yet</p>
        ) : (
          chats.map((chat) => {
            const isActiveChat = pathname === `/chat/${chat.id}`;
            return (
              <div
                key={chat.id}
                className={`group flex items-center justify-between rounded-md transition-all ${isActiveChat ? "bg-white/10" : "hover:bg-white/5"}`}
              >
                <Link
                  href={`/chat/${chat.id}`}
                  onClick={() => setOpen(false)}
                  className={`min-w-0 flex-1 truncate px-3 py-2 text-xs ${isActiveChat ? "text-white" : "text-[#7A748F] hover:text-[#C4BEDD]"}`}
                >
                  {chat.title}
                </Link>
                <ChatActions chatId={chat.id} title={chat.title} />
              </div>
            );
          })
        )}
      </div>

      {/* Bottom Nav */}
      <nav  aria-label="Secondary navigation" className="flex flex-col gap-0.5 border-t border-white/[0.06] px-3 py-4">
        <a  aria-label="Support"
          href="#"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-[#A09BB5] hover:bg-white/5 hover:text-white transition-all"
        >
          <HelpCircle aria-hidden="true" size={17} className="text-[#7C5CFC]" /> Support
        </a>
        <button
  type="button"
  aria-label="Log out"
  onClick={() => signOut()}
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-[#A09BB5] transition-all hover:bg-white/5 hover:text-white focus:outline-none focus:ring-2 focus:ring-[#7C5CFC] focus:ring-offset-2 focus:ring-offset-[#17131F]"
        >
          <LogOut  aria-hidden="true" size={17} className="text-[#7C5CFC]" /> Log Out
        </button>
      </nav>
    </aside>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden md:flex h-screen sticky top-0 shrink-0">
        {sidebarContent}
      </div>

      {/* Mobile hamburger */}
  <button
  type="button"
  aria-label="Open sidebar"
  aria-expanded={open}
  onClick={() => setOpen(true)}
        className="fixed top-4 left-4 z-50 flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.06] bg-[#17131F] text-[#7A748F] transition hover:text-white focus:outline-none focus:ring-2 focus:ring-[#7C5CFC] focus:ring-offset-2 focus:ring-offset-[#111018] md:hidden"
      >
        <Menu aria-hidden="true" size={18} />
      </button>

      {/* Mobile drawer */}
      {open && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/50 md:hidden"
            onClick={() => setOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 z-50 md:hidden h-full">
            {sidebarContent}
          </div>
        </>
      )}
    </>
  );
}
