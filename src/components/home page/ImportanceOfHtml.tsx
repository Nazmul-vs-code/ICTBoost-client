"use client";

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
  FaArrowRight,
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
    icon: FaArrowRight,
    title: "Stepping Block to Advanced Tech",
    description: "HTML is the foundation for React, Next.js, and modern frameworks. Master it before moving forward.",
  },
];

const ImportanceOfHtml = () => {
  return (
    <section className="py-20 bg-orange-50">
      <div className="max-w-5xl mx-auto px-4 space-y-12">
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-semibold">
            Why HTML Matters
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">
            Importance of Learning HTML
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            HTML is not just a markup language — it is the foundation of the
            entire web. Here is why mastering it matters.
          </p>
        </div>

        {/* Importance List */}
        <div className="space-y-4">
          {importance.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="card bg-white shadow-xl border border-orange-100 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
              >
                <div className="card-body flex-row items-center gap-5 py-5 px-6">
                  {/* Number Badge */}
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-500 text-white font-bold text-lg">
                    {index + 1}
                  </div>

                  {/* Icon */}
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-100">
                    <span className="text-orange-500">
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

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/html"
            className="btn bg-orange-500 hover:bg-orange-600 border-none text-white px-8 gap-2"
          >
            Start Learning HTML Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ImportanceOfHtml;
