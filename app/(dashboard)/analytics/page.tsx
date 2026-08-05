import { auth } from "@/auth";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";

import Footer from "@/components/layout/footer";

import ActivityChart from "./activity-chart";
import AnalyticsCards from "./analytics-cards";
import AnalyticsHeader from "./analytics-header";
import FileTypeChart from "./file-type-chart";
import ModelUsageChart from "./model-usage-chart";
import RecentUsage from "./recent-usage";

import { getAnalytics } from "@/services/analytics/analytics.service";

export default async function AnalyticsPage() {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    select: {
      id: true,
      plan: true,
    },
  });

  if (!user) {
    redirect("/login");
  }

  const analytics = await getAnalytics(user.id);

  return (
    <>
      <AnalyticsHeader plan={user.plan} />

      <main className="space-y-8 px-6 pb-10">
        <AnalyticsCards
          cards={analytics.cards}
          plan={user.plan}
        />

        <ActivityChart
          data={analytics.activity}
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <ModelUsageChart
            data={analytics.modelUsage}
          />

          <FileTypeChart
            data={analytics.fileTypes}
          />
        </div>

        <RecentUsage
          activities={analytics.activities}
        />
      </main>

      <Footer />
    </>
  );
}