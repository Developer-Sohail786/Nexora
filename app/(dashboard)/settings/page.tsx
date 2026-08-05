import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

import SettingsHeader from "./settings-header";
import ProfileSettings from "./profile-settings";
import SubscriptionCard from "./subscription-card";


export default async function SettingsPage() {
  const session = await auth();

  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email ?? "",
    },
  });

  if (!user) {
    return null;
  }

  return (
    <main className="flex-1 overflow-y-auto bg-[#111018] px-8 py-8">
      <div className="mx-auto max-w-7xl">
        <SettingsHeader />

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_340px]">
          <ProfileSettings user={user} />

         
          <SubscriptionCard user={user} />
        </div>
      </div>
    </main>
  );
}