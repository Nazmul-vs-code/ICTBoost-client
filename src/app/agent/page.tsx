"use client";

import { useState, useRef, useEffect } from "react";
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
  const [activeTool, setActiveTool] = useState("explain");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const currentTool = tools.find((t) => t.id === activeTool)!;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    const userMessage: Message = { role: "user", content: trimmed };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

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
    } catch (error) {
      console.log(error);
      const errorMessage: Message = {
        role: "assistant",
        content: error instanceof Error ? error.message : "Sorry, something went wrong. Please try again.",
      };
      setMessages((prev) => [...prev, errorMessage]);
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
    // Auto-resize textarea
    e.target.style.height = "auto";
    e.target.style.height = Math.min(e.target.scrollHeight, 150) + "px";
  };

  const clearChat = () => {
    setMessages([]);
    setInput("");
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
        <span className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-semibold">
          <FaRobot size={14} />
          AI Powered
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
          ICTBoost AI Tutor
        </h1>
        <p className="text-gray-500 max-w-xl mx-auto">
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
                  : "bg-white shadow-lg border border-orange-100 hover:border-orange-300"
              }`}
            >
              <div className="card-body py-5 px-5 space-y-2">
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all duration-300 ${
                      isActive
                        ? "bg-white/20"
                        : "bg-orange-100"
                    }`}
                  >
                    <span className={isActive ? "text-white" : "text-orange-500"}>
                      <Icon size={18} />
                    </span>
                  </div>
                  <h3 className={`font-bold text-sm ${isActive ? "text-white" : "text-gray-800"}`}>
                    {tool.title}
                  </h3>
                </div>
                <p className={`text-xs ${isActive ? "text-white/80" : "text-gray-500"}`}>
                  {tool.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Chat Section */}
      <div className="card bg-white shadow-xl border border-orange-100">
        {/* Chat Header */}
        <div className="card-body border-b border-orange-100 py-4 px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500">
                <span className="text-white">
                  <FaRobot size={18} />
                </span>
              </div>
              <div>
                <h3 className="font-bold text-gray-800">Chat with AI Tutor</h3>
                <p className="text-xs text-gray-400">
                  Currently in: <span className="text-orange-500 font-semibold">{currentTool.title}</span> mode
                </p>
              </div>
            </div>
            {messages.length > 0 && (
              <button
                onClick={clearChat}
                className="btn btn-sm btn-ghost text-gray-400 hover:text-red-500 gap-2"
              >
                <FaEraser size={14} />
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Messages */}
        <div className="h-[450px] overflow-y-auto px-6 py-4 space-y-4">
          {messages.length === 0 && !loading && (
            <div className="flex flex-col items-center justify-center h-full text-gray-400 space-y-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-orange-50">
                <span className="text-orange-300">
                  <FaRobot size={40} />
                </span>
              </div>
              <div className="text-center">
                <p className="text-lg font-medium text-gray-500">
                  Ask me anything about {currentTool.title === "Explain Concept" ? "HTML and C Programming" : currentTool.title === "Debug Code" ? "your code" : currentTool.title === "Generate Quiz" ? "HTML and C topics" : "practice problems"}!
                </p>
                <p className="text-sm text-gray-400 mt-1">
                  {currentTool.placeholder}
                </p>
              </div>
            </div>
          )}

          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex gap-3 ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
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
                    : "bg-gray-100 text-gray-700 rounded-bl-md"
                }`}
              >
                {msg.content}
              </div>

              {msg.role === "user" && (
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-200 mt-1">
                  <span className="text-gray-500">
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
              <div className="bg-gray-100 rounded-2xl rounded-bl-md px-5 py-4">
                <span className="flex items-center gap-2 text-gray-400 text-sm">
                  <span className="animate-spin"><FaSpinner size={14} /></span>
                  Thinking...
                </span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Section */}
        <div className="border-t border-orange-100 px-6 py-4">
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
          <p className="text-xs text-gray-400 mt-2">
            Press <kbd className="kbd kbd-xs">Enter</kbd> to send, <kbd className="kbd kbd-xs">Shift+Enter</kbd> for new line
          </p>
        </div>
      </div>
    </section>
  );
};

export default AgentPage;
