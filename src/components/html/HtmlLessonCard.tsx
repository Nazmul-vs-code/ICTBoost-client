"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FaHeart,
  FaRegHeart,
  FaYoutube,
  FaGlobe,
  FaLayerGroup,
  FaArrowRight,
} from "react-icons/fa";

type HtmlLesson = {
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

export default function HtmlLessonCard({
  lesson,
}: {
  lesson: HtmlLesson;
}) {
  const [liked, setLiked] = useState(false);

  return (
    <div
      className="
        group
        relative
        overflow-hidden
        rounded-3xl
        bg-base-100/70
        backdrop-blur-2xl
        border
        border-base-300/40
        shadow-xl
        transition-all
        duration-500
        hover:-translate-y-2
        hover:shadow-2xl
      "
    >
      {/* Orange Glow */}
      <div
        className="
          absolute
          -top-24
          -right-24
          h-56
          w-56
          rounded-full
          bg-orange-400/25
          blur-3xl
          transition-all
          duration-700
          group-hover:scale-125
        "
      />

      {/* Blue Glow */}
      <div
        className="
          absolute
          -bottom-24
          -left-24
          h-56
          w-56
          rounded-full
          bg-sky-400/20
          blur-3xl
          transition-all
          duration-700
          group-hover:scale-125
        "
      />

      <div className="relative z-10 p-7 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex gap-4">
            <div
              className="
                h-14
                w-14
                rounded-2xl
                bg-orange-500/10
                flex
                items-center
                justify-center
                text-orange-500
                text-xl
                transition-all
                duration-300
                group-hover:rotate-6
                group-hover:scale-110
              "
            >
              <FaLayerGroup />
            </div>

            <div>
              <h2 className="text-xl font-bold text-base-content">
                {lesson.title}
              </h2>

              <div className="mt-2">
                <span className={difficultyBadge(lesson.difficulty)}>
                  {lesson.difficulty}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setLiked(!liked)}
            className="
              rounded-full
              p-2
              transition-all
              duration-300
              hover:bg-base-300/40
            "
          >
            {liked ? (
              <FaHeart
                size={20}
                className="text-red-500 animate-pulse"
              />
            ) : (
              <FaRegHeart
                size={20}
                className="text-base-content/40 hover:text-red-500"
              />
            )}
          </button>
        </div>

        {/* Description */}
        <p className="text-base-content/60 leading-7 line-clamp-3">
          {lesson.description}
        </p>

        {/* Resources */}
        <div className="space-y-3">
          <a
            href={lesson.videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="
              flex
              items-center
              gap-3
              rounded-2xl
              bg-base-200/50
              border
              border-red-500/10
              p-3
              transition-all
              duration-300
              hover:bg-red-500/10
              hover:translate-x-1
            "
          >
            <FaYoutube className="text-red-500 text-lg" />

            <span className="font-medium text-base-content/70">
              Watch Video
            </span>
          </a>

          <a
            href={lesson.referenceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="
              flex
              items-center
              gap-3
              rounded-2xl
              bg-base-200/50
              border
              border-sky-500/10
              p-3
              transition-all
              duration-300
              hover:bg-sky-500/10
              hover:translate-x-1
            "
          >
            <FaGlobe className="text-sky-500 text-lg" />

            <span className="font-medium text-base-content/70">
              W3Schools Reference
            </span>
          </a>
        </div>

        {/* Button */}
        <Link
          href={`/html/${lesson._id}`}
          className="
            btn
            w-full
            rounded-2xl
            border-none
            bg-gradient-to-r
            from-orange-500
            to-orange-600
            text-white
            shadow-lg
            transition-all
            duration-300
            hover:scale-[1.03]
            hover:shadow-orange-500/25
          "
        >
          View Lesson
          <FaArrowRight />
        </Link>
      </div>
    </div>
  );
}
