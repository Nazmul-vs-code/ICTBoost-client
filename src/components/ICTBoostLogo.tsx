"use client";

import Link from "next/link";
import { useState } from "react";

type LogoVariant = "icon" | "horizontal" | "square";

interface ICTBoostLogoProps {
  variant?: LogoVariant;
  size?: number;
  className?: string;
  animate?: boolean;
  href?: string;
}

function LogoIcon({ size, animate, hovered }: { size: number; animate: boolean; hovered: boolean }) {
  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      className={`
        ${animate ? "logo-icon-animate" : ""}
        ${hovered ? "logo-icon-hover" : ""}
      `}
      style={{ overflow: "visible" }}
    >
      {/* Background rounded square */}
      <rect
        x="2"
        y="2"
        width="60"
        height="60"
        rx="14"
        ry="14"
        fill="#F97316"
        className={animate ? "logo-bg" : ""}
      />

      {/* Left bracket < */}
      <polyline
        points="24,18 13,32 24,46"
        stroke="white"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        className={animate ? "bracket-draw bracket-left" : ""}
      />

      {/* Upward arrow (replacing /) — "Boost" element */}
      <g className={animate ? "rocket-group" : ""}>
        <polygon
          points="32,11 41,24 35.5,24 35.5,42 28.5,42 28.5,24 23,24"
          fill="white"
        />
        {/* Small blue accent flame at arrow base */}
        <polygon
          points="32,42 35.5,42 34,48 32,45 30,48 28.5,42"
          fill="#3B82F6"
          className={animate ? "flame" : ""}
        />
      </g>

      {/* Right bracket > */}
      <polyline
        points="40,18 51,32 40,46"
        stroke="white"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        className={animate ? "bracket-draw bracket-right" : ""}
      />

      {/* Subtle glow on hover */}
      {hovered && (
        <rect
          x="2"
          y="2"
          width="60"
          height="60"
          rx="14"
          ry="14"
          fill="none"
          stroke="#F97316"
          strokeWidth="2"
          opacity="0.4"
          className="logo-glow-ring"
        />
      )}
    </svg>
  );
}

export default function ICTBoostLogo({
  variant = "horizontal",
  size = 40,
  className = "",
  animate = true,
  href = "/",
}: ICTBoostLogoProps) {
  const [hovered, setHovered] = useState(false);

  const icon = (
    <div className={`relative ${animate ? "logo-icon-wrapper" : ""}`}>
      <LogoIcon size={size} animate={animate} hovered={hovered} />
    </div>
  );

  const text = (
    <span
      className={`logo-text ${animate ? "logo-text-animate" : ""}`}
      style={{ fontSize: size * 0.48 }}
    >
      <span className="text-orange-500 font-bold tracking-tight">ICT</span>
      <span className="text-base-content font-extrabold tracking-tight">Boost</span>
    </span>
  );

  const content = (
    <div
      className={`inline-flex items-center gap-2.5 select-none ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {icon}
      {variant === "horizontal" && text}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="no-underline flex items-center">
        {content}
      </Link>
    );
  }

  return content;
}
