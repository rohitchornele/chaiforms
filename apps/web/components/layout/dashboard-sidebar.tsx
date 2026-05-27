// // UPDATE
// // components/layout/dashboard-sidebar.tsx

// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { ChevronLeft, FileText, LayoutDashboard, Settings, Sparkles } from "lucide-react";
// import { motion } from "framer-motion";

// import { cn } from "~/lib/utils";
// import { useDashboardLayout } from "./dashboard-layout-context";

// const navigation = [
//   {
//     title: "Dashboard",
//     href: "/dashboard",
//     icon: LayoutDashboard,
//   },
//   {
//     title: "Manage Forms",
//     href: "/dashboard/forms",
//     icon: FileText,
//   },
// ];

// const secondaryNavigation = [
//   {
//     title: "Settings",
//     href: "/dashboard/settings",
//     icon: Settings,
//   },
// ];

// export function DashboardSidebar() {
//   const pathname = usePathname();

//   const { collapsed, setCollapsed } = useDashboardLayout();

//   return (
//     <motion.aside
//       animate={{
//         width: collapsed ? 88 : 288,
//       }}
//       transition={{
//         duration: 0.2,
//         ease: "easeInOut",
//       }}
//       className="hidden shrink-0 border-r bg-background lg:flex lg:flex-col"
//     >
//       {/* Header */}
//       <div
//         className={cn(
//           "flex h-16 items-center border-b",
//           collapsed ? "justify-center px-2" : "justify-between px-4",
//         )}
//       >
//         <Link
//           href="/dashboard"
//           className={cn("flex items-center gap-3 overflow-hidden", collapsed && "justify-center")}
//         >
//           <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
//             <Sparkles className="size-5" />
//           </div>

//           {!collapsed && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               className="overflow-hidden"
//             >
//               <p className="truncate text-sm font-semibold">FormNova</p>

//               <p className="truncate text-xs text-muted-foreground">Form Builder</p>
//             </motion.div>
//           )}
//         </Link>

//         {!collapsed && (
//           <button
//             onClick={() => setCollapsed(true)}
//             className="flex size-9 items-center justify-center rounded-xl border transition-colors hover:bg-muted"
//           >
//             <ChevronLeft className="size-4" />
//           </button>
//         )}
//       </div>

//       {/* Navigation */}
//       <div className="flex flex-1 flex-col justify-between overflow-y-auto p-3">
//         <nav className="space-y-1">
//           {navigation.map((item) => {
//             const isDashboardRoot = item.href === "/dashboard";

//             const isActive = isDashboardRoot ? pathname === "/dashboard" : pathname.startsWith(item.href);

//             return (
//               <Link
//                 key={item.href}
//                 href={item.href}
//                 className={cn(
//                   "group relative flex items-center rounded-xl text-sm font-medium transition-all",
//                   collapsed ? "justify-center px-0 py-3" : "gap-3 px-3 py-2.5",
//                   isActive
//                     ? "bg-primary text-primary-foreground"
//                     : "text-muted-foreground hover:bg-muted hover:text-foreground",
//                 )}
//               >
//                 <item.icon className="size-5 shrink-0" />

//                 {!collapsed && <span className="truncate">{item.title}</span>}
//               </Link>
//             );
//           })}
//         </nav>

//         <nav className="space-y-1">
//           {secondaryNavigation.map((item) => {
//             const isActive = pathname === item.href;

//             return (
//               <Link
//                 key={item.href}
//                 href={item.href}
//                 className={cn(
//                   "group relative flex items-center rounded-xl text-sm font-medium transition-all",
//                   collapsed ? "justify-center px-0 py-3" : "gap-3 px-3 py-2.5",
//                   isActive
//                     ? "bg-primary text-primary-foreground"
//                     : "text-muted-foreground hover:bg-muted hover:text-foreground",
//                 )}
//               >
//                 <item.icon className="size-5 shrink-0" />

//                 {!collapsed && <span className="truncate">{item.title}</span>}
//               </Link>
//             );
//           })}
//         </nav>
//       </div>
//     </motion.aside>
//   );
// }



"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";

import {
  ChevronLeft,
  FileText,
  LayoutDashboard,
  Settings,
  Sparkles,
  Plus,
} from "lucide-react";

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
    title: "Manage Forms",
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
  const pathname =
    usePathname();

  const {
    collapsed,
    setCollapsed,
  } =
    useDashboardLayout();

  return (
    <motion.aside
      animate={{
        width: collapsed
          ? 92
          : 300,
      }}
      transition={{
        duration: 0.25,
        ease: "easeInOut",
      }}
      className="
        relative
        z-20
        hidden
        shrink-0
        border-r
        border-white/10
        bg-black/30
        backdrop-blur-3xl
        lg:flex
        lg:flex-col
      "
    >
      {/* Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(201,115,43,0.08),transparent_35%)]" />

      {/* Header */}
      <div
        className={cn(
          "relative flex h-20 items-center border-b border-white/10",
          collapsed
            ? "justify-center px-2"
            : "justify-between px-5",
        )}
      >
        {/* Logo */}
        <Link
          href="/dashboard"
          className={cn(
            "flex items-center gap-4 overflow-hidden",
            collapsed &&
              "justify-center",
          )}
        >
          {/* Icon */}
          <div className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-[#C9732B] to-[#B56A3C] shadow-[0_0_40px_rgba(201,115,43,0.35)]">

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.3),transparent_40%)]" />

            <Sparkles className="relative z-10 h-5 w-5 text-white" />

          </div>

          {/* Text */}
          {!collapsed && (
            <motion.div
              initial={{
                opacity: 0,
                x: -8,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              className="overflow-hidden"
            >
              <p className="truncate text-base font-semibold tracking-tight text-white">
                FormNova
              </p>

              <p className="mt-0.5 truncate text-xs text-white/40">
                Creator Studio
              </p>
            </motion.div>
          )}
        </Link>

        {/* Collapse */}
        {!collapsed && (
          <button
            onClick={() =>
              setCollapsed(
                true,
              )
            }
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-2xl
              border
              border-white/10
              bg-white/[0.03]
              transition-all
              hover:bg-white/[0.06]
            "
          >
            <ChevronLeft className="h-4 w-4 text-white/60" />
          </button>
        )}
      </div>

      {/* Body */}
      <div className="relative flex flex-1 flex-col justify-between overflow-y-auto p-4">

        {/* TOP */}
        <div>

          {/* Create Button */}
          <Link
            href="/dashboard/forms/create"
            className={cn(
              " mb-6 flex items-center rounded-2xl bg-gradient-to-r from-[#C9732B] to-[#B56A3C] px-4 py-3 text-sm font-medium text-white shadow-[0_10px_40px_rgba(201,115,43,0.25)] transition-all hover:scale-[1.02]",
              collapsed ? "justify-center px-0" : "gap-3",
            )}
          >
            <Plus className="h-5 w-5 shrink-0" />

            {!collapsed && (
              <span>
                Create Form
              </span>
            )}
          </Link>

          {/* Navigation */}
          <nav className="space-y-2">

            {navigation.map(
              (item) => {

                const isDashboardRoot =
                  item.href ===
                  "/dashboard";

                const isActive =
                  isDashboardRoot
                    ? pathname ===
                      "/dashboard"
                    : pathname.startsWith(
                        item.href,
                      );

                return (
                  <Link
                    key={
                      item.href
                    }
                    href={
                      item.href
                    }
                    className={cn("group relative flex items-center overflow-hidden rounded-2xl text-sm font-medium transition-all duration-300",
                      collapsed ? "justify-center px-0 py-4" : "gap-3 px-4 py-3",

                      isActive ? `bg-white/[0.08] text-white  shadow-[0_0_30px_rgba(255,255,255,0.04)] ` : `text-white/50 hover:bg-white/[0.04] hover:text-white `,
                    )}
                  >
                    {/* Active Glow */}
                    {isActive && (
                      <div className="absolute inset-y-2 left-0 w-1 rounded-full bg-[#C9732B]" />
                    )}

                    {/* Icon */}
                    <div
                      className={cn(
                        " relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all",
                        isActive ? "bg-[#C9732B]/15 text-[#F3EBDD]" : "bg-white/[0.03]",
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                    </div>

                    {/* Label */}
                    {!collapsed && (
                      <span className="truncate">
                        {
                          item.title
                        }
                      </span>
                    )}
                  </Link>
                );
              },
            )}

          </nav>
        </div>

        {/* Bottom */}
        <div className="space-y-2">

          {secondaryNavigation.map(
            (item) => {

              const isActive =
                pathname ===
                item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    " group relative flex items-center overflow-hidden rounded-2xl text-sm font-medium transition-all duration-300",
                    collapsed
                      ? "justify-center px-0 py-4"
                      : "gap-3 px-4 py-3",

                    isActive
                      ? `
                        bg-white/[0.08]
                        text-white
                      `
                      : `
                        text-white/50
                        hover:bg-white/[0.04]
                        hover:text-white
                      `,
                  )}
                >
                  <div
                    className={cn(" flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all ",
                      isActive
                        ? "bg-[#C9732B]/15 text-[#F3EBDD]"
                        : "bg-white/[0.03]",
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                  </div>

                  {!collapsed && (
                    <span className="truncate">
                      {
                        item.title
                      }
                    </span>
                  )}
                </Link>
              );
            },
          )}

          {/* Footer */}
          {!collapsed && (
            <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.03] p-5">

              <p className="text-xs uppercase tracking-[0.2em] text-[#C9732B]">
                Creator Mode
              </p>

              <h3 className="mt-3 text-lg font-semibold text-white">
                Build immersive forms
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-white/50">
                Design cinematic experiences
                for your audience.
              </p>

            </div>
          )}

        </div>

      </div>
    </motion.aside>
  );
}