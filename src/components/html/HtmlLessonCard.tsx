"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { toggleLike } from "@/lib/actions/like";
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
      return "border border-zinc-700 px-2 py-1 font-mono text-xs text-zinc-300";
    case "Intermediate":
      return "border border-zinc-700 px-2 py-1 font-mono text-xs text-zinc-300";
    case "Advanced":
      return "border border-zinc-700 px-2 py-1 font-mono text-xs text-zinc-300";
    default:
      return "border border-zinc-700 px-2 py-1 font-mono text-xs text-zinc-300";
  }
};

export default function HtmlLessonCard({
  lesson,
}: {
  lesson: HtmlLesson;
}) {
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

        const res = await fetch(`${baseUrl}/lesson/html/like/${lesson._id}?${params}`);
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
      const result = await toggleLike(
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
      className="theme-adaptive group flex h-[31rem] w-full flex-col border border-zinc-800 bg-zinc-900 transition-colors hover:border-zinc-600"
    >
      <div className="flex h-full flex-col p-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex gap-4">
            <div className="grid size-12 shrink-0 place-items-center border border-zinc-700 text-zinc-200">
              <FaLayerGroup />
            </div>

            <div className="min-w-0">
              <h2 className="line-clamp-2 text-lg font-semibold text-white">
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
        <p className="mt-6 line-clamp-3 leading-7 text-zinc-400">
          {lesson.description}
        </p>

        {/* Resources */}
        <div className="mt-6 space-y-3">
          <a
            href={lesson.videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 border border-zinc-800 bg-zinc-950 p-3 transition-colors hover:border-zinc-600"
          >
            <FaYoutube className="text-red-500 text-lg" />

            <span className="font-medium text-zinc-300">
              Watch Video
            </span>
          </a>

          <a
            href={lesson.referenceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 border border-zinc-800 bg-zinc-950 p-3 transition-colors hover:border-zinc-600"
          >
            <FaGlobe className="text-sky-500 text-lg" />

            <span className="font-medium text-zinc-300">
              W3Schools Reference
            </span>
          </a>
        </div>

        {/* Button */}
        <Link
          href={`/html/${lesson._id}`}
          className="btn mt-auto w-full"
        >
          View Lesson
          <FaArrowRight />
        </Link>
      </div>
    </div>
  );
}
