"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { authClient } from "@/lib/auth-client";
import {
  FaBook,
  FaBug,
  FaClipboardList,
  FaLightbulb,
  FaPaperPlane,
  FaRobot,
  FaUser,
  FaSpinner,
  FaEraser,
} from "react-icons/fa";

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL || "https://ict-boost-server.vercel.app";

type Message = {
  role: "user" | "assistant";
  content: string;
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
  const [activeTool, setActiveTool] = useState("explain");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const userEmail = session?.user?.email;
  const currentTool = tools.find((t) => t.id === activeTool)!;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Load chat history on mount
  useEffect(() => {
    console.log("[chat] Session email:", userEmail);

    if (!userEmail) {
      setHistoryLoading(false);
      return;
    }

    const fetchHistory = async () => {
      try {
        console.log("[chat] Fetching history for:", userEmail);
        const res = await fetch(`${BASE_URL}/chat/history?email=${encodeURIComponent(userEmail)}`);
        const data = await res.json();
        console.log("[chat] History response:", data);

        if (data.success && data.data.length > 0) {
          const loaded: Message[] = data.data.map((msg: any) => ({
            role: msg.role,
            content: msg.content,
          }));
          setMessages(loaded);
        }
      } catch (error) {
        console.log("[chat] History error:", error);
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
        console.log("[chat] No user email, skipping save");
        return;
      }

      console.log("[chat] Saving message:", { email: userEmail, role, content: content.substring(0, 50) });

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
        const data = await res.json();
        console.log("[chat] Save response:", data);
      } catch (error) {
        console.log("[chat] Save error:", error);
      }
    },
    [userEmail, activeTool]
  );

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    console.log("[chat] handleSend called, userEmail:", userEmail);

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
      console.log(error);
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
        console.log(error);
      }
    }
  };

  const switchTool = (toolId: string) => {
    setActiveTool(toolId);
    setMessages([]);
    setInput("");
  };

  return (
    <section className="max-w-5xl mx-auto px-4 py-10 space-y-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <span className="inline-flex items-center gap-2 bg-orange-500/10 text-orange-500 px-4 py-2 rounded-full text-sm font-semibold border border-orange-500/15">
          <FaRobot size={14} />
          AI Powered
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold text-base-content">
          ICTBoost AI Tutor
        </h1>
        <p className="text-base-content/60 max-w-xl mx-auto">
          Learn HTML and C Programming with your AI learning assistant.
        </p>
      </div>

      {/* Tool Selection */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {tools.map((tool) => {
          const Icon = tool.icon;
          const isActive = activeTool === tool.id;

          return (
            <button
              key={tool.id}
              onClick={() => switchTool(tool.id)}
              className={`card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer text-left ${
                isActive
                  ? "bg-orange-500 text-white shadow-xl border border-orange-500"
                  : "bg-base-100 shadow-lg border border-base-300/50 hover:border-orange-300/50"
              }`}
            >
              <div className="card-body py-5 px-5 space-y-2">
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all duration-300 ${
                      isActive ? "bg-white/20" : "bg-orange-500/10"
                    }`}
                  >
                    <span className={isActive ? "text-white" : "text-orange-500"}>
                      <Icon size={18} />
                    </span>
                  </div>
                  <h3 className={`font-bold text-sm ${isActive ? "text-white" : "text-base-content"}`}>
                    {tool.title}
                  </h3>
                </div>
                <p className={`text-xs ${isActive ? "text-white/80" : "text-base-content/60"}`}>
                  {tool.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Chat Section */}
      <div className="bg-base-100 shadow-xl border border-base-300/50 rounded-2xl">
        {/* Chat Header */}
        <div className="border-b border-base-300/50 py-4 px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500">
                <span className="text-white">
                  <FaRobot size={18} />
                </span>
              </div>
              <div>
                <h3 className="font-bold text-base-content">Chat with AI Tutor</h3>
                <p className="text-xs text-base-content/50">
                  Currently in: <span className="text-orange-500 font-semibold">{currentTool.title}</span> mode
                </p>
              </div>
            </div>
            {messages.length > 0 && (
              <button
                onClick={clearChat}
                className="btn btn-sm btn-ghost text-base-content/40 hover:text-red-500 gap-2"
              >
                <FaEraser size={14} />
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Messages */}
        <div className="h-[450px] overflow-y-auto px-6 py-4 space-y-4">
          {/* History loading */}
          {historyLoading && (
            <div className="flex flex-col items-center justify-center h-full text-base-content/40">
              <span className="loading loading-spinner loading-lg text-orange-500" />
              <p className="mt-4 text-sm">Loading chat history...</p>
            </div>
          )}

          {/* Empty state */}
          {!historyLoading && messages.length === 0 && !loading && (
            <div className="flex flex-col items-center justify-center h-full text-base-content/40 space-y-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-orange-500/10">
                <span className="text-orange-400">
                  <FaRobot size={40} />
                </span>
              </div>
              <div className="text-center">
                <p className="text-lg font-medium text-base-content/60">
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
                <p className="text-sm text-base-content/40 mt-1">{currentTool.placeholder}</p>
              </div>
            </div>
          )}

          {/* Messages */}
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.role === "assistant" && (
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-500 mt-1">
                  <span className="text-white">
                    <FaRobot size={14} />
                  </span>
                </div>
              )}

              <div
                className={`max-w-[75%] rounded-2xl px-5 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
                  msg.role === "user"
                    ? "bg-orange-500 text-white rounded-br-md"
                    : "bg-base-200 text-base-content rounded-bl-md"
                }`}
              >
                {msg.content}
              </div>

              {msg.role === "user" && (
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-base-300 mt-1">
                  <span className="text-base-content/60">
                    <FaUser size={14} />
                  </span>
                </div>
              )}
            </div>
          ))}

          {/* Loading Indicator */}
          {loading && (
            <div className="flex gap-3 justify-start">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-500 mt-1">
                <span className="text-white">
                  <FaRobot size={14} />
                </span>
              </div>
              <div className="bg-base-200 rounded-2xl rounded-bl-md px-5 py-4">
                <span className="flex items-center gap-2 text-base-content/50 text-sm">
                  <span className="animate-spin">
                    <FaSpinner size={14} />
                  </span>
                  Thinking...
                </span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Section */}
        <div className="border-t border-base-300/50 px-6 py-4">
          <div className="flex items-end gap-3">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder={currentTool.placeholder}
              rows={1}
              className="textarea textarea-bordered w-full resize-none focus:outline-orange-400 min-h-[48px] max-h-[150px]"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || loading}
              className="btn bg-orange-500 hover:bg-orange-600 border-none text-white shrink-0 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105"
            >
              <FaPaperPlane size={16} />
            </button>
          </div>
          <p className="text-xs text-base-content/40 mt-2">
            Press <kbd className="kbd kbd-xs">Enter</kbd> to send,{" "}
            <kbd className="kbd kbd-xs">Shift+Enter</kbd> for new line
          </p>
        </div>
      </div>
    </section>
  );
};

export default AgentPage;
