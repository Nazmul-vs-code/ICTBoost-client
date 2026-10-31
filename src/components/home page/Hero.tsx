"use client";

import Link from "next/link";
import {
  FaArrowRight,
  FaCode,
  FaCss3Alt,
  FaGraduationCap,
  FaHtml5,
  FaRobot,
} from "react-icons/fa";

const Hero = () => (
  <section
    id="home-hero"
    className="relative isolate flex min-h-[85vh] items-center overflow-hidden bg-zinc-950 text-white"
  >
    <video
      aria-hidden="true"
      className="absolute inset-0 size-full scale-105 object-cover blur-[3px]"
      src="/vid/vid-1.mp4"
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
    />
    <div
      aria-hidden="true"
      className="absolute inset-0 bg-black/65"
    />
    <div
      aria-hidden="true"
      className="absolute inset-0 bg-gradient-to-br from-orange-950/30 via-transparent to-violet-950/35"
    />

    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div className="absolute left-[8%] top-20 animate-float">
        <div className="rounded-2xl border border-white/15 bg-white/10 p-4 shadow-lg backdrop-blur-sm">
          <FaHtml5 size={32} className="text-orange-400" />
        </div>
      </div>
      <div className="absolute right-[12%] top-28 animate-float-delay">
        <div className="rounded-2xl border border-white/15 bg-white/10 p-4 shadow-lg backdrop-blur-sm">
          <FaCss3Alt size={32} className="text-blue-400" />
        </div>
      </div>
      <div className="absolute bottom-28 left-[13%] animate-float-slow">
        <div className="rounded-2xl border border-white/15 bg-white/10 p-4 shadow-lg backdrop-blur-sm">
          <FaRobot size={28} className="text-orange-300" />
        </div>
      </div>
      <div className="absolute bottom-32 right-[9%] animate-float">
        <div className="rounded-2xl border border-white/15 bg-white/10 p-4 shadow-lg backdrop-blur-sm">
          <FaCode size={32} className="text-white" />
        </div>
      </div>
      <div className="absolute left-[4%] top-[48%] animate-float-delay">
        <div className="rounded-2xl border border-white/15 bg-white/10 p-3 shadow-lg backdrop-blur-sm">
          <FaGraduationCap size={24} className="text-white" />
        </div>
      </div>
    </div>

    <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="grid items-center gap-14 lg:grid-cols-2">
        <div className="space-y-8">
          <div className="animate-slide-up opacity-0">
            <span className="inline-flex items-center gap-2 rounded-full border border-orange-300/30 bg-orange-500/90 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-orange-950/30">
              <FaRobot aria-hidden="true" size={14} />
              AI-Powered Learning Platform
            </span>
          </div>

          <h1 className="hero-title animate-slide-up text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            Master <span className="hero-accent">HTML</span> &{" "}
            <span className="hero-accent">C Programming</span> with{" "}
            <span className="relative inline-block">
              AI Guidance
              <svg
                aria-hidden="true"
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

          <p className="max-w-xl animate-slide-up text-lg leading-relaxed text-zinc-200 delay-100">
            Build real skills in web development and C programming with
            beginner-friendly lessons and an AI tutor ready to help.
          </p>

          <div className="flex flex-col gap-4 pt-1 sm:flex-row">
            <Link
              href="/html"
              className="button-action hero-cta inline-flex min-h-14 items-center justify-center gap-3 px-7 py-3 text-base font-semibold text-white"
            >
              <FaArrowRight aria-hidden="true" size={14} />
              Explore HTML
            </Link>
            <Link
              href="/agent"
              className="button-action hero-cta inline-flex min-h-14 items-center justify-center gap-3 px-7 py-3 text-base font-semibold text-white"
            >
              <FaRobot aria-hidden="true" size={16} />
              Meet your AI tutor
            </Link>
          </div>
        </div>

        <div className="hidden justify-center animate-slide-in-right opacity-0 delay-300 lg:flex">
          <div className="relative">
            <div className="hero-code-card w-80 rotate-2 rounded-3xl border border-orange-400/20 bg-zinc-950/80 p-6 shadow-2xl shadow-black/40 backdrop-blur-xl transition-transform duration-500 hover:rotate-0">
              <div className="mb-5 flex items-center justify-between">
                <div className="flex gap-1.5">
                  <span className="size-3 rounded-full bg-red-400" />
                  <span className="size-3 rounded-full bg-yellow-400" />
                  <span className="size-3 rounded-full bg-green-400" />
                </div>
                <span className="font-mono text-xs text-zinc-400">
                  index.html
                </span>
              </div>
              <div className="space-y-2 font-mono text-sm leading-6">
                <p>
                  <span className="text-violet-300">&lt;!doctype html&gt;</span>
                </p>
                <p>
                  <span className="text-orange-400">&lt;html</span>{" "}
                  <span className="text-blue-300">lang</span>=
                  <span className="text-green-300">&quot;en&quot;</span>
                  <span className="text-orange-400">&gt;</span>
                </p>
                <p className="pl-4">
                  <span className="text-orange-400">&lt;head&gt;</span>
                </p>
                <p className="pl-8">
                  <span className="text-orange-400">&lt;title&gt;</span>
                  <span className="text-white">ICTBoost</span>
                  <span className="text-orange-400">&lt;/title&gt;</span>
                </p>
                <p className="pl-4">
                  <span className="text-orange-400">&lt;/head&gt;</span>
                </p>
                <p className="pl-4">
                  <span className="text-orange-400">&lt;body&gt;</span>
                </p>
                <p className="pl-8">
                  <span className="text-orange-400">&lt;h1&gt;</span>
                  <span className="text-white">Hello, World!</span>
                  <span className="text-orange-400">&lt;/h1&gt;</span>
                </p>
                <p className="pl-4">
                  <span className="text-orange-400">&lt;/body&gt;</span>
                </p>
                <p>
                  <span className="text-orange-400">&lt;/html&gt;</span>
                </p>
              </div>
            </div>

            <div className="absolute -right-7 -top-5 animate-float rounded-2xl border border-orange-300/25 bg-orange-500 px-4 py-3 text-white shadow-xl shadow-orange-950/40">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <FaRobot aria-hidden="true" size={16} />
                AI-Powered
              </div>
            </div>

            <div className="absolute -bottom-7 -left-9 w-56 animate-float-delay rounded-2xl border border-white/15 bg-zinc-900/90 p-4 text-white shadow-xl shadow-black/40 backdrop-blur-xl">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-xl bg-orange-500/15 text-orange-400">
                  <FaGraduationCap aria-hidden="true" size={18} />
                </span>
                <span>
                  <span className="block text-sm font-bold">HTML Basics</span>
                  <span className="block text-xs text-zinc-300">Beginner</span>
                </span>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-orange-500 to-amber-300" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Hero;
