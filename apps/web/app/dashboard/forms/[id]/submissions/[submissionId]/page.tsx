"use client";

import Link from "next/link";

import { useParams } from "next/navigation";

import { ArrowLeft, Loader2, AlertCircle, Sparkles, Calendar, FileText } from "lucide-react";

import { motion } from "framer-motion";

import { useGetFormAndField, useGetFormSubmissions } from "~/hooks/api/form";

export default function SubmissionDetailPage() {
  const params = useParams();

  const formId = params.id as string;

  const submissionId = params.submissionId as string;

  const { form, isLoading: formLoading, error: formError } = useGetFormAndField(formId);

  const {
    submissions,
    isLoading: submissionsLoading,
    error: submissionsError,
  } = useGetFormSubmissions(formId);

  const isLoading = formLoading || submissionsLoading;

  const error = formError || submissionsError;

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#050505]">
        <div className="flex items-center gap-4 rounded-3xl border border-white/10 bg-white/[0.03] px-6 py-5 backdrop-blur-3xl">
          <Loader2 className="h-5 w-5 animate-spin text-white/60" />

          <p className="text-sm font-medium text-white/70">Loading submission...</p>
        </div>
      </div>
    );
  }

  if (error || !form || !submissions) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#050505] p-4">
        <div className="w-full max-w-md rounded-[32px] border border-red-500/20 bg-red-500/5 p-6 backdrop-blur-3xl">
          <div className="flex items-center gap-3 text-red-300">
            <AlertCircle className="h-6 w-6" />

            <h2 className="text-lg font-semibold">{error?.message || "Submission not found"}</h2>
          </div>
        </div>
      </div>
    );
  }

  const submission = submissions.find((item) => item.submissionId === submissionId);

  if (!submission) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#050505] p-4">
        <div className="w-full max-w-md rounded-[32px] border border-red-500/20 bg-red-500/5 p-6 backdrop-blur-3xl">
          <div className="flex items-center gap-3 text-red-300">
            <AlertCircle className="h-6 w-6" />

            <h2 className="text-lg font-semibold">Submission not found</h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050505] text-white">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Glow */}
        <div className="absolute left-[-10%] top-[-10%] h-[500px] w-[500px] rounded-full bg-[#C9732B]/20 blur-[140px]" />

        <div className="absolute bottom-[-20%] right-[-10%] h-[500px] w-[500px] rounded-full bg-[#1F4A3B]/20 blur-[140px]" />

        {/* Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:70px_70px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl p-4 md:p-8">
        {/* HERO */}
        <section className="relative overflow-hidden rounded-[40px] border border-white/10 bg-white/[0.03] p-6 shadow-[0_0_80px_rgba(0,0,0,0.45)] backdrop-blur-3xl md:p-10">
          {/* Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(201,115,43,0.15),transparent_30%)]" />

          <div className="relative z-10 flex flex-col gap-8 xl:flex-row xl:items-center xl:justify-between">
            {/* LEFT */}
            <div>
              <Link
                href={`/dashboard/forms/${formId}/submissions`}
                className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-white/50 transition hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to submissions
              </Link>

              <div className="inline-flex items-center gap-2 rounded-full border border-[#C9732B]/20 bg-[#C9732B]/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-[#F3EBDD]">
                <Sparkles className="h-3.5 w-3.5" />
                Audience Response
              </div>

              <h1 className="mt-6 text-5xl font-black tracking-tight text-white md:text-6xl">
                Submission
                <br />
                Details
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/55">
                Review audience responses collected through your immersive form experience.
              </p>
            </div>

            {/* RIGHT */}
            <div className="flex flex-col gap-4">
              {/* Status */}
              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-2xl">
                <p className="mb-3 text-sm text-white/45">Submission Status</p>

                <StatusBadge status={submission.status} />
              </div>

              {/* Date */}
              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-2xl">
                <div className="flex items-start gap-4">
                  <div className="rounded-2xl bg-[#C9732B]/10 p-3 text-[#F3EBDD]">
                    <Calendar className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="text-sm text-white/45">Submitted At</p>

                    <h2 className="mt-2 text-lg font-semibold text-white">
                      {new Date(submission.createdAt).toLocaleString()}
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ANSWERS */}
        <div className="mt-8 space-y-6">
          {form.fields.map((field, index) => {
            const value = submission.responses[field.fieldId];

            return (
              <motion.div
                key={field.fieldId}
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: index * 0.05,
                }}
                className="
                    relative
                    overflow-hidden
                    rounded-[32px]
                    border
                    border-white/10
                    bg-white/[0.03]
                    p-6
                    shadow-[0_0_50px_rgba(0,0,0,0.35)]
                    backdrop-blur-3xl
                  "
              >
                {/* Glow */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(201,115,43,0.08),transparent_35%)]" />

                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-start gap-4">
                    <div className="rounded-2xl bg-[#C9732B]/10 p-3 text-[#F3EBDD]">
                      <FileText className="h-5 w-5" />
                    </div>

                    <div className="flex-1">
                      <h2 className="text-xl font-bold tracking-tight text-white">{field.label}</h2>

                      {field.description && (
                        <p className="mt-2 text-sm leading-relaxed text-white/45">
                          {field.description}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Value */}
                  <div className="mt-6 rounded-3xl border border-white/10 bg-black/20 p-5">
                    <p className="whitespace-pre-wrap break-words text-sm leading-relaxed text-white/75">
                      {value || "-"}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

type StatusProps = {
  status: "PENDING" | "COMPLETED" | "REJECTED" | "SPAM";
};

function StatusBadge({ status }: StatusProps) {
  const styles = {
    PENDING: "border-amber-500/20 bg-amber-500/10 text-amber-300",

    COMPLETED: "border-emerald-500/20 bg-emerald-500/10 text-emerald-300",

    REJECTED: "border-red-500/20 bg-red-500/10 text-red-300",

    SPAM: "border-zinc-500/20 bg-zinc-500/10 text-zinc-300",
  };

  return (
    <span
      className={`inline-flex rounded-full border px-4 py-2 text-sm font-semibold ${styles[status]}`}
    >
      {status}
    </span>
  );
}
