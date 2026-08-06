"use client";

import {
  MessageSquare,
  FileText,
  Image as ImageIcon,
  BarChart3,
} from "lucide-react";

import { formatDistanceToNow } from "date-fns";

import { RecentUsageItem } from "./types";
import EmptyState from "@/components/ui/empty-state";

interface Props {
  activities: RecentUsageItem[];
}

export default function RecentUsage({
  activities,
}: Props) {
  return (
    <section className="rounded-2xl border border-white/10 bg-[#1C1926] p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-white">
          Recent Usage
        </h2>

        <p className="mt-1 text-sm text-[#7A748F]">
          Your latest AI workspace activity
        </p>
      </div>

      {activities.length === 0 ? (
        <EmptyState
          icon={
            <BarChart3 className="h-8 w-8 text-[#7C5CFC]" />
          }
          title="No activity yet"
          description="Start chatting, upload documents, or generate AI images to see your recent usage."
        />
      ) : (
        <div className="space-y-5">
          {activities.map((activity) => {
            const Icon =
              activity.type === "chat"
                ? MessageSquare
                : activity.type === "file"
                  ? FileText
                  : ImageIcon;

            return (
              <div
                key={activity.id}
                className="flex items-start gap-4"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#2A2640]">
                  <Icon
                    size={18}
                    className="text-[#7C5CFC]"
                  />
                </div>

                <div className="flex-1">
                  <h3 className="text-sm font-medium text-white">
                    {activity.title}
                  </h3>

                  <p className="mt-1 text-xs text-[#7A748F]">
                    {activity.type === "chat"
                      ? "Started a new conversation"
                      : activity.type === "file"
                        ? "Uploaded a document"
                        : "Generated an image"}
                  </p>
                </div>

                <span className="text-xs text-[#5C5870]">
                  {formatDistanceToNow(
                    new Date(activity.createdAt),
                    {
                      addSuffix: true,
                    },
                  )}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}