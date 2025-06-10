"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
} from "react";
import { useRouter } from "next/navigation";
export interface Message {
  text: string;
  sender: "user" | "ai";
}

export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
}

interface AppState {
  conversations: Conversation[];
  activeConversationId: string | null;
}

interface ChatContextType extends AppState {
  setActiveConversationId: (id: string | null) => void;
  updateConversationTitle: (conversationId: string, newTitle: string) => void;
  deleteConversation: (conversationId: string) => void;
  getMessages: () => Message[];
  addMessage: (message: Message, conversationId: string) => void;
  updateLastMessage: (chunk: string, conversationId: string) => void;
  startNewChat: () => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [appState, setAppState] = useState<AppState>({
    conversations: [],
    activeConversationId: null,
  });
  const [isHydrated, setIsHydrated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    try {
      const savedState = localStorage.getItem("chatAppState");
      if (savedState) {
        setAppState(JSON.parse(savedState));
      }
    } catch (error) {
      console.error("Falha ao carregar estado do localStorage:", error);
    }
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem("chatAppState", JSON.stringify(appState));
    }
  }, [appState, isHydrated]);

  const setActiveConversationId = useCallback((id: string | null) => {
    setAppState((prevState) => ({ ...prevState, activeConversationId: id }));
  }, []);

  const getMessages = useCallback(() => {
    const activeConvo = appState.conversations.find(
      (c) => c.id === appState.activeConversationId
    );
    return activeConvo ? activeConvo.messages : [];
  }, [appState.activeConversationId, appState.conversations]);

  const addMessage = useCallback((message: Message, conversationId: string) => {
    setAppState((prevState) => ({
      ...prevState,
      conversations: prevState.conversations.map((convo) =>
        convo.id === conversationId
          ? { ...convo, messages: [...convo.messages, message] }
          : convo
      ),
    }));
  }, []);

  const updateConversationTitle = useCallback(
    (conversationId: string, newTitle: string) => {
      setAppState((prevState) => ({
        ...prevState,
        conversations: prevState.conversations.map((convo) =>
          convo.id === conversationId ? { ...convo, title: newTitle } : convo
        ),
      }));
    },
    []
  );

  const updateLastMessage = useCallback(
    (chunk: string, conversationId: string) => {
      setAppState((prevState) => {
        const newConversations = prevState.conversations.map((convo) => {
          if (convo.id === conversationId && convo.messages.length > 0) {
            const lastMessage = convo.messages[convo.messages.length - 1];
            if (lastMessage.sender === "ai") {
              const updatedLastMessage = {
                ...lastMessage,
                text: lastMessage.text + chunk,
              };
              return {
                ...convo,
                messages: [...convo.messages.slice(0, -1), updatedLastMessage],
              };
            }
          }
          return convo;
        });
        return { ...prevState, conversations: newConversations };
      });
    },
    []
  );

  const deleteConversation = useCallback((conversationId: string) => {
    setAppState((prevState) => {
      const newConversations = prevState.conversations.filter(
        (convo) => convo.id !== conversationId
      );

      let newActiveId = prevState.activeConversationId;
      if (prevState.activeConversationId === conversationId) {
        newActiveId = null;
      }

      return {
        conversations: newConversations,
        activeConversationId: newActiveId,
      };
    });
  }, []);

  const startNewChat = useCallback(() => {
    const newId = `convo-${Date.now()}`;
    const newConversation: Conversation = {
      id: newId,
      title: `Nova Conversa`,
      messages: [],
    };

    setAppState((prevState) => ({
      activeConversationId: newId,
      conversations: [newConversation, ...prevState.conversations],
    }));

    router.push(`/chat/${newId}`);
  }, [router]);

  return (
    <ChatContext.Provider
      value={{
        ...appState,
        setActiveConversationId,
        updateConversationTitle,
        getMessages,
        addMessage,
        updateLastMessage,
        startNewChat,
        isLoading,
        setIsLoading,
        deleteConversation,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};
