"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FaHeart,
  FaRegHeart,
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

const CLessonCard = ({ lesson }: { lesson: CLesson }) => {
  const [liked, setLiked] = useState(false);

  return (
    <div className="card bg-white shadow-xl border border-blue-100 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
      <div className="card-body">
        {/* Top Row: Title + Love Button */}
        <div className="flex items-start justify-between gap-2">
          <h2 className="card-title text-gray-800">
            <span className="text-blue-500">
              <FaLaptopCode />
            </span>
            {lesson.title}
          </h2>

          <button
            onClick={() => setLiked(!liked)}
            className="btn btn-ghost btn-sm"
          >
            {liked ? (
              <span className="text-red-500">
                <FaHeart size={20} />
              </span>
            ) : (
              <span className="text-gray-400 hover:text-red-400">
                <FaRegHeart size={20} />
              </span>
            )}
          </button>
        </div>

        {/* Difficulty Badge */}
        <div>
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

        {/* View Details Button */}
        <div className="card-actions justify-end">
          <Link
            href={`/c/${lesson._id}`}
            className="btn btn-sm bg-blue-500 hover:bg-blue-600 border-none text-white"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CLessonCard;
