"use client"

import {
  Bell,
  ChevronRight,
  Search,
} from "lucide-react"

import { MobileSidebar } from "./mobile-sidebar"
import { useDashboardLayout } from "./dashboard-layout-context"

export function DashboardHeader() {
  const { collapsed, setCollapsed } =
    useDashboardLayout()

  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center border-b bg-background/80 px-4 backdrop-blur-xl md:px-6">
      <div className="flex w-full items-center">
        {/* LEFT */}
        <div className="flex items-center gap-3">
          {/* Mobile Sidebar */}
          <div className="lg:hidden">
            <MobileSidebar />
          </div>

          {/* Desktop Expand */}
          {collapsed && (
            <button
              onClick={() => setCollapsed(false)}
              className="hidden size-10 items-center justify-center rounded-xl border transition-colors hover:bg-muted lg:flex"
            >
              <ChevronRight className="size-4" />
            </button>
          )}

          {/* Search */}
          <div className="relative hidden lg:block">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

            <input
              type="text"
              placeholder="Search forms..."
              className="h-10 w-[320px] rounded-xl border bg-background pl-10 pr-4 text-sm outline-none transition-all placeholder:text-muted-foreground focus:border-primary"
            />
          </div>
        </div>

        {/* RIGHT */}
        <div className="ml-auto flex items-center gap-2">
          {/* Notifications */}
          <button className="flex size-10 shrink-0 items-center justify-center rounded-xl border transition-colors hover:bg-muted">
            <Bell className="size-4" />
          </button>

          {/* User */}
          <button className="flex shrink-0 items-center gap-3 rounded-xl border px-2 py-2 transition-colors hover:bg-muted md:px-3">
            <div className="size-8 rounded-full bg-muted" />

            <div className="hidden text-left md:block">
              <p className="text-sm font-medium leading-none">
                Rohit
              </p>

              <p className="mt-1 text-xs text-muted-foreground">
                Developer
              </p>
            </div>
          </button>
        </div>
      </div>
    </header>
  )
}