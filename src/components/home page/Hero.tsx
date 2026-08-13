"use client";

import Link from "next/link";
import {
  FaCode,
  FaHtml5,
  FaCss3Alt,
  FaRobot,
  FaGraduationCap,
} from "react-icons/fa";

const Hero = () => {
  return (
    <section className="relative overflow-hidden min-h-[85vh] flex items-center">
      {/* Full Hero Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover blur-[3px] scale-105"
        src="/vid/vid-1.mp4"
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Orange Tint */}
      <div className="absolute inset-0 bg-orange-500/5" />

      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Code Symbols */}
        <div className="absolute top-20 left-[10%] animate-float">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-lg border border-white/10 p-4">
            <FaHtml5 size={32} className="text-orange-400" />
          </div>
        </div>

        <div className="absolute top-32 right-[15%] animate-float-delay">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-lg border border-white/10 p-4">
            <FaCss3Alt size={32} className="text-blue-400" />
          </div>
        </div>

        <div className="absolute bottom-32 left-[15%] animate-float-slow">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-lg border border-white/10 p-4">
          </div>
        </div>

        <div className="absolute bottom-40 right-[10%] animate-float">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-lg border border-white/10 p-4">
            <FaCode size={32} className="text-white" />
          </div>
        </div>

        <div className="absolute top-[45%] left-[5%] animate-float-delay">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-lg border border-white/10 p-3">
            <FaRobot size={24} className="text-orange-400" />
          </div>
        </div>

        <div className="absolute top-[55%] right-[5%] animate-float-slow">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-lg border border-white/10 p-3">
            <FaGraduationCap size={24} className="text-white" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* LEFT — Text Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="animate-slide-up opacity-0">
              <span className="inline-flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                <FaRobot size={14} />
                AI-Powered Learning Platform
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight animate-slide-up opacity-0 delay-100">
              Master{" "}
              <span className="text-orange-400">HTML</span>{" "}
              &{" "}
              <span className="text-orange-400">C Programming</span>{" "}
              with{" "}
              <span className="relative inline-block">
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
          </div>

          {/* RIGHT — Existing Visual Illustration */}
          <div className="hidden lg:flex justify-center items-center animate-slide-in-right opacity-0 delay-300">
            <div className="relative">

              {/* Main Code Card */}
              <div className="bg-base-100 rounded-3xl shadow-2xl border border-orange-500/15 p-6 w-80 transform rotate-2 hover:rotate-0 transition-transform duration-500">
                <div className="flex gap-1.5 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>

                <div className="font-mono text-sm space-y-2">
                  <p>
                    <span className="text-purple-500">&lt;!</span>
                    <span className="text-base-content/50">
                      DOCTYPE html
                    </span>
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
                    <span className="text-base-100 bg-base-content/80 px-1 rounded">
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
                    <span className="text-base-100 bg-orange-500/20 px-1 rounded">
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
              <div className="absolute -bottom-6 -left-8 bg-base-100 rounded-2xl shadow-xl border border-orange-500/15 p-4 w-56 animate-float-delay">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10">
                    <span className="text-orange-500">
                      <FaGraduationCap size={18} />
                    </span>
                  </div>

                  <div>
                    <p className="text-sm font-bold text-base-content">
                      HTML Basics
                    </p>
                    <p className="text-xs text-base-content/60">
                      Beginner
                    </p>
                  </div>
                </div>

                <div className="mt-3 bg-base-300/50 rounded-full h-2 overflow-hidden">
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