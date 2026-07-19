"use client";

import Link from "next/link";
import {
  FaCode,
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaRobot,
  FaGraduationCap,
  FaPlay,
  FaArrowRight,
  FaUsers,
  FaBookOpen,
  FaStar,
} from "react-icons/fa";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-amber-50 min-h-[85vh] flex items-center">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient Orbs */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-orange-200/30 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "1.5s" }} />

        {/* Floating Code Symbols */}
        <div className="absolute top-20 left-[10%] animate-float">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-orange-100 p-4">
            <FaHtml5 size={32} />
          </div>
        </div>

        <div className="absolute top-32 right-[15%] animate-float-delay">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-orange-100 p-4">
            <FaCss3Alt size={32} />
          </div>
        </div>

        <div className="absolute bottom-32 left-[15%] animate-float-slow">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-orange-100 p-4">
            <FaJs size={32} />
          </div>
        </div>

        <div className="absolute bottom-40 right-[10%] animate-float">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-orange-100 p-4">
            <FaCode size={32} />
          </div>
        </div>

        <div className="absolute top-[45%] left-[5%] animate-float-delay">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-orange-100 p-3">
            <FaRobot size={24} />
          </div>
        </div>

        <div className="absolute top-[55%] right-[5%] animate-float-slow">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-orange-100 p-3">
            <FaGraduationCap size={24} />
          </div>
        </div>

        {/* Code Block Decoration */}
        <div className="absolute top-24 right-[30%] hidden xl:block animate-float-delay opacity-60">
          <div className="bg-gray-900/90 backdrop-blur-sm rounded-xl shadow-2xl p-4 font-mono text-xs">
            <div className="flex gap-1.5 mb-2">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
            </div>
            <pre className="text-gray-300">
              <span className="text-purple-400">const</span>{" "}
              <span className="text-blue-400">learn</span> = () =&gt; {"{"}
              <br />
              {"  "}
              <span className="text-green-400">return</span>{" "}
              <span className="text-orange-300">&quot; mastery &quot;</span>;
              <br />
              {"}"};
            </pre>
          </div>
        </div>

        <div className="absolute bottom-24 left-[25%] hidden xl:block animate-float opacity-60">
          <div className="bg-gray-900/90 backdrop-blur-sm rounded-xl shadow-2xl p-4 font-mono text-xs">
            <div className="flex gap-1.5 mb-2">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
            </div>
            <pre className="text-gray-300">
              <span className="text-orange-400">&lt;h1&gt;</span>
              <span className="text-white">Hello World</span>
              <span className="text-orange-400">&lt;/h1&gt;</span>
            </pre>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left — Text Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="animate-slide-up opacity-0">
              <span className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-semibold">
                <FaRobot size={14} />
                AI-Powered Learning Platform
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight animate-slide-up opacity-0 delay-100">
              Master{" "}
              <span className="text-orange-500">HTML</span>{" "}
              &{" "}
              <span className="text-orange-500">C Programming</span>{" "}
              with{" "}
              <span className="relative">
                AI Guidance
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 200 12"
                  fill="none"
                >
                  <path
                    d="M2 8C40 2 80 2 100 6C120 10 160 10 198 4"
                    stroke="#f97316"
                    strokeWidth="3"
                    strokeLinecap="round"
                    className="animate-fade-in"
                  />
                </svg>
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg text-gray-500 max-w-lg leading-relaxed animate-slide-up opacity-0 delay-200">
              Your personalized coding journey starts here. Learn at your own pace
              with AI-generated lessons, hands-on practice, and expert-created
              content for HTML and C Programming.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 animate-slide-up opacity-0 delay-300">
              <Link
                href="/html"
                className="btn bg-orange-500 hover:bg-orange-600 border-none text-white px-8 py-3 text-base gap-2"
              >
                <FaPlay size={14} />
                Explore Lessons
              </Link>
              <Link
                href="/auth/register"
                className="btn btn-outline border-orange-300 hover:bg-orange-50 text-orange-600 px-8 py-3 text-base gap-2"
              >
                Get Started Free
                <FaArrowRight size={14} />
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 pt-4 animate-slide-up opacity-0 delay-400">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100">
                  <span className="text-orange-500">
                    <FaBookOpen size={18} />
                  </span>
                </div>
                <div>
                  <p className="text-xl font-bold text-gray-800">50+</p>
                  <p className="text-xs text-gray-500">Lessons</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100">
                  <span className="text-orange-500">
                    <FaUsers size={18} />
                  </span>
                </div>
                <div>
                  <p className="text-xl font-bold text-gray-800">1K+</p>
                  <p className="text-xs text-gray-500">Students</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100">
                  <span className="text-orange-500">
                    <FaStar size={18} />
                  </span>
                </div>
                <div>
                  <p className="text-xl font-bold text-gray-800">4.9</p>
                  <p className="text-xs text-gray-500">Rating</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right — Visual Illustration */}
          <div className="hidden lg:flex justify-center items-center animate-slide-in-right opacity-0 delay-300">
            <div className="relative">
              {/* Main Code Card */}
              <div className="bg-white rounded-3xl shadow-2xl border border-orange-100 p-6 w-80 transform rotate-2 hover:rotate-0 transition-transform duration-500">
                <div className="flex gap-1.5 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="font-mono text-sm space-y-2">
                  <p>
                    <span className="text-purple-500">&lt;!</span>
                    <span className="text-gray-400">DOCTYPE html</span>
                    <span className="text-purple-500">&gt;</span>
                  </p>
                  <p>
                    <span className="text-orange-500">&lt;html</span>{" "}
                    <span className="text-blue-400">lang</span>=
                    <span className="text-green-400">&quot;en&quot;</span>
                    <span className="text-orange-500">&gt;</span>
                  </p>
                  <p>
                    <span className="text-orange-500">&lt;head&gt;</span>
                  </p>
                  <p className="pl-4">
                    <span className="text-orange-500">&lt;title&gt;</span>
                    <span className="text-white bg-gray-800 px-1 rounded">
                      ICTBoost
                    </span>
                    <span className="text-orange-500">&lt;/title&gt;</span>
                  </p>
                  <p>
                    <span className="text-orange-500">&lt;/head&gt;</span>
                  </p>
                  <p>
                    <span className="text-orange-500">&lt;body&gt;</span>
                  </p>
                  <p className="pl-4">
                    <span className="text-orange-500">&lt;h1&gt;</span>
                    <span className="text-white bg-orange-500/20 px-1 rounded">
                      Hello World
                    </span>
                    <span className="text-orange-500">&lt;/h1&gt;</span>
                  </p>
                  <p>
                    <span className="text-orange-500">&lt;/body&gt;</span>
                  </p>
                  <p>
                    <span className="text-orange-500">&lt;/html&gt;</span>
                  </p>
                </div>
              </div>

              {/* Floating AI Badge */}
              <div className="absolute -top-4 -right-4 bg-orange-500 text-white rounded-2xl px-4 py-2 shadow-lg animate-float">
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <FaRobot size={16} />
                  AI-Powered
                </div>
              </div>

              {/* Floating Lesson Card */}
              <div className="absolute -bottom-6 -left-8 bg-white rounded-2xl shadow-xl border border-orange-100 p-4 w-56 animate-float-delay">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100">
                    <span className="text-orange-500">
                      <FaGraduationCap size={18} />
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-800">
                      HTML Basics
                    </p>
                    <p className="text-xs text-gray-500">Beginner</p>
                  </div>
                </div>
                <div className="mt-3 bg-gray-100 rounded-full h-2 overflow-hidden">
                  <div className="bg-orange-500 h-full w-3/4 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
