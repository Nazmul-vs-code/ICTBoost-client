"use client";

import Link from "next/link";
import {
  FaHtml5,
  FaCode,
  FaRobot,
  FaGraduationCap,
  FaHeart,
  FaUsers,
  FaBookOpen,
  FaBullseye,
  FaLightbulb,
  FaHandshake,
  FaRocket,
  FaStar,
  FaArrowRight,
} from "react-icons/fa";

const stats = [
  { icon: FaBookOpen, value: "25+", label: "Lessons" },
  { icon: FaUsers, value: "1K+", label: "Students" },
  { icon: FaStar, value: "4.9", label: "Avg Rating" },
  { icon: FaGraduationCap, value: "2", label: "Subjects" },
];

const values = [
  {
    icon: FaBullseye,
    title: "Quality Education",
    description: "We believe every student deserves access to high-quality, structured programming education.",
  },
  {
    icon: FaRobot,
    title: "AI-Powered Learning",
    description: "Our AI tutor adapts to your learning style, providing personalized explanations and practice.",
  },
  {
    icon: FaHandshake,
    title: "Community Driven",
    description: "Lessons are created by expert teachers and rated by the community to surface the best content.",
  },
  {
    icon: FaLightbulb,
    title: "Learn by Doing",
    description: "Hands-on quizzes, practice problems, and code debugging — not just passive reading.",
  },
];

const AboutPage = () => {
  return (
    <section className="space-y-0">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-orange-500/5 via-base-100 to-sky-500/5">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-6">
          <span className="inline-flex items-center gap-2 bg-orange-500/10 text-orange-500 px-4 py-2 rounded-full text-sm font-semibold border border-orange-500/15">
            <FaHeart size={14} />
            About ICTBoost
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-base-content">
            Learn to Code with{" "}
            <span className="text-orange-500">AI Guidance</span>
          </h1>
          <p className="text-base-content/60 max-w-2xl mx-auto text-lg leading-relaxed">
            ICTBoost is an AI-powered educational platform designed to help
            students master HTML and C Programming through expert-created
            lessons, interactive quizzes, and personalized AI tutoring.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-base-100 border-y border-base-300/50">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={i} className="text-center space-y-2">
                  <div className="flex h-12 w-12 mx-auto items-center justify-center rounded-xl bg-orange-500/10">
                    <span className="text-orange-500"><Icon size={20} /></span>
                  </div>
                  <p className="text-3xl font-bold text-base-content">{stat.value}</p>
                  <p className="text-sm text-base-content/60">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-base-100">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="inline-flex items-center gap-2 bg-orange-500/10 text-orange-500 px-4 py-2 rounded-full text-sm font-semibold border border-orange-500/15">
                <FaRocket size={14} />
                Our Mission
              </span>
              <h2 className="text-3xl font-bold text-base-content">
                Making Programming Education Accessible to Everyone
              </h2>
              <p className="text-base-content/60 leading-relaxed">
                We started ICTBoost with a simple belief: learning to code
                should be engaging, personalized, and accessible. Traditional
                tutorials are one-size-fits-all — we wanted something better.
              </p>
              <p className="text-base-content/60 leading-relaxed">
                By combining expert-created lessons with AI-powered tutoring,
                we give students the best of both worlds: structured curriculum
                and on-demand, personalized help whenever they need it.
              </p>
            </div>
            <div className="card bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-2xl">
              <div className="card-body p-8 space-y-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20">
                  <FaCode size={28} />
                </div>
                <h3 className="text-2xl font-bold">Our Story</h3>
                <p className="text-white/90 leading-relaxed">
                  Built as an Agentic AI project for SCIC, ICTBoost grew from a
                  simple lesson platform into a full AI-powered learning
                  ecosystem. What started as a class assignment became a real tool
                  that students can use to learn and grow.
                </p>
                <div className="flex items-center gap-3 pt-2">
                  <div className="flex -space-x-2">
                    {[
                      "bg-blue-400",
                      "bg-green-400",
                      "bg-purple-400",
                      "bg-pink-400",
                    ].map((bg, i) => (
                      <div
                        key={i}
                        className={`w-8 h-8 rounded-full ${bg} border-2 border-white flex items-center justify-center text-xs font-bold`}
                      >
                        {String.fromCharCode(65 + i)}
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-white/80">Join our growing community</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-orange-500/5">
        <div className="max-w-5xl mx-auto px-4 space-y-12">
          <div className="text-center space-y-3">
            <span className="inline-flex items-center gap-2 bg-orange-500/10 text-orange-500 px-4 py-2 rounded-full text-sm font-semibold border border-orange-500/15">
              <FaStar size={14} />
              Our Values
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-base-content">
              What We Stand For
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {values.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className="rounded-2xl bg-base-200/60 backdrop-blur-sm border border-base-300/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
                >
                  <div className="space-y-3 p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/10">
                      <span className="text-orange-500"><Icon size={20} /></span>
                    </div>
                    <h3 className="font-bold text-base-content text-lg">{item.title}</h3>
                    <p className="text-base-content/55 text-sm">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Subjects */}
      <section className="py-20 bg-base-100">
        <div className="max-w-5xl mx-auto px-4 space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-3xl sm:text-4xl font-bold text-base-content">
              What You Can Learn
            </h2>
            <p className="text-base-content/60 max-w-xl mx-auto">
              Two powerful subjects, endless possibilities.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {/* HTML */}
            <div className="rounded-3xl bg-gradient-to-br from-orange-500/5 to-orange-500/10 border border-orange-500/15 shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
              <div className="space-y-4 p-8">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-500">
                  <span className="text-white"><FaHtml5 size={32} /></span>
                </div>
                <h3 className="text-2xl font-bold text-base-content">HTML</h3>
                <p className="text-base-content/60 leading-relaxed">
                  From basic tags to advanced semantics, forms, multimedia, and
                  responsive structures. Learn the foundation of every website.
                </p>
                <ul className="space-y-2 text-sm text-base-content/60">
                  <li className="flex items-center gap-2">
                    <span className="text-orange-500"><FaRocket size={12} /></span>
                    13+ structured lessons
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-orange-500"><FaRocket size={12} /></span>
                    Video tutorials + references
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-orange-500"><FaRocket size={12} /></span>
                    Beginner to Advanced
                  </li>
                </ul>
                <Link
                  href="/html"
                  className="btn bg-orange-500 hover:bg-orange-600 border-none text-white gap-2 mt-2"
                >
                  Start Learning <FaArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* C */}
            <div className="rounded-3xl bg-gradient-to-br from-sky-500/5 to-sky-500/10 border border-sky-500/15 shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
              <div className="space-y-4 p-8">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-sky-500">
                  <span className="text-white"><FaCode size={32} /></span>
                </div>
                <h3 className="text-2xl font-bold text-base-content">C Programming</h3>
                <p className="text-base-content/60 leading-relaxed">
                  Master the language that powers operating systems, databases,
                  and modern programming languages. Build a strong foundation.
                </p>
                <ul className="space-y-2 text-sm text-base-content/60">
                  <li className="flex items-center gap-2">
                    <span className="text-sky-500"><FaRocket size={12} /></span>
                    14+ structured lessons
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-sky-500"><FaRocket size={12} /></span>
                    Video tutorials + references
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-sky-500"><FaRocket size={12} /></span>
                    Beginner to Advanced
                  </li>
                </ul>
                <Link
                  href="/c"
                  className="btn bg-sky-500 hover:bg-sky-600 border-none text-white gap-2 mt-2"
                >
                  Start Learning <FaArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-orange-600">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Ready to Start Learning?
          </h2>
          <p className="text-white/90 text-lg max-w-xl mx-auto">
            Join thousands of students mastering HTML and C Programming
            with AI-powered guidance.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/html"
              className="btn bg-white text-orange-600 hover:bg-orange-50 border-none px-8 gap-2 font-semibold"
            >
              Explore Lessons <FaArrowRight size={14} />
            </Link>
            <Link
              href="/agent"
              className="btn btn-outline border-white text-white hover:bg-white/10 px-8 gap-2 font-semibold"
            >
              <FaRobot size={16} /> Try AI Tutor
            </Link>
          </div>
        </div>
      </section>
    </section>
  );
};

export default AboutPage;
