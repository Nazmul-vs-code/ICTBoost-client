import Link from "next/link";
import { FaBookOpen, FaPlusCircle } from "react-icons/fa";

const actions = [
  {
    title: "Lessons You Made",
    description: "View, edit and manage all your HTML lessons.",
    href: "/dashboard/teacher/lessons/html/all-lessons",
    icon: FaBookOpen,
    bg: "from-orange-400 to-orange-500",
  },
  {
    title: "Create Lesson",
    description: "Create a brand new HTML lesson for your students.",
    href: "/dashboard/teacher/lessons/html/create",
    icon: FaPlusCircle,
    bg: "from-blue-500 to-sky-500",
  },
];

const HtmlLessonsPage = () => {
  return (
    <section className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          HTML Lessons
        </h1>

        <p className="mt-2 text-gray-500">
          Manage your HTML lessons or create a new one.
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
              className={`group relative overflow-hidden rounded-2xl bg-gradient-to-r ${item.bg} p-7 text-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl`}
            >
              {/* Decorative Circle */}
              <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-white/10 transition-all duration-300 group-hover:scale-125" />

              <div className="relative z-10">
                <div className="mb-5 inline-flex rounded-xl bg-white/20 p-4 backdrop-blur-sm">
                  <Icon size={34} />
                </div>

                <h2 className="text-2xl font-bold">
                  {item.title}
                </h2>

                <p className="mt-2 text-white/90">
                  {item.description}
                </p>

                <button className="btn mt-6 border-none bg-white text-black transition-all group-hover:translate-x-2">
                  Open →
                </button>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default HtmlLessonsPage;