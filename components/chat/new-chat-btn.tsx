"use client";

import { useCreateChat } from "@/hooks/use-create-chat";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function NewChatButton({
  children,
  className,
}: Props) {
  const { createChat } = useCreateChat();

  return (
    <button onClick={createChat} className={className}>
      {children}
    </button>
  );
}