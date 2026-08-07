import DashboardHero from "./dashboard-hero";
import RecentActivity from "./recent-activity";
import ProcessingFiles from "./processing-files";
import Footer from "@/components/layout/footer";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  const session = await auth();

  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email ?? "",
    },
    select: {
      id: true,
      username: true,
      name: true,
    },
  });

  if (!user) {
    return (
      <>
        <DashboardHero name="User" />

        <RecentActivity activities={[]} />

        <ProcessingFiles />

        <Footer />
      </>
    );
  }

  const [
    recentChats,
    recentFiles,
    recentImages,
  ] = await Promise.all([
    prisma.chat.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
    }),

    prisma.file.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
    }),

    prisma.message.findMany({
      where: {
        chat: {
          userId: user.id,
        },
        type: "IMAGE",
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
    }),
  ]);

  const activities = [
    ...recentChats.map((chat) => ({
      id: chat.id,
      type: "chat" as const,
      title: chat.title,
      createdAt: chat.createdAt,
    })),

    ...recentFiles.map((file) => ({
      id: file.id,
      type: "file" as const,
      title: file.name,
      createdAt: file.createdAt,
    })),

    ...recentImages.map((image) => ({
      id: image.id,
      type: "image" as const,
      title:
        image.content ??
        "Generated Image",
      createdAt: image.createdAt,
    })),
  ]
    .sort(
      (a, b) =>
        b.createdAt.getTime() -
        a.createdAt.getTime(),
    )
    .slice(0, 6);

  return (
    <>
      <DashboardHero
        name={
          user.username ??
          user.name ??
          "User"
        }
      />

      <RecentActivity
        activities={activities}
      />

      <ProcessingFiles />

      <Footer />
    </>
  );
}