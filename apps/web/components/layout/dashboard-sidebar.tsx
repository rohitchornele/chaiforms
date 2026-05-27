// UPDATE
// components/layout/dashboard-sidebar.tsx

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft, FileText, LayoutDashboard, Settings, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

import { cn } from "~/lib/utils";
import { useDashboardLayout } from "./dashboard-layout-context";

const navigation = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Forms",
    href: "/dashboard/forms",
    icon: FileText,
  },
];

const secondaryNavigation = [
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  const { collapsed, setCollapsed } = useDashboardLayout();

  return (
    <motion.aside
      animate={{
        width: collapsed ? 88 : 288,
      }}
      transition={{
        duration: 0.2,
        ease: "easeInOut",
      }}
      className="hidden shrink-0 border-r bg-background lg:flex lg:flex-col"
    >
      {/* Header */}
      <div
        className={cn(
          "flex h-16 items-center border-b",
          collapsed ? "justify-center px-2" : "justify-between px-4",
        )}
      >
        <Link
          href="/dashboard"
          className={cn("flex items-center gap-3 overflow-hidden", collapsed && "justify-center")}
        >
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Sparkles className="size-5" />
          </div>

          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="overflow-hidden"
            >
              <p className="truncate text-sm font-semibold">FormNova</p>

              <p className="truncate text-xs text-muted-foreground">Form Builder</p>
            </motion.div>
          )}
        </Link>

        {!collapsed && (
          <button
            onClick={() => setCollapsed(true)}
            className="flex size-9 items-center justify-center rounded-xl border transition-colors hover:bg-muted"
          >
            <ChevronLeft className="size-4" />
          </button>
        )}
      </div>

      {/* Navigation */}
      <div className="flex flex-1 flex-col justify-between overflow-y-auto p-3">
        <nav className="space-y-1">
          {navigation.map((item) => {
            const isDashboardRoot = item.href === "/dashboard";

            const isActive = isDashboardRoot ? pathname === "/dashboard" : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group relative flex items-center rounded-xl text-sm font-medium transition-all",
                  collapsed ? "justify-center px-0 py-3" : "gap-3 px-3 py-2.5",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                <item.icon className="size-5 shrink-0" />

                {!collapsed && <span className="truncate">{item.title}</span>}
              </Link>
            );
          })}
        </nav>

        <nav className="space-y-1">
          {secondaryNavigation.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group relative flex items-center rounded-xl text-sm font-medium transition-all",
                  collapsed ? "justify-center px-0 py-3" : "gap-3 px-3 py-2.5",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                <item.icon className="size-5 shrink-0" />

                {!collapsed && <span className="truncate">{item.title}</span>}
              </Link>
            );
          })}
        </nav>
      </div>
    </motion.aside>
  );
}
