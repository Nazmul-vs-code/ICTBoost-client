"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { deleteLesson } from "@/lib/actions/delete-lesson";
import toast from "react-hot-toast";
import {
  FaBookOpen,
  FaHeart,
  FaPlus,
  FaLaptopCode,
  FaSearch,
  FaTrash,
  FaEye,
  FaLayerGroup,
} from "react-icons/fa";

type LessonAnalytics = {
  _id: string;
  title: string;
  difficulty: string;
  likeCount: number;
};

const difficulties = ["All", "Beginner", "Intermediate", "Advanced"];

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

const TeacherLessonsList = ({
  lessons,
  subject,
  onDelete,
}: {
  lessons: LessonAnalytics[];
  subject: "html" | "c";
  onDelete?: (id: string) => void;
}) => {
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("All");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const isHtml = subject === "html";
  const accentBorder = isHtml ? "border-orange-100" : "border-blue-100";
  const accentText = isHtml ? "text-orange-500" : "text-blue-500";
  const accentBg = isHtml ? "bg-orange-500 hover:bg-orange-600" : "bg-blue-500 hover:bg-blue-600";
  const accentHead = isHtml ? "bg-orange-100" : "bg-blue-100";
  const accentRowHover = isHtml ? "hover:bg-orange-50" : "hover:bg-blue-50";
  const accentBtnBorder = isHtml ? "border-orange-300 hover:bg-orange-100" : "border-blue-300 hover:bg-blue-100";
  const accentFocus = isHtml ? "focus:outline-orange-400" : "focus:outline-blue-400";
  const createHref = isHtml
    ? "/dashboard/teacher/lessons/html/create"
    : "/dashboard/teacher/lessons/c-programming/create";
  const viewHref = (id: string) => (isHtml ? `/html/${id}` : `/c/${id}`);
  const Icon = isHtml ? FaBookOpen : FaLaptopCode;

  const filtered = useMemo(() => {
    return lessons.filter((lesson) => {
      const matchSearch = lesson.title.toLowerCase().includes(search.toLowerCase());
      const matchDifficulty = difficulty === "All" || lesson.difficulty === difficulty;
      return matchSearch && matchDifficulty;
    });
  }, [lessons, search, difficulty]);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

    setDeletingId(id);

    try {
      await deleteLesson(subject, id);
      toast.success(`"${title}" deleted successfully.`);
      onDelete?.(id);
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete lesson.");
    } finally {
      setDeletingId(null);
    }
  };

  if (lessons.length === 0) {
    return (
      <div className={`card bg-white shadow-xl ${accentBorder}`}>
        <div className="card-body flex flex-col items-center py-16 text-gray-400">
          <span className="mb-4">
            <Icon size={48} />
          </span>
          <p className="text-lg font-medium">No {isHtml ? "HTML" : "C"} lessons yet</p>
          <p className="text-sm mt-1">
            Create your first {isHtml ? "HTML" : "C Programming"} lesson to get started.
          </p>
          <Link
            href={createHref}
            className={`btn ${accentBg} border-none text-white mt-4`}
          >
            <FaPlus />
            Create Lesson
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`card bg-white shadow-xl ${accentBorder}`}>
      <div className="card-body">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="card-title text-gray-800">
            <span className={accentText}>
              <Icon />
            </span>
            {isHtml ? "HTML" : "C Programming"} Lessons ({filtered.length})
          </h2>
          <Link
            href={createHref}
            className={`btn btn-sm ${accentBg} border-none text-white`}
          >
            <FaPlus />
            New
          </Link>
        </div>

        {/* Search + Filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <FaSearch />
            </span>
            <input
              type="text"
              placeholder="Search by title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={`input input-bordered w-full pl-10 ${accentFocus}`}
            />
          </div>
          <div className="relative">
            <span className={`absolute left-3 top-1/2 -translate-y-1/2 ${accentText}`}>
              <FaLayerGroup />
            </span>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className={`select select-bordered pl-10 w-full sm:w-auto ${accentFocus}`}
            >
              {difficulties.map((level) => (
                <option key={level} value={level}>
                  {level === "All" ? "All Difficulties" : level}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr className={`${accentHead} text-gray-700`}>
                <th>#</th>
                <th>Topic</th>
                <th>Difficulty</th>
                <th>Likes</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-gray-400">
                    No lessons match your search or filter.
                  </td>
                </tr>
              )}
              {filtered.map((lesson, index) => (
                <tr
                  key={lesson._id}
                  className={`${accentRowHover} transition-all`}
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
                    <div className="flex items-center gap-2">
                      <Link
                        href={viewHref(lesson._id)}
                        className={`btn btn-xs btn-outline ${accentBtnBorder}`}
                      >
                        <FaEye />
                        View
                      </Link>
                      <button
                        onClick={() => handleDelete(lesson._id, lesson.title)}
                        disabled={deletingId === lesson._id}
                        className="btn btn-xs btn-error text-white"
                      >
                        <FaTrash />
                        {deletingId === lesson._id ? "..." : "Delete"}
                      </button>
                    </div>
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
