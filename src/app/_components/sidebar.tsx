"use client"; // Mark this component as a Client Component

import React from "react";
import { Home, BarChart2, Users, Settings } from "lucide-react";
import { useSession } from "next-auth/react"; // Import the useSession hook
import { cn } from "~/lib/utils";
import Signout from "./sign-out";
import { usePathname } from "next/navigation"; // Import Next.js's usePathname hook

type NavItem = {
  icon: React.ElementType;
  label: string;
  href: string;
};

const navItems: NavItem[] = [
  { icon: Home, label: "Dashboard", href: "/dashboard" },
  {
    icon: BarChart2,
    label: "Categories",
    href: "/dashboard/category-selector",
  },
  { icon: Users, label: "Budget", href: "/dashboard/budget-entry" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
];

export default function Sidebar() {
  const { data: session } = useSession(); // Dynamically fetch session data
  const pathname = usePathname(); // Get the current route

  // If there's no session, don't show the sidebar
  if (!session) return null;

  return (
    <div className="flex h-screen flex-col border-r border-gray-200 bg-white">
      {/* User Profile */}
      <div className="border-b border-gray-200 p-6">
        <div className="flex items-center space-x-4">
          <img
            src={session?.user?.image ?? "/placeholder.svg?height=40&width=40"} // Display user avatar or placeholder
            alt="User avatar"
            className="h-10 w-10 rounded-full"
          />
          <div>
            <h2 className="text-sm font-medium text-gray-800">
              {session?.user?.name ?? "Guest"}{" "}
              {/* Display user's name or fallback to "Guest" */}
            </h2>
            <p className="text-xs text-gray-500">
              {session?.user?.email ?? "No email available"}{" "}
              {/* Display user's email or fallback */}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item, index) => (
            <li key={index}>
              <a
                href={item.href}
                className={cn(
                  "flex items-center space-x-3 rounded-lg px-3 py-2 text-sm",
                  "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
                  "transition-colors duration-200",
                  // Highlight the active page based on the current pathname
                  pathname === item.href && "bg-gray-100 text-gray-900",
                )}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="border-t border-gray-200 p-4">
        <Signout />
      </div>
    </div>
  );
}
