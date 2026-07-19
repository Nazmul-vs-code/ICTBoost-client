"use client";

import { GetApiFunctionWithParams } from "@/lib/api/get-api";
import { authClient } from "@/lib/auth-client";
import LikesAnalyticsChart from "@/components/teacher/LikesAnalyticsChart";
import TeacherLessonsList from "@/components/teacher/TeacherLessonsList";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  FaHeart,
  FaBookOpen,
  FaChartBar,
  FaHtml5,
  FaCode,
} from "react-icons/fa";

type LessonAnalytics = {
  _id: string;
  title: string;
  difficulty: string;
  likeCount: number;
};

const TeacherDashboardHomePage = () => {
  const { data: session } = authClient.useSession();
  const [htmlLessons, setHtmlLessons] = useState<LessonAnalytics[]>([]);
  const [cLessons, setCLessons] = useState<LessonAnalytics[]>([]);
  const [loading, setLoading] = useState(true);

  const userEmail = session?.user?.email;

  const fetchAnalytics = useCallback(async () => {
    if (!userEmail) return;

    try {
      const [htmlResult, cResult] = await Promise.all([
        GetApiFunctionWithParams("/lesson/html/analytics", {
          authorEmail: userEmail,
        }),
        GetApiFunctionWithParams("/lesson/c/analytics", {
          authorEmail: userEmail,
        }),
      ]);
      setHtmlLessons(htmlResult.data);
      setCLessons(cResult.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load dashboard data.");
    } finally {
      setLoading(false);
    }
  }, [userEmail]);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  const handleHtmlDelete = (id: string) => {
    setHtmlLessons((prev) => prev.filter((l) => l._id !== id));
  };

  const handleCDelete = (id: string) => {
    setCLessons((prev) => prev.filter((l) => l._id !== id));
  };

  const totalHtmlLessons = htmlLessons.length;
  const totalCLessons = cLessons.length;
  const totalLessons = totalHtmlLessons + totalCLessons;

  const totalHtmlLikes = htmlLessons.reduce((sum, l) => sum + l.likeCount, 0);
  const totalCLikes = cLessons.reduce((sum, l) => sum + l.likeCount, 0);
  const totalLikes = totalHtmlLikes + totalCLikes;

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
          {Array.from({ length: 6 }).map((_, i) => (
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
        <>
          {/* Overall Stats */}
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

          {/* Subject Breakdown Cards */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* HTML Stats */}
            <div className="card bg-white shadow-xl border border-orange-100 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
              <div className="card-body">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50">
                    <span className="text-orange-500">
                      <FaHtml5 size={28} />
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">HTML Lessons</p>
                    <p className="text-3xl font-bold text-gray-800">
                      {totalHtmlLessons}
                    </p>
                    <p className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                      <span className="text-red-400"><FaHeart size={10} /></span>
                      {totalHtmlLikes} likes
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* C Stats */}
            <div className="card bg-white shadow-xl border border-blue-100 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
              <div className="card-body">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50">
                    <span className="text-blue-500">
                      <FaCode size={28} />
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">C Programming Lessons</p>
                    <p className="text-3xl font-bold text-gray-800">
                      {totalCLessons}
                    </p>
                    <p className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                      <span className="text-red-400"><FaHeart size={10} /></span>
                      {totalCLikes} likes
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Empty State */}
      {!loading && htmlLessons.length === 0 && cLessons.length === 0 && (
        <div className="card bg-white shadow-xl border border-orange-100">
          <div className="card-body flex flex-col items-center py-16 text-gray-400">
            <span className="mb-4">
              <FaBookOpen size={48} />
            </span>
            <p className="text-lg font-medium">No lessons yet</p>
            <p className="text-sm mt-1">
              Create your first lesson to get started.
            </p>
          </div>
        </div>
      )}

      {/* HTML Section */}
      {!loading && htmlLessons.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="text-orange-500">
              <FaHtml5 size={22} />
            </span>
            <h2 className="text-xl font-bold text-gray-800">HTML Lessons</h2>
          </div>
          <LikesAnalyticsChart data={htmlLessons} accentColor="#f97316" />
          <TeacherLessonsList
            lessons={htmlLessons}
            subject="html"
            onDelete={handleHtmlDelete}
          />
        </div>
      )}

      {/* C Section */}
      {!loading && cLessons.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="text-blue-500">
              <FaCode size={22} />
            </span>
            <h2 className="text-xl font-bold text-gray-800">C Programming Lessons</h2>
          </div>
          <LikesAnalyticsChart data={cLessons} accentColor="#3b82f6" />
          <TeacherLessonsList
            lessons={cLessons}
            subject="c"
            onDelete={handleCDelete}
          />
        </div>
      )}
    </section>
  );
};

export default TeacherDashboardHomePage;
