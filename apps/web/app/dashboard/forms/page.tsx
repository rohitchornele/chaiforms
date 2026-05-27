// "use client";

// import { useMemo, useState } from "react";

// import { useListForm } from "~/hooks/api/form";

// import type { Form } from "~/types/form";

// import FormsToolbar from "~/components/forms/FormsToolbar";

// import FormGrid from "~/components/forms/FormGrid";

// import CreateFormModal from "~/components/forms/CreateFormModal";

// type FilterType = "all" | "published" | "draft" | "archive";

// export default function FormsPage() {
//   const [open, setOpen] = useState(false);

//   const [search, setSearch] = useState("");

//   const [filter, setFilter] = useState<FilterType>("all");

//   const {
//     forms,

//     isLoading,

//     isFetching,

//     error,
//   } = useListForm();

//   const filteredForms = useMemo(() => {
//     return (forms as Form[])?.filter((form) => {
//       const title = form.title?.toLowerCase() || "";

//       const description = form.description?.toLowerCase() || "";

//       const status = form.status?.toLowerCase() || "";

//       const matchesSearch =
//         title.includes(search.toLowerCase()) || description.includes(search.toLowerCase());

//       const matchesFilter = filter === "all" ? true : status === filter;

//       return matchesSearch && matchesFilter;
//     });
//   }, [forms, search, filter]);

//   return (
//     <>
//       <div className="flex flex-1 flex-col gap-6">
//         {/* Toolbar */}
//         <FormsToolbar
//           search={search}
//           setSearch={setSearch}
//           filter={filter}
//           setFilter={setFilter}
//           count={filteredForms?.length || 0}
//           onCreate={() => setOpen(true)}
//           isFetching={isFetching}
//           isLoading={isLoading}
//         />

//         {/* Grid */}
//         <div className="min-h-0 flex-1">
//           <FormGrid
//             forms={filteredForms || []}
//             isLoading={isLoading}
//             error={error}
//             onCreate={() => setOpen(true)}
//           />
//         </div>
//       </div>

//       <CreateFormModal open={open} onClose={() => setOpen(false)} />
//     </>
//   );
// }

"use client";

import { useMemo, useState } from "react";

import { Sparkles, LayoutGrid, Globe, FileText, Loader2 } from "lucide-react";

import { useListForm } from "~/hooks/api/form";

import type { Form } from "~/types/form";

import FormsToolbar from "~/components/forms/FormsToolbar";

import FormGrid from "~/components/forms/FormGrid";

import CreateFormModal from "~/components/forms/CreateFormModal";

type FilterType = "all" | "published" | "draft" | "archive";

export default function FormsPage() {
  const [open, setOpen] = useState(false);

  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState<FilterType>("all");

  const { forms, isLoading, isFetching, error } = useListForm();

  const filteredForms = useMemo(() => {
    return (forms as Form[])?.filter((form) => {
      const title = form.title?.toLowerCase() || "";

      const description = form.description?.toLowerCase() || "";

      const status = form.status?.toLowerCase() || "";

      const matchesSearch =
        title.includes(search.toLowerCase()) || description.includes(search.toLowerCase());

      const matchesFilter = filter === "all" ? true : status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [forms, search, filter]);

  const totalForms = filteredForms?.length || 0;

  const publishedCount = filteredForms?.filter((f) => f.status === "PUBLISHED").length || 0;

  const draftCount = filteredForms?.filter((f) => f.status === "DRAFT").length || 0;

  return (
    <>
      <div className="flex flex-col gap-8">
        {/* HERO */}
        <section className="relative overflow-hidden rounded-[40px] border border-white/10 bg-white/[0.03] p-6 shadow-[0_0_80px_rgba(0,0,0,0.45)] backdrop-blur-3xl md:p-10">
          {/* Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(201,115,43,0.15),transparent_30%)]" />

          {/* Content */}
          <div className="relative z-10 flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
            {/* LEFT */}
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#C9732B]/20 bg-[#C9732B]/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-[#F3EBDD]">
                <Sparkles className="h-3.5 w-3.5" />
                Creator Workspace
              </div>

              <h1 className="mt-6 text-4xl font-black tracking-tight text-white md:text-6xl">
                Build immersive forms.
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/60 md:text-lg">
                Manage your forms, track engagement, and design cinematic experiences for your
                audience.
              </p>
            </div>

            {/* RIGHT STATS */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:w-[480px]">
              {/* Total */}
              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-white/50">Total Forms</p>

                    <h3 className="mt-3 text-4xl font-black text-white">{totalForms}</h3>
                  </div>

                  <div className="rounded-2xl bg-white/[0.04] p-3">
                    <LayoutGrid className="h-5 w-5 text-white/70" />
                  </div>
                </div>
              </div>

              {/* Published */}
              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-white/50">Published</p>

                    <h3 className="mt-3 text-4xl font-black text-emerald-300">{publishedCount}</h3>
                  </div>

                  <div className="rounded-2xl bg-emerald-500/10 p-3">
                    <Globe className="h-5 w-5 text-emerald-300" />
                  </div>
                </div>
              </div>

              {/* Drafts */}
              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-white/50">Drafts</p>

                    <h3 className="mt-3 text-4xl font-black text-amber-300">{draftCount}</h3>
                  </div>

                  <div className="rounded-2xl bg-amber-500/10 p-3">
                    <FileText className="h-5 w-5 text-amber-300" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TOOLBAR */}
        <div className="rounded-[32px] border border-white/10 bg-white/[0.03] p-4 shadow-[0_0_60px_rgba(0,0,0,0.35)] backdrop-blur-3xl">
          <FormsToolbar
            search={search}
            setSearch={setSearch}
            filter={filter}
            setFilter={setFilter}
            count={filteredForms?.length || 0}
            onCreate={() => setOpen(true)}
            isFetching={isFetching}
            isLoading={isLoading}
          />
        </div>

        {/* LOADING */}
        {isLoading && (
          <div className="flex min-h-[300px] items-center justify-center rounded-[40px] border border-white/10 bg-white/[0.03] backdrop-blur-3xl">
            <Loader2 className="h-7 w-7 animate-spin text-white/60" />
          </div>
        )}

        {/* GRID */}
        {!isLoading && (
          <div className="min-h-0 flex-1">
            <FormGrid
              forms={filteredForms || []}
              isLoading={isLoading}
              error={error}
              onCreate={() => setOpen(true)}
            />
          </div>
        )}
      </div>

      {/* MODAL */}
      <CreateFormModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
