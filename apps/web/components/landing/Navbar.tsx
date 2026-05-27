"use client";

import Link from "next/link";

import { useState } from "react";

import { motion } from "framer-motion";

import {
  Menu,
  X,
  ArrowRight,
} from "lucide-react";

type Props = {
  isLoggedIn?: boolean;
};

export default function Navbar({
  isLoggedIn = false,
}: Props) {

  const [open, setOpen] =
    useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 py-4 md:px-8">
      <motion.nav
        initial={{
          opacity: 0,
          y: -20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.7,
        }}
        className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/10 bg-white/[0.04] px-6 py-4 shadow-[0_0_40px_rgba(0,0,0,0.25)] backdrop-blur-2xl"
      >
        {/* Logo */}
        <Link
          href="/"
          className="group relative"
        >
          <div className="absolute inset-0 rounded-full bg-[#C9732B]/20 blur-xl transition-opacity duration-500 group-hover:opacity-100" />

          <h1 className="relative font-serif text-2xl tracking-[-0.03em] text-[#F3EBDD] md:text-3xl">
            Chai
            <span className="bg-gradient-to-r from-[#C9732B] via-[#F3EBDD] to-[#1F4A3B] bg-clip-text text-transparent">
              Forms
            </span>
          </h1>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-10 lg:flex">
          {[
            {
              label: "Explore",
              href: "/explore",
            },
            {
              label: "Features",
              href: "#features",
            },
            {
              label: "Analytics",
              href: "#analytics",
            },
            {
              label: "Pricing",
              href: "#pricing",
            },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="group relative text-sm uppercase tracking-[0.22em] text-[#D8D4CC]/70 transition duration-300 hover:text-[#F3EBDD]"
            >
              {item.label}

              <span className="absolute -bottom-2 left-0 h-px w-0 bg-gradient-to-r from-[#C9732B] to-[#F3EBDD] transition-all duration-500 group-hover:w-full" />
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-4 lg:flex">
          {!isLoggedIn ? (
            <>
              <Link
                href="/login"
                className="rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 text-sm uppercase tracking-[0.2em] text-[#D8D4CC]/80 transition-all duration-300 hover:bg-white/[0.06]"
              >
                Login
              </Link>

              <Link
                href="/signup"
                className="group relative overflow-hidden rounded-full border border-[#B56A3C]/30 bg-[#B56A3C]/10 px-6 py-3 text-sm uppercase tracking-[0.2em] text-[#F3EBDD] backdrop-blur-xl transition-all duration-500 hover:border-[#C9732B]/60 hover:bg-[#B56A3C]/20"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Begin Journey

                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/dashboard"
                className="group relative overflow-hidden rounded-full border border-[#B56A3C]/30 bg-[#B56A3C]/10 px-6 py-3 text-sm uppercase tracking-[0.2em] text-[#F3EBDD] backdrop-blur-xl transition-all duration-500 hover:border-[#C9732B]/60 hover:bg-[#B56A3C]/20"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Dashboard

                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>

              <button className="rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 text-sm uppercase tracking-[0.2em] text-[#D8D4CC]/80 transition-all duration-300 hover:bg-white/[0.06]">
                Logout
              </button>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() =>
            setOpen(!open)
          }
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-[#F3EBDD] backdrop-blur-xl lg:hidden"
        >
          {open ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </motion.nav>

      {/* Mobile Menu */}
      {open && (
        <motion.div
          initial={{
            opacity: 0,
            y: -10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            y: -10,
          }}
          className="mx-auto mt-4 max-w-7xl overflow-hidden rounded-[32px] border border-white/10 bg-[#111214]/95 p-6 shadow-[0_0_60px_rgba(0,0,0,0.4)] backdrop-blur-3xl lg:hidden"
        >
          <div className="flex flex-col gap-5">
            {[
              {
                label: "Explore",
                href: "/explore",
              },
              {
                label: "Features",
                href: "#features",
              },
              {
                label: "Analytics",
                href: "#analytics",
              },
              {
                label: "Pricing",
                href: "#pricing",
              },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="border-b border-white/5 pb-4 text-sm uppercase tracking-[0.25em] text-[#D8D4CC]/70 transition hover:text-[#F3EBDD]"
                onClick={() =>
                  setOpen(false)
                }
              >
                {item.label}
              </Link>
            ))}

            {!isLoggedIn ? (
              <div className="mt-4 flex flex-col gap-3">
                <Link
                  href="/login"
                  className="rounded-full border border-white/10 bg-white/[0.03] px-5 py-4 text-center text-sm uppercase tracking-[0.2em] text-[#D8D4CC]/80"
                >
                  Login
                </Link>

                <Link
                  href="/signup"
                  className="rounded-full border border-[#B56A3C]/30 bg-[#B56A3C]/10 px-5 py-4 text-center text-sm uppercase tracking-[0.2em] text-[#F3EBDD]"
                >
                  Begin Journey
                </Link>
              </div>
            ) : (
              <div className="mt-4 flex flex-col gap-3">
                <Link
                  href="/dashboard"
                  className="rounded-full border border-[#B56A3C]/30 bg-[#B56A3C]/10 px-5 py-4 text-center text-sm uppercase tracking-[0.2em] text-[#F3EBDD]"
                >
                  Dashboard
                </Link>

                <button className="rounded-full border border-white/10 bg-white/[0.03] px-5 py-4 text-sm uppercase tracking-[0.2em] text-[#D8D4CC]/80">
                  Logout
                </button>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </header>
  );
}