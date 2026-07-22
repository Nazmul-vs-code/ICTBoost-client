"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaGithub,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";
import ICTBoostLogo from "@/components/ICTBoostLogo";

const Footer = () => {
  const pathname = usePathname();

  if (pathname.startsWith("/dashboard")) return null;

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <ICTBoostLogo variant="horizontal" size={32} animate={false} />
            <p className="text-sm leading-relaxed">
              Your AI-powered platform to master HTML and C Programming.
              Learn at your own pace with expert-created content and
              smart recommendations.
            </p>
            <div className="flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-800 text-gray-400 hover:bg-orange-500 hover:text-white transition-all duration-300"
              >
                <FaFacebook size={16} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-800 text-gray-400 hover:bg-orange-500 hover:text-white transition-all duration-300"
              >
                <FaTwitter size={16} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-800 text-gray-400 hover:bg-orange-500 hover:text-white transition-all duration-300"
              >
                <FaLinkedin size={16} />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-800 text-gray-400 hover:bg-orange-500 hover:text-white transition-all duration-300"
              >
                <FaGithub size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/" className="hover:text-orange-500 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/html" className="hover:text-orange-500 transition-colors">
                  HTML Lessons
                </Link>
              </li>
              <li>
                <Link href="/c" className="hover:text-orange-500 transition-colors">
                  C Programming
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-orange-500 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/agent" className="hover:text-orange-500 transition-colors">
                  AI Tutor
                </Link>
              </li>
              <li>
                <Link href="/auth/login" className="hover:text-orange-500 transition-colors">
                  Login
                </Link>
              </li>
              <li>
                <Link href="/auth/register" className="hover:text-orange-500 transition-colors">
                  Register
                </Link>
              </li>
            </ul>
          </div>

          {/* Learning */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Learning</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/html" className="hover:text-orange-500 transition-colors">
                  HTML Fundamentals
                </Link>
              </li>
              <li>
                <Link href="/html" className="hover:text-orange-500 transition-colors">
                  HTML5 Elements
                </Link>
              </li>
              <li>
                <Link href="/c-programming" className="hover:text-orange-500 transition-colors">
                  C Basics
                </Link>
              </li>
              <li>
                <Link href="/c-programming" className="hover:text-orange-500 transition-colors">
                  C Data Structures
                </Link>
              </li>
              <li>
                <Link href="/dashboard/teacher" className="hover:text-orange-500 transition-colors">
                  Teach on ICTBoost
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <span className="text-orange-500 shrink-0"><FaEnvelope size={14} /></span>
                support@ictboost.com
              </li>
              <li className="flex items-center gap-3">
                <span className="text-orange-500 shrink-0"><FaPhone size={14} /></span>
                +880 123 456 789
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-500 shrink-0 mt-0.5"><FaMapMarkerAlt size={14} /></span>
                <span>Dhaka, Bangladesh</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm">
          <p>&copy; {new Date().getFullYear()} ICTBoost. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-orange-500 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-orange-500 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
