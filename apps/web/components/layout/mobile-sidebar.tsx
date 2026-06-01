// // components/layout/mobile-sidebar.tsx

// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { AnimatePresence, motion } from "framer-motion";
// import { FileText, LayoutDashboard, Menu, Settings, Sparkles, X } from "lucide-react";
// import { useEffect, useState } from "react";

// import { cn } from "~/lib/utils";

// const navigation = [
//   {
//     title: "Dashboard",
//     href: "/dashboard",
//     icon: LayoutDashboard,
//   },
//   {
//     title: "Forms",
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

// export function MobileSidebar() {
//   const pathname = usePathname();

//   const [open, setOpen] = useState(false);

//   useEffect(() => {
//     setOpen(false);
//   }, [pathname]);

//   return (
//     <>
//       {/* Trigger */}
//       <button
//         onClick={() => setOpen(true)}
//         className="flex size-10 items-center justify-center rounded-xl border lg:hidden"
//       >
//         <Menu className="size-5" />
//       </button>

//       <AnimatePresence>
//         {open && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 z-[100] lg:hidden"
//           >
//             {/* Overlay */}
//             <div
//               onClick={() => setOpen(false)}
//               className="absolute inset-0 bg-black/50 backdrop-blur-sm"
//             />

//             {/* Sidebar */}
//             <motion.aside
//               initial={{ x: -320 }}
//               animate={{ x: 0 }}
//               exit={{ x: -320 }}
//               transition={{
//                 duration: 0.25,
//                 ease: "easeInOut",
//               }}
//               className="absolute top-0 left-0 flex h-screen w-[85vw] max-w-[320px] flex-col border-r bg-background shadow-2xl"
//             >
//               {/* Header */}
//               <div className="flex h-16 shrink-0 items-center justify-between border-b px-6">
//                 <Link href="/dashboard" className="flex items-center gap-3">
//                   <div className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
//                     <Sparkles className="size-5" />
//                   </div>

//                   <div>
//                     <p className="text-sm font-medium leading-none">ChaiForms</p>

//                     <p className="text-xs text-muted-foreground">Form Builder</p>
//                   </div>
//                 </Link>

//                 <button
//                   onClick={() => setOpen(false)}
//                   className="flex size-10 items-center justify-center rounded-xl border transition-colors hover:bg-muted"
//                 >
//                   <X className="size-5" />
//                 </button>
//               </div>

//               {/* Navigation */}
//               <div className="flex flex-1 flex-col justify-between overflow-y-auto overflow-x-hidden p-4">
//                 <nav className="space-y-1">
//                   {navigation.map((item) => {
//                     const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

//                     return (
//                       <Link
//                         key={item.href}
//                         href={item.href}
//                         className={cn(
//                           "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
//                           isActive
//                             ? "bg-primary text-primary-foreground"
//                             : "text-muted-foreground hover:bg-muted hover:text-foreground",
//                         )}
//                       >
//                         <item.icon className="size-4" />
//                         {item.title}
//                       </Link>
//                     );
//                   })}
//                 </nav>

//                 <nav className="space-y-1">
//                   {secondaryNavigation.map((item) => {
//                     const isActive = pathname === item.href;

//                     return (
//                       <Link
//                         key={item.href}
//                         href={item.href}
//                         className={cn(
//                           "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
//                           isActive
//                             ? "bg-primary text-primary-foreground"
//                             : "text-muted-foreground hover:bg-muted hover:text-foreground",
//                         )}
//                       >
//                         <item.icon className="size-4" />
//                         {item.title}
//                       </Link>
//                     );
//                   })}
//                 </nav>
//               </div>
//             </motion.aside>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// }



"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

import {
  FileText,
  LayoutDashboard,
  Menu,
  Settings,
  Sparkles,
  X,
  Plus,
} from "lucide-react";

import { useEffect, useState } from "react";

import { cn } from "~/lib/utils";

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

export function MobileSidebar() {

  const pathname =
    usePathname();

  const [open, setOpen] =
    useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Trigger */}
      <button
        onClick={() =>
          setOpen(true)
        }
        className="
          flex
          h-11
          w-11
          items-center
          justify-center
          rounded-2xl
          border
          border-white/10
          bg-white/[0.03]
          backdrop-blur-xl
          transition
          hover:bg-white/[0.06]
          lg:hidden
        "
      >
        <Menu className="h-5 w-5 text-white/70" />
      </button>

      <AnimatePresence>

        {open && (

          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className="fixed inset-0 z-[100] lg:hidden"
          >

            {/* Overlay */}
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              onClick={() =>
                setOpen(false)
              }
              className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            />

            {/* Sidebar */}
            <motion.aside
              initial={{
                x: -320,
              }}
              animate={{
                x: 0,
              }}
              exit={{
                x: -320,
              }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
              }}
              className="
                absolute
                left-0
                top-0
                flex
                h-screen
                w-[85vw]
                max-w-[320px]
                flex-col
                overflow-hidden
                border-r
                border-white/10
                bg-black
                shadow-[0_0_80px_rgba(0,0,0,0.7)]
                backdrop-blur-6xl
              "
            >

              {/* Glow */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(201,115,43,0.12),transparent_35%)]" />

              {/* Header */}
              <div className="relative flex h-20 shrink-0 items-center justify-between border-b border-white/10 px-5">

                {/* Logo */}
                <Link
                  href="/dashboard"
                  className="flex items-center gap-4"
                >

                  <div className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-[#C9732B] to-[#B56A3C] shadow-[0_0_40px_rgba(201,115,43,0.35)]">

                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.3),transparent_40%)]" />

                    <Sparkles className="relative z-10 h-5 w-5 text-white" />

                  </div>

                  <div>

                    <p className="text-sm font-semibold tracking-tight text-white">
                      ChaiForms
                    </p>

                    <p className="mt-0.5 text-xs text-white/40">
                      Creator Studio
                    </p>

                  </div>

                </Link>

                {/* Close */}
                <button
                  onClick={() =>
                    setOpen(false)
                  }
                  className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/[0.03]
                    transition
                    hover:bg-white/[0.06]
                  "
                >
                  <X className="h-5 w-5 text-white/60" />
                </button>

              </div>

              {/* Body */}
              <div className="relative flex flex-1 flex-col justify-between overflow-y-auto p-4">

                {/* Top */}
                <div>

                  {/* Create Button */}
                  <Link
                    href="/dashboard/forms/create"
                    className="
                      mb-6
                      flex
                      items-center
                      justify-center
                      gap-3
                      rounded-2xl
                      bg-gradient-to-r
                      from-[#C9732B]
                      to-[#B56A3C]
                      px-5
                      py-4
                      text-sm
                      font-medium
                      text-white
                      shadow-[0_10px_40px_rgba(201,115,43,0.25)]
                    "
                  >

                    <Plus className="h-5 w-5" />

                    <span>
                      Create Form
                    </span>

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
                            className={cn(
                              " group relative flex items-center gap-4 overflow-hidden rounded-2xl px-4 py-4 text-sm font-medium transition-all duration-300",

                              isActive? `  bg-white/[0.08]  text-white`: `  text-white/50  hover:bg-white/[0.04]  hover:text-white`,
                            )}
                          >

                            {/* Active Glow */}
                            {isActive && (
                              <div className="absolute inset-y-3 left-0 w-1 rounded-full bg-[#C9732B]" />
                            )}

                            {/* Icon */}
                            <div
                              className={cn(
                                " flex h-11 w-11 shrink-0 items-center justify-center rounded-xl",

                                isActive
                                  ? "bg-[#C9732B]/15 text-[#F3EBDD]"
                                  : "bg-white/[0.03]",
                              )}
                            >
                              <item.icon className="h-5 w-5" />
                            </div>

                            {/* Text */}
                            <div>

                              <p className="text-sm font-medium">
                                {
                                  item.title
                                }
                              </p>

                            </div>

                          </Link>
                        );
                      },
                    )}

                  </nav>

                </div>

                {/* Bottom */}
                <div className="space-y-2">

                  {/* Secondary */}
                  {secondaryNavigation.map(
                    (item) => {

                      const isActive =
                        pathname ===
                        item.href;

                      return (
                        <Link
                          key={
                            item.href
                          }
                          href={
                            item.href
                          }
                          className={cn(
                            " flex items-center gap-4 rounded-2xl px-4 py-4 text-sm font-medium transition-all",

                            isActive ? `bg-white/[0.08] text-white ` : `text-white/50 hover:bg-white/[0.04] hover:text-white `,
                          )}
                        >

                          <div
                            className={cn(
                              " flex h-11 w-11 items-center justify-center rounded-xl",

                              isActive ? "bg-[#C9732B]/15 text-[#F3EBDD]" : "bg-white/[0.03]",
                            )}
                          >
                            <item.icon className="h-5 w-5" />
                          </div>

                          <span>
                            {
                              item.title
                            }
                          </span>

                        </Link>
                      );
                    },
                  )}

                  {/* Footer Card */}
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

                </div>

              </div>

            </motion.aside>

          </motion.div>

        )}

      </AnimatePresence>
    </>
  );
}