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
  exact?: boolean;
};

type UserRole = "teacher" | "student" | "admin";

const sidebarItems: Record<UserRole, SidebarItem[]> = {
  teacher: [
    { title: "Dashboard", href: "/dashboard/teacher", icon: FaHome, exact: true },
    { title: "Lessons", href: "/dashboard/teacher/lessons", icon: FaBook },
    { title: "Assignments", href: "/dashboard/teacher/assignments", icon: FaClipboardList },
    { title: "Students", href: "/dashboard/teacher/students", icon: FaUserGraduate },
    { title: "Progress", href: "/dashboard/teacher/progress", icon: FaChartBar },
    { title: "Profile", href: "/dashboard/teacher/profile", icon: FaUserCircle },
  ],
  student: [
    { title: "Dashboard", href: "/dashboard/student", icon: FaHome, exact: true },
    { title: "My Lessons", href: "/dashboard/student/lessons", icon: FaBook },
    { title: "Assignments", href: "/dashboard/student/assignments", icon: FaClipboardList },
    { title: "My Progress", href: "/dashboard/student/progress", icon: FaChartBar },
    { title: "Profile", href: "/dashboard/student/profile", icon: FaUserCircle },
  ],
  admin: [
    { title: "Dashboard", href: "/dashboard/admin", icon: FaHome, exact: true },
    { title: "Users", href: "/dashboard/admin/users", icon: FaUsers },
    { title: "Teachers", href: "/dashboard/admin/teachers", icon: FaChalkboardTeacher },
    { title: "Students", href: "/dashboard/admin/students", icon: FaUserGraduate },
    { title: "Lessons", href: "/dashboard/admin/lessons", icon: FaBook },
    { title: "Assignments", href: "/dashboard/admin/assignments", icon: FaClipboardList },
  ],
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
      <div className="border-b border-base-300 p-5">
        <ICTBoostLogo variant="horizontal" size={36} animate={true} />
        <p className="text-xs text-base-content/40 mt-2 font-medium tracking-wider uppercase">
          Learn, Practice, Grow
        </p>
      </div>

      {/* User + Role Badge */}
      <div className="p-4 border-b border-base-300">
        <div className="flex items-center gap-3">
          {!imageError && user?.image ? (
            <Image
              src={user.image}
              alt={user.name}
              width={40}
              height={40}
              onError={() => setImageError(true)}
              className="rounded-full object-cover ring-2 ring-primary/30 ring-offset-2 ring-offset-base-100"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold ring-2 ring-primary/30 ring-offset-2 ring-offset-base-100">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h2 className="font-semibold text-base-content truncate text-sm">
              {user?.name}
            </h2>
            <span className="inline-flex items-center text-xs font-medium text-primary/80 bg-primary/5 rounded-md px-2 py-0.5 mt-0.5 capitalize">
              {role}
            </span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        <p className="text-[10px] font-bold uppercase tracking-widest text-base-content/30 px-3 pt-2 pb-2">
          Navigation
        </p>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-primary text-primary-content shadow-sm shadow-primary/20"
                  : "text-base-content/60 hover:bg-base-200/80 hover:text-base-content"
              }`}
            >
              <Icon
                size={16}
                className={`transition-transform duration-200 ${
                  isActive ? "scale-110" : "group-hover:scale-105"
                }`}
              />
              <span className="flex-1">{item.title}</span>
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-primary-content/80" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Theme Toggle + Logout */}
      <div className="p-3 border-t border-base-300 space-y-1">
        <button
          onClick={toggleTheme}
          className="flex items-center gap-3 w-full rounded-lg px-3 py-2.5 text-sm font-medium text-base-content/60 hover:bg-base-200/80 hover:text-base-content transition-all duration-200"
        >
          {isDark ? (
            <FaSun size={16} className="text-amber-400" />
          ) : (
            <FaMoon size={16} className="text-indigo-400" />
          )}
          <span className="flex-1 text-left">
            {isDark ? "Light Mode" : "Dark Mode"}
          </span>
          <div
            className={`w-8 h-[18px] rounded-full transition-colors duration-300 relative ${
              isDark ? "bg-primary" : "bg-base-300"
            }`}
          >
            <div
              className={`absolute top-[2px] w-[14px] h-[14px] rounded-full bg-white shadow-sm transition-transform duration-300 ${
                isDark ? "translate-x-[16px]" : "translate-x-[2px]"
              }`}
            />
          </div>
        </button>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full rounded-lg px-3 py-2.5 text-sm font-medium text-error/70 hover:bg-error/5 hover:text-error transition-all duration-200"
        >
          <FaSignOutAlt size={16} />
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
      <aside className="hidden lg:flex sticky top-0 h-screen w-64 border-r border-base-300/60 bg-base-100">
        {SidebarContent}
      </aside>

      {/* Mobile Drawer */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />
          <aside className="relative h-full w-64 shadow-2xl bg-base-100">
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
