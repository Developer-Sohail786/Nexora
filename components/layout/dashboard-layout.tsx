import Navbar from "./navbar";
import Sidebar from "./side-bar";

type Chat = {
  id: string;
  title: string;
  createdAt: Date;
  userId: string;
};

export default function DashboardLayout({
  children,
  chats,
}: {
  children: React.ReactNode;
  chats: Chat[];
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar chats={chats} />

      <div className="flex flex-1 flex-col">
        <Navbar />

        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}