"use client";

import { GetApiFunction } from "@/lib/api/get-api";
import HtmlLessonCard from "@/components/html/HtmlLessonCard";
import HtmlLessonFilter from "@/components/html/HtmlLessonFilter";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import toast from "react-hot-toast";
import { FaBookOpen } from "react-icons/fa";

type HtmlLesson = {
  _id: string;
  title: string;
  videoUrl: string;
  referenceUrl: string;
  description: string;
  difficulty: string;
  authorEmail: string;
};

const ITEMS_PER_PAGE = 8;

const HtmlLessonsContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialSearch = searchParams.get("search") || "";
  const initialDifficulty = searchParams.get("difficulty") || "All";

  const [lessons, setLessons] = useState<HtmlLesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(initialSearch);
  const [difficulty, setDifficulty] = useState(initialDifficulty);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [loadingMore, setLoadingMore] = useState(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  // Sync filters to URL
  useEffect(() => {
    const params = new URLSearchParams();

    if (search) params.set("search", search);
    if (difficulty && difficulty !== "All") params.set("difficulty", difficulty);

    const queryString = params.toString();
    router.replace(`/html${queryString ? `?${queryString}` : ""}`, { scroll: false });
  }, [search, difficulty, router]);

  // Fetch all lessons once
  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const result = await GetApiFunction("/lesson/html");
        setLessons(result.data);
      } catch (error) {
        console.log(error);
        toast.error("Failed to load lessons.");
      } finally {
        setLoading(false);
      }
    };

    fetchLessons();
  }, []);

  // Reset visible count when filters change
  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [search, difficulty]);

  // Filter lessons by search + difficulty
  const filteredLessons = useMemo(() => {
    return lessons.filter((lesson) => {
      const matchSearch = lesson.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchDifficulty =
        difficulty === "All" || lesson.difficulty === difficulty;

      return matchSearch && matchDifficulty;
    });
  }, [lessons, search, difficulty]);

  // Visible lessons (infinite scroll slice)
  const visibleLessons = filteredLessons.slice(0, visibleCount);
  const hasMore = visibleCount < filteredLessons.length;

  // Intersection Observer for infinite scroll
  useEffect(() => {
    if (!hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loadingMore) {
          setLoadingMore(true);
          setTimeout(() => {
            setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
            setLoadingMore(false);
          }, 400);
        }
      },
      { rootMargin: "200px" }
    );

    const el = sentinelRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [hasMore, loadingMore]);

  return (
    <section className="max-w-6xl mx-auto px-4 py-10 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-gray-800">
          HTML Lessons
        </h1>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Explore our collection of HTML lessons created by expert teachers.
          Learn from video tutorials and W3Schools references.
        </p>
      </div>

      {/* Skeleton Loader */}
      {loading && (
        <>
          <div className="flex gap-4">
            <div className="h-12 bg-gray-200 rounded flex-1 animate-pulse" />
            <div className="h-12 bg-gray-200 rounded w-48 animate-pulse" />
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="card bg-white shadow-xl border border-orange-100 animate-pulse"
              >
                <div className="card-body space-y-4">
                  <div className="flex justify-between">
                    <div className="h-5 bg-gray-200 rounded w-1/2" />
                    <div className="h-8 w-8 bg-gray-200 rounded-full" />
                  </div>
                  <div className="h-4 bg-gray-200 rounded w-20" />
                  <div className="h-4 bg-gray-200 rounded w-full" />
                  <div className="h-4 bg-gray-200 rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Filters + Content */}
      {!loading && (
        <>
          {/* Filter */}
          <HtmlLessonFilter
            search={search}
            onSearchChange={setSearch}
            difficulty={difficulty}
            onDifficultyChange={setDifficulty}
          />

          {/* Empty State — no lessons at all */}
          {lessons.length === 0 && (
            <div className="card bg-white shadow-xl border border-orange-100">
              <div className="card-body flex flex-col items-center py-16 text-gray-400">
                <FaBookOpen size={48} className="mb-4" />
                <p className="text-lg font-medium">No lessons available yet</p>
                <p className="text-sm mt-1">
                  Check back later for new HTML lessons.
                </p>
              </div>
            </div>
          )}

          {/* No Results from Filter */}
          {lessons.length > 0 && filteredLessons.length === 0 && (
            <div className="card bg-white shadow-xl border border-orange-100">
              <div className="card-body flex flex-col items-center py-16 text-gray-400">
                <FaBookOpen size={48} className="mb-4" />
                <p className="text-lg font-medium">No lessons found</p>
                <p className="text-sm mt-1">
                  Try adjusting your search or difficulty filter.
                </p>
              </div>
            </div>
          )}

          {/* Lesson Cards Grid */}
          {filteredLessons.length > 0 && (
            <>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {visibleLessons.map((lesson) => (
                  <HtmlLessonCard key={lesson._id} lesson={lesson} />
                ))}
              </div>

              {/* Loading More Spinner */}
              {loadingMore && (
                <div className="flex justify-center py-6">
                  <span className="loading loading-spinner loading-lg text-orange-500" />
                </div>
              )}

              {/* Sentinel — IntersectionObserver watches this */}
              <div ref={sentinelRef} className="h-10" />

              {/* End Message */}
              {!hasMore && filteredLessons.length > ITEMS_PER_PAGE && (
                <p className="text-center text-gray-400 text-sm py-4">
                  You&apos;ve seen all {filteredLessons.length} lessons
                </p>
              )}
            </>
          )}
        </>
      )}
    </section>
  );
};

const HtmlLessonsPage = () => {
  return (
    <Suspense
      fallback={
        <section className="max-w-6xl mx-auto px-4 py-10 space-y-8">
          <div className="text-center space-y-2">
            <div className="h-10 bg-gray-200 rounded w-64 mx-auto animate-pulse" />
            <div className="h-5 bg-gray-200 rounded w-96 mx-auto animate-pulse" />
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="card bg-white shadow-xl border border-orange-100 animate-pulse"
              >
                <div className="card-body space-y-4">
                  <div className="h-5 bg-gray-200 rounded w-1/2" />
                  <div className="h-4 bg-gray-200 rounded w-20" />
                  <div className="h-4 bg-gray-200 rounded w-full" />
                </div>
              </div>
            ))}
          </div>
        </section>
      }
    >
      <HtmlLessonsContent />
    </Suspense>
  );
};

export default HtmlLessonsPage;
