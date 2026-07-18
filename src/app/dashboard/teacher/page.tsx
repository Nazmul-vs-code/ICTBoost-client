"use client";

import { GetApiFunctionWithParams } from "@/lib/api/get-api";
import { authClient } from "@/lib/auth-client";
import LikesAnalyticsChart from "@/components/teacher/LikesAnalyticsChart";
import TeacherLessonsList from "@/components/teacher/TeacherLessonsList";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaHeart, FaBookOpen, FaChartBar } from "react-icons/fa";

type LessonAnalytics = {
  _id: string;
  title: string;
  difficulty: string;
  likeCount: number;
};

const TeacherDashboardHomePage = () => {
  const { data: session } = authClient.useSession();
  const [lessons, setLessons] = useState<LessonAnalytics[]>([]);
  const [loading, setLoading] = useState(true);

  const userEmail = session?.user?.email;

  useEffect(() => {
    if (!userEmail) return;

    const fetchAnalytics = async () => {
      try {
        const result = await GetApiFunctionWithParams("/lesson/html/analytics", {
          authorEmail: userEmail,
        });
        setLessons(result.data);
      } catch (error) {
        console.log(error);
        toast.error("Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [userEmail]);

  const totalLessons = lessons.length;
  const totalLikes = lessons.reduce((sum, l) => sum + l.likeCount, 0);

  return (
    <section className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome back, {session?.user?.name || "Teacher"}
        </h1>
        <p className="text-gray-500 mt-1">
          Here&apos;s an overview of your lessons and engagement.
        </p>
      </div>

      {/* Skeleton Loader */}
      {loading && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="card bg-white shadow-xl border border-orange-100 animate-pulse"
            >
              <div className="card-body space-y-3">
                <div className="h-5 bg-gray-200 rounded w-1/2" />
                <div className="h-8 bg-gray-200 rounded w-1/3" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Stats Cards */}
      {!loading && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Total Lessons */}
          <div className="card bg-white shadow-xl border border-orange-100 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
            <div className="card-body">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50">
                  <span className="text-orange-500">
                    <FaBookOpen size={24} />
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Lessons</p>
                  <p className="text-3xl font-bold text-gray-800">
                    {totalLessons}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Total Likes */}
          <div className="card bg-white shadow-xl border border-orange-100 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
            <div className="card-body">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50">
                  <span className="text-red-500">
                    <FaHeart size={24} />
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Likes</p>
                  <p className="text-3xl font-bold text-gray-800">
                    {totalLikes}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Avg Likes */}
          <div className="card bg-white shadow-xl border border-orange-100 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
            <div className="card-body">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50">
                  <span className="text-blue-500">
                    <FaChartBar size={24} />
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Avg. Likes</p>
                  <p className="text-3xl font-bold text-gray-800">
                    {totalLessons > 0
                      ? (totalLikes / totalLessons).toFixed(1)
                      : "0"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Chart */}
      {!loading && lessons.length > 0 && (
        <LikesAnalyticsChart data={lessons} />
      )}

      {/* Lessons Table */}
      {!loading && <TeacherLessonsList lessons={lessons} />}
    </section>
  );
};

export default TeacherDashboardHomePage;
