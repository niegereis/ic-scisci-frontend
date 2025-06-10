import { ChatProvider } from "@/contexts/ChatContext";
import SidebarClient from "./SidebarClient";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ChatProvider>
      <div className="flex h-[calc(100vh-80px)]">
        <div className="w-64 bg-gray-800 text-white flex flex-col">
          <div className="p-4 border-b border-gray-700">
            <h1 className="font-bold text-lg">Minhas Conversas</h1>
          </div>
          <SidebarClient />
        </div>

        <main className="flex-1">{children}</main>
      </div>
    </ChatProvider>
  );
}
