"use client";

import { GetApiFunction } from "@/lib/api/get-api";
import { useEffect, useState } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

type MostLikedLesson = {
  _id: string;
  title: string;
  difficulty: string;
  likeCount: number;
  subject: "html" | "c";
};

const difficultyEmoji = (level: string) => {
  switch (level) {
    case "Beginner":
      return "🟢";
    case "Intermediate":
      return "🟡";
    case "Advanced":
      return "🔴";
    default:
      return "🟢";
  }
};

const rankStyle = (rank: number) => {
  return rank === 0 ? "bg-white text-black" : "border border-zinc-700 bg-zinc-800";
};

const rankEmoji = (rank: number) => {
  switch (rank) {
    case 0:
      return "🥇";
    case 1:
      return "🥈";
    case 2:
      return "🥉";
    default:
      return `#${rank + 1}`;
  }
};

const MostLikedLessons = () => {
  const [lessons, setLessons] = useState<MostLikedLesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const check = () => {
      const theme = document.documentElement.getAttribute("data-theme");
      setIsDark(theme === "dark");
    };
    check();
    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const fetchMostLiked = async () => {
      try {
        const result = await GetApiFunction("/most-liked");
        setLessons(result.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMostLiked();
  }, []);

  const hasData = lessons.length > 0;
  const maxLikes = hasData ? Math.max(...lessons.map((l) => l.likeCount)) : 10;

  const chartData = lessons.map((lesson) => ({
    subject:
      lesson.title.length > 16
        ? lesson.title.slice(0, 16) + "..."
        : lesson.title,
    likes: lesson.likeCount,
    fullMark: maxLikes + 5,
  }));

  /* ──── theme-aware chart colors ──── */
  const gridColor = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";
  const axisColor = isDark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.45)";
  const radiusColor = isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)";
  const tooltipBg = isDark ? "#18181b" : "#ffffff";
  const tooltipBorder = isDark ? "#3f3f46" : "#d4d4d8";
  const tooltipText = isDark ? "#f4f4f5" : "#18181b";

  return (
    <section className="theme-adaptive relative overflow-hidden py-24">
      {/* Background glows */}
      <div className="relative z-10 mx-auto max-w-7xl space-y-14 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-5">
          <div className="inline-flex items-center gap-2 border border-zinc-700 bg-zinc-900 px-4 py-2 font-mono text-xs uppercase tracking-wider text-zinc-300 animate-slide-up opacity-0">
            Community favorites
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-base-content tracking-tight animate-slide-up opacity-0 delay-100">
            Most Liked{" "}
            <span className="text-zinc-400">Lessons</span>
          </h2>
          <p className="text-base-content/60 max-w-xl mx-auto text-lg leading-relaxed animate-slide-up opacity-0 delay-200">
            See which lessons the community loves the most. Top-ranked by
            total likes from students across the platform.
          </p>
        </div>

        {/* Skeleton Loader */}
        {loading && (
          <div className="grid gap-8 lg:grid-cols-5 items-start">
            <div className="glass-card lg:col-span-3 border border-zinc-800 bg-zinc-900 p-8 animate-pulse">
              <div className="mb-6 h-6 w-40 bg-zinc-700" />
              <div className="h-[400px] w-full bg-zinc-800" />
            </div>
            <div className="lg:col-span-2 space-y-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="glass-card border border-zinc-800 bg-zinc-900 p-5 animate-pulse"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 shrink-0 bg-zinc-700" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 w-3/4 bg-zinc-700" />
                      <div className="h-3 w-1/3 bg-zinc-800" />
                    </div>
                    <div className="h-4 w-8 bg-zinc-800" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && !hasData && (
          <div className="glass-card border border-zinc-800 bg-zinc-900 p-10 text-center sm:p-16">
            <div className="text-5xl mb-5">📊</div>
            <p className="text-lg font-semibold text-white">
              No likes yet
            </p>
            <p className="mx-auto mt-2 max-w-md text-sm text-zinc-400">
              Like some lessons to see analytics here. Explore our HTML and C
              Programming lessons and give them a heart!
            </p>
          </div>
        )}

        {/* Chart + Legend */}
        {!loading && hasData && (
          <div className="grid gap-8 lg:grid-cols-5 items-start">
            {/* Radar Chart */}
            <div className="glass-card lg:col-span-3 border border-zinc-800 bg-zinc-900 p-6 sm:p-8 animate-slide-up opacity-0 delay-200">
              <h3 className="flex items-center gap-2.5 text-lg font-semibold text-white">
                <span className="text-xl">❤️</span>
                Likes Overview
              </h3>
              <div className="mt-6" style={{ width: "100%", height: 400 }}>
                <ResponsiveContainer>
                  <RadarChart data={chartData} outerRadius="75%">
                    <PolarGrid stroke={gridColor} />
                    <PolarAngleAxis
                      dataKey="subject"
                      tick={{ fontSize: 11, fill: axisColor }}
                    />
                    <PolarRadiusAxis
                      tick={{ fontSize: 10, fill: radiusColor }}
                      allowDecimals={false}
                    />
                    <Radar
                      name="Likes"
                      dataKey="likes"
                      stroke="#f97316"
                      fill="#f97316"
                      fillOpacity={0.25}
                      strokeWidth={2}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: tooltipBg,
                        border: `1px solid ${tooltipBorder}`,
                        borderRadius: "0",
                        color: tooltipText,
                      }}
                      itemStyle={{ color: tooltipText }}
                      labelStyle={{ color: tooltipText, fontWeight: 700 }}
                    />
                    <Legend
                      wrapperStyle={{ color: axisColor }}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Lesson List */}
            <div className="lg:col-span-2 space-y-3">
              {lessons.map((lesson, index) => (
                <div
                  key={lesson._id}
                  className="glass-card group border border-zinc-800 bg-zinc-900 p-4 transition-colors duration-200 hover:border-zinc-600 animate-slide-up opacity-0"
                  style={{ animationDelay: `${300 + index * 80}ms` }}
                >
                  <div className="flex items-center gap-3">
                    {/* Rank Badge */}
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center font-mono text-sm font-bold ${rankStyle(index)}`}>
                      {rankEmoji(index)}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="truncate text-sm font-medium text-white">
                          {lesson.title}
                        </h4>
                        <span className="shrink-0 text-sm">
                          {lesson.subject === "html" ? "🌐" : "💻"}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 mt-1">
                        <span className="text-xs">{difficultyEmoji(lesson.difficulty)}</span>
                        <span className="text-xs text-zinc-400">{lesson.difficulty}</span>
                      </div>
                    </div>

                    {/* Likes */}
                    <div className="flex items-center gap-1 text-red-500 font-bold shrink-0">
                      <span className="transition-transform duration-300 group-hover:scale-125">❤️</span>
                      {lesson.likeCount}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default MostLikedLessons;
