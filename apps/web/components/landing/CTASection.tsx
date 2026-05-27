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

export default function CTASection() {
  return (
    <section className="relative overflow-hidden bg-[#050505] py-32 text-[#F3EBDD]">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Main Glow */}
        <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C9732B]/15 blur-3xl" />

        {/* Side Glow */}
        <div className="absolute left-0 top-0 h-[400px] w-[400px] rounded-full bg-[#1F4A3B]/15 blur-3xl" />

        <div className="absolute bottom-0 right-0 h-[450px] w-[450px] rounded-full bg-violet-500/10 blur-3xl" />

        {/* Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:70px_70px]" />

        {/* Fade */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050505_85%)]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 md:px-8">
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.8,
          }}
          className="relative overflow-hidden rounded-[48px] border border-white/10 bg-white/[0.03] px-6 py-16 shadow-[0_0_80px_rgba(0,0,0,0.4)] backdrop-blur-3xl md:px-14 md:py-24"
        >
          {/* Internal Glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#C9732B]/10 via-transparent to-[#1F4A3B]/10" />

          {/* Decorative Orb */}
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#C9732B]/10 blur-3xl" />

          <div className="relative text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-5 py-2 text-xs uppercase tracking-[0.25em] text-[#D8D4CC]/75 backdrop-blur-xl">
              <Sparkles className="h-4 w-4 text-[#C9732B]" />

              Begin Your Journey
            </div>

            {/* Heading */}
            <h2 className="mx-auto mt-10 max-w-5xl font-serif text-5xl leading-[1] tracking-[-0.05em] md:text-7xl">
              Build Forms
              <br />

              <span className="bg-gradient-to-r from-[#C9732B] via-[#F3EBDD] to-[#1F4A3B] bg-clip-text text-transparent">
                People Actually Enjoy
              </span>
            </h2>

            {/* Description */}
            <p className="mx-auto mt-8 max-w-3xl text-lg leading-relaxed text-[#D8D4CC]/60 md:text-xl">
              Create cinematic experiences with immersive themes, public
              discovery, realtime analytics and intelligent workflows — all
              inside one futuristic creator platform.
            </p>

            {/* CTA Buttons */}
            <div className="mt-14 flex flex-col items-center justify-center gap-4 sm:flex-row">
              {/* Primary */}
              <Link
                href="/dashboard/forms"
                className="group relative overflow-hidden rounded-full border border-[#B56A3C]/30 bg-[#B56A3C]/10 px-8 py-4 text-sm uppercase tracking-[0.2em] text-[#F3EBDD] backdrop-blur-xl transition-all duration-500 hover:border-[#C9732B]/60 hover:bg-[#B56A3C]/20"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Start Creating

                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>

                <div className="absolute inset-0 bg-gradient-to-r from-[#C9732B]/20 via-[#F3EBDD]/10 to-[#1F4A3B]/20 opacity-0 transition duration-500 group-hover:opacity-100" />
              </Link>

              {/* Secondary */}
              <Link
                href="/explore"
                className="rounded-full border border-white/10 bg-white/[0.03] px-8 py-4 text-sm uppercase tracking-[0.2em] text-[#D8D4CC]/80 backdrop-blur-xl transition-all duration-300 hover:bg-white/[0.06]"
              >
                Explore Forms
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-20 grid gap-6 border-t border-white/10 pt-10 md:grid-cols-3">
              {/* Card */}
              <div className="rounded-[28px] border border-white/10 bg-black/30 p-6 text-left">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03]">
                    <Globe className="h-5 w-5 text-cyan-400" />
                  </div>

                  <div>
                    <p className="text-sm uppercase tracking-[0.2em] text-[#D8D4CC]/45">
                      Public Forms
                    </p>

                    <h3 className="mt-1 text-2xl font-bold text-[#F3EBDD]">
                      4,200+
                    </h3>
                  </div>
                </div>
              </div>

              {/* Card */}
              <div className="rounded-[28px] border border-white/10 bg-black/30 p-6 text-left">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03]">
                    <BarChart3 className="h-5 w-5 text-violet-400" />
                  </div>

                  <div>
                    <p className="text-sm uppercase tracking-[0.2em] text-[#D8D4CC]/45">
                      Responses
                    </p>

                    <h3 className="mt-1 text-2xl font-bold text-[#F3EBDD]">
                      1M+
                    </h3>
                  </div>
                </div>
              </div>

              {/* Card */}
              <div className="rounded-[28px] border border-white/10 bg-black/30 p-6 text-left">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03]">
                    <ShieldCheck className="h-5 w-5 text-emerald-400" />
                  </div>

                  <div>
                    <p className="text-sm uppercase tracking-[0.2em] text-[#D8D4CC]/45">
                      Uptime
                    </p>

                    <h3 className="mt-1 text-2xl font-bold text-[#F3EBDD]">
                      99.9%
                    </h3>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Quote */}
            <div className="mt-16">
              <p className="mx-auto max-w-2xl text-sm uppercase tracking-[0.25em] text-[#D8D4CC]/35">
                “Forms are no longer static documents —
                they are immersive digital experiences.”
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}