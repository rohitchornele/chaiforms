// "use client";

// import { motion } from "framer-motion";
// import {
//   ArrowRight,
//   Circle,
//   Layers3,
//   Sparkles,
//   Orbit,
//   PanelTop,
//   Workflow,
//   ShieldCheck,
// } from "lucide-react";

// const features = [
//   {
//     icon: Layers3,
//     title: "Sacred Form Architecture",
//     desc: "Craft intelligent forms through ceremonial layouts, radial systems, and immersive interaction flows.",
//   },
//   {
//     icon: Orbit,
//     title: "Observatory Analytics",
//     desc: "Track submissions through celestial-inspired data systems with concentric analytical visualization.",
//   },
//   {
//     icon: Workflow,
//     title: "Cosmic Workflows",
//     desc: "Build deeply connected automation pathways through elegant intelligent orchestration.",
//   },
//   {
//     icon: ShieldCheck,
//     title: "Temple Grade Security",
//     desc: "Enterprise-grade infrastructure protected through encrypted ceremonial intelligence systems.",
//   },
// ];

// const templates = [
//   "Moonlit Marble",
//   "Himalayan Observatory",
//   "Sacred Copper",
//   "Emerald Palace",
// ];

// export default function SacredIndiaLandingPage() {
//   return (
//     <main className="relative overflow-hidden bg-[#0B0B0C] text-[#F3EBDD]">
//       <Atmosphere />

//       <section className="relative flex min-h-screen items-center justify-center px-6 py-32 lg:px-12">
//         <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">
//           <motion.div
//             initial={{ opacity: 0, y: 40 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 1.2 }}
//             className="relative z-10"
//           >
//             <div className="mb-6 flex items-center gap-3">
//               <div className="h-px w-16 bg-gradient-to-r from-[#C9732B] to-transparent" />
//               <span className="text-sm uppercase tracking-[0.4em] text-[#D8D4CC]/70">
//                 Sacred Intelligence System
//               </span>
//             </div>

//             <h1 className="max-w-4xl font-serif text-6xl leading-[0.95] tracking-[-0.04em] text-[#F3EBDD] md:text-7xl lg:text-8xl">
//               Architecting
//               <span className="block text-[#D8D4CC]">
//                 Intelligent Forms
//               </span>
//               <span className="block bg-gradient-to-r from-[#C9732B] via-[#F3EBDD] to-[#1F4A3B] bg-clip-text text-transparent">
//                 Through Sacred Precision
//               </span>
//             </h1>

//             <p className="mt-8 max-w-2xl text-lg leading-8 text-[#D8D4CC]/70 md:text-xl">
//               A cinematic form infrastructure inspired by observatory geometry,
//               Himalayan atmosphere, palace architecture, and intelligent cosmic systems.
//             </p>

//             <div className="mt-12 flex flex-wrap gap-5">
//               <button className="group relative overflow-hidden rounded-full border border-[#B56A3C]/30 bg-[#B56A3C]/10 px-8 py-4 text-sm uppercase tracking-[0.25em] text-[#F3EBDD] backdrop-blur-xl transition-all duration-500 hover:border-[#C9732B]/60 hover:bg-[#B56A3C]/20">
//                 <span className="relative z-10 flex items-center gap-3">
//                   Begin Experience
//                   <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
//                 </span>
//               </button>

//               <button className="rounded-full border border-white/10 bg-white/[0.03] px-8 py-4 text-sm uppercase tracking-[0.25em] text-[#D8D4CC]/80 backdrop-blur-xl transition-all duration-500 hover:bg-white/[0.06]">
//                 View Observatory
//               </button>
//             </div>
//           </motion.div>

//           <HeroDashboard />
//         </div>
//       </section>

//       <section className="relative px-6 py-32 lg:px-12">
//         <div className="mx-auto max-w-7xl">
//           <div className="mb-20 text-center">
//             <p className="mb-4 text-sm uppercase tracking-[0.4em] text-[#C9732B]">
//               Ceremonial Infrastructure
//             </p>

//             <h2 className="font-serif text-5xl leading-tight tracking-[-0.03em] md:text-6xl">
//               Built Like A Sacred
//               <span className="block text-[#D8D4CC]">
//                 Technological Ecosystem
//               </span>
//             </h2>
//           </div>

//           <div className="grid gap-8 md:grid-cols-2">
//             {features.map((feature, i) => {
//               const Icon = feature.icon;

//               return (
//                 <motion.div
//                   key={feature.title}
//                   initial={{ opacity: 0, y: 40 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.8, delay: i * 0.1 }}
//                   viewport={{ once: true }}
//                   whileHover={{ y: -6 }}
//                   className="group relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.03] p-10 backdrop-blur-2xl"
//                 >
//                   <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(201,115,43,0.18),transparent_60%)] opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

//                   <div className="relative z-10">
//                     <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#B56A3C]/20 bg-[#B56A3C]/10 text-[#C9732B]">
//                       <Icon className="h-8 w-8" />
//                     </div>

//                     <h3 className="mb-4 font-serif text-3xl tracking-[-0.02em]">
//                       {feature.title}
//                     </h3>

//                     <p className="max-w-md leading-8 text-[#D8D4CC]/70">
//                       {feature.desc}
//                     </p>
//                   </div>
//                 </motion.div>
//               );
//             })}
//           </div>
//         </div>
//       </section>

//       <section className="relative px-6 py-32 lg:px-12">
//         <div className="mx-auto grid max-w-7xl items-center gap-20 lg:grid-cols-2">
//           <div>
//             <p className="mb-4 text-sm uppercase tracking-[0.4em] text-[#C9732B]">
//               Observatory Analytics
//             </p>

//             <h2 className="font-serif text-5xl leading-tight tracking-[-0.03em] md:text-6xl">
//               Celestial Intelligence
//               <span className="block text-[#D8D4CC]">
//                 Designed Through Geometry
//               </span>
//             </h2>

//             <p className="mt-8 max-w-xl text-lg leading-8 text-[#D8D4CC]/70">
//               Observe user behavior through radial systems inspired by ancient astronomical instruments and sacred mathematical alignment.
//             </p>
//           </div>

//           <AnalyticsOrb />
//         </div>
//       </section>

//       <section className="relative px-6 py-32 lg:px-12">
//         <div className="mx-auto max-w-7xl rounded-[40px] border border-white/10 bg-white/[0.03] p-10 backdrop-blur-2xl lg:p-16">
//           <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
//             <div>
//               <p className="mb-4 text-sm uppercase tracking-[0.4em] text-[#C9732B]">
//                 Living Form Themes
//               </p>

//               <h2 className="font-serif text-5xl leading-tight tracking-[-0.03em] md:text-6xl">
//                 Cinematic Themes
//                 <span className="block text-[#D8D4CC]">
//                   Crafted Like Environments
//                 </span>
//               </h2>

//               <p className="mt-8 max-w-lg text-lg leading-8 text-[#D8D4CC]/70">
//                 Every form transforms into an immersive ceremonial experience with intelligent atmospheric identity systems.
//               </p>
//             </div>

//             <div className="grid gap-6 md:grid-cols-2">
//               {templates.map((template, i) => (
//                 <motion.div
//                   key={template}
//                   initial={{ opacity: 0, y: 30 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.7, delay: i * 0.1 }}
//                   viewport={{ once: true }}
//                   whileHover={{ scale: 1.02 }}
//                   className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-[#151515]/80 p-8"
//                 >
//                   <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(201,115,43,0.16),transparent_60%)] opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

//                   <div className="relative z-10 flex h-56 flex-col justify-between rounded-[24px] border border-white/10 bg-gradient-to-b from-white/[0.06] to-transparent p-6">
//                     <div className="flex items-center justify-between">
//                       <Circle className="h-5 w-5 text-[#C9732B]" />
//                       <Sparkles className="h-5 w-5 text-[#D8D4CC]/50" />
//                     </div>

//                     <div>
//                       <h3 className="font-serif text-3xl">{template}</h3>
//                       <p className="mt-2 text-sm text-[#D8D4CC]/60">
//                         Intelligent ceremonial UI environment.
//                       </p>
//                     </div>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       <section className="relative px-6 py-32 lg:px-12">
//         <div className="mx-auto max-w-5xl text-center">
//           <p className="mb-4 text-sm uppercase tracking-[0.4em] text-[#C9732B]">
//             Enter The Observatory
//           </p>

//           <h2 className="font-serif text-5xl leading-tight tracking-[-0.03em] md:text-7xl">
//             Build Software Through
//             <span className="block bg-gradient-to-r from-[#C9732B] via-[#F3EBDD] to-[#1F4A3B] bg-clip-text text-transparent">
//               Cosmic Architectural Intelligence
//             </span>
//           </h2>

//           <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-[#D8D4CC]/70">
//             Create immersive forms, observatory analytics, ceremonial workflows, and intelligent systems inside a sacred futuristic ecosystem.
//           </p>

//           <div className="mt-12 flex justify-center">
//             <button className="group relative overflow-hidden rounded-full border border-[#B56A3C]/30 bg-[#B56A3C]/10 px-10 py-5 text-sm uppercase tracking-[0.3em] text-[#F3EBDD] backdrop-blur-xl transition-all duration-500 hover:border-[#C9732B]/60 hover:bg-[#B56A3C]/20">
//               <span className="relative z-10 flex items-center gap-3">
//                 Begin The Journey
//                 <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
//               </span>
//             </button>
//           </div>
//         </div>
//       </section>
//     </main>
//   );
// }

// function Atmosphere() {
//   return (
//     <div className="pointer-events-none absolute inset-0 overflow-hidden">
//       <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(201,115,43,0.14),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(31,74,59,0.16),transparent_30%),linear-gradient(180deg,#0B0B0C_0%,#111214_45%,#0D0E10_100%)]" />

//       <motion.div
//         animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.1, 1] }}
//         transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
//         className="absolute left-[-10%] top-[5%] h-[600px] w-[600px] rounded-full bg-[#C9732B]/10 blur-[140px]"
//       />

//       <motion.div
//         animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.08, 1] }}
//         transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
//         className="absolute bottom-[-15%] right-[-10%] h-[700px] w-[700px] rounded-full bg-[#1F4A3B]/10 blur-[180px]"
//       />

//       <div className="absolute inset-0 opacity-[0.04] [background-image:radial-gradient(#ffffff_0.5px,transparent_0.5px)] [background-size:32px_32px]" />
//     </div>
//   );
// }

// function HeroDashboard() {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 40 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 1.2, delay: 0.2 }}
//       className="relative flex items-center justify-center"
//     >
//       <motion.div
//         animate={{ rotate: 360 }}
//         transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
//         className="absolute h-[650px] w-[650px] rounded-full border border-[#B56A3C]/10"
//       />

//       <motion.div
//         animate={{ rotate: -360 }}
//         transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
//         className="absolute h-[500px] w-[500px] rounded-full border border-[#F3EBDD]/10"
//       />

//       <motion.div
//         animate={{ y: [-12, 12, -12] }}
//         transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
//         className="relative w-full max-w-xl overflow-hidden rounded-[36px] border border-white/10 bg-white/[0.05] p-6 shadow-[0_0_120px_rgba(201,115,43,0.08)] backdrop-blur-3xl"
//       >
//         <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(201,115,43,0.18),transparent_60%)]" />

//         <div className="relative z-10 space-y-6">
//           <div className="flex items-center justify-between border-b border-white/10 pb-5">
//             <div>
//               <p className="text-xs uppercase tracking-[0.3em] text-[#D8D4CC]/60">
//                 Sacred Builder
//               </p>
//               <h3 className="mt-2 font-serif text-3xl">
//                 Observatory Form System
//               </h3>
//             </div>

//             <PanelTop className="h-8 w-8 text-[#C9732B]" />
//           </div>

//           <div className="grid gap-4">
//             <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
//               <div className="mb-3 flex items-center gap-3">
//                 <div className="h-3 w-3 rounded-full bg-[#C9732B]" />
//                 <div className="h-px flex-1 bg-gradient-to-r from-[#C9732B]/40 to-transparent" />
//               </div>

//               <div className="space-y-3">
//                 <div className="h-10 rounded-xl border border-white/10 bg-white/[0.04]" />
//                 <div className="h-10 rounded-xl border border-white/10 bg-white/[0.04]" />
//               </div>
//             </div>

//             <div className="grid grid-cols-2 gap-4">
//               <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
//                 <p className="text-sm text-[#D8D4CC]/60">Conversion</p>
//                 <h4 className="mt-3 font-serif text-4xl">92%</h4>
//               </div>

//               <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
//                 <p className="text-sm text-[#D8D4CC]/60">Submissions</p>
//                 <h4 className="mt-3 font-serif text-4xl">18K</h4>
//               </div>
//             </div>
//           </div>
//         </div>
//       </motion.div>
//     </motion.div>
//   );
// }

// function AnalyticsOrb() {
//   return (
//     <div className="relative flex h-[550px] items-center justify-center">
//       <motion.div
//         animate={{ rotate: 360 }}
//         transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
//         className="absolute h-[500px] w-[500px] rounded-full border border-[#C9732B]/20"
//       />

//       <motion.div
//         animate={{ rotate: -360 }}
//         transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
//         className="absolute h-[380px] w-[380px] rounded-full border border-[#F3EBDD]/10"
//       />

//       <motion.div
//         animate={{ rotate: 360 }}
//         transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
//         className="absolute h-[260px] w-[260px] rounded-full border border-[#1F4A3B]/20"
//       />

//       <div className="absolute h-[120px] w-[120px] rounded-full bg-[#C9732B]/20 blur-[60px]" />

//       <motion.div
//         animate={{ y: [-10, 10, -10] }}
//         transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
//         className="relative z-10 flex h-44 w-44 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-2xl"
//       >
//         <div className="text-center">
//           <p className="text-sm uppercase tracking-[0.3em] text-[#D8D4CC]/60">
//             Celestial
//           </p>
//           <h3 className="mt-2 font-serif text-5xl">∞</h3>
//         </div>
//       </motion.div>
//     </div>
//   );
// }







// GTA style landing page


"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Shield,
  BarChart3,
  Users,
  FileText,
  Radio,
  Lock,
  Star,
} from "lucide-react";

const features = [
  {
    title: "Live Intel",
    desc: "Track every response in real time before the streets cool down.",
    icon: <BarChart3 size={28} />,
    stamp: "TRACKED",
  },
  {
    title: "Crew Access",
    desc: "Invite your whole crew and manage permissions like a boss.",
    icon: <Users size={28} />,
    stamp: "CLASSIFIED",
  },
  {
    title: "Secure Vault",
    desc: "Your data stays locked tighter than a downtown safehouse.",
    icon: <Lock size={28} />,
    stamp: "PROTECTED",
  },
  {
    title: "Mission Forms",
    desc: "Create forms for events, jobs, surveys, registrations and more.",
    icon: <FileText size={28} />,
    stamp: "ACTIVE",
  },
];

const templates = [
  {
    title: "VIP Guest List",
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Crew Recruitment",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Street Racing Entry",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Anonymous Tips",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
  },
];

const testimonials = [
  {
    text: "Collected 12K leads in one week. Absolute madness.",
    author: "Vice Operations",
  },
  {
    text: "Best underground form network in the city.",
    author: "Downtown Syndicate",
  },
  {
    text: "Finally a form builder with personality.",
    author: "Liberty Crew",
  },
];

const pricing = [
  {
    title: "Starter Crew",
    price: "$19",
    color: "border-cyan-400",
  },
  {
    title: "Empire Tier",
    price: "$49",
    color: "border-pink-500",
  },
  {
    title: "Cartel Tier",
    price: "$99",
    color: "border-yellow-400",
  },
];

export default function GTALandingPage() {
  return (
    <main className="bg-black text-white overflow-hidden">
      {/* ================= HERO ================= */}
      <section className="relative min-h-screen border-b border-white/10">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1519501025264-65ba15a82390?q=80&w=2000&auto=format&fit=crop"
            alt="city"
            className="w-full h-full object-cover opacity-40"
          />

          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black" />

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#ff4da633,transparent_40%)]" />

          <div className="absolute inset-0 opacity-20 mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]" />
        </div>

        {/* NAVBAR */}
        <nav className="relative z-20 flex items-center justify-between px-6 md:px-12 py-6">
          <div>
            <h1 className="text-4xl uppercase tracking-tight">
              <span className="font-black text-white">FORM</span>
              <span className="text-pink-500 italic ml-1 font-bold">
                Mafia
              </span>
            </h1>
          </div>

          <div className="hidden md:flex gap-10 text-sm uppercase tracking-[0.2em] font-semibold">
            <a href="#">Operations</a>
            <a href="#">Templates</a>
            <a href="#">Intel</a>
            <a href="#">Pricing</a>
          </div>

          <button className="bg-pink-500 hover:bg-pink-400 transition px-5 py-3 uppercase font-black text-sm tracking-wider">
            Start Mission
          </button>
        </nav>

        {/* HERO CONTENT */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-10 md:pt-20 grid lg:grid-cols-2 gap-10 items-center">
          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="uppercase text-pink-400 tracking-[0.3em] mb-4 font-bold">
              Information Is Power
            </p>

            <h1 className="leading-[0.9] uppercase">
              <span className="block text-[4rem] md:text-[7rem] font-black text-white">
                Build
              </span>

              <span className="block text-[4rem] md:text-[7rem] font-black text-white">
                Forms.
              </span>

              <span className="block text-[4rem] md:text-[7rem] italic text-pink-500 rotate-[-2deg]">
                Rule
              </span>

              <span className="block text-[4rem] md:text-[7rem] italic text-cyan-400 rotate-[-2deg]">
                The City.
              </span>
            </h1>

            <p className="mt-8 text-lg text-zinc-300 max-w-xl leading-relaxed">
              The underground network for collecting leads, registrations,
              surveys and responses with GTA-inspired cinematic energy.
            </p>

            <div className="flex flex-wrap gap-4 mt-10">
              <button className="bg-pink-500 hover:bg-pink-400 transition px-8 py-4 uppercase font-black flex items-center gap-2">
                Start The Mission
                <ArrowRight size={18} />
              </button>

              <button className="border border-white/30 hover:border-cyan-400 hover:text-cyan-400 transition px-8 py-4 uppercase font-black">
                View Templates
              </button>
            </div>

            {/* Radio */}
            <div className="mt-10 bg-black/60 border border-pink-500/30 p-5 max-w-md backdrop-blur">
              <div className="flex items-center gap-3 mb-3">
                <Radio className="text-pink-400" />
                <span className="uppercase tracking-[0.3em] text-sm text-pink-400 font-bold">
                  Police Scanner
                </span>
              </div>

              <p className="text-zinc-300 text-sm">
                “New response captured. All units stand by.”
              </p>
            </div>
          </motion.div>

          {/* RIGHT PANEL */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: 3 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="relative border border-pink-500/30 bg-black/70 backdrop-blur-md p-6 rotate-[-2deg] shadow-[0_0_60px_rgba(255,0,128,0.2)]">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <p className="uppercase text-xs tracking-[0.3em] text-pink-400">
                    Mission Status
                  </p>

                  <h3 className="text-5xl font-black mt-2">24,786</h3>

                  <p className="text-green-400 font-bold mt-1">
                    +12.4% THIS WEEK
                  </p>
                </div>

                <Shield className="text-cyan-400" size={50} />
              </div>

              <div className="space-y-4">
                {[
                  "VIP Guest List",
                  "Event Registration",
                  "Underground Survey",
                  "Crew Recruitment",
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center border border-white/10 bg-white/5 p-4"
                  >
                    <div>
                      <p className="font-bold uppercase">{item}</p>

                      <p className="text-zinc-400 text-sm">
                        Responses incoming...
                      </p>
                    </div>

                    <span className="text-green-400 font-black">
                      ACTIVE
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <p className="uppercase text-pink-400 tracking-[0.3em] text-sm mb-3">
                  Heat Level
                </p>

                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className={`h-4 flex-1 ${
                        i <= 4 ? "bg-pink-500" : "bg-zinc-700"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="relative py-24 bg-[#111]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="mb-16">
            <p className="uppercase text-pink-500 tracking-[0.3em] text-sm mb-3 font-bold">
              Operations Network
            </p>

            <h2 className="text-5xl md:text-7xl uppercase font-black">
              Why Crews
              <span className="text-cyan-400"> Choose Us</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                whileHover={{ y: -10, rotate: -1 }}
                key={index}
                className="relative bg-[#efe5d2] text-black p-8 min-h-[320px] border-4 border-black"
              >
                <div className="mb-6">{feature.icon}</div>

                <h3 className="text-3xl uppercase font-black leading-none">
                  {feature.title}
                </h3>

                <p className="mt-5 text-zinc-700 leading-relaxed">
                  {feature.desc}
                </p>

                <div className="absolute bottom-6 right-6 rotate-[-12deg] border-2 border-pink-500 text-pink-500 px-3 py-1 font-black">
                  {feature.stamp}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TEMPLATES ================= */}
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex justify-between items-end mb-16">
            <div>
              <p className="uppercase text-cyan-400 tracking-[0.3em] text-sm mb-3 font-bold">
                Available Missions
              </p>

              <h2 className="text-5xl md:text-7xl uppercase font-black">
                Form
                <span className="text-pink-500"> Templates</span>
              </h2>
            </div>

            <button className="hidden md:flex items-center gap-2 uppercase font-black text-pink-400">
              Explore All
              <ArrowRight size={18} />
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {templates.map((template, index) => (
              <motion.div
                whileHover={{ y: -8 }}
                key={index}
                className="group relative overflow-hidden border border-white/10"
              >
                <div className="relative h-[420px] overflow-hidden">
                  <img
                    src={template.image}
                    alt={template.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                  <div className="absolute bottom-0 p-6">
                    <p className="uppercase text-xs tracking-[0.3em] text-cyan-400 mb-3">
                      Mission Template
                    </p>

                    <h3 className="text-3xl font-black uppercase leading-none">
                      {template.title}
                    </h3>

                    <button className="mt-5 text-pink-400 uppercase font-bold">
                      Use Template →
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className="py-24 bg-[#111]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="mb-16">
            <p className="uppercase text-pink-500 tracking-[0.3em] text-sm mb-3 font-bold">
              Street Reputation
            </p>

            <h2 className="text-5xl md:text-7xl uppercase font-black">
              What The Streets Say
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-[#efe5d2] text-black p-8 border-4 border-black rotate-[-1deg]"
              >
                <div className="flex gap-1 text-pink-500 mb-6">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} fill="currentColor" size={20} />
                  ))}
                </div>

                <p className="text-xl font-bold leading-relaxed">
                  "{testimonial.text}"
                </p>

                <p className="mt-6 uppercase font-black text-zinc-700">
                  — {testimonial.author}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PRICING ================= */}
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="mb-16 text-center">
            <p className="uppercase text-pink-500 tracking-[0.3em] text-sm mb-3 font-bold">
              Choose Your Crew
            </p>

            <h2 className="text-5xl md:text-7xl uppercase font-black">
              Pricing Plans
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {pricing.map((plan, index) => (
              <motion.div
                whileHover={{ y: -10 }}
                key={index}
                className={`bg-[#111] border-2 ${plan.color} p-10`}
              >
                <p className="uppercase tracking-[0.3em] text-sm text-zinc-400">
                  Crew Package
                </p>

                <h3 className="text-5xl font-black uppercase mt-4">
                  {plan.title}
                </h3>

                <div className="mt-8 flex items-end gap-2">
                  <span className="text-7xl font-black">{plan.price}</span>
                  <span className="text-zinc-400 mb-3">/month</span>
                </div>

                <ul className="mt-10 space-y-4 text-zinc-300">
                  <li>✔ Unlimited Forms</li>
                  <li>✔ Live Analytics</li>
                  <li>✔ Crew Collaboration</li>
                  <li>✔ Premium Templates</li>
                </ul>

                <button className="w-full mt-10 bg-pink-500 hover:bg-pink-400 transition py-4 uppercase font-black">
                  Join The Crew
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=2000&auto=format&fit=crop"
            alt="city"
            className="w-full h-full object-cover opacity-30"
          />

          <div className="absolute inset-0 bg-black/70" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
          <p className="uppercase text-cyan-400 tracking-[0.3em] mb-4 font-bold">
            Ready To Take Over?
          </p>

          <h2 className="text-6xl md:text-8xl font-black uppercase leading-[0.9]">
            Your Mission
            <span className="block text-pink-500 italic">
              Starts Here
            </span>
          </h2>

          <p className="mt-8 text-zinc-300 text-xl leading-relaxed">
            Build cinematic forms, collect responses and run your city like a
            legend.
          </p>

          <button className="mt-10 bg-pink-500 hover:bg-pink-400 transition px-10 py-5 uppercase font-black text-lg">
            Start The Mission
          </button>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-white/10 py-10 bg-black">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between gap-6">
          <h2 className="text-4xl uppercase">
            <span className="font-black">FORM</span>
            <span className="text-pink-500 italic ml-1">Mafia</span>
          </h2>

          <p className="text-zinc-500 uppercase text-sm tracking-[0.2em]">
            Run The City's Data Flow © 2026
          </p>
        </div>
      </footer>
    </main>
  );
}