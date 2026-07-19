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
    <section className="py-20 bg-blue-50">
      <div className="max-w-5xl mx-auto px-4 space-y-10">
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="inline-flex items-center gap-2 bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold">
            <FaLightbulb size={14} />
            Why C Matters
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">
            Importance of Learning C Programming
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            C is not just a language — it is the foundation of modern computing.
            Here is why mastering it matters.
          </p>
        </div>

        {/* Toggle Button */}
        <div className="text-center">
          <button
            onClick={() => setShow(!show)}
            className="group inline-flex items-center gap-3 btn bg-blue-500 hover:bg-blue-600 border-none text-white px-8 py-3 text-base font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-200 active:scale-95"
          >
            {show ? (
              <span className="transition-transform duration-300"><FaEyeSlash size={18} /></span>
            ) : (
              <span className="transition-transform duration-300 group-hover:scale-110"><FaEye size={18} /></span>
            )}
            {show ? "Hide Importance" : "Show Importance"}
            <span className={`transition-transform duration-300 ${show ? "rotate-180" : "group-hover:translate-y-0.5"}`}><FaChevronDown size={14} /></span>
          </button>
        </div>

        {/* Importance List — Animated */}
        <div
          className={`transition-all duration-500 ease-in-out ${
            show ? "max-h-[3000px] opacity-100" : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <div className="space-y-4 pt-2">
            {importance.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={index}
                  className={`card bg-white shadow-xl border border-blue-100 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${
                    show ? `animate-importance-${index}` : "opacity-0"
                  }`}
                >
                  <div className="card-body flex-row items-center gap-5 py-5 px-6">
                    {/* Number Badge */}
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-500 text-white font-bold text-lg transition-all duration-300 hover:scale-110 hover:rotate-3 hover:shadow-lg hover:shadow-blue-300">
                      {index + 1}
                    </div>

                    {/* Icon */}
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-100 transition-all duration-300 hover:bg-blue-200 hover:scale-110 hover:-rotate-3">
                      <span className="text-blue-500">
                        <Icon size={20} />
                      </span>
                    </div>

                    {/* Text */}
                    <div>
                      <h3 className="font-bold text-gray-800 text-lg">
                        {item.title}
                      </h3>
                      <p className="text-gray-500 text-sm mt-1">
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
        <div className="text-center">
          <Link
            href="/c"
            className="btn bg-blue-500 hover:bg-blue-600 border-none text-white px-8 gap-2 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-200"
          >
            Start Learning C Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ImportanceOfC;
