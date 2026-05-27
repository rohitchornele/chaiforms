// components/layout/mobile-sidebar.tsx

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { FileText, LayoutDashboard, Menu, Settings, Sparkles, X } from "lucide-react";
import { useEffect, useState } from "react";

import { cn } from "~/lib/utils";

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

export function MobileSidebar() {
  const pathname = usePathname();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Trigger */}
      <button
        onClick={() => setOpen(true)}
        className="flex size-10 items-center justify-center rounded-xl border lg:hidden"
      >
        <Menu className="size-5" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] lg:hidden"
          >
            {/* Overlay */}
            <div
              onClick={() => setOpen(false)}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            />

            {/* Sidebar */}
            <motion.aside
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{
                duration: 0.25,
                ease: "easeInOut",
              }}
              className="absolute top-0 left-0 flex h-screen w-[85vw] max-w-[320px] flex-col border-r bg-background shadow-2xl"
            >
              {/* Header */}
              <div className="flex h-16 shrink-0 items-center justify-between border-b px-6">
                <Link href="/dashboard" className="flex items-center gap-3">
                  <div className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                    <Sparkles className="size-5" />
                  </div>

                  <div>
                    <p className="text-sm font-medium leading-none">FormNova</p>

                    <p className="text-xs text-muted-foreground">Form Builder</p>
                  </div>
                </Link>

                <button
                  onClick={() => setOpen(false)}
                  className="flex size-10 items-center justify-center rounded-xl border transition-colors hover:bg-muted"
                >
                  <X className="size-5" />
                </button>
              </div>

              {/* Navigation */}
              <div className="flex flex-1 flex-col justify-between overflow-y-auto overflow-x-hidden p-4">
                <nav className="space-y-1">
                  {navigation.map((item) => {
                    const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
                          isActive
                            ? "bg-primary text-primary-foreground"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground",
                        )}
                      >
                        <item.icon className="size-4" />
                        {item.title}
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
                          "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
                          isActive
                            ? "bg-primary text-primary-foreground"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground",
                        )}
                      >
                        <item.icon className="size-4" />
                        {item.title}
                      </Link>
                    );
                  })}
                </nav>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
