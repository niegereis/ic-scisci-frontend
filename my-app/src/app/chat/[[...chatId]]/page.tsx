"use client";

import { useEffect, use } from "react";
import { useChat } from "@/contexts/ChatContext";
import ChatInterface from "./ChatInterface";
import { useRouter } from "next/navigation";

export default function Page({
  params,
}: {
  params: Promise<{ chatId?: string[] }>;
}) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { setActiveConversationId, conversations } = useChat();

  const chatId = resolvedParams.chatId?.[0] || null;

  useEffect(() => {
    const conversationExists = conversations.some((c) => c.id === chatId);

    if (chatId && !conversationExists && conversations.length > 0) {
      router.replace(`/chat/${conversations[0].id}`);
      return;
    }

    if (!chatId && conversations.length > 0) {
      router.replace(`/chat/${conversations[0].id}`);
      return;
    }

    setActiveConversationId(chatId);
  }, [chatId, conversations, router, setActiveConversationId]);

  return <ChatInterface />;
}
