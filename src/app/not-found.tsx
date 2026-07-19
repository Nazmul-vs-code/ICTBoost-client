"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FaHome,
  FaArrowLeft,
  FaHtml5,
  FaCode,
  FaRobot,
  FaSearch,
} from "react-icons/fa";

const floatingIcons = [
  { Icon: FaHtml5, delay: "0s", x: "15%", y: "20%", size: 40, color: "text-orange-400" },
  { Icon: FaCode, delay: "1s", x: "80%", y: "15%", size: 36, color: "text-blue-400" },
  { Icon: FaRobot, delay: "2s", x: "10%", y: "70%", size: 32, color: "text-purple-400" },
  { Icon: FaHtml5, delay: "0.5s", x: "85%", y: "75%", size: 28, color: "text-orange-300" },
  { Icon: FaCode, delay: "1.5s", x: "50%", y: "10%", size: 34, color: "text-blue-300" },
  { Icon: FaRobot, delay: "2.5s", x: "70%", y: "85%", size: 30, color: "text-purple-300" },
];

const NotFoundPage = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-orange-50 via-white to-blue-50">
      {/* Floating Background Icons */}
      {floatingIcons.map((item, i) => {
        const { Icon } = item;
        return (
          <div
            key={i}
            className={`absolute opacity-20 pointer-events-none transition-all duration-1000 ${
              mounted ? "opacity-20" : "opacity-0"
            }`}
            style={{
              left: item.x,
              top: item.y,
              animationDelay: item.delay,
            }}
          >
            <div className="animate-float" style={{ animationDelay: item.delay }}>
              <Icon size={item.size} className={item.color} />
            </div>
          </div>
        );
      })}

      {/* Main Content */}
      <div
        className={`relative z-10 text-center space-y-8 px-4 transition-all duration-700 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* 404 Number */}
        <div className="relative inline-block">
          <h1 className="text-[10rem] sm:text-[14rem] font-black text-transparent bg-clip-text bg-gradient-to-br from-orange-400 via-orange-500 to-blue-500 leading-none select-none">
            404
          </h1>
          {/* Floating Search Icon */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div
              className={`flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-2xl border border-orange-100 transition-all duration-1000 delay-300 ${
                mounted ? "scale-100 rotate-0" : "scale-0 rotate-180"
              }`}
            >
              <FaSearch size={32} className="text-orange-400" />
            </div>
          </div>
        </div>

        {/* Message */}
        <div className="space-y-3">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Oops! Page Not Found
          </h2>
          <p className="text-gray-500 max-w-md mx-auto">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
            Let&apos;s get you back on track!
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="btn bg-orange-500 hover:bg-orange-600 border-none text-white px-8 gap-2 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-200"
          >
            <FaHome size={16} />
            Go Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="btn btn-outline border-orange-300 hover:bg-orange-50 text-orange-600 px-8 gap-2 transition-all duration-300 hover:scale-105"
          >
            <FaArrowLeft size={16} />
            Go Back
          </button>
        </div>

        {/* Quick Links */}
        <div className="pt-4">
          <p className="text-sm text-gray-400 mb-3">Or explore these pages:</p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { label: "HTML Lessons", href: "/html", icon: FaHtml5, color: "hover:bg-orange-50 hover:border-orange-300 hover:text-orange-600" },
              { label: "C Lessons", href: "/c", icon: FaCode, color: "hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600" },
              { label: "AI Tutor", href: "/agent", icon: FaRobot, color: "hover:bg-purple-50 hover:border-purple-300 hover:text-purple-600" },
            ].map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`btn btn-sm btn-outline border-gray-200 text-gray-500 gap-2 transition-all duration-300 hover:scale-105 ${link.color}`}
                >
                  <Icon size={14} />
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotFoundPage;
