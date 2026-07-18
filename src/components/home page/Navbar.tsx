"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useState } from "react";

const navLinks = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "HTML",
    href: "/html",
  },
  {
    label: "C Programming",
    href: "/c-programming",
  },
];

const authRoutes = [
  {
    label: "Login",
    href: "/auth/login",
  },
  {
    label: "Register",
    href: "/auth/register",
  },
];

export default function Navbar() {
  const { data } = authClient.useSession();

  const [imageError, setImageError] = useState(false);

  const handleLogout = async () => {
    try {
      await authClient.signOut();

      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="navbar bg-gray-200 shadow-sm px-4 lg:px-8 sticky top-0 z-50">

      {/* Navbar Start */}
      <div className="navbar-start">

        {/* Mobile Menu */}
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost lg:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-60 p-2 shadow z-[100]"
          >
            {navLinks.map((route) => (
              <li key={route.href}>
                <Link href={route.href}>
                  {route.label}
                </Link>
              </li>
            ))}

            <div className="divider my-1" />

            {!data?.user ? (
              authRoutes.map((route) => (
                <li key={route.href}>
                  <Link href={route.href}>
                    {route.label}
                  </Link>
                </li>
              ))
            ) : (
              <>
                <li>
                  <Link href="/profile">
                    👤 Profile
                  </Link>
                </li>

                <li>
                  <button onClick={handleLogout}>
                    🚪 Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* Logo */}
        <Link
          href="/"
          className="btn btn-ghost text-2xl font-bold text-orange-500"
        >
          ICTBoost
        </Link>
      </div>

      {/* Navbar Center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-2">
          {navLinks.map((route) => (
            <li className="btn-outline"
             key={route.href}>
              <Link href={route.href}>
                {route.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Navbar End */}
      <div className="navbar-end">

        {!data?.user ? (
          <div className="hidden lg:flex gap-2">
            {authRoutes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={`btn ${
                  route.label === "Register"
                    ? "btn-warning"
                    : "btn-neutral text-warning"
                }`}
              >
                {route.label}
              </Link>
            ))}
          </div>
        ) : (
          <div className="dropdown dropdown-end">

            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost px-2"
            >
              <div className="flex items-center gap-3">

                {!imageError && data.user.image ? (
                  <img
                    src={data.user.image}
                    alt={data.user.name}
                    onError={() => setImageError(true)}
                    className="w-11 h-11 rounded-full object-cover border-2 border-orange-400"
                  />
                ) : (
                  <div className="w-11 h-11 rounded-full bg-orange-500 text-white flex items-center justify-center text-lg font-bold">
                    {data.user.name.charAt(0).toUpperCase()}
                  </div>
                )}

                <p className="hidden sm:block max-w-28 truncate font-semibold">
                  {data.user.name}
                </p>

              </div>
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 shadow z-[100]"
            >
              <li>
                <Link href="/profile">
                  👤 Profile
                </Link>
              </li>

              <li>
                <button
                  onClick={handleLogout}
                  className="text-red-500"
                >
                  🚪 Logout
                </button>
              </li>
            </ul>

          </div>
        )}

      </div>
    </div>
  );
}