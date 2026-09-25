import type { Metadata } from "next"
import DashboardLayout from "@/components/layout/dashboard-layout"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { UploadProvider } from "@/components/providers/upload-provider"

export const metadata: Metadata = {
  title: "Dashboard | Nexora",
  description: "Your Nexora AI workspace.",
}

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email ?? "",
    },
  })

  const chats = await prisma.chat.findMany({
    where: {
      userId: user?.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  return (
    <UploadProvider>
      <DashboardLayout chats={chats}>
        {children}
      </DashboardLayout>
    </UploadProvider>
  )
}