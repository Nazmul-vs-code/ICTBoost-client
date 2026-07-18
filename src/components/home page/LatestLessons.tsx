"use client";

import { GetApiFunction } from "@/lib/api/get-api";
import HtmlLessonCard from "@/components/html/HtmlLessonCard";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaArrowRight, FaBookOpen } from "react-icons/fa";

type HtmlLesson = {
  _id: string;
  title: string;
  videoUrl: string;
  referenceUrl: string;
  description: string;
  difficulty: string;
  authorEmail: string;
};

const LatestLessons = () => {
  const [lessons, setLessons] = useState<HtmlLesson[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const result = await GetApiFunction("/lesson/html");
        setLessons(result.data.slice(0, 6));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchLessons();
  }, []);

  if (!loading && lessons.length === 0) return null;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 space-y-10">
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-semibold">
            <FaBookOpen size={14} />
            Fresh Content
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">
            Latest HTML Lessons
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Jump into our newest lessons created by expert teachers.
            Start learning HTML from scratch or level up your skills.
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
                <div className="card-body space-y-4">
                  <div className="flex justify-between">
                    <div className="h-5 bg-gray-200 rounded w-1/2" />
                    <div className="h-8 w-8 bg-gray-200 rounded-full" />
                  </div>
                  <div className="h-4 bg-gray-200 rounded w-20" />
                  <div className="h-4 bg-gray-200 rounded w-full" />
                  <div className="h-4 bg-gray-200 rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Lesson Cards */}
        {!loading && lessons.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {lessons.map((lesson) => (
              <HtmlLessonCard key={lesson._id} lesson={lesson} />
            ))}
          </div>
        )}

        {/* View All */}
        {!loading && lessons.length > 0 && (
          <div className="text-center">
            <Link
              href="/html"
              className="btn bg-orange-500 hover:bg-orange-600 border-none text-white px-8 gap-2"
            >
              View All Lessons
              <FaArrowRight size={14} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default LatestLessons;
