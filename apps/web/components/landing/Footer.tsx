"use client";

import Link from "next/link";

import { motion } from "framer-motion";

import {
  Sparkles,
  Github,
  Twitter,
  Globe,
  ArrowUpRight,
} from "lucide-react";

const footerLinks = [
  {
    title: "Platform",
    links: [
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
        href: "/pricing",
      },
    ],
  },

  {
    title: "Resources",
    links: [
      {
        label: "Documentation",
        href: "/docs",
      },

      {
        label: "API Reference",
        href: "/api-docs",
      },

      {
        label: "Themes",
        href: "/themes",
      },

      {
        label: "Templates",
        href: "/templates",
      },
    ],
  },

  {
    title: "Company",
    links: [
      {
        label: "About",
        href: "/about",
      },

      {
        label: "Contact",
        href: "/contact",
      },

      {
        label: "Privacy",
        href: "/privacy",
      },

      {
        label: "Terms",
        href: "/terms",
      },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#050505] text-[#F3EBDD]">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Glow */}
        <div className="absolute left-1/2 top-0 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-[#C9732B]/10 blur-3xl" />

        <div className="absolute bottom-0 right-0 h-[350px] w-[350px] rounded-full bg-[#1F4A3B]/10 blur-3xl" />

        {/* Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:70px_70px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-20 md:px-8">
        {/* Top */}
        <div className="grid gap-14 lg:grid-cols-[1.2fr_0.8fr]">
          {/* Brand */}
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.7,
            }}
          >
            {/* Logo */}
            <Link
              href="/"
              className="group relative inline-block"
            >
              <div className="absolute inset-0 rounded-full bg-[#C9732B]/20 blur-xl transition-opacity duration-500 group-hover:opacity-100" />

              <h2 className="relative font-serif text-4xl tracking-[-0.03em] text-[#F3EBDD]">
                Chai
                <span className="bg-gradient-to-r from-[#C9732B] via-[#F3EBDD] to-[#1F4A3B] bg-clip-text text-transparent">
                  Forms
                </span>
              </h2>
            </Link>

            {/* Description */}
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-[#D8D4CC]/60">
              ChaiForms is a next-generation cinematic form platform designed
              for creators, communities, startups and immersive digital
              experiences.
            </p>

            {/* Tags */}
            <div className="mt-8 flex flex-wrap gap-3">
              {[
                "Dynamic Forms",
                "Public Explore",
                "Analytics",
                "Themes",
                "Protected Forms",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs uppercase tracking-[0.2em] text-[#D8D4CC]/65"
                >
                  {item}
                </div>
              ))}
            </div>

            {/* Socials */}
            <div className="mt-10 flex items-center gap-4">
              {[
                {
                  icon: Github,
                  href: "https://github.com",
                },

                {
                  icon: Twitter,
                  href: "https://twitter.com",
                },

                {
                  icon: Globe,
                  href: "/explore",
                },
              ].map((item, index) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={index}
                    href={item.href}
                    className="group flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] transition-all duration-300 hover:border-[#C9732B]/20 hover:bg-white/[0.05]"
                  >
                    <Icon className="h-5 w-5 text-[#D8D4CC]/65 transition-colors duration-300 group-hover:text-[#F3EBDD]" />
                  </Link>
                );
              })}
            </div>
          </motion.div>

          {/* Links */}
          <div className="grid gap-10 sm:grid-cols-3">
            {footerLinks.map(
              (section, index) => (
                <motion.div
                  key={section.title}
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    duration: 0.7,
                    delay: index * 0.05,
                  }}
                >
                  <h3 className="text-sm uppercase tracking-[0.25em] text-[#D8D4CC]/45">
                    {section.title}
                  </h3>

                  <div className="mt-6 flex flex-col gap-4">
                    {section.links.map((link) => (
                      <Link
                        key={link.label}
                        href={link.href}
                        className="group inline-flex items-center gap-2 text-sm text-[#D8D4CC]/65 transition-colors duration-300 hover:text-[#F3EBDD]"
                      >
                        {link.label}

                        <ArrowUpRight className="h-4 w-4 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100" />
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )
            )}
          </div>
        </div>

        {/* Middle Statement */}
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.7,
            delay: 0.2,
          }}
          className="mt-20 overflow-hidden rounded-[36px] border border-white/10 bg-white/[0.03] p-8 shadow-[0_0_40px_rgba(0,0,0,0.3)] backdrop-blur-3xl"
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-4 py-2 text-xs uppercase tracking-[0.25em] text-[#D8D4CC]/65">
                <Sparkles className="h-4 w-4 text-[#C9732B]" />

                Sacred-Tech Platform
              </div>

              <h3 className="mt-5 font-serif text-4xl tracking-tight text-[#F3EBDD]">
                Build The Future Of Forms
              </h3>

              <p className="mt-4 max-w-2xl text-[#D8D4CC]/60">
                Designed for immersive experiences, intelligent workflows and
                creator-first digital interactions.
              </p>
            </div>

            <Link
              href="/dashboard/forms"
              className="group inline-flex items-center justify-center gap-2 rounded-full border border-[#B56A3C]/30 bg-[#B56A3C]/10 px-7 py-4 text-sm uppercase tracking-[0.2em] text-[#F3EBDD] backdrop-blur-xl transition-all duration-500 hover:border-[#C9732B]/60 hover:bg-[#B56A3C]/20"
            >
              Launch Platform

              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </div>
        </motion.div>

        {/* Bottom */}
        <div className="mt-16 flex flex-col gap-6 border-t border-white/10 pt-8 text-sm text-[#D8D4CC]/40 md:flex-row md:items-center md:justify-between">
          <p>
            © 2026 ChaiForms. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="transition-colors duration-300 hover:text-[#F3EBDD]"
            >
              Privacy
            </Link>

            <Link
              href="/terms"
              className="transition-colors duration-300 hover:text-[#F3EBDD]"
            >
              Terms
            </Link>

            <Link
              href="/api-docs"
              className="transition-colors duration-300 hover:text-[#F3EBDD]"
            >
              API Docs
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}