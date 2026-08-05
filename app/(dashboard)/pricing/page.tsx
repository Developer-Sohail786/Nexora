import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

import PricingHeader from "./pricing-header";
import PricingGrid from "./pricing-grid";

import Footer from "@/components/layout/footer";

export default async function PricingPage() {
  const session = await auth();

  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email ?? "",
    },
    select: {
      plan: true,
    },
  });

  return (
    <div className="flex min-h-screen flex-col bg-[#111018] text-white">
      <main className="flex-1 px-6">
        <PricingHeader />

        <PricingGrid
          currentPlan={user?.plan ?? "FREE"}
        />
      </main>

      <Footer />
    </div>
  );
}