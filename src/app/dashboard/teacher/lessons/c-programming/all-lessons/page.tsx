"use client";

import { GetApiFunctionWithParams } from "@/lib/api/get-api";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  FaBookOpen,
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
          <h1 className="text-3xl font-bold text-gray-800">
            All C Programming Lessons
          </h1>
          <p className="text-gray-500 mt-2">
            View and manage all your created C programming lessons.
          </p>
        </div>

        <Link
          href="/dashboard/teacher/lessons/c-programming/create"
          className="btn bg-blue-500 hover:bg-blue-600 border-none text-white"
        >
          <FaPlus />
          Create Lesson
        </Link>
      </div>

      {/* Skeleton Loader */}
      {loading && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="card bg-white shadow-xl border border-blue-100 animate-pulse"
            >
              <div className="card-body space-y-4">
                <div className="h-5 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-full" />
                <div className="h-4 bg-gray-200 rounded w-2/3" />
                <div className="flex gap-2 mt-4">
                  <div className="h-8 bg-gray-200 rounded w-20" />
                  <div className="h-8 bg-gray-200 rounded w-20" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && lessons.length === 0 && (
        <div className="card bg-white shadow-xl border border-blue-100">
          <div className="card-body flex flex-col items-center py-16 text-gray-400">
            <FaLaptopCode size={48} className="mb-4" />
            <p className="text-lg font-medium">No lessons found</p>
            <p className="text-sm mt-1">
              Create your first C programming lesson to get started.
            </p>
            <Link
              href="/dashboard/teacher/lessons/c-programming/create"
              className="btn bg-blue-500 hover:bg-blue-600 border-none text-white mt-4"
            >
              <FaPlus />
              Create Lesson
            </Link>
          </div>
        </div>
      )}

      {/* Lesson Cards */}
      {!loading && lessons.length > 0 && (
        <>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {lessons.map((lesson) => (
              <div
                key={lesson._id}
                className="card bg-white shadow-xl border border-blue-100 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
              >
                <div className="card-body">
                  {/* Title + Badge */}
                  <div className="flex items-start justify-between gap-2">
                    <h2 className="card-title text-gray-800">
                      <span className="text-blue-500">
                        <FaLaptopCode />
                      </span>
                      {lesson.title}
                    </h2>
                    <span className={difficultyBadge(lesson.difficulty)}>
                      {lesson.difficulty}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-gray-500 text-sm mt-2 line-clamp-3">
                    {lesson.description}
                  </p>

                  {/* Links */}
                  <div className="flex flex-col gap-2 mt-4 text-sm">
                    <a
                      href={lesson.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-red-500 hover:underline"
                    >
                      <span>
                        <FaYoutube />
                      </span>
                      Watch Tutorial
                    </a>
                    <a
                      href={lesson.referenceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-blue-500 hover:underline"
                    >
                      <span>
                        <FaGlobe />
                      </span>
                      Programiz Reference
                    </a>
                  </div>

                  {/* Divider */}
                  <div className="divider my-2" />

                  {/* Actions */}
                  <div className="card-actions justify-end">
                    <button className="btn btn-sm btn-outline border-blue-300 hover:bg-blue-100">
                      <FaEye />
                      View
                    </button>
                    <button className="btn btn-sm btn-error text-white">
                      <FaTrash />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Tip */}
          <div className="rounded-2xl border border-blue-200 bg-blue-50 p-6">
            <h3 className="text-lg font-bold text-blue-600">
              💡 Tip
            </h3>
            <p className="mt-2 text-gray-600">
              You have created {lessons.length} C programming lesson{lessons.length > 1 ? "s" : ""}.
              Keep adding more lessons to help your students learn effectively.
            </p>
          </div>
        </>
      )}
    </section>
  );
};

export default AllCLessonsPage;
