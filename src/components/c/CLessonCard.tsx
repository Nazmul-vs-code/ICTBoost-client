"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { toggleLikeC } from "@/lib/actions/like-c";
import {
  FaHeart,
  FaRegHeart,
  FaYoutube,
  FaGlobe,
  FaLaptopCode,
  FaArrowRight,
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
  const [likeCount, setLikeCount] = useState(0);
  const [likeLoading, setLikeLoading] = useState(false);

  const { data: session } = authClient.useSession();
  const currentUserEmail = session?.user?.email;

  useEffect(() => {
    if (!lesson._id) return;

    const fetchLikes = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;
        const params = new URLSearchParams({ lessonId: lesson._id });

        if (currentUserEmail) {
          params.set("likedByEmail", currentUserEmail);
        }

        const res = await fetch(`${baseUrl}/lesson/c/like/${lesson._id}?${params}`);
        const data = await res.json();

        if (data.success) {
          setLikeCount(data.likeCount);
          setLiked(data.liked);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchLikes();
  }, [lesson._id, currentUserEmail]);

  const handleLike = async () => {
    if (!currentUserEmail) {
      toast.error("Please login to like this lesson.");
      return;
    }

    if (likeLoading) return;

    setLikeLoading(true);

    try {
      const result = await toggleLikeC(
        lesson._id,
        lesson.authorEmail,
        currentUserEmail
      );

      setLiked(result.liked);
      setLikeCount(result.likeCount);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLikeLoading(false);
    }
  };

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
      {/* Sky Glow */}
      <div
        className="
          absolute
          -top-24
          -right-24
          h-56
          w-56
          rounded-full
          bg-sky-400/25
          blur-3xl
          transition-all
          duration-700
          group-hover:scale-125
        "
      />

      {/* Orange Glow */}
      <div
        className="
          absolute
          -bottom-24
          -left-24
          h-56
          w-56
          rounded-full
          bg-orange-400/20
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
                bg-sky-500/10
                flex
                items-center
                justify-center
                text-sky-500
                text-xl
                transition-all
                duration-300
                group-hover:rotate-6
                group-hover:scale-110
              "
            >
              <FaLaptopCode />
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
            onClick={handleLike}
            disabled={likeLoading}
            className={`
              flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-all duration-300
              ${liked
                ? "bg-red-500/10 text-red-500 hover:bg-red-500/20"
                : "bg-base-200/50 text-base-content/40 hover:bg-base-300/60 hover:text-red-500"
              }
              ${likeLoading ? "opacity-50 cursor-not-allowed" : ""}
            `}
          >
            {liked ? (
              <FaHeart size={16} className="animate-pulse" />
            ) : (
              <FaRegHeart size={16} />
            )}
            <span>{likeCount}</span>
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
              Programiz Reference
            </span>
          </a>
        </div>

        {/* Button */}
        <Link
          href={`/c/${lesson._id}`}
          className="
            btn
            w-full
            rounded-2xl
            border-none
            bg-gradient-to-r
            from-sky-500
            to-blue-600
            text-white
            shadow-lg
            transition-all
            duration-300
            hover:scale-[1.03]
            hover:shadow-sky-500/25
          "
        >
          View Lesson
          <FaArrowRight />
        </Link>
      </div>
    </div>
  );
};

export default CLessonCard;
