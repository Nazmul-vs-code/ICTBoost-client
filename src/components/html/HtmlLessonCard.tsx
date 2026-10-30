"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { toggleLike } from "@/lib/actions/like";
import { GetApiFunctionWithParams } from "@/lib/api/get-api";
import {
  FaHeart,
  FaRegHeart,
  FaGlobe,
  FaLayerGroup,
  FaArrowRight,
} from "react-icons/fa";
import { getYouTubeEmbedUrl } from "@/lib/youtube";

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
      return "rounded-full border border-zinc-700 px-3 py-1 font-mono text-xs text-zinc-300";
    case "Intermediate":
      return "rounded-full border border-zinc-700 px-3 py-1 font-mono text-xs text-zinc-300";
    case "Advanced":
      return "rounded-full border border-zinc-700 px-3 py-1 font-mono text-xs text-zinc-300";
    default:
      return "rounded-full border border-zinc-700 px-3 py-1 font-mono text-xs text-zinc-300";
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
  const videoEmbedUrl = getYouTubeEmbedUrl(lesson.videoUrl);

  useEffect(() => {
    if (!lesson._id) return;

    const fetchLikes = async () => {
      try {
        const params: Record<string, string> = { lessonId: lesson._id };

        if (currentUserEmail) {
          params.likedByEmail = currentUserEmail;
        }

        const data = await GetApiFunctionWithParams(
          `/lesson/html/like/${lesson._id}`,
          params
        );

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
      className="theme-adaptive glass-card group flex h-full min-h-[34rem] w-full flex-col transition-colors hover:border-zinc-600"
    >
      <div className="flex h-full flex-col gap-4 p-5 sm:p-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex gap-4">
            <div className="grid size-12 shrink-0 place-items-center rounded-2xl border border-zinc-700 text-zinc-200">
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
            aria-label={`${liked ? "Unlike" : "Like"} ${lesson.title}; ${likeCount} likes`}
            aria-pressed={liked}
            onClick={handleLike}
            disabled={likeLoading}
            type="button"
            className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {liked ? (
              <FaHeart size={16} className="animate-pulse text-rose-500" />
            ) : (
              <FaRegHeart size={16} className="text-rose-500" />
            )}
            <span>{likeCount}</span>
          </button>
        </div>

        {/* Description */}
        {videoEmbedUrl ? (
          <div className="aspect-video w-full shrink-0 overflow-hidden rounded-2xl border border-zinc-800 bg-black">
            <iframe
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="size-full"
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              src={videoEmbedUrl}
              title={`${lesson.title} video`}
            />
          </div>
        ) : (
          <a
            href={lesson.videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex aspect-video w-full shrink-0 items-center justify-center gap-3 rounded-2xl border border-zinc-800 bg-zinc-950 font-medium text-zinc-300 transition-colors hover:border-zinc-600"
          >
            <span className="text-red-500">▶</span>
            Watch video
          </a>
        )}

        <p className="line-clamp-2 leading-7 text-zinc-400">
          {lesson.description}
        </p>

        <a
          href={lesson.referenceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex shrink-0 items-center gap-3 rounded-2xl border border-zinc-800 bg-zinc-950 p-3 transition-colors hover:border-zinc-600"
        >
          <FaGlobe className="text-sky-500 text-lg" />
          <span className="font-medium text-zinc-300">W3Schools Reference</span>
        </a>

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
