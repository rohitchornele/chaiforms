"use client";

import Link from "next/link";

import { motion } from "framer-motion";

import {
  Check,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Globe,
  BarChart3,
} from "lucide-react";
import Navbar from "~/components/landing/Navbar";

const plans = [
  {
    name: "Free",
    price: "$0",
    description:
      "Perfect for creators exploring cinematic form experiences.",
    features: [
      "3 active forms",
      "Unlimited responses",
      "Public & unlisted forms",
      "Basic analytics",
      "Community explore access",
      "Basic themes",
    ],
    highlighted: false,
  },

  {
    name: "Pro",
    price: "$19",
    description:
      "Advanced workflows, themes and analytics for modern creators.",
    features: [
      "Unlimited forms",
      "Advanced analytics",
      "Password protection",
      "Custom slugs",
      "CSV export",
      "Premium cinematic themes",
      "Priority support",
      "QR code sharing",
    ],
    highlighted: true,
  },

  {
    name: "Enterprise",
    price: "Custom",
    description:
      "Powerful infrastructure for startups, teams and organizations.",
    features: [
      "Everything in Pro",
      "Dedicated infrastructure",
      "Advanced permissions",
      "SSO & authentication",
      "Custom branding",
      "API access",
      "Priority onboarding",
      "Enterprise support",
    ],
    highlighted: false,
  },
];

export default function PricingPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050505] text-[#F3EBDD]">
        <Navbar />
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Glow */}
        <div className="absolute left-1/2 top-0 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-[#C9732B]/10 blur-3xl" />

        <div className="absolute left-0 top-1/3 h-[400px] w-[400px] rounded-full bg-[#1F4A3B]/10 blur-3xl" />

        <div className="absolute bottom-0 right-0 h-[450px] w-[450px] rounded-full bg-violet-500/10 blur-3xl" />

        {/* Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:70px_70px]" />

        {/* Fade */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050505_85%)]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-32 md:px-8">
        {/* Header */}
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.7,
          }}
          className="mx-auto max-w-4xl text-center"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-5 py-2 text-xs uppercase tracking-[0.25em] text-[#D8D4CC]/75 backdrop-blur-xl">
            <Sparkles className="h-4 w-4 text-[#C9732B]" />

            Pricing Plans
          </div>

          {/* Heading */}
          <h1 className="mt-10 font-serif text-6xl leading-[0.95] tracking-[-0.05em] md:text-8xl">
            Designed For
            <br />

            <span className="bg-gradient-to-r from-[#C9732B] via-[#F3EBDD] to-[#1F4A3B] bg-clip-text text-transparent">
              Every Creator
            </span>
          </h1>

          {/* Description */}
          <p className="mx-auto mt-8 max-w-3xl text-lg leading-relaxed text-[#D8D4CC]/60 md:text-xl">
            Start building immersive form experiences for free and scale with
            advanced analytics, premium themes and enterprise-grade workflows.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="mt-24 grid gap-8 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{
                opacity: 0,
                y: 30,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
                delay: index * 0.08,
              }}
              className={`group relative overflow-hidden rounded-[40px] border p-8 shadow-[0_0_60px_rgba(0,0,0,0.35)] backdrop-blur-3xl transition-all duration-500 hover:-translate-y-1 ${
                plan.highlighted
                  ? "border-[#C9732B]/30 bg-[#B56A3C]/10"
                  : "border-white/10 bg-white/[0.03]"
              }`}
            >
              {/* Glow */}
              <div
                className={`absolute inset-0 opacity-0 transition duration-700 group-hover:opacity-100 ${
                  plan.highlighted
                    ? "bg-gradient-to-br from-[#C9732B]/15 via-transparent to-[#1F4A3B]/15"
                    : "bg-gradient-to-br from-white/[0.03] via-transparent to-[#1F4A3B]/10"
                }`}
              />

              {/* Popular Badge */}
              {plan.highlighted && (
                <div className="absolute right-6 top-6 rounded-full border border-[#C9732B]/30 bg-[#C9732B]/10 px-4 py-2 text-xs uppercase tracking-[0.25em] text-[#F3EBDD]">
                  Most Popular
                </div>
              )}

              <div className="relative">
                {/* Name */}
                <p className="text-sm uppercase tracking-[0.25em] text-[#D8D4CC]/45">
                  {plan.name}
                </p>

                {/* Price */}
                <div className="mt-6 flex items-end gap-2">
                  <h2 className="font-serif text-6xl tracking-tight text-[#F3EBDD]">
                    {plan.price}
                  </h2>

                  {plan.price !== "Custom" && (
                    <span className="mb-2 text-[#D8D4CC]/45">
                      /month
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="mt-6 text-sm leading-relaxed text-[#D8D4CC]/60">
                  {plan.description}
                </p>

                {/* Features */}
                <div className="mt-10 space-y-4">
                  {plan.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-start gap-3"
                    >
                      <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full border border-white/10 bg-black/30">
                        <Check className="h-3.5 w-3.5 text-[#C9732B]" />
                      </div>

                      <span className="text-sm text-[#D8D4CC]/70">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <Link
                  href="/dashboard/forms"
                  className={`group/button mt-12 flex items-center justify-center gap-2 rounded-full border px-6 py-4 text-sm uppercase tracking-[0.2em] transition-all duration-500 ${
                    plan.highlighted
                      ? "border-[#C9732B]/40 bg-[#C9732B]/10 text-[#F3EBDD] hover:bg-[#C9732B]/20"
                      : "border-white/10 bg-white/[0.03] text-[#D8D4CC]/80 hover:bg-white/[0.06]"
                  }`}
                >
                  Get Started

                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/button:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Features */}
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.7,
            delay: 0.3,
          }}
          className="mt-24 grid gap-6 rounded-[40px] border border-white/10 bg-white/[0.03] p-10 shadow-[0_0_60px_rgba(0,0,0,0.35)] backdrop-blur-3xl md:grid-cols-3"
        >
          {/* Item */}
          <div className="rounded-[28px] border border-white/10 bg-black/30 p-6">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03]">
              <ShieldCheck className="h-6 w-6 text-emerald-400" />
            </div>

            <h3 className="mt-6 text-2xl font-semibold text-[#F3EBDD]">
              Secure Infrastructure
            </h3>

            <p className="mt-4 text-sm leading-relaxed text-[#D8D4CC]/60">
              Password-protected forms, secure workflows and scalable cloud
              infrastructure for creators and teams.
            </p>
          </div>

          {/* Item */}
          <div className="rounded-[28px] border border-white/10 bg-black/30 p-6">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03]">
              <Globe className="h-6 w-6 text-cyan-400" />
            </div>

            <h3 className="mt-6 text-2xl font-semibold text-[#F3EBDD]">
              Public Discovery
            </h3>

            <p className="mt-4 text-sm leading-relaxed text-[#D8D4CC]/60">
              Share forms publicly, grow communities and explore immersive
              experiences built by creators worldwide.
            </p>
          </div>

          {/* Item */}
          <div className="rounded-[28px] border border-white/10 bg-black/30 p-6">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03]">
              <BarChart3 className="h-6 w-6 text-violet-400" />
            </div>

            <h3 className="mt-6 text-2xl font-semibold text-[#F3EBDD]">
              Powerful Analytics
            </h3>

            <p className="mt-4 text-sm leading-relaxed text-[#D8D4CC]/60">
              Monitor engagement, completion trends and submission growth
              through beautiful realtime dashboards.
            </p>
          </div>
        </motion.div>
      </div>
    </main>
  );
}