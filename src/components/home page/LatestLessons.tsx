"use client";

import { GetApiFunction } from "@/lib/api/get-api";
import HtmlLessonCard from "@/components/html/HtmlLessonCard";
import CLessonCard from "@/components/c/CLessonCard";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FaArrowRight,
  FaCode,
  FaHtml5,
  FaStar,
  FaRocket,
} from "react-icons/fa";

type Lesson = {
  _id: string;
  title: string;
  videoUrl: string;
  referenceUrl: string;
  description: string;
  difficulty: string;
  authorEmail: string;
};

/* ──────────── Skeleton Card ──────────── */
function SkeletonCard({ accent }: { accent: "orange" | "blue" }) {
  const ring = accent === "orange" ? "bg-zinc-700" : "bg-zinc-700";
  return (
    <div className="theme-adaptive flex h-[31rem] flex-col border border-zinc-800 bg-zinc-900 p-6 animate-pulse">
      {/* icon placeholder */}
      <div className="flex items-start justify-between">
        <div className="flex gap-4">
          <div className={`h-14 w-14 rounded-2xl ${ring}`} />
          <div className="space-y-3 pt-1">
            <div className="h-5 w-40 bg-zinc-700" />
            <div className="h-4 w-20 bg-zinc-800" />
          </div>
        </div>
        <div className="h-8 w-8 bg-zinc-800" />
      </div>
      {/* lines */}
      <div className="space-y-2.5">
        <div className="h-3.5 w-full bg-zinc-800" />
        <div className="h-3.5 w-5/6 bg-zinc-800" />
        <div className="h-3.5 w-2/3 bg-zinc-800" />
      </div>
      {/* link bars */}
      <div className="mt-auto space-y-2.5">
        <div className="h-11 w-full bg-zinc-800" />
        <div className="h-11 w-full bg-zinc-800" />
      </div>
      {/* button */}
      <div className="h-12 w-full bg-zinc-800" />
    </div>
  );
}

/* ──────────── Section Wrapper ──────────── */
function SectionShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="border-t border-zinc-800 pt-12">{children}</div>
  );
}

/* ──────────── Main Component ──────────── */
const LatestLessons = () => {
  const [htmlLessons, setHtmlLessons] = useState<Lesson[]>([]);
  const [cLessons, setCLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const [htmlResult, cResult] = await Promise.all([
          GetApiFunction("/lesson/html"),
          GetApiFunction("/lesson/c"),
        ]);
        setHtmlLessons(htmlResult.data.slice(0, 3));
        setCLessons(cResult.data.slice(0, 3));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchLessons();
  }, []);

  const hasLessons = htmlLessons.length > 0 || cLessons.length > 0;

  if (!loading && !hasLessons) return null;

  return (
    <section className="theme-adaptive relative overflow-hidden py-24">
      <div className="mx-auto max-w-7xl space-y-20 px-4 sm:px-6 lg:px-8">

        {/* ════════════════════ HTML Section ════════════════════ */}
        {htmlLessons.length > 0 && (
          <SectionShell>
            <div className="space-y-12">
              {/* Header */}
              <div className="space-y-5">
                <div className="inline-flex items-center gap-2 border border-zinc-700 px-3 py-2 font-mono text-xs uppercase tracking-wider text-zinc-300 animate-slide-up opacity-0">
                  <FaHtml5 size={15} />
                  Fresh Content
                  <FaStar size={10} className="opacity-50" />
                </div>
                <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl animate-slide-up opacity-0 delay-100">
                  Latest{" "}
                  <span className="text-zinc-400">HTML</span>{" "}
                  Lessons
                </h2>
                <p className="max-w-2xl leading-7 text-zinc-400 animate-slide-up opacity-0 delay-200">
                  Jump into our newest HTML lessons crafted by expert teachers.
                  Start from scratch or level up your skills.
                </p>
              </div>

              {/* Skeleton */}
              {loading && (
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <SkeletonCard key={i} accent="orange" />
                  ))}
                </div>
              )}

              {/* Cards */}
              {!loading && (
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {htmlLessons.map((lesson, i) => (
                    <div
                      key={lesson._id}
                      className="animate-slide-up opacity-0"
                      style={{ animationDelay: `${i * 120}ms` }}
                    >
                      <HtmlLessonCard lesson={lesson} />
                    </div>
                  ))}
                </div>
              )}

              {/* CTA Button */}
              {!loading && (
                <div className="text-center pt-4 animate-fade-in">
                  <Link
                    href="/html"
                    className="inline-flex min-h-12 items-center gap-3 bg-white px-6 py-3 font-medium text-black transition-all duration-200 hover:bg-zinc-200"
                  >
                    <FaRocket
                      size={16}
                      className="transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110"
                    />
                    View All HTML Lessons
                    <FaArrowRight
                      size={14}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </Link>
                </div>
              )}
            </div>
          </SectionShell>
        )}

        {/* ════════════════════ C Programming Section ════════════════════ */}
        {cLessons.length > 0 && (
          <SectionShell>
            <div className="space-y-12">
              {/* Header */}
              <div className="space-y-5">
                <div className="inline-flex items-center gap-2 border border-zinc-700 px-3 py-2 font-mono text-xs uppercase tracking-wider text-zinc-300 animate-slide-up opacity-0">
                  <FaCode size={15} />
                  Programming
                  <FaStar size={10} className="opacity-50" />
                </div>
                <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl animate-slide-up opacity-0 delay-100">
                  Latest{" "}
                  <span className="text-zinc-400">C Programming</span>{" "}
                  Lessons
                </h2>
                <p className="max-w-2xl leading-7 text-zinc-400 animate-slide-up opacity-0 delay-200">
                  Dive into our newest C programming lessons. Master fundamentals,
                  data structures, and algorithms from expert teachers.
                </p>
              </div>

              {/* Skeleton */}
              {loading && (
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <SkeletonCard key={i} accent="blue" />
                  ))}
                </div>
              )}

              {/* Cards */}
              {!loading && (
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {cLessons.map((lesson, i) => (
                    <div
                      key={lesson._id}
                      className="animate-slide-up opacity-0"
                      style={{ animationDelay: `${i * 120}ms` }}
                    >
                      <CLessonCard lesson={lesson} />
                    </div>
                  ))}
                </div>
              )}

              {/* CTA Button */}
              {!loading && (
                <div className="text-center pt-4 animate-fade-in">
                  <Link
                    href="/c"
                    className="inline-flex min-h-12 items-center gap-3 bg-white px-6 py-3 font-medium text-black transition-all duration-200 hover:bg-zinc-200"
                  >
                    <FaRocket
                      size={16}
                      className="transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110"
                    />
                    View All C Lessons
                    <FaArrowRight
                      size={14}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </Link>
                </div>
              )}
            </div>
          </SectionShell>
        )}
      </div>
    </section>
  );
};

export default LatestLessons;
