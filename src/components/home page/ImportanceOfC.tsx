"use client";

import { useState } from "react";
import {
  FaMicrochip,
  FaDatabase,
  FaServer,
  FaGamepad,
  FaAndroid,
  FaLinux,
  FaCogs,
  FaMemory,
  FaProjectDiagram,
  FaGraduationCap,
  FaChevronDown,
  FaEye,
  FaEyeSlash,
  FaLightbulb,
  FaRocket,
  FaStar,
} from "react-icons/fa";
import Link from "next/link";

const importance = [
  {
    icon: FaMicrochip,
    title: "Foundation of System Programming",
    description: "C is the backbone of operating systems, embedded systems, and hardware-level programming.",
  },
  {
    icon: FaCogs,
    title: "Understanding How Computers Work",
    description: "C gives you direct access to memory and hardware, teaching you how computers really operate under the hood.",
  },
  {
    icon: FaDatabase,
    title: "Powers Databases & Compilers",
    description: "MySQL, PostgreSQL, and most compilers are written in C. Learning C helps you understand these critical tools.",
  },
  {
    icon: FaServer,
    title: "Backbone of Modern Languages",
    description: "Python, Java, and JavaScript engines are built on C. Understanding C makes learning other languages easier.",
  },
  {
    icon: FaMemory,
    title: "Manual Memory Management",
    description: "C teaches you to manage memory manually with malloc and free — a skill that separates great engineers.",
  },
  {
    icon: FaGamepad,
    title: "Game Development & Graphics",
    description: "Many game engines and graphics libraries use C for performance-critical rendering and physics calculations.",
  },
  {
    icon: FaAndroid,
    title: "Embedded Systems & IoT",
    description: "From smart watches to car engines, C powers the embedded devices that surround us every day.",
  },
  {
    icon: FaLinux,
    title: "Linux & Open Source World",
    description: "The Linux kernel and most open-source tools are written in C. It is the language of the open-source community.",
  },
  {
    icon: FaProjectDiagram,
    title: "Data Structures & Algorithms",
    description: "Implementing linked lists, trees, and graphs in C gives you a deep understanding of computer science fundamentals.",
  },
  {
    icon: FaGraduationCap,
    title: "Essential for CS Students",
    description: "C is taught in virtually every computer science program worldwide. Mastering it gives you a strong academic foundation.",
  },
];

const ImportanceOfC = () => {
  const [show, setShow] = useState(false);

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background decorations */}
      <div className="pointer-events-none absolute -top-40 left-0 h-[500px] w-[500px] rounded-full bg-sky-400/10 blur-[160px]" />
      <div className="pointer-events-none absolute bottom-0 right-1/3 h-[400px] w-[400px] rounded-full bg-blue-300/8 blur-[140px]" />
      <div className="pointer-events-none absolute top-28 right-[10%] h-2.5 w-2.5 rounded-full bg-sky-400/30 animate-float" />
      <div className="pointer-events-none absolute bottom-28 left-[14%] h-2 w-2 rounded-full bg-blue-400/25 animate-float-delay" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 space-y-12">
        {/* Header */}
        <div className="text-center space-y-5">
          <div className="inline-flex items-center gap-2.5 bg-sky-500/10 backdrop-blur-sm border border-sky-400/20 text-sky-500 px-5 py-2.5 rounded-full text-sm font-semibold animate-slide-up opacity-0">
            <FaLightbulb size={15} />
            Why C Matters
            <FaStar size={10} className="opacity-50" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-base-content tracking-tight animate-slide-up opacity-0 delay-100">
            Importance of Learning{" "}
            <span className="text-sky-500">C Programming</span>
          </h2>
          <p className="text-base-content/60 max-w-xl mx-auto text-lg leading-relaxed animate-slide-up opacity-0 delay-200">
            C is not just a language — it is the foundation of modern computing.
            Here is why mastering it matters.
          </p>
        </div>

        {/* Toggle Button */}
        <div className="text-center animate-fade-in">
          <button
            onClick={() => setShow(!show)}
            className="group inline-flex items-center gap-3 bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold px-10 py-4 rounded-full shadow-lg shadow-sky-500/25 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-sky-500/30 hover:-translate-y-0.5 active:scale-[0.98]"
          >
            {show ? (
              <FaEyeSlash size={18} className="transition-transform duration-300" />
            ) : (
              <FaEye size={18} className="transition-transform duration-300 group-hover:scale-110" />
            )}
            {show ? "Hide Importance" : "Show Importance"}
            <FaChevronDown
              size={14}
              className={`transition-transform duration-300 ${show ? "rotate-180" : "group-hover:translate-y-0.5"}`}
            />
          </button>
        </div>

        {/* Importance List — Animated */}
        <div
          className={`transition-all duration-600 ease-in-out ${
            show ? "max-h-[5000px] opacity-100" : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <div className="space-y-4 pt-2">
            {importance.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={index}
                  className={`group rounded-2xl bg-base-200/60 backdrop-blur-sm border border-base-300/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 hover:border-sky-300/30 ${
                    show ? `animate-importance-${index}` : "opacity-0"
                  }`}
                >
                  <div className="flex items-center gap-5 p-5 sm:p-6">
                    {/* Number Badge */}
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 text-white font-bold text-lg shadow-md shadow-sky-500/20 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                      {index + 1}
                    </div>

                    {/* Icon */}
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sky-500/10 transition-all duration-300 group-hover:bg-sky-500/20 group-hover:scale-110 group-hover:-rotate-3">
                      <span className="text-sky-500">
                        <Icon size={20} />
                      </span>
                    </div>

                    {/* Text */}
                    <div className="min-w-0">
                      <h3 className="font-bold text-base-content text-lg">
                        {item.title}
                      </h3>
                      <p className="text-base-content/55 text-sm mt-1">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-4 animate-fade-in">
          <Link
            href="/c"
            className="group inline-flex items-center gap-3 bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold px-10 py-4 rounded-full shadow-lg shadow-sky-500/25 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-sky-500/30 hover:-translate-y-0.5 active:scale-[0.98]"
          >
            <FaRocket
              size={16}
              className="transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110"
            />
            Start Learning C Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ImportanceOfC;
