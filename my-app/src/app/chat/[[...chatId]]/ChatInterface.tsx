"use client";

import { FormEvent, useRef, useEffect, useState } from "react";
import { FiSend, FiUser, FiCpu } from "react-icons/fi";
import ReactMarkdown from "react-markdown";
import { useChat } from "@/contexts/ChatContext";

export default function ChatInterface() {
  const {
    getMessages,
    addMessage,
    updateLastMessage,
    updateConversationTitle,
    activeConversationId,
    isLoading,
    setIsLoading,
  } = useChat();

  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const messages = getMessages();

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [input]);

  const handleStreamSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading || !activeConversationId) return;

    const currentInput = input;

    if (messages.length === 0) {
      const newTitle =
        currentInput.length > 40
          ? `${currentInput.substring(0, 40)}...`
          : currentInput;
      updateConversationTitle(activeConversationId, newTitle);
    }

    const userMessage = { text: currentInput, sender: "user" as const };
    addMessage(userMessage, activeConversationId);

    setInput("");
    setIsLoading(true);

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

    addMessage({ text: "", sender: "ai" }, activeConversationId);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: currentInput }),
      });

      if (!response.ok || !response.body) {
        throw new Error("A resposta da rede não foi OK");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });

        if (activeConversationId) {
          updateLastMessage(chunk, activeConversationId);
        }
      }
    } catch (error) {
      console.error("Erro ao buscar resposta do chat:", error);
      if (activeConversationId) {
        updateLastMessage(
          "\n\n*Desculpe, ocorreu um erro ao processar sua pergunta.*",
          activeConversationId
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (!activeConversationId) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400 p-4 text-center">
        Selecione uma conversa na barra lateral ou clique em "Nova Conversa"
        para começar.
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-4 py-8">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex items-start gap-4 my-6 ${
                msg.sender === "user" ? "flex-row-reverse" : ""
              }`}
            >
              <div
                className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                  msg.sender === "user" ? "bg-blue-500" : "bg-gray-700"
                }`}
              >
                {msg.sender === "user" ? (
                  <FiUser className="text-white" />
                ) : (
                  <FiCpu className="text-white" />
                )}
              </div>
              <div
                className={`p-4 rounded-lg max-w-lg prose prose-sm ${
                  msg.sender === "user" ? "bg-blue-100" : "bg-white border"
                }`}
              >
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-start gap-4 my-6">
              <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-gray-700">
                <FiCpu className="text-white animate-pulse" />
              </div>
              <div className="p-4 rounded-lg max-w-lg bg-white border">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="bg-white border-t p-4">
        <form
          onSubmit={handleStreamSubmit}
          className="max-w-3xl mx-auto flex items-center gap-2"
        >
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 overflow-y-hidden"
            placeholder="Digite sua pergunta..."
            rows={1}
            disabled={isLoading}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleStreamSubmit(e);
              }
            }}
          />
          <button
            type="submit"
            className="p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed self-end"
            disabled={isLoading || !input.trim()}
          >
            <FiSend size={20} />
          </button>
        </form>
      </div>
    </div>
  );
}
