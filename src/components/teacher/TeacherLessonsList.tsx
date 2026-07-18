"use client";

import Link from "next/link";
import {
  FaBookOpen,
  FaHeart,
  FaPlus,
  FaYoutube,
  FaGlobe,
} from "react-icons/fa";

type LessonAnalytics = {
  _id: string;
  title: string;
  difficulty: string;
  likeCount: number;
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

const TeacherLessonsList = ({ lessons }: { lessons: LessonAnalytics[] }) => {
  if (lessons.length === 0) {
    return (
      <div className="card bg-white shadow-xl border border-orange-100">
        <div className="card-body flex flex-col items-center py-16 text-gray-400">
          <FaBookOpen size={48} className="mb-4" />
          <p className="text-lg font-medium">No lessons yet</p>
          <p className="text-sm mt-1">
            Create your first HTML lesson to get started.
          </p>
          <Link
            href="/dashboard/teacher/lessons/html/create"
            className="btn bg-orange-500 hover:bg-orange-600 border-none text-white mt-4"
          >
            <FaPlus />
            Create Lesson
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="card bg-white shadow-xl border border-orange-100">
      <div className="card-body">
        <div className="flex items-center justify-between mb-4">
          <h2 className="card-title text-gray-800">
            <span className="text-orange-500">
              <FaBookOpen />
            </span>
            My Lessons
          </h2>
          <Link
            href="/dashboard/teacher/lessons/html/create"
            className="btn btn-sm bg-orange-500 hover:bg-orange-600 border-none text-white"
          >
            <FaPlus />
            New
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr className="bg-orange-100 text-gray-700">
                <th>#</th>
                <th>Topic</th>
                <th>Difficulty</th>
                <th>Likes</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {lessons.map((lesson, index) => (
                <tr
                  key={lesson._id}
                  className="hover:bg-orange-50 transition-all"
                >
                  <td className="font-medium">{index + 1}</td>
                  <td className="font-semibold text-gray-800">
                    {lesson.title}
                  </td>
                  <td>
                    <span className={difficultyBadge(lesson.difficulty)}>
                      {lesson.difficulty}
                    </span>
                  </td>
                  <td>
                    <span className="flex items-center gap-1 text-red-500 font-semibold">
                      <FaHeart size={14} />
                      {lesson.likeCount}
                    </span>
                  </td>
                  <td>
                    <Link
                      href={`/html/${lesson._id}`}
                      className="btn btn-sm btn-outline border-orange-300 hover:bg-orange-100"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TeacherLessonsList;
