// "use client"

// import * as React from "react"
// import { AppSidebar } from "~/components/app-sidebar"
// import { SiteHeader } from "~/components/site-header"
// import { SidebarInset, SidebarProvider } from "~/components/ui/sidebar"

// export default function DashboardLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <SidebarProvider
//       style={
//         {
//           "--sidebar-width": "calc(var(--spacing) * 72)",
//           "--header-height": "calc(var(--spacing) * 12)",
//         } as React.CSSProperties
//       }
//     >
//       <AppSidebar variant="inset" />
//       <SidebarInset>
//         <SiteHeader />
//         {children}
//       </SidebarInset>
//     </SidebarProvider>
//   )
// }

"use client"

import type { ReactNode } from "react"

import { DashboardHeader } from "~/components/layout/dashboard-header"
import { DashboardSidebar } from "~/components/layout/dashboard-sidebar"
import { DashboardLayoutProvider } from "~/components/layout/dashboard-layout-context"

interface DashboardLayoutProps {
  children: ReactNode
}

export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return (
    <DashboardLayoutProvider>
      <div className="flex h-screen overflow-hidden bg-background">
        <DashboardSidebar />

        <div className="flex flex-1 flex-col overflow-hidden">
          <DashboardHeader />

          <main className="flex-1 overflow-y-auto">
            <div className="flex flex-1 flex-col gap-4 p-4 md:gap-6 md:px-6 md:py-4">
              {children}
            </div>
          </main>
        </div>
      </div>
    </DashboardLayoutProvider>
  )
}