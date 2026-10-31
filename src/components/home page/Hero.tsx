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
import { motion, useReducedMotion } from "framer-motion";

const Hero = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
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
      <motion.div
        className="absolute left-[8%] top-20"
        animate={shouldReduceMotion ? {} : { y: [0, -20, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="rounded-2xl border border-white/15 bg-white/10 p-4 shadow-lg backdrop-blur-sm">
          <FaHtml5 size={32} className="text-orange-400" />
        </div>
      </motion.div>
      <motion.div
        className="absolute right-[12%] top-28"
        animate={shouldReduceMotion ? {} : { y: [0, -15, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 7, delay: 1, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="rounded-2xl border border-white/15 bg-white/10 p-4 shadow-lg backdrop-blur-sm">
          <FaCss3Alt size={32} className="text-blue-400" />
        </div>
      </motion.div>
      <motion.div
        className="absolute bottom-28 left-[13%]"
        animate={shouldReduceMotion ? {} : { y: [0, -10, 0], rotate: [0, 3, 0] }}
        transition={{ duration: 8, delay: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="rounded-2xl border border-white/15 bg-white/10 p-4 shadow-lg backdrop-blur-sm">
          <FaRobot size={28} className="text-orange-300" />
        </div>
      </motion.div>
      <motion.div
        className="absolute bottom-32 right-[9%]"
        animate={shouldReduceMotion ? {} : { y: [0, -20, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="rounded-2xl border border-white/15 bg-white/10 p-4 shadow-lg backdrop-blur-sm">
          <FaCode size={32} className="text-white" />
        </div>
      </motion.div>
      <motion.div
        className="absolute left-[4%] top-[48%]"
        animate={shouldReduceMotion ? {} : { y: [0, -15, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 7, delay: 1, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="rounded-2xl border border-white/15 bg-white/10 p-3 shadow-lg backdrop-blur-sm">
          <FaGraduationCap size={24} className="text-white" />
        </div>
      </motion.div>
    </div>

    <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="grid items-center gap-14 lg:grid-cols-2">
        <div className="space-y-8">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-orange-300/30 bg-orange-500/90 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-orange-950/30">
              <FaRobot aria-hidden="true" size={14} />
              AI-Powered Learning Platform
            </span>
          </motion.div>

          <motion.h1
            className="hero-title motion-heading text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
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
                <motion.path
                  initial={shouldReduceMotion ? false : { pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  d="M2 8C40 2 80 2 100 6C120 10 160 10 198 4"
                  stroke="#f97316"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </motion.h1>

          <motion.p
            className="max-w-xl text-lg leading-relaxed text-zinc-200"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Build real skills in web development and C programming with
            beginner-friendly lessons and an AI tutor ready to help.
          </motion.p>

          <div className="flex flex-col gap-4 pt-1 sm:flex-row">
            <Link
              href="/html"
              className="btn btn-orange inline-flex min-h-14 items-center justify-center gap-3 px-7 py-3 text-base font-semibold text-white"
            >
              <FaArrowRight aria-hidden="true" size={14} />
              Explore HTML
            </Link>
            <Link
              href="/agent"
              className="btn btn-orange inline-flex min-h-14 items-center justify-center gap-3 px-7 py-3 text-base font-semibold text-white"
            >
              <FaRobot aria-hidden="true" size={16} />
              Meet your AI tutor
            </Link>
          </div>
        </div>

        <motion.div
          className="hidden justify-center lg:flex"
          initial={shouldReduceMotion ? false : { opacity: 0, x: 32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
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

            <motion.div
              className="absolute -right-7 -top-5 rounded-2xl border border-orange-300/25 bg-orange-500 px-4 py-3 text-white shadow-xl shadow-orange-950/40"
              animate={shouldReduceMotion ? {} : { y: [0, -20, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="flex items-center gap-2 text-sm font-semibold">
                <FaRobot aria-hidden="true" size={16} />
                AI-Powered
              </div>
            </motion.div>

            <motion.div
              className="absolute -bottom-7 -left-9 w-56 rounded-2xl border border-white/15 bg-zinc-900/90 p-4 text-white shadow-xl shadow-black/40 backdrop-blur-xl"
              animate={shouldReduceMotion ? {} : { y: [0, -15, 0] }}
              transition={{ duration: 7, delay: 1, repeat: Infinity, ease: "easeInOut" }}
            >
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
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
    </section>
  );
};

export default Hero;
