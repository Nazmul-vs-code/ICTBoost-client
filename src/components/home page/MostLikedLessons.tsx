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
import { FaHeart, FaFire, FaHtml5, FaCode, FaChartPie } from "react-icons/fa";

type MostLikedLesson = {
  _id: string;
  title: string;
  difficulty: string;
  likeCount: number;
  subject: "html" | "c";
};

const MostLikedLessons = () => {
  const [lessons, setLessons] = useState<MostLikedLesson[]>([]);
  const [loading, setLoading] = useState(true);

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
      lesson.title.length > 18
        ? lesson.title.slice(0, 18) + "..."
        : lesson.title,
    likes: lesson.likeCount,
    fullMark: maxLikes + 5,
  }));

  return (
    <section className="py-20 bg-gradient-to-br from-orange-50 via-white to-blue-50">
      <div className="max-w-6xl mx-auto px-4 space-y-10">
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="inline-flex items-center gap-2 bg-red-100 text-red-600 px-4 py-2 rounded-full text-sm font-semibold">
            <FaFire size={14} />
            Community Favorites
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">
            Most Liked Lessons
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            See which lessons the community loves the most. These are the top
            lessons ranked by total likes from students.
          </p>
        </div>

        {/* Skeleton Loader */}
        {loading && (
          <div className="flex justify-center py-16">
            <span className="loading loading-spinner loading-lg text-orange-500" />
          </div>
        )}

        {/* Empty State */}
        {!loading && !hasData && (
          <div className="card bg-white shadow-xl border border-orange-100">
            <div className="card-body flex flex-col items-center py-16 text-gray-400">
              <span className="mb-4">
                <FaChartPie size={48} />
              </span>
              <p className="text-lg font-medium">No likes yet</p>
              <p className="text-sm mt-1 text-center max-w-md">
                Like some lessons to see analytics here. Explore our HTML and C
                Programming lessons and give them a heart!
              </p>
            </div>
          </div>
        )}

        {/* Chart + Legend */}
        {!loading && hasData && (
          <div className="grid gap-8 lg:grid-cols-5 items-start">
            {/* Radar Chart */}
            <div className="lg:col-span-3 card bg-white shadow-xl border border-orange-100">
              <div className="card-body">
                <h3 className="card-title text-gray-800">
                  <span className="text-orange-500">
                    <FaHeart />
                  </span>
                  Likes Overview
                </h3>
                <div className="mt-4" style={{ width: "100%", height: 400 }}>
                  <ResponsiveContainer>
                    <RadarChart data={chartData} outerRadius="75%">
                      <PolarGrid stroke="#e5e7eb" />
                      <PolarAngleAxis
                        dataKey="subject"
                        tick={{ fontSize: 11, fill: "#6b7280" }}
                      />
                      <PolarRadiusAxis
                        tick={{ fontSize: 10, fill: "#9ca3af" }}
                        allowDecimals={false}
                      />
                      <Radar
                        name="Likes"
                        dataKey="likes"
                        stroke="#f97316"
                        fill="#f97316"
                        fillOpacity={0.3}
                        strokeWidth={2}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#fff",
                          border: "1px solid #fde68a",
                          borderRadius: "12px",
                        }}
                      />
                      <Legend />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Lesson List */}
            <div className="lg:col-span-2 space-y-4">
              {lessons.map((lesson, index) => (
                <div
                  key={lesson._id}
                  className="card bg-white shadow-xl border border-orange-100 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
                >
                  <div className="card-body py-4 px-5">
                    <div className="flex items-center gap-4">
                      {/* Rank */}
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-500 text-white font-bold text-sm">
                        #{index + 1}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-gray-800 truncate">
                            {lesson.title}
                          </h4>
                          <span className="text-gray-400">
                            {lesson.subject === "html" ? (
                              <FaHtml5 size={14} />
                            ) : (
                              <FaCode size={14} />
                            )}
                          </span>
                        </div>
                        <p className="text-xs text-gray-400 mt-0.5">
                          {lesson.difficulty}
                        </p>
                      </div>

                      {/* Likes */}
                      <div className="flex items-center gap-1 text-red-500 font-bold shrink-0">
                        <FaHeart size={14} />
                        {lesson.likeCount}
                      </div>
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
