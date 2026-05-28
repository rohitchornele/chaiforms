"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import {
  Bell,
  ChevronRight,
  LogOut,
  Search,
  Settings,
  User,
} from "lucide-react";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

import { MobileSidebar } from "./mobile-sidebar";

import { useDashboardLayout } from "./dashboard-layout-context";

import { useLogoutUser } from "~/hooks/api/auth";

export function DashboardHeader() {

  const router =
    useRouter();

  const {
    collapsed,
    setCollapsed,
  } =
    useDashboardLayout();

  const [
    openMenu,
    setOpenMenu,
  ] =
    useState(false);

  const {
    logoutUserAsync,
    isPending,
  } =
    useLogoutUser();

  const handleLogout =
    async () => {

      try {

        await logoutUserAsync();

        router.push(
          "/",
        );

      } catch (err) {

        console.error(
          err,
        );
      }
    };

  return (

    <header className="relative z-30 flex h-20 shrink-0 items-center border-b border-white/10 bg-black/20 px-4 backdrop-blur-3xl md:px-6">

      <div className="flex w-full items-center">

        {/* LEFT */}
        <div className="flex items-center gap-4">

          {/* Mobile */}
          <div className="lg:hidden">
            <MobileSidebar />
          </div>

          {/* Expand */}
          {collapsed && (

            <button
              onClick={() =>
                setCollapsed(
                  false,
                )
              }
              className="hidden h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] transition hover:bg-white/[0.06] lg:flex"
            >

              <ChevronRight className="h-4 w-4 text-white/70" />

            </button>

          )}

          {/* Search */}
          <div className="relative hidden lg:block">

            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />

            <input
              type="text"
              placeholder="Search forms..."
              className="h-12 w-[340px] rounded-2xl border border-white/10 bg-white/[0.03] pl-11 pr-4 text-sm text-white outline-none transition-all placeholder:text-white/30 focus:border-[#C9732B]/40 focus:ring-4 focus:ring-[#C9732B]/10"
            />

          </div>

        </div>

        {/* RIGHT */}
        <div className="ml-auto flex items-center gap-3">

          {/* Notifications */}
          <button className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] transition hover:bg-white/[0.06]">

            <Bell className="h-4 w-4 text-white/70" />

          </button>

          {/* USER MENU */}
          <div className="relative">

            <button
              onClick={() =>
                setOpenMenu(
                  (
                    prev,
                  ) => !prev,
                )
              }
              className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-2 transition hover:bg-white/[0.06]"
            >

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#C9732B] to-[#B56A3C] text-sm font-semibold text-white">
                R
              </div>

              <div className="hidden text-left md:block">

                <p className="text-sm font-medium text-white">
                  Rohit
                </p>

                <p className="mt-0.5 text-xs text-white/40">
                  Creator
                </p>

              </div>

            </button>

            {/* DROPDOWN */}
            <AnimatePresence>

              {openMenu && (

                <motion.div
                  initial={{
                    opacity: 0,
                    y: 10,
                    scale: 0.98,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    y: 10,
                    scale: 0.98,
                  }}
                  transition={{
                    duration: 0.18,
                  }}
                  className="
                    absolute
                    right-0
                    top-16
                    z-50
                    w-64
                    overflow-hidden
                    rounded-3xl
                    border
                    border-white/10
                    bg-[#0B0B0B]/95
                    p-2
                    shadow-2xl
                    backdrop-blur-3xl
                  "
                >

                  {/* PROFILE */}
                  <div className="mb-2 rounded-2xl border border-white/5 bg-white/[0.03] p-4">

                    <div className="flex items-center gap-3">

                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#C9732B] to-[#B56A3C] text-sm font-semibold text-white">
                        R
                      </div>

                      <div>

                        <p className="text-sm font-semibold text-white">
                          Rohit
                        </p>

                        <p className="mt-1 text-xs text-white/40">
                          Creator Account
                        </p>

                      </div>

                    </div>

                  </div>

                  {/* MENU ITEMS */}
                  <div className="space-y-1">

                    <button
                      className="
                        flex
                        w-full
                        items-center
                        gap-3
                        rounded-2xl
                        px-4
                        py-3
                        text-sm
                        text-white/70
                        transition
                        hover:bg-white/[0.05]
                        hover:text-white
                      "
                    >

                      <User className="h-4 w-4" />

                      Profile

                    </button>

                    <button
                      className="
                        flex
                        w-full
                        items-center
                        gap-3
                        rounded-2xl
                        px-4
                        py-3
                        text-sm
                        text-white/70
                        transition
                        hover:bg-white/[0.05]
                        hover:text-white
                      "
                    >

                      <Settings className="h-4 w-4" />

                      Settings

                    </button>

                    <div className="my-2 border-t border-white/5" />

                    <button
                      onClick={
                        handleLogout
                      }
                      disabled={
                        isPending
                      }
                      className="
                        flex
                        w-full
                        items-center
                        gap-3
                        rounded-2xl
                        px-4
                        py-3
                        text-sm
                        text-red-300
                        transition
                        hover:bg-red-500/10
                      "
                    >

                      <LogOut className="h-4 w-4" />

                      {isPending
                        ? "Logging out..."
                        : "Logout"}

                    </button>

                  </div>

                </motion.div>

              )}

            </AnimatePresence>

          </div>

        </div>

      </div>

    </header>
  );
}