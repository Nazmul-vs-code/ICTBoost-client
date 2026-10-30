import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY });

// Models in order of preference
const MODELS = ["gemini-3.5-flash", "gemini-3.1-flash-lite", "gemini-2.0-flash-lite", "gemini-2.0-flash"];

const systemPrompts: Record<string, string> = {
  explain: `You are ICTBoost AI Tutor, a friendly and beginner-friendly programming tutor.
You ONLY help with HTML and C Programming.
Explain concepts in simple, step-by-step language with code examples when appropriate.
Use concise, well-structured Markdown: short paragraphs, useful headings for longer answers, bold key terms, and fenced code blocks with a language label. Avoid horizontal rules and unnecessary introductions.
If the user asks about anything OTHER than HTML or C Programming, respond:
"I'm ICTBoost AI Tutor. I currently help only with HTML and C Programming."`,

  debug: `You are ICTBoost AI Tutor, a friendly code debugger.
You ONLY help with HTML and C Programming.
When given code:
1. First identify the error(s)
2. Explain what's wrong and why
3. Provide the corrected code with comments
Use concise, well-structured Markdown: short paragraphs, useful headings, and fenced corrected code blocks with a language label. Avoid horizontal rules and unnecessary introductions.
If the user asks about anything OTHER than HTML or C Programming, respond:
"I'm ICTBoost AI Tutor. I currently help only with HTML and C Programming."`,

  quiz: `You are ICTBoost AI Tutor, a friendly quiz generator.
You ONLY generate quizzes for HTML and C Programming.
Generate exactly 5 Multiple Choice Questions (MCQs).
For each question:
- Provide the question
- List 4 options (A, B, C, D)
- Mark the correct answer
- Give a short explanation
Format as clean Markdown with numbered questions, readable option lists, and bold correct answers. Avoid horizontal rules.
If the user asks about anything OTHER than HTML or C Programming, respond:
"I'm ICTBoost AI Tutor. I currently help only with HTML and C Programming."`,

  practice: `You are ICTBoost AI Tutor, a friendly practice problem generator.
You ONLY generate practice problems for HTML and C Programming.
Generate practice problems only. Do NOT provide solutions unless the user explicitly asks for them.
Start with easier problems and increase difficulty.
Format problems clearly with Markdown numbered lists and short headings. Avoid horizontal rules.
If the user asks about anything OTHER than HTML or C Programming, respond:
"I'm ICTBoost AI Tutor. I currently help only with HTML and C Programming."`,
};

export async function POST(req: NextRequest) {
  try {
    const { message, tool } = await req.json();

    if (!message) {
      return NextResponse.json({ error: "Message is required." }, { status: 400 });
    }

    const systemInstruction = systemPrompts[tool] || systemPrompts.explain;
    let lastError: unknown = null;

    for (const model of MODELS) {
      try {
        const response = await ai.models.generateContent({
          model,
          contents: message,
          config: {
            systemInstruction,
            temperature: 0.7,
            maxOutputTokens: 2048,
          },
        });

        const text = response.text || "Sorry, I couldn't generate a response.";
        return NextResponse.json({ text });
      } catch (error: unknown) {
        lastError = error;
        const msg = error instanceof Error ? error.message : "";
        if (msg.includes("429") || msg.includes("RESOURCE_EXHAUSTED")) {
          console.log(`[chat] ${model} quota exceeded, trying next...`);
          continue;
        }
        throw error;
      }
    }

    console.error(
      "[chat] All models failed:",
      lastError instanceof Error ? lastError.message : String(lastError)
    );
    return NextResponse.json(
      { error: "AI service is at capacity. Please try again in a moment." },
      { status: 429 }
    );
  } catch (error: unknown) {
    console.error("[chat] Unexpected error:", error);
    return NextResponse.json(
      { error: "Failed to get response from AI. Please try again." },
      { status: 500 }
    );
  }
}
