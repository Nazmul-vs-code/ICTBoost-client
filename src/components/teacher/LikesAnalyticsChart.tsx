"use client";

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

const difficultyColor = (level: string) => {
  switch (level) {
    case "Beginner":
      return "#f59e0b";
    case "Intermediate":
      return "#3b82f6";
    case "Advanced":
      return "#ef4444";
    default:
      return "#f59e0b";
  }
};

const LikesAnalyticsChart = ({ data }: { data: LessonAnalytics[] }) => {
  if (data.length === 0) return null;

  const chartData = data.map((lesson) => ({
    name:
      lesson.title.length > 18
        ? lesson.title.slice(0, 18) + "..."
        : lesson.title,
    likes: lesson.likeCount,
    fill: difficultyColor(lesson.difficulty),
  }));

  return (
    <div className="card bg-white shadow-xl border border-orange-100">
      <div className="card-body">
        <h2 className="card-title text-gray-800">
          <span className="text-orange-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          </span>
          Likes per Lesson
        </h2>

        <div className="mt-4" style={{ width: "100%", height: 350 }}>
          <ResponsiveContainer>
            <BarChart
              data={chartData}
              margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="name"
                stroke="#9ca3af"
                tick={{ fontSize: 12 }}
                interval={0}
                angle={-30}
                textAnchor="end"
                height={60}
              />
              <YAxis stroke="#9ca3af" allowDecimals={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #fde68a",
                  borderRadius: "12px",
                }}
              />
              <Legend />
              <Bar
                dataKey="likes"
                name="Likes"
                radius={[6, 6, 0, 0]}
                fill="#f97316"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default LikesAnalyticsChart;
