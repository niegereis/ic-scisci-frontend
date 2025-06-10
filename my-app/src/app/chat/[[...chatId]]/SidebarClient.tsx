"use client";

import { useChat } from "@/contexts/ChatContext";
import Link from "next/link";
import { FiMessageSquare, FiPlus, FiTrash2 } from "react-icons/fi";

export default function SidebarClient() {
  const {
    conversations,
    startNewChat,
    activeConversationId,
    deleteConversation,
  } = useChat();

  const handleDelete = (e: React.MouseEvent, conversationId: string) => {
    e.stopPropagation();
    e.preventDefault();

    if (window.confirm("Tem certeza que deseja deletar esta conversa?")) {
      deleteConversation(conversationId);
    }
  };

  return (
    <>
      <div className="p-2">
        <button
          onClick={startNewChat}
          className="w-full flex items-center gap-2 p-2 rounded hover:bg-gray-700"
        >
          <FiPlus />
          Nova Conversa
        </button>
      </div>
      <nav className="flex-1 overflow-y-auto p-2 space-y-1">
        {conversations.map((convo) => (
          <Link key={convo.id} href={`/chat/${convo.id}`} className="block">
            <div
              className={`flex items-center justify-between gap-2 p-2 rounded cursor-pointer ${
                activeConversationId === convo.id
                  ? "bg-gray-600"
                  : "hover:bg-gray-700"
              }`}
            >
              <div className="flex items-center gap-2 truncate">
                <FiMessageSquare />
                <span className="truncate flex-1">{convo.title}</span>
              </div>
              <button
                onClick={(e) => handleDelete(e, convo.id)}
                className="p-1 rounded hover:bg-red-500/50 text-gray-400 hover:text-white"
                aria-label="Deletar conversa"
              >
                <FiTrash2 />
              </button>
            </div>
          </Link>
        ))}
      </nav>
    </>
  );
}
