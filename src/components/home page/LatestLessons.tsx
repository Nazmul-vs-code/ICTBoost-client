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
  const ring = accent === "orange" ? "bg-orange-400/20" : "bg-sky-400/20";
  return (
    <div className="rounded-3xl bg-base-200/80 backdrop-blur-sm border border-base-300/50 p-7 space-y-5 animate-pulse">
      {/* icon placeholder */}
      <div className="flex items-start justify-between">
        <div className="flex gap-4">
          <div className={`h-14 w-14 rounded-2xl ${ring}`} />
          <div className="space-y-3 pt-1">
            <div className="h-5 w-40 rounded-xl bg-base-300/60" />
            <div className="h-4 w-20 rounded-full bg-base-300/40" />
          </div>
        </div>
        <div className="h-8 w-8 rounded-full bg-base-300/40" />
      </div>
      {/* lines */}
      <div className="space-y-2.5">
        <div className="h-3.5 w-full rounded-lg bg-base-300/40" />
        <div className="h-3.5 w-5/6 rounded-lg bg-base-300/40" />
        <div className="h-3.5 w-2/3 rounded-lg bg-base-300/30" />
      </div>
      {/* link bars */}
      <div className="space-y-2.5">
        <div className="h-11 w-full rounded-2xl bg-base-300/30" />
        <div className="h-11 w-full rounded-2xl bg-base-300/30" />
      </div>
      {/* button */}
      <div className="h-12 w-full rounded-2xl bg-base-300/40" />
    </div>
  );
}

/* ──────────── Section Wrapper ──────────── */
function SectionShell({
  children,
  glowColor,
}: {
  children: React.ReactNode;
  glowColor: "orange" | "blue";
}) {
  return (
    <div className="relative">
      {/* floating background glows */}
      <div
        className={`pointer-events-none absolute -top-40 left-1/4 h-[500px] w-[500px] rounded-full blur-[160px] opacity-30 ${
          glowColor === "orange" ? "bg-orange-400" : "bg-sky-400"
        }`}
      />
      <div
        className={`pointer-events-none absolute -bottom-32 right-1/4 h-[400px] w-[400px] rounded-full blur-[140px] opacity-20 ${
          glowColor === "orange" ? "bg-amber-300" : "bg-blue-300"
        }`}
      />
      {/* small floating orbs */}
      <div
        className={`pointer-events-none absolute top-20 right-[12%] h-3 w-3 rounded-full opacity-40 animate-float ${
          glowColor === "orange" ? "bg-orange-400" : "bg-sky-400"
        }`}
      />
      <div
        className={`pointer-events-none absolute bottom-24 left-[8%] h-2 w-2 rounded-full opacity-30 animate-float-delay ${
          glowColor === "orange" ? "bg-amber-400" : "bg-blue-400"
        }`}
      />
      <div className="relative z-10">{children}</div>
    </div>
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
    <section className="relative py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 space-y-28">

        {/* ════════════════════ HTML Section ════════════════════ */}
        {htmlLessons.length > 0 && (
          <SectionShell glowColor="orange">
            <div className="space-y-12">
              {/* Header */}
              <div className="text-center space-y-5">
                <div className="inline-flex items-center gap-2.5 bg-orange-500/10 backdrop-blur-sm border border-orange-400/20 text-orange-500 px-5 py-2.5 rounded-full text-sm font-semibold animate-slide-up opacity-0">
                  <FaHtml5 size={15} />
                  Fresh Content
                  <FaStar size={10} className="opacity-50" />
                </div>
                <h2 className="text-4xl sm:text-5xl font-extrabold text-base-content tracking-tight animate-slide-up opacity-0 delay-100">
                  Latest{" "}
                  <span className="text-orange-500">HTML</span>{" "}
                  Lessons
                </h2>
                <p className="text-base-content/60 max-w-xl mx-auto text-lg leading-relaxed animate-slide-up opacity-0 delay-200">
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
                    className="group inline-flex items-center gap-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold px-10 py-4 rounded-full shadow-lg shadow-orange-500/25 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-orange-500/30 hover:-translate-y-0.5 active:scale-[0.98]"
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
          <SectionShell glowColor="blue">
            <div className="space-y-12">
              {/* Header */}
              <div className="text-center space-y-5">
                <div className="inline-flex items-center gap-2.5 bg-sky-500/10 backdrop-blur-sm border border-sky-400/20 text-sky-500 px-5 py-2.5 rounded-full text-sm font-semibold animate-slide-up opacity-0">
                  <FaCode size={15} />
                  Programming
                  <FaStar size={10} className="opacity-50" />
                </div>
                <h2 className="text-4xl sm:text-5xl font-extrabold text-base-content tracking-tight animate-slide-up opacity-0 delay-100">
                  Latest{" "}
                  <span className="text-sky-500">C Programming</span>{" "}
                  Lessons
                </h2>
                <p className="text-base-content/60 max-w-xl mx-auto text-lg leading-relaxed animate-slide-up opacity-0 delay-200">
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
                    className="group inline-flex items-center gap-3 bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold px-10 py-4 rounded-full shadow-lg shadow-sky-500/25 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-sky-500/30 hover:-translate-y-0.5 active:scale-[0.98]"
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
