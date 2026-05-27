"use client";

import { motion } from "framer-motion";

import {
  Sparkles,
  ArrowUpRight,
} from "lucide-react";

const themes = [
  {
    title: "Anime Universe",
    category: "Community",
    description:
      "Immersive neon aesthetics inspired by anime fandoms, gaming communities and vibrant digital cultures.",
    gradient:
      "from-pink-500/20 via-violet-500/10 to-cyan-500/20",
  },

  {
    title: "Sacred Future",
    category: "Premium",
    description:
      "Ancient intelligence meets futuristic systems with cinematic sacred-tech visuals and ambient gold lighting.",
    gradient:
      "from-[#C9732B]/20 via-[#F3EBDD]/10 to-[#1F4A3B]/20",
  },

  {
    title: "Startup OS",
    category: "Business",
    description:
      "Minimal operating-system inspired layouts designed for product launches, startups and modern SaaS teams.",
    gradient:
      "from-zinc-500/20 via-white/5 to-cyan-500/20",
  },

  {
    title: "Cyber Arena",
    category: "Gaming",
    description:
      "High-energy cyberpunk experiences built for esports events, gaming tournaments and digital competitions.",
    gradient:
      "from-cyan-500/20 via-violet-500/10 to-pink-500/20",
  },

  {
    title: "Avengers Protocol",
    category: "Cinematic",
    description:
      "Bold holographic interfaces inspired by advanced tactical systems and cinematic hero universes.",
    gradient:
      "from-red-500/20 via-amber-500/10 to-cyan-500/20",
  },

  {
    title: "Avatar Oceans",
    category: "Immersive",
    description:
      "Organic glowing ecosystems inspired by bioluminescent worlds, nature-tech harmony and fluid interactions.",
    gradient:
      "from-cyan-500/20 via-emerald-500/10 to-blue-500/20",
  },
];

export default function ThemesSection() {
  return (
    <section className="relative overflow-hidden bg-[#050505] py-32 text-[#F3EBDD]">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Glow */}
        <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[#C9732B]/10 blur-3xl" />

        <div className="absolute bottom-0 right-0 h-[450px] w-[450px] rounded-full bg-violet-500/10 blur-3xl" />

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

            Cinematic Themes
          </div>

          <h2 className="mt-8 font-serif text-5xl leading-tight tracking-[-0.04em] md:text-7xl">
            Forms With
            <br />

            <span className="bg-gradient-to-r from-[#C9732B] via-[#F3EBDD] to-[#1F4A3B] bg-clip-text text-transparent">
              Distinct Identity
            </span>
          </h2>

          <p className="mt-8 text-lg leading-relaxed text-[#D8D4CC]/60 md:text-xl">
            ChaiForms allows creators to transform ordinary forms into cinematic
            experiences inspired by communities, worlds, startups, games and
            futuristic cultures.
          </p>
        </motion.div>

        {/* Themes Grid */}
        <div className="mt-24 grid gap-6 lg:grid-cols-3">
          {themes.map((theme, index) => (
            <motion.div
              key={theme.title}
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
              className="group relative overflow-hidden rounded-[36px] border border-white/10 bg-white/[0.03] p-6 shadow-[0_0_50px_rgba(0,0,0,0.35)] backdrop-blur-3xl transition-all duration-500 hover:-translate-y-1 hover:border-[#C9732B]/20"
            >
              {/* Gradient Glow */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${theme.gradient} opacity-70`}
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40" />

              {/* Decorative Orb */}
              <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-white/5 blur-3xl" />

              {/* Content */}
              <div className="relative">
                {/* Category */}
                <div className="inline-flex items-center rounded-full border border-white/10 bg-black/30 px-4 py-2 text-xs uppercase tracking-[0.25em] text-[#D8D4CC]/70">
                  {theme.category}
                </div>

                {/* Mock Preview */}
                <div className="mt-8 overflow-hidden rounded-[28px] border border-white/10 bg-black/30 p-5">
                  <div className="flex items-center justify-between">
                    <div className="h-3 w-28 rounded-full bg-white/20" />

                    <div className="h-3 w-12 rounded-full bg-[#C9732B]/50" />
                  </div>

                  <div className="mt-6 space-y-4">
                    {[1, 2, 3].map((item) => (
                      <div
                        key={item}
                        className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                      >
                        <div className="h-2 w-20 rounded-full bg-white/20" />

                        <div className="mt-4 h-10 rounded-xl border border-white/10 bg-black/30" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Title */}
                <div className="mt-8 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-3xl font-semibold tracking-tight text-[#F3EBDD]">
                      {theme.title}
                    </h3>

                    <p className="mt-4 text-sm leading-relaxed text-[#D8D4CC]/60">
                      {theme.description}
                    </p>
                  </div>

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-black/30 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1">
                    <ArrowUpRight className="h-5 w-5 text-[#C9732B]" />
                  </div>
                </div>

                {/* Decorative Line */}
                <div className="mt-8 h-px w-full overflow-hidden bg-white/5">
                  <div className="h-full w-0 bg-gradient-to-r from-[#C9732B] via-[#F3EBDD] to-[#1F4A3B] transition-all duration-700 group-hover:w-full" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Showcase */}
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
          className="relative mt-24 overflow-hidden rounded-[40px] border border-white/10 bg-white/[0.03] p-10 shadow-[0_0_60px_rgba(0,0,0,0.35)] backdrop-blur-3xl"
        >
          {/* Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#C9732B]/10 via-transparent to-[#1F4A3B]/10" />

          <div className="relative text-center">
            <h3 className="font-serif text-4xl tracking-tight text-[#F3EBDD] md:text-5xl">
              Forms Should Feel Memorable
            </h3>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-[#D8D4CC]/60">
              ChaiForms reimagines forms as immersive experiences — allowing
              creators to express identity, atmosphere and emotion through
              cinematic themes and futuristic interfaces.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}