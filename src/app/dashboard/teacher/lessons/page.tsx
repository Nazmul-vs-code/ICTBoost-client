import Link from "next/link";
import { FaCode, FaHtml5, FaArrowRight } from "react-icons/fa";

const lessonCategories = [
  {
    title: "HTML",
    emoji: "🌐",
    description: "Create and manage HTML learning lessons.",
    href: "/dashboard/teacher/lessons/html",
    icon: FaHtml5,
    color: "text-orange-500",
    bg: "bg-orange-500/10",
  },
  {
    title: "C Programming",
    emoji: "💻",
    description: "Create programming lessons, examples and exercises.",
    href: "/dashboard/teacher/lessons/c-programming",
    icon: FaCode,
    color: "text-sky-500",
    bg: "bg-sky-500/10",
  },
];

const LessonsPage = () => {
  return (
    <section className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-base-content">
          Lesson Management 📚
        </h1>
        <p className="text-base-content/50 mt-2 text-sm md:text-base">
          Select a subject to create and manage lessons for your students. ✏️
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
              className="group rounded-2xl border border-base-300 bg-base-100 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div
                className={`mb-5 flex h-16 w-16 items-center justify-center rounded-2xl ${subject.bg}`}
              >
                <span className={subject.color}>
                  <Icon size={34} />
                </span>
              </div>

              <h2 className="text-xl font-bold text-base-content">
                {subject.emoji} {subject.title}
              </h2>

              <p className="mt-2 text-sm text-base-content/50">
                {subject.description}
              </p>

              <div className="mt-6 flex items-center font-semibold text-primary text-sm">
                Manage Lessons
                <span className="ml-2 transition group-hover:translate-x-2">
                  <FaArrowRight />
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Quick Info */}
      <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
        <h3 className="text-lg font-bold text-primary">
          💡 Teaching Tip
        </h3>
        <p className="mt-2 text-base-content/60 text-sm leading-relaxed">
          Keep each lesson focused on a single concept. Add practical examples,
          exercises, and quizzes to help students understand the topic more
          effectively. 🎯
        </p>
      </div>
    </section>
  );
};

export default LessonsPage;
