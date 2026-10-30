"use client";

import Link from "next/link";
import {
  FaArrowRight,
  FaCode,
  FaRobot,
} from "react-icons/fa";

const Hero = () => (
  <section className="theme-adaptive relative overflow-hidden border-b border-zinc-800 bg-zinc-950">
    <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 py-24 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-32">
      <div className="space-y-8">
        <h1 className="max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
          Build your foundation in{" "}
          <span className="text-zinc-400">web and systems code.</span>
        </h1>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href="/html"
            className="button-action inline-flex min-h-12 items-center justify-center gap-3 bg-white px-6 py-3 font-medium text-black"
          >
            <FaArrowRight aria-hidden="true" size={14} />
            Explore HTML
          </Link>
          <Link
            href="/agent"
            className="button-action inline-flex min-h-12 items-center justify-center gap-3 bg-white px-6 py-3 font-medium text-black"
          >
            <FaRobot aria-hidden="true" size={15} />
            AI tutor
          </Link>
        </div>
      </div>

      <div className="theme-adaptive border border-zinc-700 bg-zinc-900">
        <div className="flex items-center justify-between border-b border-zinc-800 px-5 py-4">
          <span className="font-mono text-xs uppercase tracking-[0.18em] text-zinc-400">
            lesson-preview.html
          </span>
          <span className="size-2 bg-white" aria-label="Preview ready" />
        </div>
        <pre className="overflow-x-auto p-5 font-mono text-sm leading-8 sm:p-8">
          <code>
            <span className="text-zinc-500">&lt;!doctype html&gt;</span>{"\n"}
            <span className="text-cyan-400">&lt;html</span>{" "}
            <span className="text-violet-300">lang</span>=
            <span className="text-amber-300">&quot;en&quot;</span>
            <span className="text-cyan-400">&gt;</span>{"\n"}
            {"  "}
            <span className="text-cyan-400">&lt;head&gt;</span>{"\n"}
            {"    "}
            <span className="text-cyan-400">&lt;title&gt;</span>
            <span className="text-white">First page</span>
            <span className="text-cyan-400">&lt;/title&gt;</span>{"\n"}
            {"  "}
            <span className="text-cyan-400">&lt;/head&gt;</span>{"\n"}
            {"  "}
            <span className="text-cyan-400">&lt;body&gt;</span>{"\n"}
            {"    "}
            <span className="text-cyan-400">&lt;h1&gt;</span>
            <span className="text-white">Hello, web.</span>
            <span className="text-cyan-400">&lt;/h1&gt;</span>{"\n"}
            {"  "}
            <span className="text-cyan-400">&lt;/body&gt;</span>{"\n"}
            <span className="text-cyan-400">&lt;/html&gt;</span>
          </code>
        </pre>
        <div className="flex items-center gap-3 border-t border-zinc-800 px-5 py-4 text-sm text-zinc-400">
          <span className="grid size-8 place-items-center border border-zinc-700 text-white">
            <FaCode aria-hidden="true" size={13} />
          </span>
          Start with the structure. Build from there.
        </div>
      </div>
    </div>
  </section>
);

export default Hero;
