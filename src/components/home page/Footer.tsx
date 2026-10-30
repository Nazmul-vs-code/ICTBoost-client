"use client";

import ICTBoostLogo from "@/components/ICTBoostLogo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaEnvelope,
  FaFacebook,
  FaGithub,
  FaLinkedin,
  FaMapMarkerAlt,
  FaPhone,
  FaTwitter,
} from "react-icons/fa";

const Footer = () => {
  const pathname = usePathname();

  if (pathname.startsWith("/dashboard") || pathname === "/agent") return null;

  const footerLink =
    "text-sm text-zinc-400 transition-colors hover:text-white";

  return (
    <footer className="theme-adaptive border-t border-zinc-800 bg-zinc-950 text-zinc-300">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-5">
            <ICTBoostLogo variant="horizontal" size={32} animate={false} />
            <p className="max-w-sm text-sm leading-6 text-zinc-400">
              A focused platform for learning HTML and C programming through
              practical lessons and AI-powered guidance.
            </p>
            <div className="flex gap-2">
              {[
                { label: "Facebook", href: "https://facebook.com", icon: FaFacebook },
                { label: "Twitter", href: "https://twitter.com", icon: FaTwitter },
                { label: "LinkedIn", href: "https://linkedin.com", icon: FaLinkedin },
                { label: "GitHub", href: "https://github.com", icon: FaGithub },
              ].map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  aria-label={label}
                  className="grid size-9 place-items-center border border-white bg-white text-black transition-all duration-200 hover:border-zinc-200 hover:bg-zinc-200"
                  href={href}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <Icon aria-hidden="true" size={15} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Explore
            </h2>
            <ul className="space-y-3">
              <li><Link className={footerLink} href="/">Home</Link></li>
              <li><Link className={footerLink} href="/html">HTML lessons</Link></li>
              <li><Link className={footerLink} href="/c">C programming</Link></li>
              <li><Link className={footerLink} href="/agent">AI tutor</Link></li>
              <li><Link className={footerLink} href="/about">About us</Link></li>
            </ul>
          </div>

          <div>
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Learning paths
            </h2>
            <ul className="space-y-3">
              <li><Link className={footerLink} href="/html">HTML fundamentals</Link></li>
              <li><Link className={footerLink} href="/html">HTML5 elements</Link></li>
              <li><Link className={footerLink} href="/c">C basics</Link></li>
              <li><Link className={footerLink} href="/c">C data structures</Link></li>
              <li><Link className={footerLink} href="/dashboard/teacher">Teach on ICTBoost</Link></li>
            </ul>
          </div>

          <div>
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Contact
            </h2>
            <ul className="space-y-4 text-sm text-zinc-400">
              <li className="flex items-center gap-3">
                <FaEnvelope aria-hidden="true" className="shrink-0 text-zinc-300" />
                <a className="hover:text-white" href="mailto:support@ictboost.com">
                  support@ictboost.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FaPhone aria-hidden="true" className="shrink-0 text-zinc-300" />
                <a className="hover:text-white" href="tel:+880123456789">
                  +880 123 456 789
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FaMapMarkerAlt aria-hidden="true" className="shrink-0 text-zinc-300" />
                Dhaka, Bangladesh
              </li>
              <li>
                <Link className={footerLink} href="/#contact">Send us a message</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-zinc-800 pt-6 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} ICTBoost. All rights reserved.</p>
          <div className="flex gap-6">
            <Link className={footerLink} href="/privacy">Privacy policy</Link>
            <Link className={footerLink} href="/terms">Terms of service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
