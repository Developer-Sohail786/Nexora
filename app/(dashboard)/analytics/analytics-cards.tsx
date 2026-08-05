"use client";

import {
  Bot,
  Coins,
  Crown,
  FileText,
  HardDrive,
  Image,
  MessageSquare,
} from "lucide-react";

import AnalyticsCard from "./analytics-card";
import { AnalyticsCardsData } from "./types";

interface Props {
  cards: AnalyticsCardsData;
  plan: string;
}

export default function AnalyticsCards({
  cards,
  plan,
}: Props) {
  const isPro = plan === "PRO";

  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <AnalyticsCard
        title="Current Plan"
        value={plan}
        subtitle={
          isPro
            ? "Unlimited Access"
            : "Free Tier"
        }
        icon={Crown}
      />

      <AnalyticsCard
        title="Total Chats"
        value={cards.chats}
        subtitle="AI conversations"
        icon={MessageSquare}
      />

      <AnalyticsCard
        title="Documents"
        value={cards.documents}
        subtitle="Knowledge files"
        icon={FileText}
      />

      <AnalyticsCard
        title="Images"
        value={cards.images}
        subtitle="Generated images"
        icon={Image}
      />

      <AnalyticsCard
        title="AI Responses"
        value={cards.responses}
        subtitle="Assistant replies"
        icon={Coins}
      />

      <AnalyticsCard
        title="Storage Used"
        value={cards.storage}
        subtitle="Cloud storage"
        icon={HardDrive}
      />

      <AnalyticsCard
        title="AI Models"
        value={cards.models}
        subtitle="Models used"
        icon={Bot}
      />
    </section>
  );
}