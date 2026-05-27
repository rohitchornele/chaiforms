"use client";

import Link from "next/link";

import { motion } from "framer-motion";

import {
  Globe,
  Loader2,
  FileText,
  ArrowUpRight,
  Sparkles,
  Search,
  TrendingUp,
} from "lucide-react";

import { useEffect, useState } from "react";

import Navbar from "~/components/landing/Navbar";

import { useListPublicForms } from "~/hooks/api/form";

export default function ExplorePage() {
  const LIMIT = 12;

  const [page, setPage] = useState(1);

  const [allForms, setAllForms] =
    useState<any[]>([]);

  const {
    forms,
    isLoading,
    isFetching,
  } =
    useListPublicForms(
      page,
      LIMIT
    );

  useEffect(() => {
    if (forms) {
      setAllForms((prev) => {
        const existingIds =
          new Set(
            prev.map(
              (item) => item.id
            )
          );

        const newForms =
          forms.filter(
            (item) =>
              !existingIds.has(
                item.id
              )
          );

        return [
          ...prev,
          ...newForms,
        ];
      });
    }
  }, [forms]);

  if (
    isLoading &&
    allForms.length === 0
  ) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#050505]">
        <Loader2 className="h-6 w-6 animate-spin text-[#F3EBDD]" />
      </div>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050505] text-[#F3EBDD]">
      {/* Navbar */}
      <Navbar />

      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Glow */}
        <div className="absolute left-1/2 top-0 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-[#C9732B]/10 blur-3xl" />

        <div className="absolute left-0 top-1/3 h-[450px] w-[450px] rounded-full bg-[#1F4A3B]/10 blur-3xl" />

        <div className="absolute bottom-0 right-0 h-[450px] w-[450px] rounded-full bg-violet-500/10 blur-3xl" />

        {/* Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:70px_70px]" />

        {/* Fade */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050505_85%)]" />
      </div>

      {/* Hero */}
      <section className="relative pt-40">
        <div className="mx-auto max-w-7xl px-4 pb-20 md:px-8">
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

              Community Explore
            </div>

            {/* Heading */}
            <h1 className="mt-10 font-serif text-6xl leading-[0.95] tracking-[-0.05em] md:text-8xl">
              Discover
              <br />

              <span className="bg-gradient-to-r from-[#C9732B] via-[#F3EBDD] to-[#1F4A3B] bg-clip-text text-transparent">
                Public Experiences
              </span>
            </h1>

            {/* Description */}
            <p className="mx-auto mt-8 max-w-3xl text-lg leading-relaxed text-[#D8D4CC]/60 md:text-xl">
              Explore cinematic forms,
              immersive communities,
              startup surveys, fandom
              experiences and futuristic
              workflows created by
              creators worldwide.
            </p>

            {/* Search */}
            <div className="mx-auto mt-12 max-w-2xl">
              <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-6 py-4 shadow-[0_0_40px_rgba(0,0,0,0.3)] backdrop-blur-3xl">
                <Search className="h-5 w-5 text-[#D8D4CC]/40" />

                <input
                  type="text"
                  placeholder="Search immersive public forms..."
                  className="w-full bg-transparent text-sm text-[#F3EBDD] outline-none placeholder:text-[#D8D4CC]/35"
                />
              </div>
            </div>

            {/* Stats */}
            <div className="mt-16 grid gap-6 md:grid-cols-3">
              {[
                {
                  label:
                    "Public Forms",
                  value: "4,200+",
                },

                {
                  label:
                    "Submissions",
                  value: "1M+",
                },

                {
                  label:
                    "Creators",
                  value: "18K+",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6 shadow-[0_0_40px_rgba(0,0,0,0.25)] backdrop-blur-3xl"
                >
                  <p className="text-sm uppercase tracking-[0.2em] text-[#D8D4CC]/45">
                    {item.label}
                  </p>

                  <h3 className="mt-4 text-4xl font-bold text-[#F3EBDD]">
                    {item.value}
                  </h3>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Forms */}
      <section className="relative pb-24">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          {allForms.length === 0 ? (
            <div className="flex min-h-[50vh] flex-col items-center justify-center rounded-[40px] border border-white/10 bg-white/[0.03] p-10 text-center shadow-[0_0_60px_rgba(0,0,0,0.35)] backdrop-blur-3xl">
              <Globe className="h-20 w-20 text-[#D8D4CC]/20" />

              <h2 className="mt-8 font-serif text-4xl text-[#F3EBDD]">
                No Public Forms Yet
              </h2>

              <p className="mt-4 max-w-lg text-[#D8D4CC]/60">
                Once creators publish
                immersive public forms,
                they will appear here
                for the community to
                discover and explore.
              </p>
            </div>
          ) : (
            <>
              {/* Section Header */}
              <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.25em] text-[#D8D4CC]/45">
                    Trending Experiences
                  </p>

                  <h2 className="mt-4 font-serif text-5xl tracking-tight text-[#F3EBDD]">
                    Featured Public Forms
                  </h2>
                </div>

                <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 text-sm text-[#D8D4CC]/60 backdrop-blur-3xl">
                  <TrendingUp className="h-4 w-4 text-[#C9732B]" />

                  Updated in realtime
                </div>
              </div>

              {/* Grid */}
              <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                {allForms.map(
                  (
                    form,
                    index
                  ) => (
                    <motion.div
                      key={form.id}
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
                        delay:
                          index *
                          0.05,
                      }}
                    >
                      <Link
                        href={`/form/public/${form.slug}`}
                        target="_blank"
                        className="group relative block overflow-hidden rounded-[36px] border border-white/10 bg-white/[0.03] p-6 shadow-[0_0_50px_rgba(0,0,0,0.35)] backdrop-blur-3xl transition-all duration-500 hover:-translate-y-1 hover:border-[#C9732B]/20"
                      >
                        {/* Glow */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[#C9732B]/0 via-transparent to-[#1F4A3B]/0 opacity-0 transition duration-700 group-hover:from-[#C9732B]/10 group-hover:to-[#1F4A3B]/10 group-hover:opacity-100" />

                        {/* Decorative Orb */}
                        <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-white/5 blur-3xl" />

                        <div className="relative">
                          {/* Top */}
                          <div className="flex items-center justify-between">
                            <div className="rounded-full border border-[#C9732B]/20 bg-[#C9732B]/10 px-4 py-2 text-xs uppercase tracking-[0.25em] text-[#F3EBDD]">
                              Public
                            </div>

                            <span className="text-xs uppercase tracking-[0.2em] text-[#D8D4CC]/40">
                              {new Date(
                                form.createdAt
                              ).toLocaleDateString()}
                            </span>
                          </div>

                          {/* Mock Preview */}
                          <div className="mt-8 overflow-hidden rounded-[28px] border border-white/10 bg-black/30 p-5">
                            <div className="flex items-center justify-between">
                              <div className="h-3 w-28 rounded-full bg-white/20" />

                              <div className="h-3 w-12 rounded-full bg-[#C9732B]/50" />
                            </div>

                            <div className="mt-6 space-y-4">
                              {[1, 2].map(
                                (
                                  item
                                ) => (
                                  <div
                                    key={
                                      item
                                    }
                                    className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                                  >
                                    <div className="h-2 w-20 rounded-full bg-white/20" />

                                    <div className="mt-4 h-10 rounded-xl border border-white/10 bg-black/30" />
                                  </div>
                                )
                              )}
                            </div>
                          </div>

                          {/* Title */}
                          <h2 className="mt-8 text-3xl font-semibold tracking-tight text-[#F3EBDD] transition-colors duration-300 group-hover:text-white">
                            {form.title}
                          </h2>

                          {/* Description */}
                          {form.description && (
                            <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-[#D8D4CC]/60">
                              {
                                form.description
                              }
                            </p>
                          )}

                          {/* Footer */}
                          <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-6">
                            <div className="flex items-center gap-2 text-sm text-[#D8D4CC]/55">
                              <FileText className="h-4 w-4 text-[#C9732B]" />

                              {
                                form.responseCount
                              }{" "}
                              responses
                            </div>

                            <div className="flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-[#F3EBDD] transition-transform duration-300 group-hover:translate-x-1">
                              Open

                              <ArrowUpRight className="h-4 w-4" />
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  )
                )}
              </div>

              {/* Load More */}
              {forms &&
                forms.length ===
                  LIMIT && (
                  <div className="mt-16 flex justify-center">
                    <button
                      onClick={() =>
                        setPage(
                          (
                            prev
                          ) =>
                            prev +
                            1
                        )
                      }
                      disabled={
                        isFetching
                      }
                      className="group relative overflow-hidden rounded-full border border-[#B56A3C]/30 bg-[#B56A3C]/10 px-8 py-4 text-sm uppercase tracking-[0.2em] text-[#F3EBDD] backdrop-blur-xl transition-all duration-500 hover:border-[#C9732B]/60 hover:bg-[#B56A3C]/20 disabled:opacity-50"
                    >
                      <span className="relative z-10 flex items-center gap-3">
                        {isFetching ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />

                            Loading
                            Experiences
                          </>
                        ) : (
                          <>
                            Explore More

                            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                          </>
                        )}
                      </span>

                      <div className="absolute inset-0 bg-gradient-to-r from-[#C9732B]/20 via-[#F3EBDD]/10 to-[#1F4A3B]/20 opacity-0 transition duration-500 group-hover:opacity-100" />
                    </button>
                  </div>
                )}
            </>
          )}
        </div>
      </section>
    </main>
  );
}