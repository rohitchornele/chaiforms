"use client";

import { motion } from "framer-motion";

import {
  BarChart3,
  TrendingUp,
  Activity,
  Users,
  ArrowUpRight,
} from "lucide-react";

const analytics = [
  {
    label: "Total Responses",
    value: "1,284,392",
    growth: "+18.4%",
  },

  {
    label: "Completion Rate",
    value: "87%",
    growth: "+6.2%",
  },

  {
    label: "Public Forms",
    value: "4,200+",
    growth: "+12.1%",
  },

  {
    label: "Active Creators",
    value: "18K+",
    growth: "+24.9%",
  },
];

export default function AnalyticsSection() {
  return (
    <section
      id="analytics"
      className="relative overflow-hidden bg-[#050505] py-32 text-[#F3EBDD]"
    >
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Glow */}
        <div className="absolute left-0 top-1/3 h-[450px] w-[450px] rounded-full bg-[#1F4A3B]/15 blur-3xl" />

        <div className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-[#C9732B]/10 blur-3xl" />

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
            <BarChart3 className="h-4 w-4 text-[#C9732B]" />

            Analytics Intelligence
          </div>

          <h2 className="mt-8 font-serif text-5xl leading-tight tracking-[-0.04em] md:text-7xl">
            Insights From
            <br />

            <span className="bg-gradient-to-r from-[#C9732B] via-[#F3EBDD] to-[#1F4A3B] bg-clip-text text-transparent">
              Every Submission
            </span>
          </h2>

          <p className="mt-8 text-lg leading-relaxed text-[#D8D4CC]/60 md:text-xl">
            Track engagement, monitor completion trends and understand how
            communities interact with your forms through beautiful realtime
            analytics.
          </p>
        </motion.div>

        {/* Main Analytics Layout */}
        <div className="mt-24 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          {/* Large Chart Card */}
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
            className="relative overflow-hidden rounded-[40px] border border-white/10 bg-white/[0.03] p-8 shadow-[0_0_60px_rgba(0,0,0,0.35)] backdrop-blur-3xl"
          >
            {/* Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#C9732B]/5 via-transparent to-[#1F4A3B]/10" />

            {/* Header */}
            <div className="relative flex items-start justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-[#D8D4CC]/45">
                  Response Activity
                </p>

                <h3 className="mt-3 text-3xl font-semibold tracking-tight text-[#F3EBDD]">
                  Growth Overview
                </h3>
              </div>

              <div className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-xs uppercase tracking-[0.25em] text-emerald-400">
                Live
              </div>
            </div>

            {/* Chart Mock */}
            <div className="relative mt-14">
              <div className="flex h-[320px] items-end gap-4">
                {[35, 52, 48, 66, 74, 58, 92, 86, 110, 98, 128, 142].map(
                  (height, index) => (
                    <motion.div
                      key={index}
                      initial={{
                        height: 0,
                      }}
                      whileInView={{
                        height,
                      }}
                      viewport={{
                        once: true,
                      }}
                      transition={{
                        duration: 0.8,
                        delay: index * 0.05,
                      }}
                      className="relative flex-1 overflow-hidden rounded-t-3xl bg-gradient-to-t from-[#1F4A3B] via-[#C9732B] to-[#F3EBDD]"
                    >
                      <div className="absolute inset-0 bg-white/10" />
                    </motion.div>
                  )
                )}
              </div>

              {/* Labels */}
              <div className="mt-6 flex justify-between text-xs uppercase tracking-[0.2em] text-[#D8D4CC]/40">
                {[
                  "Jan",
                  "Feb",
                  "Mar",
                  "Apr",
                  "May",
                  "Jun",
                  "Jul",
                  "Aug",
                  "Sep",
                  "Oct",
                  "Nov",
                  "Dec",
                ].map((month) => (
                  <span key={month}>{month}</span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Side Cards */}
          <div className="grid gap-6">
            {analytics.map((item, index) => (
              <motion.div
                key={item.label}
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
                  delay: index * 0.08,
                }}
                className="group relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.03] p-6 shadow-[0_0_40px_rgba(0,0,0,0.3)] backdrop-blur-3xl transition-all duration-500 hover:-translate-y-1 hover:border-[#C9732B]/20"
              >
                {/* Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#C9732B]/0 via-transparent to-[#1F4A3B]/0 opacity-0 transition duration-700 group-hover:from-[#C9732B]/10 group-hover:to-[#1F4A3B]/10 group-hover:opacity-100" />

                <div className="relative flex items-start justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.2em] text-[#D8D4CC]/45">
                      {item.label}
                    </p>

                    <h3 className="mt-5 text-4xl font-bold tracking-tight text-[#F3EBDD]">
                      {item.value}
                    </h3>
                  </div>

                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-black/30">
                    <TrendingUp className="h-5 w-5 text-[#C9732B]" />
                  </div>
                </div>

                <div className="relative mt-8 flex items-center gap-2 text-sm text-emerald-400">
                  <ArrowUpRight className="h-4 w-4" />

                  {item.growth} this month
                </div>
              </motion.div>
            ))}

            {/* Bottom Live Card */}
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
                delay: 0.3,
              }}
              className="relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-[#C9732B]/10 via-black/40 to-[#1F4A3B]/20 p-6 shadow-[0_0_50px_rgba(0,0,0,0.35)] backdrop-blur-3xl"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-black/30">
                  <Activity className="h-6 w-6 text-emerald-400" />
                </div>

                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-[#D8D4CC]/45">
                    Live Activity
                  </p>

                  <h3 className="mt-2 text-2xl font-semibold text-[#F3EBDD]">
                    128 submissions in the last hour
                  </h3>
                </div>
              </div>

              <div className="mt-8 flex items-center gap-3 rounded-2xl border border-white/10 bg-black/30 px-5 py-4">
                <Users className="h-5 w-5 text-[#C9732B]" />

                <p className="text-sm text-[#D8D4CC]/65">
                  Thousands of creators actively collecting responses across
                  public and private forms.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}