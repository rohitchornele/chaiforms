"use client";

import Link from "next/link";

import { motion } from "framer-motion";

import {
  ArrowRight,
  Sparkles,
  Globe,
  ShieldCheck,
  BarChart3,
} from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#050505] pt-36 text-[#F3EBDD]">
      {/* Ambient Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Golden Glow */}
        <div className="absolute left-1/2 top-0 h-[550px] w-[550px] -translate-x-1/2 rounded-full bg-[#C9732B]/15 blur-3xl" />

        {/* Emerald Glow */}
        <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-[#1F4A3B]/20 blur-3xl" />

        {/* Violet Glow */}
        <div className="absolute right-0 top-1/3 h-[450px] w-[450px] rounded-full bg-violet-500/10 blur-3xl" />

        {/* Sacred Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:70px_70px]" />

        {/* Radial Fade */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050505_85%)]" />
      </div>

      <div className="relative mx-auto grid min-h-screen max-w-7xl items-center gap-20 px-4 pb-24 md:px-8 lg:grid-cols-2">
        {/* LEFT */}
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
          }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-5 py-2 text-xs uppercase tracking-[0.25em] text-[#D8D4CC]/80 backdrop-blur-xl">
            <Sparkles className="h-4 w-4 text-[#C9732B]" />

            Future of Form Building
          </div>

          {/* Heading */}
          <h1 className="mt-8 font-serif text-5xl leading-[0.95] tracking-[-0.04em] md:text-8xl">
            Create Forms
            <br />

            <span className="bg-linear-to-r from-[#C9732B] via-[#F3EBDD] to-[#1F4A3B] bg-clip-text text-transparent">
              That Feel Alive
            </span>
          </h1>

          {/* Description */}
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-[#D8D4CC]/65 md:text-xl">
            ChaiForms transforms ordinary surveys into immersive experiences
            with cinematic themes, dynamic fields, analytics, public explore
            pages and intelligent submission workflows.
          </p>

          {/* CTA */}
          <div className="mt-12 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/dashboard/forms"
              className="group relative overflow-hidden rounded-full border border-[#B56A3C]/30 bg-[#B56A3C]/10 px-7 py-4 text-sm uppercase tracking-[0.2em] text-[#F3EBDD] backdrop-blur-xl transition-all duration-500 hover:border-[#C9732B]/60 hover:bg-[#B56A3C]/20"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Start Creating

                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>

              <div className="absolute inset-0 bg-linear-to-r from-[#C9732B]/20 via-[#F3EBDD]/10 to-[#1F4A3B]/20 opacity-0 transition duration-500 group-hover:opacity-100" />
            </Link>

            <Link
              href="/explore"
              className="rounded-full border border-white/10 bg-white/[0.03] px-7 py-4 text-center text-sm uppercase tracking-[0.2em] text-[#D8D4CC]/80 backdrop-blur-xl transition-all duration-300 hover:bg-white/[0.06]"
            >
              Explore Forms
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-6 border-t border-white/10 pt-8">
            {[
              {
                value: "10K+",
                label: "Forms Created",
              },
              {
                value: "1M+",
                label: "Responses",
              },
              {
                value: "99.9%",
                label: "Platform Uptime",
              },
            ].map((item) => (
              <div key={item.label}>
                <h3 className="text-3xl font-bold text-[#F3EBDD]">
                  {item.value}
                </h3>

                <p className="mt-2 text-sm text-[#D8D4CC]/55">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* RIGHT */}
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.9,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 0.8,
            delay: 0.2,
          }}
          className="relative"
        >
          {/* Main Sacred Card */}
          <div className="relative overflow-hidden rounded-[40px] border -mt-36 border-white/10 bg-white/[0.04] p-6 shadow-[0_0_60px_rgba(0,0,0,0.45)] backdrop-blur-3xl">
            {/* Glow */}
            <div className="absolute inset-0 bg-linear-to-br from-white/[0.05] via-transparent to-[#C9732B]/10" />

            {/* Top */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-[#D8D4CC]/45">
                  Active Experience
                </p>

                <h3 className="mt-3 text-3xl font-semibold tracking-tight text-[#F3EBDD]">
                  Anime Community Survey
                </h3>
              </div>

              <div className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-xs uppercase tracking-[0.25em] text-emerald-400">
                Live
              </div>
            </div>

            {/* Fields */}
            <div className="mt-10 space-y-5">
              {[
                "Favorite Anime Universe",
                "Top Character Arc",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-3xl border border-white/10 bg-black/30 p-5"
                >
                  <div className="flex items-center justify-between">
                    <div className="h-3 w-40 rounded-full bg-zinc-700" />

                    <div className="h-3 w-16 rounded-full bg-[#C9732B]/50" />
                  </div>

                  <div className="mt-5 h-12 rounded-2xl border border-white/10 bg-white/[0.03]" />
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="mt-8 grid gap-4 border-t border-white/10 pt-6 md:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
                <div className="flex items-center gap-3">
                  <BarChart3 className="h-5 w-5 text-violet-400" />

                  <div>
                    <p className="text-sm text-[#D8D4CC]/50">
                      Responses
                    </p>

                    <h4 className="mt-1 text-2xl font-bold text-[#F3EBDD]">
                      24,392
                    </h4>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="h-5 w-5 text-emerald-400" />

                  <div>
                    <p className="text-sm text-[#D8D4CC]/50">
                      Protection
                    </p>

                    <h4 className="mt-1 text-2xl font-bold text-[#F3EBDD]">
                      Secured
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Analytics */}
          <motion.div
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
            }}
            className="absolute -left-10 -top-10 hidden rounded-[32px] border border-white/10 bg-white/[0.04] p-5 shadow-[0_0_50px_rgba(0,0,0,0.4)] backdrop-blur-3xl lg:block"
          >
            <p className="text-sm uppercase tracking-[0.2em] text-[#D8D4CC]/50">
              Completion
            </p>

            <h3 className="mt-3 text-4xl font-bold text-[#F3EBDD]">
              87%
            </h3>

            <div className="mt-5 h-2 w-44 overflow-hidden rounded-full bg-zinc-800">
              <div className="h-full w-[87%] rounded-full bg-linear-to-r from-[#C9732B] via-[#F3EBDD] to-[#1F4A3B]" />
            </div>
          </motion.div>

          {/* Floating Explore */}
          <motion.div
            animate={{
              y: [0, 12, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
            }}
            className="absolute -bottom-8 -right-6 hidden rounded-[32px] border border-white/10 bg-white/[0.04] p-5 shadow-[0_0_50px_rgba(0,0,0,0.4)] backdrop-blur-3xl lg:block"
          >
            <div className="flex items-center gap-3">
              <Globe className="h-5 w-5 text-cyan-400" />

              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-[#D8D4CC]/50">
                  Explore
                </p>

                <h4 className="mt-1 text-lg font-semibold text-[#F3EBDD]">
                  4,200+ Public Forms
                </h4>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}