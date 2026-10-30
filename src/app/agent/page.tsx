"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { authClient } from "@/lib/auth-client";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  FaBook,
  FaBug,
  FaClipboardList,
  FaLightbulb,
  FaPaperPlane,
  FaRobot,
  FaUser,
  FaEraser,
} from "react-icons/fa";

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL || "https://ict-boost-server.vercel.app";

type Message = {
  role: "user" | "assistant";
  content: string;
};

type ChatHistoryResponse = {
  success: boolean;
  data?: Array<{
    role: string;
    content: string;
  }>;
};

type Tool = {
  id: string;
  title: string;
  description: string;
  icon: typeof FaBook;
  placeholder: string;
};

const tools: Tool[] = [
  {
    id: "explain",
    title: "Explain Concept",
    description: "Get beginner-friendly explanations of HTML and C concepts.",
    icon: FaBook,
    placeholder: "e.g. What are HTML tags? Explain C pointers...",
  },
  {
    id: "debug",
    title: "Debug Code",
    description: "Paste your code and get errors identified and fixed.",
    icon: FaBug,
    placeholder: "Paste your HTML or C code here...",
  },
  {
    id: "quiz",
    title: "Generate Quiz",
    description: "Get 5 MCQs to test your knowledge on any topic.",
    icon: FaClipboardList,
    placeholder: "e.g. Quiz me on HTML forms, C arrays...",
  },
  {
    id: "practice",
    title: "Practice Problems",
    description: "Get practice problems to sharpen your skills.",
    icon: FaLightbulb,
    placeholder: "e.g. Give me beginner C exercises...",
  },
];

const AgentPage = () => {
  const { data: session } = authClient.useSession();
  const shouldReduceMotion = useReducedMotion();
  const [activeTool, setActiveTool] = useState("explain");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(true);
  const [historyError, setHistoryError] = useState("");
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const userEmail = session?.user?.email;
  const currentTool = tools.find((t) => t.id === activeTool)!;

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;

    container.scrollTo({
      top: container.scrollHeight,
      behavior: shouldReduceMotion ? "instant" : "smooth",
    });
  }, [messages, loading, shouldReduceMotion]);

  // Load chat history on mount
  useEffect(() => {
    if (!userEmail) {
      return;
    }

    const fetchHistory = async () => {
      try {
        const res = await fetch(`${BASE_URL}/chat/history?email=${encodeURIComponent(userEmail)}`);
        if (!res.ok) {
          throw new Error(`Unable to load chat history (${res.status}).`);
        }

        const data: ChatHistoryResponse = await res.json();
        if (data.success && Array.isArray(data.data)) {
          const loaded = data.data.filter(
            (msg): msg is { role: Message["role"]; content: string } =>
              (msg.role === "user" || msg.role === "assistant") &&
              typeof msg.content === "string"
          );
          setMessages(loaded);
        }
      } catch (error) {
        console.error("[chat] History error:", error);
        setHistoryError(
          error instanceof Error ? error.message : "Unable to load chat history."
        );
      } finally {
        setHistoryLoading(false);
      }
    };

    fetchHistory();
  }, [userEmail]);

  // Save a message to backend
  const saveMessage = useCallback(
    async (role: "user" | "assistant", content: string) => {
      if (!userEmail) {
        return;
      }

      try {
        const res = await fetch(`${BASE_URL}/chat/save`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: userEmail,
            role,
            content,
            tool: activeTool,
          }),
        });
        if (!res.ok) {
          throw new Error(`Unable to save chat message (${res.status}).`);
        }
      } catch (error) {
        console.error("[chat] Save error:", error);
      }
    },
    [userEmail, activeTool]
  );

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    const userMessage: Message = { role: "user", content: trimmed };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    // Save user message
    await saveMessage("user", trimmed);

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed, tool: activeTool }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to get response.");
      }

      const assistantMessage: Message = { role: "assistant", content: data.text };
      setMessages((prev) => [...prev, assistantMessage]);

      // Save assistant message
      saveMessage("assistant", data.text);
    } catch (error) {
      console.error("[chat] Response error:", error);
      const errorMessage: Message = {
        role: "assistant",
        content: error instanceof Error ? error.message : "Sorry, something went wrong. Please try again.",
      };
      setMessages((prev) => [...prev, errorMessage]);

      // Save error message
      saveMessage("assistant", errorMessage.content);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = Math.min(e.target.scrollHeight, 150) + "px";
  };

  const clearChat = async () => {
    setMessages([]);
    setInput("");

    if (userEmail) {
      try {
        await fetch(`${BASE_URL}/chat/clear?email=${encodeURIComponent(userEmail)}`, {
          method: "DELETE",
        });
      } catch (error) {
        console.error("[chat] Clear error:", error);
      }
    }
  };

  const switchTool = (toolId: string) => {
    setActiveTool(toolId);
    setMessages([]);
    setInput("");
  };

  return (
    <section
      className="agent-workspace mx-auto flex h-[calc(100dvh-4rem)] min-h-0 max-w-7xl flex-col gap-3 overflow-hidden px-3 py-3 sm:gap-4 sm:px-6 sm:py-4 lg:px-8"
      id="agent-workspace"
    >
      {/* Header */}
      <motion.div
        className="flex shrink-0 items-center justify-between gap-4"
        initial={shouldReduceMotion ? false : { opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <div className="min-w-0">
          <div className="mb-1 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-orange-500">
            <span className="agent-status-dot" />
            AI learning system / online
          </div>
          <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
            ICTBoost AI Tutor
          </h1>
          <p className="hidden text-sm text-base-content/60 sm:block">
            Your focused companion for HTML and C programming.
          </p>
        </div>
        <div className="hidden items-center gap-2 rounded-full border border-base-300/60 bg-base-100/60 px-3 py-2 font-mono text-[10px] tracking-wide text-base-content/50 sm:flex">
          <span className="size-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgb(52_211_153_/_70%)]" />
          SESSION READY
        </div>
      </motion.div>

      <div className="grid shrink-0 grid-cols-4 gap-1.5 sm:gap-3">
        {tools.map((tool, index) => {
          const Icon = tool.icon;
          const isActive = activeTool === tool.id;

          return (
            <motion.button
              key={tool.id}
              type="button"
              aria-pressed={isActive}
              onClick={() => switchTool(tool.id)}
              className="agent-tool group relative flex min-h-16 flex-col items-center justify-center gap-1 rounded-2xl border px-1 py-2 text-center transition-colors sm:min-h-[4.25rem] sm:flex-row sm:justify-start sm:gap-3 sm:px-4 sm:text-left"
              data-active={isActive}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.06, duration: 0.35 }}
              whileHover={shouldReduceMotion ? undefined : { y: -2 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
            >
              <span className="agent-tool-icon grid size-7 shrink-0 place-items-center rounded-lg sm:size-9 sm:rounded-xl">
                <Icon size={14} />
              </span>
              <span className="min-w-0 max-w-full">
                <span className="block truncate text-[9px] font-semibold sm:text-xs md:text-sm">
                  {tool.title}
                </span>
                <span className="mt-0.5 hidden truncate text-[11px] text-base-content/50 md:block">
                  {tool.description}
                </span>
              </span>
              {isActive && <span className="agent-tool-indicator absolute right-2 top-2 hidden sm:block" />}
            </motion.button>
          );
        })}
      </div>

      {/* Chat Section */}
      <div className="agent-chat-panel glass-card flex min-h-0 flex-1 flex-col overflow-hidden">
        {/* Chat Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-base-300/50 px-4 py-3 sm:px-5">
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="agent-orb grid size-10 place-items-center rounded-xl">
                <FaRobot size={17} />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-base-content sm:text-base">
                  Chat with AI Tutor
                </h2>
                <p className="text-[11px] text-base-content/50">
                  Active mode: <span className="font-semibold text-orange-500">{currentTool.title}</span>
                </p>
              </div>
            </div>
            {messages.length > 0 && (
              <button
                onClick={clearChat}
                className="agent-clear-btn btn btn-sm gap-2 text-base-content/60"
                type="button"
              >
                <FaEraser size={14} />
                <span className="hidden sm:inline">Clear chat</span>
              </button>
            )}
          </div>
        </div>

        {/* Messages */}
        <div
          aria-live="polite"
          className="agent-messages min-h-0 flex-1 space-y-4 overflow-y-auto overscroll-contain px-3 py-4 sm:px-5"
          ref={messagesContainerRef}
          role="log"
        >
          {/* History loading */}
          {historyLoading && userEmail && (
            <div className="flex h-full flex-col items-center justify-center text-base-content/50">
              <span className="loading loading-spinner loading-lg text-orange-500" />
              <p className="mt-4 text-sm">Loading chat history...</p>
            </div>
          )}

          {!historyLoading && historyError && (
            <div className="mx-auto max-w-lg rounded-2xl border border-rose-500/20 bg-rose-500/5 px-4 py-3 text-center text-sm text-rose-500">
              {historyError}
            </div>
          )}

          {/* Empty state */}
          {(!historyLoading || !userEmail) &&
            !historyError &&
            messages.length === 0 &&
            !loading && (
            <div className="flex h-full flex-col items-center justify-center space-y-4 text-base-content/50">
              <div className="agent-empty-orb grid size-16 place-items-center rounded-full sm:size-[4.5rem]">
                <FaRobot className="text-orange-500" size={30} />
              </div>
              <div className="text-center">
                <p className="text-base font-medium text-base-content sm:text-lg">
                  Ask me anything about{" "}
                  {currentTool.title === "Explain Concept"
                    ? "HTML and C Programming"
                    : currentTool.title === "Debug Code"
                    ? "your code"
                    : currentTool.title === "Generate Quiz"
                    ? "HTML and C topics"
                    : "practice problems"}
                  !
                </p>
                <p className="mt-1 max-w-md text-xs text-base-content/50 sm:text-sm">{currentTool.placeholder}</p>
              </div>
            </div>
          )}

          {/* Messages */}
          <AnimatePresence initial={false}>
            {messages.map((msg, index) => (
              <motion.div
                key={`${index}-${msg.role}`}
                className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                {msg.role === "assistant" && (
                  <div className="agent-avatar mt-1 grid size-8 shrink-0 place-items-center rounded-full">
                    <FaRobot size={13} />
                  </div>
                )}

                <div
                  className={`agent-message max-w-[88%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-relaxed sm:max-w-[75%] sm:px-5 ${
                    msg.role === "user"
                      ? "agent-message-user rounded-br-md"
                      : "agent-message-assistant rounded-bl-md"
                  }`}
                >
                  {msg.content}
                </div>

                {msg.role === "user" && (
                  <div className="agent-user-avatar mt-1 grid size-8 shrink-0 place-items-center rounded-full">
                    <FaUser size={12} />
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Loading Indicator */}
          {loading && (
            <motion.div
              className="flex justify-start gap-3"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="agent-avatar mt-1 grid size-8 shrink-0 place-items-center rounded-full">
                <FaRobot size={13} />
              </div>
              <div className="agent-message-assistant flex items-center gap-2 rounded-2xl rounded-bl-md px-4 py-3 text-sm text-base-content/60">
                <span className="agent-thinking-dots" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </span>
                Thinking
              </div>
            </motion.div>
          )}
        </div>

        {/* Input Section */}
        <div className="shrink-0 border-t border-base-300/50 px-3 py-3 sm:px-5 sm:py-4">
          <div className="flex items-end gap-3">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder={currentTool.placeholder}
              rows={1}
              aria-label="Message the AI tutor"
              className="agent-composer textarea w-full resize-none focus:outline-none"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || loading}
              aria-label="Send message"
              className="agent-send-btn grid size-12 shrink-0 place-items-center rounded-2xl text-orange-500 disabled:cursor-not-allowed disabled:opacity-40"
              type="button"
            >
              <FaPaperPlane size={16} />
            </button>
          </div>
          <p className="agent-hint mt-2 text-[10px] text-base-content/40 sm:text-xs">
            Press <kbd className="kbd kbd-xs">Enter</kbd> to send,{" "}
            <kbd className="kbd kbd-xs">Shift+Enter</kbd> for new line
          </p>
        </div>
      </div>
    </section>
  );
};

export default AgentPage;
