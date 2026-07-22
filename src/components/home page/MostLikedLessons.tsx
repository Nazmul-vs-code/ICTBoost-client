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
  switch (rank) {
    case 0:
      return "from-amber-400 to-orange-500 shadow-amber-400/30";
    case 1:
      return "from-gray-300 to-gray-400 shadow-gray-300/30";
    case 2:
      return "from-amber-600 to-amber-700 shadow-amber-600/30";
    default:
      return "from-orange-500 to-orange-600 shadow-orange-500/20";
  }
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
  const tooltipBg = isDark ? "#1a1a2e" : "#ffffff";
  const tooltipBorder = isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)";
  const tooltipText = isDark ? "#e2e8f0" : "#1e293b";

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background glows */}
      <div className="pointer-events-none absolute top-0 left-1/3 h-[500px] w-[500px] rounded-full bg-red-400/10 blur-[160px]" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 h-[400px] w-[400px] rounded-full bg-orange-300/10 blur-[140px]" />
      <div className="pointer-events-none absolute top-32 right-[10%] h-3 w-3 rounded-full bg-red-400/30 animate-float" />
      <div className="pointer-events-none absolute bottom-20 left-[15%] h-2 w-2 rounded-full bg-orange-400/25 animate-float-delay" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 space-y-14">
        {/* Header */}
        <div className="text-center space-y-5">
          <div className="inline-flex items-center gap-2 bg-red-500/10 backdrop-blur-sm border border-red-400/20 text-red-500 px-5 py-2.5 rounded-full text-sm font-semibold animate-slide-up opacity-0">
            🔥 Community Favorites
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-base-content tracking-tight animate-slide-up opacity-0 delay-100">
            Most Liked{" "}
            <span className="text-orange-500">Lessons</span>
          </h2>
          <p className="text-base-content/60 max-w-xl mx-auto text-lg leading-relaxed animate-slide-up opacity-0 delay-200">
            See which lessons the community loves the most. Top-ranked by
            total likes from students across the platform.
          </p>
        </div>

        {/* Skeleton Loader */}
        {loading && (
          <div className="grid gap-8 lg:grid-cols-5 items-start">
            <div className="lg:col-span-3 rounded-3xl bg-base-200/80 backdrop-blur-sm border border-base-300/50 p-8 animate-pulse">
              <div className="h-6 w-40 rounded-xl bg-base-300/60 mb-6" />
              <div className="h-[400px] w-full rounded-2xl bg-base-300/30" />
            </div>
            <div className="lg:col-span-2 space-y-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-2xl bg-base-200/80 backdrop-blur-sm border border-base-300/50 p-5 animate-pulse"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-xl bg-base-300/40 shrink-0" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 w-3/4 rounded-lg bg-base-300/50" />
                      <div className="h-3 w-1/3 rounded-lg bg-base-300/30" />
                    </div>
                    <div className="h-4 w-8 rounded bg-base-300/30" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && !hasData && (
          <div className="rounded-3xl bg-base-200/60 backdrop-blur-sm border border-base-300/50 p-16 text-center">
            <div className="text-5xl mb-5">📊</div>
            <p className="text-lg font-semibold text-base-content/70">
              No likes yet
            </p>
            <p className="text-sm text-base-content/50 mt-2 max-w-md mx-auto">
              Like some lessons to see analytics here. Explore our HTML and C
              Programming lessons and give them a heart!
            </p>
          </div>
        )}

        {/* Chart + Legend */}
        {!loading && hasData && (
          <div className="grid gap-8 lg:grid-cols-5 items-start">
            {/* Radar Chart */}
            <div className="lg:col-span-3 rounded-3xl bg-base-200/60 backdrop-blur-xl border border-base-300/50 shadow-xl p-6 sm:p-8 animate-slide-up opacity-0 delay-200">
              <h3 className="text-lg font-bold text-base-content flex items-center gap-2.5">
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
                        borderRadius: "12px",
                        color: tooltipText,
                        backdropFilter: "blur(12px)",
                        boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
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
                  className="group rounded-2xl bg-base-200/60 backdrop-blur-sm border border-base-300/50 p-4 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 hover:border-orange-300/30 animate-slide-up opacity-0"
                  style={{ animationDelay: `${300 + index * 80}ms` }}
                >
                  <div className="flex items-center gap-3">
                    {/* Rank Badge */}
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${rankStyle(index)} text-white font-bold text-sm shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                      {rankEmoji(index)}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-base-content truncate text-sm">
                          {lesson.title}
                        </h4>
                        <span className="shrink-0 text-sm">
                          {lesson.subject === "html" ? "🌐" : "💻"}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 mt-1">
                        <span className="text-xs">{difficultyEmoji(lesson.difficulty)}</span>
                        <span className="text-xs text-base-content/50">{lesson.difficulty}</span>
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
