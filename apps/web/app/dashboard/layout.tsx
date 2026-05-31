"use client";

import type { ReactNode } from "react";

import { DashboardHeader } from "~/components/layout/dashboard-header";
import { DashboardSidebar } from "~/components/layout/dashboard-sidebar";
import { DashboardLayoutProvider } from "~/components/layout/dashboard-layout-context";
import { DashboardGuard } from "~/components/auth/DashboardGuard";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <DashboardLayoutProvider>
      <DashboardGuard>
        <div className="relative flex h-screen overflow-hidden bg-[#050505] text-white">
          {/* Background */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(201,115,43,0.15),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(31,74,59,0.15),transparent_30%)]" />

            {/* Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:60px_60px]" />
          </div>

          {/* Sidebar */}
          <DashboardSidebar />

          {/* Main */}
          <div className="relative z-10 flex flex-1 flex-col overflow-hidden">
            <DashboardHeader />

            <main className="flex-1 overflow-y-auto">
              <div className="mx-auto flex w-full max-w-[1800px] flex-col gap-6 p-4 md:p-6">
                {children}
              </div>
            </main>
          </div>
        </div>
      </DashboardGuard>
    </DashboardLayoutProvider>
  );
}
