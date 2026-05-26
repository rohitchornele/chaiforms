"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  Waves,
  BrainCircuit,
  Orbit,
  Play,
  Workflow,
} from "lucide-react";
import { useRef } from "react";

export default function OceanUniverseLanding() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -400]);

  return (
    <main
      ref={containerRef}
      className="relative overflow-hidden bg-[#020617] text-white"
    >
      <motion.div style={{ y: backgroundY }}>
        <OceanBackground />
      </motion.div>

      <Particles />

      <Navbar />

      <HeroScene />

      <AwakeningScene />

      <BuilderTempleScene />

      <DataRiverScene />

      <ThemeRealmScene />

      <PortalScene />
    </main>
  );
}

function Navbar() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-cyan-400/10 bg-[#020617]/30 backdrop-blur-2xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/10">
            <Orbit className="h-6 w-6 text-cyan-300" />
            <div className="absolute inset-0 rounded-2xl shadow-[0_0_50px_rgba(34,211,238,0.5)]" />
          </div>

          <h1 className="text-lg font-black tracking-[0.4em] text-cyan-100">
            NEUROFLOW
          </h1>
        </div>

        <div className="hidden items-center gap-10 lg:flex">
          {[
            "World",
            "Temple",
            "Systems",
            "Realms",
            "Portal",
          ].map((item) => (
            <a
              key={item}
              href="#"
              className="text-sm text-cyan-100/60 transition hover:text-cyan-300"
            >
              {item}
            </a>
          ))}
        </div>

        <button className="rounded-2xl border border-cyan-300/20 bg-cyan-300/10 px-5 py-3 text-sm font-semibold text-cyan-100 transition hover:border-cyan-300/40 hover:bg-cyan-300/20 hover:shadow-[0_0_40px_rgba(34,211,238,0.3)]">
          Enter Universe
        </button>
      </div>
    </header>
  );
}

function HeroScene() {
  return (
    <section className="relative flex min-h-screen items-center justify-center px-6 pt-40">
      <div className="mx-auto grid max-w-7xl gap-24 lg:grid-cols-2 lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
        >
          <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-5 py-3 text-sm text-cyan-100 backdrop-blur-xl">
            <Sparkles className="h-4 w-4 text-cyan-300" />
            Immersive Sci-Fi Workflow Universe
          </div>

          <h1 className="text-6xl font-black leading-[0.95] tracking-tight md:text-8xl">
            The Future
            <span className="block bg-gradient-to-r from-cyan-200 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Evolves Alive
            </span>
          </h1>

          <p className="mt-10 max-w-2xl text-xl leading-9 text-cyan-100/60">
            Enter a cinematic ocean civilization where intelligent forms,
            workflows, themes, and automation systems exist as living entities.
          </p>

          <div className="mt-14 flex flex-wrap gap-5">
            <button className="group flex items-center gap-3 rounded-3xl bg-gradient-to-r from-cyan-300 to-blue-400 px-8 py-5 text-lg font-bold text-slate-900 shadow-[0_0_70px_rgba(34,211,238,0.5)] transition hover:scale-[1.03]">
              Begin Journey
              <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
            </button>

            <button className="flex items-center gap-3 rounded-3xl border border-cyan-300/20 bg-white/5 px-8 py-5 text-lg text-cyan-100 backdrop-blur-xl transition hover:border-cyan-300/40 hover:bg-cyan-300/10">
              <Play className="h-5 w-5" />
              Watch Story
            </button>
          </div>
        </motion.div>

        <HeroWorld />
      </div>
    </section>
  );
}

function HeroWorld() {
  return (
    <div className="relative flex h-[750px] items-center justify-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute h-[600px] w-[600px] rounded-full border border-cyan-300/10"
      />

      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
        className="absolute h-[750px] w-[750px] rounded-full border border-cyan-300/5"
      />

      <motion.div
        animate={{ y: [0, -30, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="relative flex h-72 w-72 items-center justify-center rounded-full border border-cyan-300/20 bg-cyan-300/10 backdrop-blur-3xl shadow-[0_0_120px_rgba(34,211,238,0.4)]"
      >
        <div className="absolute inset-10 rounded-full border border-cyan-300/10" />

        <div className="h-28 w-28 rounded-full bg-cyan-300/40 blur-2xl" />

        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute h-full w-full"
        >
          <FloatingNode icon={BrainCircuit} className="left-0 top-20" />
          <FloatingNode icon={Workflow} className="right-0 top-32" />
          <FloatingNode icon={Waves} className="bottom-10 left-20" />
        </motion.div>
      </motion.div>
    </div>
  );
}

function FloatingNode({
  icon: Icon,
  className,
}: {
  icon: any;
  className: string;
}) {
  return (
    <div
      className={`absolute flex h-20 w-20 items-center justify-center rounded-3xl border border-cyan-300/20 bg-white/5 backdrop-blur-2xl ${className}`}
    >
      <Icon className="h-8 w-8 text-cyan-300" />
    </div>
  );
}

function AwakeningScene() {
  return (
    <section className="relative px-6 py-40">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[60px] border border-cyan-300/10 bg-white/5 p-16 backdrop-blur-3xl">
        <div className="grid gap-20 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.5em] text-cyan-300">
              Awakening
            </p>

            <h2 className="mt-8 text-5xl font-black leading-tight md:text-7xl">
              Intelligent Systems
              <span className="block text-cyan-300">Come Alive</span>
            </h2>

            <p className="mt-10 text-xl leading-9 text-cyan-100/60">
              Every form becomes a living interface connected to an evolving
              neural ocean of intelligent workflows and immersive experiences.
            </p>
          </div>

          <div className="relative h-[500px]">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 6, repeat: Infinity }}
              className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300/20 blur-3xl"
            />

            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={i}
                animate={{ rotate: 360 }}
                transition={{
                  duration: 20 + i * 4,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute inset-0"
              >
                <div
                  className="absolute h-6 w-6 rounded-full bg-cyan-300 shadow-[0_0_30px_rgba(34,211,238,0.8)]"
                  style={{
                    left: `${50 + Math.cos(i) * 40}%`,
                    top: `${50 + Math.sin(i) * 40}%`,
                  }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function BuilderTempleScene() {
  return (
    <section className="relative px-6 py-40">
      <div className="mx-auto max-w-7xl text-center">
        <p className="text-sm uppercase tracking-[0.5em] text-cyan-300">
          The Builder Temple
        </p>

        <h2 className="mt-8 text-5xl font-black leading-tight md:text-7xl">
          Create Through
          <span className="block text-cyan-300">Living Technology</span>
        </h2>
      </div>

      <div className="mx-auto mt-24 grid max-w-7xl gap-10 lg:grid-cols-3">
        {["Neural Forms", "Ocean Workflows", "Energy Analytics"].map(
          (item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ y: -15 }}
              className="group relative h-[500px] overflow-hidden rounded-[50px] border border-cyan-300/10 bg-white/5 p-10 backdrop-blur-3xl"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-cyan-300/10 via-transparent to-blue-500/20 opacity-80" />

              <div className="absolute bottom-0 left-1/2 h-60 w-60 -translate-x-1/2 rounded-full bg-cyan-300/20 blur-3xl transition duration-500 group-hover:scale-150" />

              <div className="relative z-10 flex h-full flex-col justify-between">
                <div>
                  <div className="h-20 w-20 rounded-full bg-cyan-300/20 blur-2xl" />

                  <div className="mt-12 space-y-4">
                    <div className="h-4 rounded-full bg-cyan-300/20" />
                    <div className="h-4 w-2/3 rounded-full bg-cyan-300/20" />
                    <div className="h-20 rounded-3xl bg-cyan-300/10" />
                  </div>
                </div>

                <div>
                  <h3 className="text-4xl font-black text-cyan-100">
                    {item}
                  </h3>

                  <p className="mt-5 text-lg leading-8 text-cyan-100/60">
                    Intelligent interfaces powered by cinematic interaction and
                    organic motion systems.
                  </p>
                </div>
              </div>
            </motion.div>
          )
        )}
      </div>
    </section>
  );
}

function DataRiverScene() {
  return (
    <section className="relative px-6 py-40">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[70px] border border-cyan-300/10 bg-white/5 p-16 backdrop-blur-3xl">
        <div className="grid gap-24 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.5em] text-cyan-300">
              Data Rivers
            </p>

            <h2 className="mt-8 text-5xl font-black leading-tight md:text-7xl">
              Responses Travel
              <span className="block text-cyan-300">Like Energy</span>
            </h2>

            <p className="mt-10 text-xl leading-9 text-cyan-100/60">
              Watch responses move through neural streams, activate workflows,
              trigger AI systems, and evolve into intelligent insights.
            </p>
          </div>

          <div className="relative h-[500px]">
            <div className="absolute left-0 right-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-gradient-to-r from-cyan-300 via-blue-400 to-cyan-300 shadow-[0_0_40px_rgba(34,211,238,0.6)]" />

            {[0, 1, 2, 3].map((item) => (
              <motion.div
                key={item}
                animate={{ x: [0, 500] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  delay: item,
                  ease: "linear",
                }}
                className="absolute left-0 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-cyan-300 shadow-[0_0_30px_rgba(34,211,238,0.8)]"
              />
            ))}

            <RiverNode title="Forms" className="left-0 top-1/2" />
            <RiverNode title="AI" className="left-1/2 top-1/2" />
            <RiverNode title="Analytics" className="right-0 top-1/2" />
          </div>
        </div>
      </div>
    </section>
  );
}

function RiverNode({
  title,
  className,
}: {
  title: string;
  className: string;
}) {
  return (
    <div
      className={`absolute -translate-y-1/2 rounded-3xl border border-cyan-300/10 bg-cyan-300/10 px-8 py-5 text-lg font-semibold text-cyan-100 backdrop-blur-xl ${className}`}
    >
      {title}
    </div>
  );
}

function ThemeRealmScene() {
  return (
    <section className="relative px-6 py-40">
      <div className="mx-auto max-w-7xl text-center">
        <p className="text-sm uppercase tracking-[0.5em] text-cyan-300">
          Theme Realms
        </p>

        <h2 className="mt-8 text-5xl font-black leading-tight md:text-7xl">
          Explore
          <span className="block text-cyan-300">Immersive Worlds</span>
        </h2>
      </div>

      <div className="mx-auto mt-24 grid max-w-7xl gap-8 lg:grid-cols-4">
        {[
          "Ocean Glow",
          "Abyss Core",
          "Crystal Reef",
          "Sky Waters",
        ].map((theme) => (
          <motion.div
            key={theme}
            whileHover={{ y: -15 }}
            className="relative h-[420px] overflow-hidden rounded-[50px] border border-cyan-300/10 bg-white/5 p-8 backdrop-blur-3xl"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-cyan-300/10 via-transparent to-blue-500/20" />

            <div className="absolute bottom-0 left-1/2 h-60 w-60 -translate-x-1/2 rounded-full bg-cyan-300/20 blur-3xl" />

            <div className="relative z-10 flex h-full flex-col justify-between">
              <div className="h-20 w-20 rounded-full bg-cyan-300/20 blur-2xl" />

              <div>
                <h3 className="text-3xl font-black text-cyan-100">
                  {theme}
                </h3>

                <p className="mt-4 leading-8 text-cyan-100/60">
                  Cinematic environments inspired by futuristic intelligent
                  ocean civilizations.
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function PortalScene() {
  return (
    <section className="relative px-6 py-40">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[80px] border border-cyan-300/10 bg-white/5 p-20 text-center backdrop-blur-3xl">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.7, 0.2],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300/20 blur-3xl"
        />

        <div className="relative z-10">
          <p className="text-sm uppercase tracking-[0.5em] text-cyan-300">
            Final Portal
          </p>

          <h2 className="mx-auto mt-10 max-w-5xl text-6xl font-black leading-tight md:text-8xl">
            Enter The
            <span className="block bg-gradient-to-r from-cyan-200 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Ocean Universe
            </span>
          </h2>

          <p className="mx-auto mt-10 max-w-3xl text-xl leading-9 text-cyan-100/60">
            Build immersive forms, intelligent workflows, cinematic themes, and
            living experiences beyond traditional software.
          </p>

          <button className="mt-14 rounded-[30px] bg-gradient-to-r from-cyan-300 to-blue-400 px-12 py-6 text-xl font-black text-slate-900 shadow-[0_0_90px_rgba(34,211,238,0.6)] transition hover:scale-[1.03]">
            Begin Evolution
          </button>
        </div>
      </div>
    </section>
  );
}

function OceanBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute left-[-10%] top-[-10%] h-[700px] w-[700px] rounded-full bg-cyan-300/10 blur-3xl" />
      <div className="absolute bottom-[-20%] right-[-10%] h-[900px] w-[900px] rounded-full bg-blue-500/10 blur-3xl" />
      <div className="absolute left-1/2 top-1/3 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-cyan-300/5 blur-3xl" />
    </div>
  );
}

function Particles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: 50 }).map((_, index) => (
        <motion.div
          key={index}
          animate={{
            y: [0, -120, 0],
            x: [0, 30, 0],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: 6 + index,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute rounded-full bg-cyan-200/20 blur-xl"
          style={{
            width: Math.random() * 12 + 4,
            height: Math.random() * 12 + 4,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </div>
  );
}
