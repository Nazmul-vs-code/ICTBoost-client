import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import type { IconType } from "react-icons";

type ImportanceItem = {
  icon: IconType;
  title: string;
  description: string;
};

type ImportanceTickerProps = {
  id: string;
  sectionNumber: string;
  topic: string;
  description: string;
  items: ImportanceItem[];
  href: string;
  actionLabel: string;
};

export default function ImportanceTicker({
  id,
  sectionNumber,
  topic,
  description,
  items,
  href,
  actionLabel,
}: ImportanceTickerProps) {
  return (
    <section
      aria-labelledby={`${id}-title`}
      className="theme-adaptive overflow-hidden border-b border-zinc-800 bg-zinc-950 py-20 sm:py-24"
      id={id}
    >
      <div className="mx-auto max-w-7xl space-y-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-5">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">
            {sectionNumber} / Core skills
          </p>
          <h2
            className="text-3xl font-semibold tracking-tight text-white sm:text-5xl"
            id={`${id}-title`}
          >
            Importance of Learning{" "}
            <span className="text-zinc-400">{topic}</span>
          </h2>
          <p className="max-w-2xl text-base leading-7 text-zinc-400">
            {description}
          </p>
        </div>

        <div
          aria-label={`Reasons to learn ${topic}`}
          className="learning-marquee border-y border-zinc-800 py-5"
          role="region"
        >
          <div className="learning-marquee__track">
            {[0, 1].map((copy) => (
              <div
                key={copy}
                aria-hidden={copy === 1}
                className="learning-marquee__group"
              >
                {items.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <article
                      key={item.title}
                      className="theme-adaptive flex h-52 w-[min(20rem,calc(100vw_-_2rem))] shrink-0 flex-col justify-between border border-zinc-800 bg-zinc-900 p-5"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <span className="font-mono text-xs tracking-widest text-zinc-500">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <Icon
                          aria-hidden="true"
                          className="text-zinc-300"
                          size={18}
                        />
                      </div>
                      <div className="space-y-2">
                        <h3 className="line-clamp-2 font-medium text-white">
                          {item.title}
                        </h3>
                        <p className="line-clamp-3 text-sm leading-6 text-zinc-400">
                          {item.description}
                        </p>
                      </div>
                    </article>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        <Link
          className="inline-flex min-h-12 items-center gap-3 bg-white px-6 py-3 font-medium text-black transition-all duration-200 hover:bg-zinc-200"
          href={href}
        >
          {actionLabel} <FaArrowRight aria-hidden="true" size={14} />
        </Link>
      </div>
    </section>
  );
}
