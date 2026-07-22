"use client";

import { useState } from "react";
import {
  FaGlobe,
  FaLaptopCode,
  FaMobileAlt,
  FaSearchDollar,
  FaRocket,
  FaPaintBrush,
  FaLayerGroup,
  FaUsers,
  FaBriefcase,
  FaLightbulb,
  FaChevronDown,
  FaEye,
  FaEyeSlash,
  FaStar,
} from "react-icons/fa";
import Link from "next/link";

const importance = [
  {
    icon: FaGlobe,
    title: "Foundation of Every Website",
    description: "HTML is the backbone of every website on the internet. Without it, no web page can exist.",
  },
  {
    icon: FaLaptopCode,
    title: "Gateway to Web Development",
    description: "Learning HTML is the first step to becoming a full-stack developer. It opens doors to CSS, JavaScript, and beyond.",
  },
  {
    icon: FaMobileAlt,
    title: "Responsive Design Starts Here",
    description: "Proper HTML structure is essential for building websites that work beautifully on all devices.",
  },
  {
    icon: FaSearchDollar,
    title: "Boosts SEO Rankings",
    description: "Search engines rely on clean HTML to index and rank your website higher in search results.",
  },
  {
    icon: FaRocket,
    title: "Fast & Lightweight",
    description: "HTML pages load quickly and work on any browser, making your content accessible to everyone.",
  },
  {
    icon: FaPaintBrush,
    title: "Unlimited Creative Freedom",
    description: "From blogs to portfolios to e-commerce — HTML lets you build anything you can imagine.",
  },
  {
    icon: FaLayerGroup,
    title: "Structured Content Presentation",
    description: "HTML organizes your content with headings, paragraphs, lists, and tables for clear communication.",
  },
  {
    icon: FaUsers,
    title: "Universal Skill Across Industries",
    description: "Every tech company, startup, and agency needs people who understand HTML. It is universally valued.",
  },
  {
    icon: FaBriefcase,
    title: "High-Demand Career Skill",
    description: "Web developers, designers, marketers, and content creators all benefit from knowing HTML.",
  },
  {
    icon: FaLightbulb,
    title: "Stepping Stone to Advanced Tech",
    description: "HTML is the foundation for React, Next.js, and modern frameworks. Master it before moving forward.",
  },
];

const ImportanceOfHtml = () => {
  const [show, setShow] = useState(false);

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background decorations */}
      <div className="pointer-events-none absolute -top-40 right-0 h-[500px] w-[500px] rounded-full bg-orange-400/10 blur-[160px]" />
      <div className="pointer-events-none absolute bottom-0 left-1/4 h-[400px] w-[400px] rounded-full bg-amber-300/8 blur-[140px]" />
      <div className="pointer-events-none absolute top-24 left-[10%] h-2.5 w-2.5 rounded-full bg-orange-400/30 animate-float" />
      <div className="pointer-events-none absolute bottom-32 right-[12%] h-2 w-2 rounded-full bg-amber-400/25 animate-float-delay" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 space-y-12">
        {/* Header */}
        <div className="text-center space-y-5">
          <div className="inline-flex items-center gap-2.5 bg-orange-500/10 backdrop-blur-sm border border-orange-400/20 text-orange-500 px-5 py-2.5 rounded-full text-sm font-semibold animate-slide-up opacity-0">
            <FaLightbulb size={15} />
            Why HTML Matters
            <FaStar size={10} className="opacity-50" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-base-content tracking-tight animate-slide-up opacity-0 delay-100">
            Importance of Learning{" "}
            <span className="text-orange-500">HTML</span>
          </h2>
          <p className="text-base-content/60 max-w-xl mx-auto text-lg leading-relaxed animate-slide-up opacity-0 delay-200">
            HTML is not just a markup language — it is the foundation of the
            entire web. Here is why mastering it matters.
          </p>
        </div>

        {/* Toggle Button */}
        <div className="text-center animate-fade-in">
          <button
            onClick={() => setShow(!show)}
            className="group inline-flex items-center gap-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold px-10 py-4 rounded-full shadow-lg shadow-orange-500/25 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-orange-500/30 hover:-translate-y-0.5 active:scale-[0.98]"
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
                  className={`group rounded-2xl bg-base-200/60 backdrop-blur-sm border border-base-300/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 hover:border-orange-300/30 ${
                    show ? `animate-importance-${index}` : "opacity-0"
                  }`}
                >
                  <div className="flex items-center gap-5 p-5 sm:p-6">
                    {/* Number Badge */}
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 text-white font-bold text-lg shadow-md shadow-orange-500/20 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                      {index + 1}
                    </div>

                    {/* Icon */}
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 transition-all duration-300 group-hover:bg-orange-500/20 group-hover:scale-110 group-hover:-rotate-3">
                      <span className="text-orange-500">
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
            href="/html"
            className="group inline-flex items-center gap-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold px-10 py-4 rounded-full shadow-lg shadow-orange-500/25 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-orange-500/30 hover:-translate-y-0.5 active:scale-[0.98]"
          >
            <FaRocket
              size={16}
              className="transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110"
            />
            Start Learning HTML Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ImportanceOfHtml;
