"use client";

import {
  MessageSquare,
  FileText,
  Image as ImageIcon,
} from "lucide-react";

import Link from "next/link";

import { formatDistanceToNow } from "date-fns";

import type { Activity } from "./types";

import EmptyState from "@/components/ui/empty-state";
import { Activity as ActivityIcon } from "lucide-react";

interface RecentActivityProps {
  activities: Activity[];
}

export default function RecentActivity({
  activities,
}: RecentActivityProps) {
  function getIcon(type: Activity["type"]) {
    switch (type) {
      case "chat":
        return (
          <MessageSquare
            size={16}
            className="text-[#7C5CFC]"
          />
        );

      case "file":
        return (
          <FileText
            size={16}
            className="text-[#7C5CFC]"
          />
        );

      case "image":
        return (
          <ImageIcon
            size={16}
            className="text-[#7C5CFC]"
          />
        );
    }
  }

  function getLabel(type: Activity["type"]) {
    switch (type) {
      case "chat":
        return "New Chat";

      case "file":
        return "File Uploaded";

      case "image":
        return "Image Generated";
    }
  }

  return (
    <section className="bg-[#111018] px-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">
          Recent Activity
        </h2>

        <Link href="/files" className="text-sm text-[#7C5CFC] hover:underline">
          View All
        </Link>
      </div>

      {activities.length === 0 ? (
  <EmptyState
  icon={<ActivityIcon className="h-8 w-8 text-[#7C5CFC]" />}
  title="No recent activity"
  description="Your chats, uploaded files, and generated images will appear here as you use Nexora."
/>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="rounded-xl border border-white/[0.07] bg-[#1C1926] p-4 transition-all hover:border-white/15 hover:bg-[#222030]"
            >
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getIcon(activity.type)}

                  <span className="text-xs font-medium text-[#9490A8]">
                    {getLabel(activity.type)}
                  </span>
                </div>

                <span className="text-[11px] text-[#5C5870]">
                  {formatDistanceToNow(
                    activity.createdAt,
                    {
                      addSuffix: true,
                    },
                  )}
                </span>
              </div>

              <h3 className="truncate text-sm font-semibold text-white">
                {activity.title}
              </h3>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}