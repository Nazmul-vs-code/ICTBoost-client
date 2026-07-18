import Link from "next/link";
import { FaCode, FaHtml5, FaArrowRight } from "react-icons/fa";

const lessonCategories = [
  {
    title: "HTML",
    description: "Create and manage HTML learning lessons.",
    href: "/dashboard/teacher/lessons/html",
    icon: FaHtml5,
    color: "text-orange-500",
    bg: "bg-orange-50",
  },
  {
    title: "C Programming",
    description: "Create programming lessons, examples and exercises.",
    href: "/dashboard/teacher/lessons/c-programming",
    icon: FaCode,
    color: "text-blue-500",
    bg: "bg-blue-50",
  },
];

const LessonsPage = () => {
  return (
    <section className="space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Lesson Management
        </h1>

        <p className="text-gray-500 mt-2">
          Select a subject to create and manage lessons for your students.
        </p>
      </div>

      {/* Subject Cards */}
      <div className="grid gap-6 md:grid-cols-2">

        {lessonCategories.map((subject) => {
          const Icon = subject.icon;

          return (
            <Link
              key={subject.title}
              href={subject.href}
              className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div
                className={`mb-5 flex h-16 w-16 items-center justify-center rounded-2xl ${subject.bg}`}
              >
                <Icon
                  className={`${subject.color}`}
                  size={34}
                />
              </div>

              <h2 className="text-2xl font-bold text-gray-800">
                {subject.title}
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                {subject.description}
              </p>

              <div className="mt-6 flex items-center font-semibold text-orange-500">
                Manage Lessons
                <FaArrowRight className="ml-2 transition group-hover:translate-x-2" />
              </div>
            </Link>
          );
        })}

      </div>

      {/* Quick Info */}
      <div className="rounded-2xl border border-orange-200 bg-orange-50 p-6">

        <h3 className="text-lg font-bold text-orange-600">
          💡 Teaching Tip
        </h3>

        <p className="mt-2 text-gray-600">
          Keep each lesson focused on a single concept. Add practical examples,
          exercises, and quizzes to help students understand the topic more
          effectively.
        </p>

      </div>

    </section>
  );
};

export default LessonsPage;