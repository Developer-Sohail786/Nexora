import { auth } from "@/auth";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";

import FileLayout from "./file-layout";

const PAGE_SIZE = 6;

interface FilesPageProps {
  searchParams: Promise<{
    page?: string;
  }>;
}

export default async function FilesPage({
  searchParams,
}: FilesPageProps) {
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
    },
  });

  if (!user) {
    redirect("/login");
  }

  const { page } = await searchParams;

  const currentPage = Number(page ?? "1");

  const totalFiles = await prisma.file.count({
    where: {
      userId: user.id,
    },
  });

  const totalPages = Math.max(
    1,
    Math.ceil(totalFiles / PAGE_SIZE),
  );

  const files = await prisma.file.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
    skip: (currentPage - 1) * PAGE_SIZE,
    take: PAGE_SIZE,
  });

  return (
    <FileLayout
      files={files}
      page={currentPage}
      totalPages={totalPages}
    />
  );
}