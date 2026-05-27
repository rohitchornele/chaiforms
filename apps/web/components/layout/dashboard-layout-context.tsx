

"use client"

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react"

interface DashboardLayoutContextProps {
  collapsed: boolean
  setCollapsed: (value: boolean) => void
}

const DashboardLayoutContext =
  createContext<DashboardLayoutContextProps | null>(null)

export function DashboardLayoutProvider({
  children,
}: {
  children: ReactNode
}) {
  const [collapsed, setCollapsed] = useState(false)

  const value = useMemo(
    () => ({
      collapsed,
      setCollapsed,
    }),
    [collapsed]
  )

  return (
    <DashboardLayoutContext.Provider value={value}>
      {children}
    </DashboardLayoutContext.Provider>
  )
}

export function useDashboardLayout() {
  const context = useContext(DashboardLayoutContext)

  if (!context) {
    throw new Error(
      "useDashboardLayout must be used inside DashboardLayoutProvider"
    )
  }

  return context
}


// UPDATE
// app/dashboard/layout.tsx


import { DashboardHeader } from "~/components/layout/dashboard-header"
import { DashboardSidebar } from "~/components/layout/dashboard-sidebar"

interface DashboardLayoutProps {
  children: ReactNode
}

export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return (
    <DashboardLayoutProvider
    >
      <div className="flex h-screen overflow-hidden bg-background">
        <DashboardSidebar />

        <div className="flex flex-1 flex-col overflow-hidden">
          <DashboardHeader />

          <main className="flex-1 overflow-y-auto">
            <div className="flex flex-1 flex-col gap-4 p-4 md:gap-6 md:p-6">
              {children}
            </div>
          </main>
        </div>
      </div>
    </DashboardLayoutProvider>
  )
}