
"use client";

import {
  Bell,
  ChevronRight,
  Search,
} from "lucide-react";

import { MobileSidebar } from "./mobile-sidebar";

import { useDashboardLayout } from "./dashboard-layout-context";

export function DashboardHeader() {

  const {
    collapsed,
    setCollapsed,
  } = useDashboardLayout();

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
              onClick={() => setCollapsed(false)}
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

          {/* User */}
          <button className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-2 transition hover:bg-white/[0.06]">

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

        </div>

      </div>

    </header>
  );
}