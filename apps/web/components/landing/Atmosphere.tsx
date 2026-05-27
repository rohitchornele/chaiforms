"use client";

import { motion } from "framer-motion";

export default function Atmosphere() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      {/* Base Background */}
      <div className="absolute inset-0 bg-[#050505]" />

      {/* Main Sacred Glow */}
      <motion.div
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.18, 0.25, 0.18],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-1/2 top-[10%] h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-[#C9732B] blur-3xl"
      />

      {/* Emerald Orb */}
      <motion.div
        animate={{
          y: [0, -30, 0],
          opacity: [0.12, 0.18, 0.12],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-[-120px] top-[35%] h-[500px] w-[500px] rounded-full bg-[#1F4A3B] blur-3xl"
      />

      {/* Violet Orb */}
      <motion.div
        animate={{
          y: [0, 40, 0],
          opacity: [0.08, 0.14, 0.08],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute right-[-100px] top-[20%] h-[450px] w-[450px] rounded-full bg-violet-500 blur-3xl"
      />

      {/* Cyan Orb */}
      <motion.div
        animate={{
          x: [0, 30, 0],
          opacity: [0.05, 0.1, 0.05],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-[-120px] left-[25%] h-[400px] w-[400px] rounded-full bg-cyan-500 blur-3xl"
      />

      {/* Sacred Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:70px_70px]" />

      {/* Radial Fade */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050505_85%)]" />

      {/* Noise Texture */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-soft-light [background-image:url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* Floating Light Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({
          length: 25,
        }).map((_, index) => (
          <motion.div
            key={index}
            animate={{
              y: [0, -80, 0],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration:
                8 +
                index * 0.4,
              repeat: Infinity,
              delay:
                index * 0.3,
              ease: "easeInOut",
            }}
            className="absolute h-1 w-1 rounded-full bg-white"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Sacred Beam */}
      <motion.div
        animate={{
          opacity: [0.04, 0.08, 0.04],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
        }}
        className="absolute left-1/2 top-0 h-screen w-[1px] -translate-x-1/2 bg-gradient-to-b from-[#C9732B] via-transparent to-transparent"
      />
    </div>
  );
}