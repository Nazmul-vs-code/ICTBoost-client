"use client";

import ICTBoostLogo from "@/components/ICTBoostLogo";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaSignInAlt, FaSignOutAlt, FaUserPlus } from "react-icons/fa";
import { RiHomeOfficeFill } from "react-icons/ri";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "HTML", href: "/html" },
  { label: "C Programming", href: "/c" },
  { label: "AI Tutor", href: "/agent" },
  { label: "About", href: "/about" },
];

const authRoutes = [
  { label: "Login", href: "/auth/login" },
  { label: "Register", href: "/auth/register" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { data } = authClient.useSession();
  const [mobileOpen, setMobileOpen] = useState(false);

  if (pathname.startsWith("/dashboard")) return null;

  const handleLogout = async () => {
    try {
      await authClient.signOut();
      window.location.reload();
    } catch {
      toast.error("Unable to log out. Please try again.");
    }
  };

  const linkClass = (href: string) =>
    `site-nav-link border-b px-1 py-2 text-sm transition-colors ${
      pathname === href
        ? ""
        : "border-transparent text-zinc-400 hover:border-zinc-600 hover:text-white"
    }`;

  return (
    <header className="theme-adaptive sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950">
      <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex shrink-0 items-center gap-3">
          <button
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
            className="grid size-10 place-items-center border border-zinc-700 lg:hidden"
            onClick={() => setMobileOpen((open) => !open)}
            type="button"
          >
            <svg
              aria-hidden="true"
              className="size-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d={mobileOpen ? "M6 6l12 12M18 6L6 18" : "M4 6h16M4 12h16M4 18h16"}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            </svg>
          </button>
          <ICTBoostLogo variant="horizontal" size={36} animate={false} />
        </div>

        <nav aria-label="Main navigation" className="hidden items-center gap-6 lg:flex">
          {navLinks.map((route) => (
            <Link
              key={route.href}
              aria-current={pathname === route.href ? "page" : undefined}
              className={linkClass(route.href)}
              href={route.href}
            >
              {route.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <ThemeToggle />
          {!data?.user ? (
            <div className="hidden items-center gap-2 sm:flex">
              {authRoutes.map((route) => (
                <Link
                  key={route.href}
                  className="inline-flex min-h-10 items-center justify-center bg-white px-4 text-sm font-medium text-black transition-all duration-200 hover:bg-zinc-200"
                  href={route.href}
                >
                  {route.label === "Login" ? (
                    <FaSignInAlt aria-hidden="true" className="mr-2" />
                  ) : (
                    <FaUserPlus aria-hidden="true" className="mr-2" />
                  )}
                  {route.label}
                </Link>
              ))}
            </div>
          ) : (
            <details className="relative">
              <summary className="flex min-h-10 cursor-pointer list-none items-center gap-2 border border-zinc-700 px-3 text-sm text-white">
                {data.user.image ? (
                  <Image
                    alt=""
                    className="size-7 rounded-full object-cover"
                    height={28}
                    unoptimized
                    src={data.user.image}
                    width={28}
                  />
                ) : (
                  <span className="grid size-7 place-items-center bg-zinc-700 font-medium">
                    {data.user.name.charAt(0).toUpperCase()}
                  </span>
                )}
                <span className="hidden max-w-28 truncate sm:block">{data.user.name}</span>
              </summary>
              <div className="absolute right-0 mt-2 w-52 border border-zinc-700 bg-zinc-900 p-2 shadow-xl">
                <Link
                  className="block px-3 py-2 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white"
                  href="/profile"
                >
                  Profile
                </Link>
                <Link
                  className="flex items-center gap-2 px-3 py-2 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white"
                  href={`/dashboard/${(data.user as { role?: string }).role}`}
                >
                  <RiHomeOfficeFill aria-hidden="true" />
                  Dashboard
                </Link>
                <button
                  className="mt-2 w-full px-3 py-2 text-left text-sm"
                  onClick={handleLogout}
                  type="button"
                >
                  <FaSignOutAlt aria-hidden="true" className="mr-2" />
                  Log out
                </button>
              </div>
            </details>
          )}
        </div>
      </div>

      {mobileOpen && (
        <nav
          aria-label="Mobile navigation"
          className="border-t border-zinc-800 bg-zinc-950 px-4 py-3 sm:px-6 lg:hidden"
        >
          <div className="mx-auto flex max-w-7xl flex-col">
            {navLinks.map((route) => (
              <Link
                key={route.href}
                aria-current={pathname === route.href ? "page" : undefined}
                className="mobile-nav-link border-b border-zinc-800 py-3 text-sm text-zinc-300 hover:text-white"
                href={route.href}
                onClick={() => setMobileOpen(false)}
              >
                {route.label}
              </Link>
            ))}
            {!data?.user ? (
              authRoutes.map((route) => (
                <Link
                  key={route.href}
                  className="border-b border-zinc-800 py-3 text-sm text-zinc-300 hover:text-white"
                  href={route.href}
                  onClick={() => setMobileOpen(false)}
                >
                  {route.label}
                </Link>
              ))
            ) : (
              <>
                <Link
                  className="border-b border-zinc-800 py-3 text-sm text-zinc-300"
                  href={`/dashboard/${(data.user as { role?: string }).role}`}
                >
                  Dashboard
                </Link>
                <button
                  className="mt-3 self-start px-4 py-2 text-sm"
                  onClick={handleLogout}
                  type="button"
                >
                  <FaSignOutAlt aria-hidden="true" className="mr-2" />
                  Log out
                </button>
              </>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
