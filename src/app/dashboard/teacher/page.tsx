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
        GetApiFunctionWithParams("/lesson/html/analytics", { authorEmail: userEmail }),
        GetApiFunctionWithParams("/lesson/c/analytics", { authorEmail: userEmail }),
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

  useEffect(() => { fetchAnalytics(); }, [fetchAnalytics]);

  const handleHtmlDelete = (id: string) => setHtmlLessons((prev) => prev.filter((l) => l._id !== id));
  const handleCDelete = (id: string) => setCLessons((prev) => prev.filter((l) => l._id !== id));

  const totalHtmlLessons = htmlLessons.length;
  const totalCLessons = cLessons.length;
  const totalLessons = totalHtmlLessons + totalCLessons;
  const totalHtmlLikes = htmlLessons.reduce((sum, l) => sum + l.likeCount, 0);
  const totalCLikes = cLessons.reduce((sum, l) => sum + l.likeCount, 0);
  const totalLikes = totalHtmlLikes + totalCLikes;

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="animate-stat-0">
        <h1 className="text-2xl md:text-3xl font-bold text-base-content">
          Welcome back, {session?.user?.name || "Teacher"} 👋
        </h1>
        <p className="text-base-content/50 mt-1 text-sm md:text-base">
          Here&apos;s an overview of your lessons and engagement. 📊
        </p>
      </div>

      {/* Skeleton Loader */}
      {loading && (
        <div className="grid gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="card bg-base-100 shadow-md border border-base-300 animate-pulse"
            >
              <div className="card-body space-y-3">
                <div className="h-5 bg-base-300 rounded w-1/2" />
                <div className="h-8 bg-base-300 rounded w-1/3" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Stats Cards */}
      {!loading && (
        <>
          <div className="grid gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Total Lessons */}
            <div className="card bg-base-100 shadow-md border border-base-300 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 animate-stat-1">
              <div className="card-body p-5">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <FaBookOpen size={22} />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-base-content/50 uppercase tracking-wide">Total Lessons</p>
                    <p className="text-2xl font-bold text-base-content">{totalLessons} 📚</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Total Likes */}
            <div className="card bg-base-100 shadow-md border border-base-300 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 animate-stat-2">
              <div className="card-body p-5">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-error/10 text-error">
                    <FaHeart size={22} />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-base-content/50 uppercase tracking-wide">Total Likes</p>
                    <p className="text-2xl font-bold text-base-content">{totalLikes} ❤️</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Avg Likes */}
            <div className="card bg-base-100 shadow-md border border-base-300 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 animate-stat-3">
              <div className="card-body p-5">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-info/10 text-info">
                    <FaChartBar size={22} />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-base-content/50 uppercase tracking-wide">Avg. Likes</p>
                    <p className="text-2xl font-bold text-base-content">
                      {totalLessons > 0 ? (totalLikes / totalLessons).toFixed(1) : "0"} ⭐
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Subject Breakdown */}
          <div className="grid gap-4 md:gap-6 md:grid-cols-2">
            {/* HTML Stats */}
            <div className="card bg-base-100 shadow-md border border-base-300 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 animate-stat-4">
              <div className="card-body p-5">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500">
                    <FaHtml5 size={26} />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-base-content/50 uppercase tracking-wide">HTML Lessons</p>
                    <p className="text-2xl font-bold text-base-content">{totalHtmlLessons}</p>
                    <p className="text-xs text-base-content/40 flex items-center gap-1 mt-1">
                      <FaHeart size={9} className="text-error" />
                      {totalHtmlLikes} likes
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* C Stats */}
            <div className="card bg-base-100 shadow-md border border-base-300 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 animate-stat-4">
              <div className="card-body p-5">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-500/10 text-sky-500">
                    <FaCode size={26} />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-base-content/50 uppercase tracking-wide">C Programming Lessons</p>
                    <p className="text-2xl font-bold text-base-content">{totalCLessons}</p>
                    <p className="text-xs text-base-content/40 flex items-center gap-1 mt-1">
                      <FaHeart size={9} className="text-error" />
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
        <div className="card bg-base-100 shadow-md border border-base-300">
          <div className="card-body flex flex-col items-center py-16 text-base-content/40">
            <span className="text-5xl mb-4">📭</span>
            <p className="text-lg font-medium text-base-content/60">No lessons yet</p>
            <p className="text-sm mt-1 text-base-content/40">
              Create your first lesson to get started! ✨
            </p>
          </div>
        </div>
      )}

      {/* HTML Section */}
      {!loading && htmlLessons.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <FaHtml5 size={20} className="text-orange-500" />
            <h2 className="text-lg font-bold text-base-content">HTML Lessons 📚</h2>
          </div>
          <LikesAnalyticsChart data={htmlLessons} accentColor="#f97316" />
          <TeacherLessonsList lessons={htmlLessons} subject="html" onDelete={handleHtmlDelete} />
        </div>
      )}

      {/* C Section */}
      {!loading && cLessons.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <FaCode size={20} className="text-sky-500" />
            <h2 className="text-lg font-bold text-base-content">C Programming Lessons 💻</h2>
          </div>
          <LikesAnalyticsChart data={cLessons} accentColor="#0ea5e9" />
          <TeacherLessonsList lessons={cLessons} subject="c" onDelete={handleCDelete} />
        </div>
      )}
    </section>
  );
};

export default TeacherDashboardHomePage;
