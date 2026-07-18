"use client";

import { useState } from "react";
import {
  FaHeart,
  FaRegHeart,
  FaYoutube,
  FaGlobe,
  FaLayerGroup,
  FaUser,
  FaArrowLeft,
  FaExclamationTriangle,
} from "react-icons/fa";
import Link from "next/link";

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
      return "badge badge-warning badge-lg";
    case "Intermediate":
      return "badge badge-info badge-lg";
    case "Advanced":
      return "badge badge-error badge-lg";
    default:
      return "badge badge-warning badge-lg";
  }
};

// Extract YouTube video ID from various URL formats
const getYouTubeId = (url: string): string | null => {
  if (!url) return null;

  const patterns = [
    /youtube\.com\/watch\?v=([^&]+)/,
    /youtu\.be\/([^?]+)/,
    /youtube\.com\/embed\/([^?]+)/,
    /youtube\.com\/v\/([^?]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }

  return null;
};

const HtmlLessonDetails = ({ lesson }: { lesson: HtmlLesson }) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [videoError, setVideoError] = useState(false);

  const videoId = getYouTubeId(lesson.videoUrl);

  const handleLike = () => {
    if (liked) {
      setLikeCount((prev) => prev - 1);
    } else {
      setLikeCount((prev) => prev + 1);
    }
    setLiked(!liked);
  };

  return (
    <section className="max-w-6xl mx-auto px-4 py-10 space-y-8">
      {/* Back Button */}
      <Link
        href="/html"
        className="btn btn-ghost gap-2 text-gray-600 hover:text-orange-500"
      >
        <FaArrowLeft />
        Back to Lessons
      </Link>

      {/* Main Content — Responsive: stacked on mobile, side-by-side on desktop */}
      <div className="grid gap-8 lg:grid-cols-5">
        {/* Left — Video (takes 3 cols on desktop) */}
        <div className="lg:col-span-3 space-y-4">
          <div className="card bg-white shadow-xl border border-orange-100 overflow-hidden">
            {videoId && !videoError ? (
              <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}`}
                  title={lesson.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                  onError={() => setVideoError(true)}
                />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-gray-400 bg-gray-50">
                <FaExclamationTriangle size={48} className="mb-4 text-orange-400" />
                <p className="text-lg font-medium text-gray-600">
                  Video not available
                </p>
                <p className="text-sm mt-1">
                  {lesson.videoUrl
                    ? "The provided YouTube URL could not be embedded."
                    : "No video URL has been provided for this lesson."}
                </p>
                {lesson.videoUrl && (
                  <a
                    href={lesson.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm bg-orange-500 hover:bg-orange-600 border-none text-white mt-4"
                  >
                    <FaYoutube />
                    Open in YouTube
                  </a>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right — Details (takes 2 cols on desktop) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title + Like */}
          <div className="card bg-white shadow-xl border border-orange-100">
            <div className="card-body space-y-4">
              <div className="flex items-start justify-between gap-3">
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">
                  {lesson.title}
                </h1>

                {/* Like Button */}
                <button
                  onClick={handleLike}
                  className="btn btn-outline border-orange-300 hover:bg-orange-100 gap-2"
                >
                  {liked ? (
                    <span className="text-red-500">
                      <FaHeart size={18} />
                    </span>
                  ) : (
                    <span className="text-gray-400">
                      <FaRegHeart size={18} />
                    </span>
                  )}
                  {likeCount}
                </button>
              </div>

              {/* Difficulty */}
              <div>
                <span className={difficultyBadge(lesson.difficulty)}>
                  {lesson.difficulty}
                </span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="card bg-white shadow-xl border border-orange-100">
            <div className="card-body">
              <h2 className="card-title text-gray-800 text-lg">
                <span className="text-orange-500">
                  <FaLayerGroup />
                </span>
                Description
              </h2>
              <p className="text-gray-600 leading-relaxed mt-2">
                {lesson.description}
              </p>
            </div>
          </div>

          {/* Author */}
          <div className="card bg-white shadow-xl border border-orange-100">
            <div className="card-body">
              <h2 className="card-title text-gray-800 text-lg">
                <span className="text-orange-500">
                  <FaUser />
                </span>
                Created By
              </h2>
              <p className="text-gray-600 mt-2">{lesson.authorEmail}</p>
            </div>
          </div>

          {/* Reference Link */}
          <div className="card bg-white shadow-xl border border-orange-100">
            <div className="card-body">
              <h2 className="card-title text-gray-800 text-lg">
                <span className="text-blue-500">
                  <FaGlobe />
                </span>
                Reference
              </h2>
              <a
                href={lesson.referenceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline border-orange-300 hover:bg-orange-100 mt-2 gap-2"
              >
                <FaGlobe />
                Open W3Schools
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HtmlLessonDetails;
