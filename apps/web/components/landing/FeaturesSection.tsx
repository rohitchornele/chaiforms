"use client";

import { motion } from "framer-motion";

import {
  Sparkles,
  Globe,
  ShieldCheck,
  BarChart3,
  Layers3,
  QrCode,
  LockKeyhole,
  Wand2,
} from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "Cinematic Themes",
    description:
      "Transform ordinary forms into immersive experiences inspired by anime, startups, games, sacred-tech aesthetics and futuristic worlds.",
  },

  {
    icon: Globe,
    title: "Public Explore",
    description:
      "Publish forms to the community explore page and allow anyone to discover, open and submit responses instantly.",
  },

  {
    icon: ShieldCheck,
    title: "Protected Access",
    description:
      "Secure sensitive forms with password protection, unlisted visibility and advanced access control workflows.",
  },

  {
    icon: BarChart3,
    title: "Realtime Analytics",
    description:
      "Track response growth, engagement metrics and completion trends through beautiful analytics dashboards.",
  },

  {
    icon: Layers3,
    title: "Dynamic Builder",
    description:
      "Create flexible schemas with validations, required fields, custom logic and intelligent submission handling.",
  },

  {
    icon: QrCode,
    title: "QR Sharing",
    description:
      "Generate instant QR codes and public links for events, communities, startups and real-world campaigns.",
  },

  {
    icon: LockKeyhole,
    title: "Privacy Controls",
    description:
      "Choose between public, unlisted and private modes to control exactly how your forms are discovered.",
  },

  {
    icon: Wand2,
    title: "Creative Experiences",
    description:
      "Design forms that feel less like surveys and more like immersive digital experiences people enjoy filling.",
  },
];

export default function FeaturesSection() {
  return (
    <section
      id="features"
      className="relative overflow-hidden bg-[#050505] py-32 text-[#F3EBDD]"
    >
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Glow */}
        <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[#C9732B]/10 blur-3xl" />

        <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-violet-500/10 blur-3xl" />

        {/* Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:70px_70px]" />

        {/* Fade */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050505_85%)]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 md:px-8">
        {/* Header */}
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
          className="mx-auto max-w-3xl text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-5 py-2 text-xs uppercase tracking-[0.25em] text-[#D8D4CC]/75 backdrop-blur-xl">
            <Sparkles className="h-4 w-4 text-[#C9732B]" />

            Platform Features
          </div>

          <h2 className="mt-8 font-serif text-5xl leading-tight tracking-[-0.04em] md:text-7xl">
            Built For
            <br />

            <span className="bg-gradient-to-r from-[#C9732B] via-[#F3EBDD] to-[#1F4A3B] bg-clip-text text-transparent">
              Modern Creators
            </span>
          </h2>

          <p className="mt-8 text-lg leading-relaxed text-[#D8D4CC]/60 md:text-xl">
            ChaiForms combines cinematic design, intelligent workflows and
            scalable infrastructure into a next-generation form platform.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="mt-24 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
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
                  duration: 0.7,
                  delay: index * 0.05,
                }}
                className="group relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.03] p-6 shadow-[0_0_40px_rgba(0,0,0,0.35)] backdrop-blur-2xl transition-all duration-500 hover:-translate-y-1 hover:border-[#C9732B]/20 hover:bg-white/[0.05]"
              >
                {/* Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#C9732B]/0 via-transparent to-[#1F4A3B]/0 opacity-0 transition duration-700 group-hover:from-[#C9732B]/10 group-hover:to-[#1F4A3B]/10 group-hover:opacity-100" />

                {/* Icon */}
                <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-black/30">
                  <Icon className="h-6 w-6 text-[#C9732B]" />
                </div>

                {/* Content */}
                <div className="relative mt-8">
                  <h3 className="text-2xl font-semibold tracking-tight text-[#F3EBDD]">
                    {feature.title}
                  </h3>

                  <p className="mt-4 text-sm leading-relaxed text-[#D8D4CC]/60">
                    {feature.description}
                  </p>
                </div>

                {/* Decorative Line */}
                <div className="relative mt-8 h-px w-full overflow-hidden bg-white/5">
                  <div className="absolute inset-y-0 left-0 w-0 bg-gradient-to-r from-[#C9732B] via-[#F3EBDD] to-[#1F4A3B] transition-all duration-700 group-hover:w-full" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Statement */}
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
          className="mt-24 rounded-[40px] border border-white/10 bg-white/[0.03] p-10 text-center shadow-[0_0_60px_rgba(0,0,0,0.35)] backdrop-blur-3xl"
        >
          <h3 className="font-serif text-4xl tracking-tight text-[#F3EBDD] md:text-5xl">
            More Than Just A Form Builder
          </h3>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-[#D8D4CC]/60">
            ChaiForms is designed as a complete creator platform — combining
            immersive experiences, intelligent workflows, public discovery and
            scalable infrastructure into a unified sacred-tech ecosystem.
          </p>
        </motion.div>
      </div>
    </section>
  );
}