"use client";

import { GetApiFunctionWithParams } from "@/lib/api/get-api";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  FaPlus,
  FaEye,
  FaTrash,
  FaYoutube,
  FaGlobe,
  FaLaptopCode,
} from "react-icons/fa";

type CLesson = {
  _id: string;
  title: string;
  videoUrl: string;
  referenceUrl: string;
  description: string;
  difficulty: string;
  authorEmail: string;
};

const difficultyBadge = (level: string) => {
  switch (level) {
    case "Beginner":
      return "badge badge-warning";
    case "Intermediate":
      return "badge badge-info";
    case "Advanced":
      return "badge badge-error";
    default:
      return "badge badge-warning";
  }
};

const AllCLessonsPage = () => {
  const [lessons, setLessons] = useState<CLesson[]>([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = authClient.useSession();

  useEffect(() => {
    if (!session?.user?.email) return;
    const fetchLessons = async () => {
      try {
        const result = await GetApiFunctionWithParams("/lesson/c", {
          authorEmail: session.user.email,
        });
        setLessons(result.data);
      } catch (error) {
        console.log(error);
        toast.error("Failed to load lessons.");
      } finally {
        setLoading(false);
      }
    };
    fetchLessons();
  }, [session?.user?.email]);

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-base-content">
            💻 All C Programming Lessons
          </h1>
          <p className="text-base-content/50 mt-2 text-sm md:text-base">
            View and manage all your created C programming lessons. 🛠️
          </p>
        </div>
        <Link
          href="/dashboard/teacher/lessons/c-programming/create"
          className="btn bg-sky-500 hover:bg-sky-600 border-none text-white btn-sm gap-2"
        >
          <FaPlus size={12} />
          Create Lesson
        </Link>
      </div>

      {/* Skeleton Loader */}
      {loading && (
        <div className="grid gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="card bg-base-100 shadow-md border border-base-300 animate-pulse">
              <div className="card-body space-y-4">
                <div className="h-5 bg-base-300 rounded w-3/4" />
                <div className="h-4 bg-base-300 rounded w-full" />
                <div className="h-4 bg-base-300 rounded w-2/3" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && lessons.length === 0 && (
        <div className="card bg-base-100 shadow-md border border-base-300">
          <div className="card-body flex flex-col items-center py-16 text-base-content/40">
            <span className="text-5xl mb-4">📭</span>
            <p className="text-lg font-medium text-base-content/60">No lessons found</p>
            <p className="text-sm mt-1">
              Create your first C programming lesson to get started. ✨
            </p>
            <Link
              href="/dashboard/teacher/lessons/c-programming/create"
              className="btn bg-sky-500 hover:bg-sky-600 border-none text-white btn-sm gap-2 mt-4"
            >
              <FaPlus size={12} />
              Create Lesson
            </Link>
          </div>
        </div>
      )}

      {/* Lesson Cards */}
      {!loading && lessons.length > 0 && (
        <>
          <div className="grid gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {lessons.map((lesson) => (
              <div
                key={lesson._id}
                className="card bg-base-100 shadow-md border border-base-300 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
              >
                <div className="card-body p-5">
                  {/* Title + Badge */}
                  <div className="flex items-start justify-between gap-2">
                    <h2 className="card-title text-base-content text-sm">
                      <span className="text-sky-500">
                        <FaLaptopCode size={14} />
                      </span>
                      {lesson.title}
                    </h2>
                    <span className={difficultyBadge(lesson.difficulty)}>
                      {lesson.difficulty}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-base-content/50 text-xs mt-2 line-clamp-3">
                    {lesson.description}
                  </p>

                  {/* Links */}
                  <div className="flex flex-col gap-1.5 mt-3 text-xs">
                    <a
                      href={lesson.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-red-500 hover:underline"
                    >
                      <FaYoutube size={12} /> Watch Tutorial
                    </a>
                    <a
                      href={lesson.referenceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-sky-500 hover:underline"
                    >
                      <FaGlobe size={12} /> Programiz Reference
                    </a>
                  </div>

                  <div className="divider my-1" />

                  {/* Actions */}
                  <div className="card-actions justify-end">
                    <button className="btn btn-xs btn-outline btn-primary gap-1">
                      <FaEye size={10} /> View
                    </button>
                    <button className="btn btn-xs btn-error text-white gap-1">
                      <FaTrash size={10} /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Tip */}
          <div className="rounded-2xl border border-sky-500/20 bg-sky-500/5 p-5">
            <h3 className="text-base font-bold text-sky-500">💡 Tip</h3>
            <p className="mt-1 text-sm text-base-content/60">
              You have created {lessons.length} C programming lesson{lessons.length > 1 ? "s" : ""}.
              Keep adding more lessons to help your students learn effectively. 🎯
            </p>
          </div>
        </>
      )}
    </section>
  );
};

export default AllCLessonsPage;
