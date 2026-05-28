"use client";

import Link from "next/link";

import { useParams } from "next/navigation";

import Papa from "papaparse";

import {
  Loader2,
  AlertCircle,
  Inbox,
  ArrowLeft,
  Download,
  Sparkles,
  Activity,
} from "lucide-react";

import { motion } from "framer-motion";

import {
  useGetFormAndField,
  useGetFormSubmissions,
} from "~/hooks/api/form";

export default function FormSubmissionsPage() {
  const params = useParams();

  const formId = params.id as string;

  const {
    submissions,
    isLoading: submissionsLoading,
    isFetching: submissionsFetching,
    error: submissionsError,
  } = useGetFormSubmissions(formId);

  const {
    form,
    isLoading: formLoading,
    isFetching: formFetching,
    error: formError,
  } = useGetFormAndField(formId);

  const isLoading =
    submissionsLoading ||
    submissionsFetching ||
    formLoading ||
    formFetching;

  const error =
    submissionsError ||
    formError;

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#050505]">
        <div className="flex items-center gap-4 rounded-3xl border border-white/10 bg-white/[0.03] px-6 py-5 backdrop-blur-3xl">
          <Loader2 className="h-5 w-5 animate-spin text-white/60" />

          <p className="text-sm font-medium text-white/70">
            Loading submissions...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#050505] p-4">
        <div className="w-full max-w-md rounded-[32px] border border-red-500/20 bg-red-500/5 p-6 backdrop-blur-3xl">
          <div className="flex items-center gap-3 text-red-300">
            <AlertCircle className="h-6 w-6" />

            <h2 className="text-lg font-semibold">
              Failed to load submissions
            </h2>
          </div>

          <p className="mt-4 text-sm text-red-200/70">
            {error.message}
          </p>
        </div>
      </div>
    );
  }

  if (!form) {
    return null;
  }

  const fields = form.fields || [];

  const handleExportCSV = () => {
    if (!submissions || submissions.length === 0) {
      return;
    }

    const csvData = submissions.map((submission) => {
      const row: Record<string, string> = {
        submissionId: submission.submissionId,

        status: submission.status,

        submittedAt: new Date(
          submission.createdAt
        ).toLocaleString(),
      };

      const responses =
        typeof submission.responses === "string"
          ? JSON.parse(submission.responses)
          : submission.responses;

      fields.forEach((field) => {
        row[field.label] =
          responses?.[field.fieldId] || "";
      });

      return row;
    });

    const csv = Papa.unparse(csvData);

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url =
      URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;

    link.setAttribute(
      "download",
      `${form.title
        .replaceAll(" ", "-")
        .toLowerCase()}-submissions.csv`
    );

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050505] text-white">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-[-10%] top-[-10%] h-[500px] w-[500px] rounded-full bg-[#C9732B]/20 blur-[140px]" />

        <div className="absolute bottom-[-20%] right-[-10%] h-[500px] w-[500px] rounded-full bg-[#1F4A3B]/20 blur-[140px]" />

        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:70px_70px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1800px] p-4 md:p-8">
        {/* HERO */}
        <section className="relative overflow-hidden rounded-[40px] border border-white/10 bg-white/[0.03] p-6 shadow-[0_0_80px_rgba(0,0,0,0.45)] backdrop-blur-3xl md:p-10">
          {/* Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(201,115,43,0.15),transparent_30%)]" />

          <div className="relative z-10 flex flex-col gap-8 xl:flex-row xl:items-center xl:justify-between">
            {/* LEFT */}
            <div>
              <Link
                href="/dashboard/forms"
                className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-white/50 transition hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to forms
              </Link>

              <div className="inline-flex items-center gap-2 rounded-full border border-[#C9732B]/20 bg-[#C9732B]/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-[#F3EBDD]">
                <Sparkles className="h-3.5 w-3.5" />
                Submission Control Center
              </div>

              <h1 className="mt-6 text-5xl font-black tracking-tight text-white md:text-6xl">
                {form.title}
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/55">
                Analyze audience engagement, review responses,
                and export submissions from your cinematic form experience.
              </p>
            </div>

            {/* RIGHT */}
            <div className="flex flex-col gap-4 sm:flex-row">
              <button
                onClick={handleExportCSV}
                disabled={!submissions || submissions.length === 0}
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-3
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/[0.03]
                  px-6
                  py-4
                  text-sm
                  font-medium
                  text-white/70
                  transition-all
                  hover:bg-white/[0.06]
                  hover:text-white
                  disabled:cursor-not-allowed
                  disabled:opacity-40
                "
              >
                <Download className="h-4 w-4" />
                Export CSV
              </button>

              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-2xl">
                <div className="flex items-center gap-4">
                  <div className="rounded-2xl bg-[#C9732B]/10 p-3 text-[#F3EBDD]">
                    <Activity className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="text-sm text-white/45">
                      Total Submissions
                    </p>

                    <h2 className="text-3xl font-black text-white">
                      {submissions?.length || 0}
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* EMPTY */}
        {!submissions || submissions.length === 0 ? (
          <div className="mt-8 flex min-h-[60vh] flex-col items-center justify-center rounded-[40px] border border-dashed border-white/10 bg-white/[0.03] p-10 text-center backdrop-blur-3xl">
            <Inbox className="h-16 w-16 text-white/20" />

            <h2 className="mt-6 text-3xl font-bold text-white">
              No submissions yet
            </h2>

            <p className="mt-4 max-w-md text-sm leading-relaxed text-white/45">
              Once users begin interacting with your form,
              all audience responses will appear here.
            </p>
          </div>
        ) : (
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="mt-8 overflow-hidden rounded-[40px] border border-white/10 bg-white/[0.03] shadow-[0_0_60px_rgba(0,0,0,0.35)] backdrop-blur-3xl"
          >
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="border-b border-white/10 bg-white/[0.02]">
                  <tr>
                    <th className="px-6 py-5 text-left text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
                      #
                    </th>

                    {fields.map((field) => (
                      <th
                        key={field.fieldId}
                        className="whitespace-nowrap px-6 py-5 text-left text-xs font-semibold uppercase tracking-[0.2em] text-white/40"
                      >
                        {field.label}
                      </th>
                    ))}

                    <th className="px-6 py-5 text-left text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
                      Status
                    </th>

                    <th className="px-6 py-5 text-left text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
                      Submitted
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {(submissions || []).map(
                    (submission, index) => {
                      const responses =
                        typeof submission.responses === "string"
                          ? JSON.parse(submission.responses)
                          : submission.responses;

                      return (
                        <tr
                          key={submission.submissionId}
                          onClick={() => {
                            window.location.href = `/dashboard/forms/${formId}/submissions/${submission.submissionId}`;
                          }}
                          className="cursor-pointer border-b border-white/5 transition-all hover:bg-white/[0.03]"
                        >
                          <td className="whitespace-nowrap px-6 py-6 text-sm font-medium text-white/70">
                            {index + 1}
                          </td>

                          {fields.map((field) => {
                            const value =
                              responses?.[
                                field.fieldId
                              ];

                            return (
                              <td
                                key={field.fieldId}
                                className="whitespace-nowrap px-6 py-6 text-sm text-white/70"
                              >
                                <div className="max-w-[260px] truncate">
                                  {value || "-"}
                                </div>
                              </td>
                            );
                          })}

                          <td className="px-6 py-6">
                            <StatusBadge
                              status={submission.status}
                            />
                          </td>

                          <td className="whitespace-nowrap px-6 py-6 text-sm text-white/40">
                            {new Date(
                              submission.createdAt
                            ).toLocaleString()}
                          </td>
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

type StatusProps = {
  status:
    | "PENDING"
    | "COMPLETED"
    | "REJECTED"
    | "SPAM";
};

function StatusBadge({
  status,
}: StatusProps) {
  const styles = {
    COMPLETED:
      "border-emerald-500/20 bg-emerald-500/10 text-emerald-300",

    PENDING:
      "border-amber-500/20 bg-amber-500/10 text-amber-300",

    REJECTED:
      "border-red-500/20 bg-red-500/10 text-red-300",

    SPAM:
      "border-zinc-500/20 bg-zinc-500/10 text-zinc-300",
  };

  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${styles[status]}`}
    >
      {status}
    </span>
  );
}