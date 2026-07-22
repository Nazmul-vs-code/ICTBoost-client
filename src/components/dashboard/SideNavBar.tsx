"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import ICTBoostLogo from "@/components/ICTBoostLogo";

import {
  FaHome,
  FaBook,
  FaClipboardList,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaChartBar,
  FaUserCircle,
  FaUsers,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaSun,
  FaMoon,
} from "react-icons/fa";

import type { IconType } from "react-icons";

type SidebarItem = {
  title: string;
  href: string;
  icon: IconType;
  emoji: string;
  exact?: boolean;
};

type UserRole = "teacher" | "student" | "admin";

const sidebarItems: Record<UserRole, SidebarItem[]> = {
  teacher: [
    { title: "Dashboard", href: "/dashboard/teacher", icon: FaHome, emoji: "📊", exact: true },
    { title: "Lessons", href: "/dashboard/teacher/lessons", icon: FaBook, emoji: "📚" },
    { title: "Assignments", href: "/dashboard/teacher/assignments", icon: FaClipboardList, emoji: "📝" },
    { title: "Students", href: "/dashboard/teacher/students", icon: FaUserGraduate, emoji: "🎓" },
    { title: "Progress", href: "/dashboard/teacher/progress", icon: FaChartBar, emoji: "📈" },
    { title: "Profile", href: "/dashboard/teacher/profile", icon: FaUserCircle, emoji: "👤" },
  ],
  student: [
    { title: "Dashboard", href: "/dashboard/student", icon: FaHome, emoji: "🏠", exact: true },
    { title: "My Lessons", href: "/dashboard/student/lessons", icon: FaBook, emoji: "📖" },
    { title: "Assignments", href: "/dashboard/student/assignments", icon: FaClipboardList, emoji: "✅" },
    { title: "My Progress", href: "/dashboard/student/progress", icon: FaChartBar, emoji: "📈" },
    { title: "Profile", href: "/dashboard/student/profile", icon: FaUserCircle, emoji: "👤" },
  ],
  admin: [
    { title: "Dashboard", href: "/dashboard/admin", icon: FaHome, emoji: "⚙️", exact: true },
    { title: "Users", href: "/dashboard/admin/users", icon: FaUsers, emoji: "👥" },
    { title: "Teachers", href: "/dashboard/admin/teachers", icon: FaChalkboardTeacher, emoji: "🧑‍🏫" },
    { title: "Students", href: "/dashboard/admin/students", icon: FaUserGraduate, emoji: "🎓" },
    { title: "Lessons", href: "/dashboard/admin/lessons", icon: FaBook, emoji: "📚" },
    { title: "Assignments", href: "/dashboard/admin/assignments", icon: FaClipboardList, emoji: "📋" },
  ],
};

const roleEmoji: Record<UserRole, string> = {
  teacher: "🧑‍🏫",
  student: "🎓",
  admin: "🛡️",
};

const SideNavBar = () => {
  const [open, setOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const { data: session } = authClient.useSession();
  const user = session?.user as (Record<string, any> & { role?: string }) | undefined;
  const role = (user?.role ?? "student") as UserRole;
  const navItems = sidebarItems[role];
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("ictboost-theme");
    setIsDark(saved === "dark");
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    const theme = next ? "dark" : "light";
    localStorage.setItem("ictboost-theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  };

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/");
    router.refresh();
  };

  const SidebarContent = (
    <div className="flex h-full flex-col bg-base-100">
      {/* Header */}
      <div className="border-b border-base-300 p-5 animate-sidebar-slide">
        <ICTBoostLogo variant="horizontal" size={36} animate={true} />
        <p className="text-sm text-base-content/50 mt-2 font-medium tracking-wide">
          Learn &bull; Practice &bull; Grow 🚀
        </p>
      </div>

      {/* User + Theme Toggle */}
      <div className="p-5 border-b border-base-300">
        <div className="flex items-center gap-3">
          {!imageError && user?.image ? (
            <Image
              src={user.image}
              alt={user.name}
              width={48}
              height={48}
              onError={() => setImageError(true)}
              className="rounded-full object-cover ring-2 ring-primary/40 ring-offset-2 ring-offset-base-100 transition-all duration-300"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-primary text-primary-content flex items-center justify-center text-lg font-bold ring-2 ring-primary/40 ring-offset-2 ring-offset-base-100 transition-all duration-300">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h2 className="font-bold text-base-content truncate text-sm">
              {user?.name}
            </h2>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary bg-primary/10 rounded-full px-2.5 py-0.5 mt-1 capitalize">
              {roleEmoji[role]} {role}
            </span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        <p className="text-[10px] font-bold uppercase tracking-widest text-base-content/30 px-3 pt-2 pb-1">
          Navigation
        </p>
        {navItems.map((item, idx) => {
          const Icon = item.icon;
          const isActive = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`group flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 animate-nav-pop ${
                isActive
                  ? "bg-primary text-primary-content shadow-lg shadow-primary/25"
                  : "text-base-content/70 hover:bg-base-200 hover:text-base-content hover:translate-x-1"
              }`}
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              <span className="text-base">{item.emoji}</span>
              <Icon
                size={16}
                className={`transition-transform duration-200 ${
                  isActive ? "scale-110" : "group-hover:scale-110"
                }`}
              />
              <span className="flex-1">{item.title}</span>
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-primary-content animate-pulse" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Theme Toggle + Logout */}
      <div className="p-3 border-t border-base-300 space-y-2">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="flex items-center gap-3 w-full rounded-xl px-4 py-2.5 text-sm font-medium text-base-content/70 hover:bg-base-200 hover:text-base-content transition-all duration-200"
        >
          {isDark ? (
            <FaSun size={16} className="text-amber-400 transition-transform duration-300 hover:rotate-45" />
          ) : (
            <FaMoon size={16} className="text-indigo-400 transition-transform duration-300 hover:-rotate-12" />
          )}
          <span className="text-base">{isDark ? "☀️" : "🌙"}</span>
          <span className="flex-1 text-left">
            {isDark ? "Light Mode" : "Dark Mode"}
          </span>
          <div
            className={`w-9 h-5 rounded-full transition-colors duration-300 relative ${
              isDark ? "bg-primary" : "bg-base-300"
            }`}
          >
            <div
              className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-300 ${
                isDark ? "translate-x-4" : "translate-x-0.5"
              }`}
            />
          </div>
        </button>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full rounded-xl px-4 py-2.5 text-sm font-medium text-error/80 hover:bg-error/10 hover:text-error transition-all duration-200"
        >
          <FaSignOutAlt size={16} />
          <span>👋</span>
          <span className="flex-1 text-left">Logout</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Button */}
      <div className="lg:hidden p-4">
        <button
          onClick={() => setOpen(true)}
          className="btn btn-primary btn-sm gap-2"
        >
          <FaBars size={14} />
          <span>Menu</span>
        </button>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex sticky top-0 h-screen w-72 border-r border-base-300 shadow-sm bg-base-100">
        {SidebarContent}
      </aside>

      {/* Mobile Drawer */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
          />
          <aside className="relative h-full w-72 shadow-2xl animate-sidebar-slide">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 btn btn-circle btn-sm btn-ghost z-10"
            >
              <FaTimes size={14} />
            </button>
            {SidebarContent}
          </aside>
        </div>
      )}
    </>
  );
};

export default SideNavBar;
