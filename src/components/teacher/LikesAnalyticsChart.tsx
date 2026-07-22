"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type LessonAnalytics = {
  _id: string;
  title: string;
  difficulty: string;
  likeCount: number;
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

const LikesAnalyticsChart = ({
  data,
  accentColor = "#f97316",
}: {
  data: LessonAnalytics[];
  accentColor?: string;
}) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const check = () => {
      const theme = document.documentElement.getAttribute("data-theme");
      setIsDark(theme === "synthwave");
    };
    check();
    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  if (data.length === 0) return null;

  const chartData = data.map((lesson) => ({
    name:
      lesson.title.length > 18
        ? lesson.title.slice(0, 18) + "..."
        : lesson.title,
    likes: lesson.likeCount,
  }));

  const gridColor = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)";
  const axisColor = isDark ? "rgba(255,255,255,0.4)" : "#9ca3af";
  const tooltipBg = isDark ? "#1a1a2e" : "#ffffff";
  const tooltipBorder = isDark ? "rgba(255,255,255,0.1)" : "rgba(253,230,138,0.5)";
  const tooltipText = isDark ? "#e2e8f0" : "#1e293b";

  return (
    <div className="rounded-2xl bg-base-100 shadow-xl border border-base-300/50">
      <div className="p-6">
        <h2 className="text-lg font-bold text-base-content flex items-center gap-2.5">
          <span className="text-xl">📊</span>
          Likes per Lesson
        </h2>

        <div className="mt-4" style={{ width: "100%", height: 350 }}>
          <ResponsiveContainer>
            <BarChart
              data={chartData}
              margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis
                dataKey="name"
                stroke={axisColor}
                tick={{ fontSize: 12, fill: axisColor }}
                interval={0}
                angle={-30}
                textAnchor="end"
                height={60}
              />
              <YAxis stroke={axisColor} allowDecimals={false} tick={{ fill: axisColor }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: tooltipBg,
                  border: `1px solid ${tooltipBorder}`,
                  borderRadius: "12px",
                  color: tooltipText,
                  boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
                }}
                itemStyle={{ color: tooltipText }}
                labelStyle={{ color: tooltipText, fontWeight: 700 }}
              />
              <Legend wrapperStyle={{ color: axisColor }} />
              <Bar
                dataKey="likes"
                name="Likes"
                radius={[6, 6, 0, 0]}
                fill={accentColor}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default LikesAnalyticsChart;
