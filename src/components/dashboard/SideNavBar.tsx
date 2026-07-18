"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

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
    {
      title: "Dashboard",
      href: "/dashboard/teacher",
      icon: FaHome,
      exact: true,
    },
    {
      title: "Lessons",
      href: "/dashboard/teacher/lessons",
      icon: FaBook,
    },
    {
      title: "Assignments",
      href: "/dashboard/teacher/assignments",
      icon: FaClipboardList,
    },
    {
      title: "Students",
      href: "/dashboard/teacher/students",
      icon: FaUserGraduate,
    },
    {
      title: "Progress",
      href: "/dashboard/teacher/progress",
      icon: FaChartBar,
    },
    {
      title: "Profile",
      href: "/dashboard/teacher/profile",
      icon: FaUserCircle,
    },
  ],

  student: [
    {
      title: "Dashboard",
      href: "/dashboard/student",
      icon: FaHome,
      exact: true,
    },
    {
      title: "My Lessons",
      href: "/dashboard/student/lessons",
      icon: FaBook,
    },
    {
      title: "Assignments",
      href: "/dashboard/student/assignments",
      icon: FaClipboardList,
    },
    {
      title: "My Progress",
      href: "/dashboard/student/progress",
      icon: FaChartBar,
    },
    {
      title: "Profile",
      href: "/dashboard/student/profile",
      icon: FaUserCircle,
    },
  ],

  admin: [
    {
      title: "Dashboard",
      href: "/dashboard/admin",
      icon: FaHome,
      exact: true,
    },
    {
      title: "Users",
      href: "/dashboard/admin/users",
      icon: FaUsers,
    },
    {
      title: "Teachers",
      href: "/dashboard/admin/teachers",
      icon: FaChalkboardTeacher,
    },
    {
      title: "Students",
      href: "/dashboard/admin/students",
      icon: FaUserGraduate,
    },
    {
      title: "Lessons",
      href: "/dashboard/admin/lessons",
      icon: FaBook,
    },
    {
      title: "Assignments",
      href: "/dashboard/admin/assignments",
      icon: FaClipboardList,
    },
  ],
};

const SideNavBar = () => {
  const [open, setOpen] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  const { data: session } = authClient.useSession();

  const user = session?.user as
    | (Record<string, any> & { role?: string })
    | undefined;

  const role = (user?.role ?? "student") as UserRole;

  const navItems = sidebarItems[role];

  const [imageError, setImageError] = useState(false);

  const handleLogout = async () => {
    await authClient.signOut();

    router.push("/");

    router.refresh();
  };

  const SidebarContent = (
    <div className="flex h-full flex-col">

      {/* Header */}
      <div className="border-b border-orange-100 p-6">

        <Link
          href="/"
          className="text-3xl font-bold text-orange-500"
        >
          ICTBoost
        </Link>

        <p className="text-sm text-gray-500 mt-1">
          Learn • Practice • Grow 🚀
        </p>

      </div>

      {/* User */}
      <div className="p-6 border-b border-orange-100">

        <div className="flex items-center gap-3">

          {!imageError && user?.image ? (
            <Image
              src={user.image}
              alt={user.name}
              width={55}
              height={55}
              onError={() => setImageError(true)}
              className="rounded-full object-cover border-2 border-orange-400"
            />
          ) : (
            <div className="w-[55px] h-[55px] rounded-full bg-orange-500 text-white flex items-center justify-center text-xl font-bold">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
          )}

          <div className="min-w-0">

            <h2 className="font-bold truncate">
              {user?.name}
            </h2>

            <span className="badge badge-warning capitalize mt-1">
              {role}
            </span>

          </div>

        </div>

      </div>

      {/* Navigation */}
      <nav className="flex-1 p-5 space-y-2 overflow-y-auto">

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
              className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 ${
                isActive
                  ? "bg-orange-500 text-white shadow-lg"
                  : "hover:bg-orange-100"
              }`}
            >
              <Icon size={18} />

              <span className="font-medium">
                {item.title}
              </span>
            </Link>
          );
        })}

      </nav>

      {/* Logout */}
      <div className="p-5 border-t border-orange-100">

        <button
          onClick={handleLogout}
          className="btn btn-warning w-full text-white"
        >
          <FaSignOutAlt />

          Logout
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
          className="btn btn-warning text-white"
        >
          <FaBars />

          Menu
        </button>

      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex sticky top-0 h-screen w-72 bg-white border-r border-orange-100 shadow-sm">

        {SidebarContent}

      </aside>

      {/* Mobile Drawer */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">

          <div
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-black/40"
          />

          <aside className="relative h-full w-72 bg-white shadow-xl">

            <button
              onClick={() => setOpen(false)}
              className="absolute top-5 right-5 btn btn-circle btn-sm"
            >
              <FaTimes />
            </button>

            {SidebarContent}

          </aside>

        </div>
      )}

    </>
  );
};

export default SideNavBar;