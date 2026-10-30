"use client";

import Link from "next/link";
import { FaArrowRight, FaBookOpen, FaPlusCircle } from "react-icons/fa";

const actions = [
  {
    title: "Lessons You Made",
    description: "View, edit and manage all your C programming lessons.",
    href: "/dashboard/teacher/lessons/c-programming/all-lessons",
    icon: FaBookOpen,
  },
  {
    title: "Create Lesson",
    description: "Create a brand new C programming lesson for your students.",
    href: "/dashboard/teacher/lessons/c-programming/create",
    icon: FaPlusCircle,
  },
];

const CProgrammingLessonsPage = () => {
  return (
    <section className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-base-content">
          💻 C Programming Lessons
        </h1>

        <p className="mt-2 text-base-content/50 text-sm md:text-base">
          Manage your C programming lessons or create a new one. 🛠️
        </p>
      </div>

      {/* Action Cards */}
      <div className="grid gap-6 md:grid-cols-2">
        {actions.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.title}
              href={item.href}
              className="group border border-base-300 bg-base-100 p-7 text-base-content transition-colors duration-200 hover:border-base-content/40"
            >
              <div>
                <div className="mb-5 inline-flex border border-base-300 bg-base-200 p-4">
                  <Icon size={34} />
                </div>

                <h2 className="text-2xl font-bold">
                  {item.title}
                </h2>

                <p className="mt-2 text-base-content/70">
                  {item.description}
                </p>

                <span className="button-action mt-6 inline-flex min-h-10 items-center gap-2 bg-white px-4 font-medium text-black">
                  Open <FaArrowRight aria-hidden="true" size={14} />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default CProgrammingLessonsPage;
