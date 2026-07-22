"use client";

import { GetApiFunctionById } from "@/lib/api/get-api";
import CLessonDetails from "@/components/c/CLessonDetails";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaLaptopCode } from "react-icons/fa";

type CLesson = {
  _id: string;
  title: string;
  videoUrl: string;
  referenceUrl: string;
  description: string;
  difficulty: string;
  authorEmail: string;
};

const CLessonDetailsPage = () => {
  const params = useParams();
  const id = params.id as string;

  const [lesson, setLesson] = useState<CLesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchLesson = async () => {
      try {
        const result = await GetApiFunctionById("/lesson/c", id);

        if (!result.data) {
          setNotFound(true);
        } else {
          setLesson(result.data);
        }
      } catch (error) {
        console.log(error);
        setNotFound(true);
        toast.error("Failed to load lesson.");
      } finally {
        setLoading(false);
      }
    };

    fetchLesson();
  }, [id]);

  // Skeleton Loader
  if (loading) {
    return (
      <section className="max-w-6xl mx-auto px-4 py-10 space-y-8">
        <div className="h-8 bg-gray-200 rounded w-32 animate-pulse" />
        <div className="grid gap-8 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <div className="card bg-base-100 shadow-xl border border-sky-500/15 animate-pulse">
              <div className="w-full bg-gray-200" style={{ paddingTop: "56.25%" }} />
            </div>
          </div>
          <div className="lg:col-span-2 space-y-6">
            <div className="card bg-base-100 shadow-xl border border-sky-500/15 animate-pulse">
              <div className="card-body space-y-4">
                <div className="h-8 bg-gray-200 rounded w-3/4" />
                <div className="h-6 bg-gray-200 rounded w-24" />
              </div>
            </div>
            <div className="card bg-base-100 shadow-xl border border-sky-500/15 animate-pulse">
              <div className="card-body space-y-3">
                <div className="h-5 bg-gray-200 rounded w-1/3" />
                <div className="h-4 bg-gray-200 rounded w-full" />
                <div className="h-4 bg-gray-200 rounded w-4/5" />
                <div className="h-4 bg-gray-200 rounded w-2/3" />
              </div>
            </div>
            <div className="card bg-base-100 shadow-xl border border-sky-500/15 animate-pulse">
              <div className="card-body space-y-3">
                <div className="h-5 bg-gray-200 rounded w-1/3" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Not Found
  if (notFound || !lesson) {
    return (
      <section className="max-w-6xl mx-auto px-4 py-10">
        <div className="card bg-base-100 shadow-xl border border-sky-500/15">
          <div className="card-body flex flex-col items-center py-16 text-gray-400">
            <span className="mb-4"><FaLaptopCode size={48} /></span>
            <p className="text-lg font-medium">Lesson not found</p>
            <p className="text-sm mt-1">
              The lesson you&apos;re looking for doesn&apos;t exist or has been removed.
            </p>
            <a
              href="/c"
              className="btn bg-blue-500 hover:bg-blue-600 border-none text-white mt-4"
            >
              Browse Lessons
            </a>
          </div>
        </div>
      </section>
    );
  }

  return <CLessonDetails lesson={lesson} />;
};

export default CLessonDetailsPage;
