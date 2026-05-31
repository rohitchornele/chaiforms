"use client";

import Link from "next/link";

import {
  FileText,
  Inbox,
  Activity,
  ArrowUpRight,
  Loader2,
  AlertCircle,
  Sparkles,
  Plus,
  TrendingUp,
  Globe,
} from "lucide-react";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { motion } from "framer-motion";

import { useDashboardOverview } from "~/hooks/api/dashboard";

import CreateFormButton from "~/components/forms/CreateFormButton";
import { useRouter } from "next/navigation";
import { useUser } from "~/hooks/api/auth";
import { useEffect } from "react";

export default function DashboardPage() {
  const router = useRouter();

  const { user, error, isLoading: isUserLoading, isFetched } = useUser();

  useEffect(() => {
    if (isFetched && error) {
      router.replace("/login");
    }
  }, [isFetched, error, router]);



  if (isUserLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#050505]">
        <div className="flex items-center gap-4 rounded-3xl border border-white/10 bg-white/[0.03] px-6 py-5 backdrop-blur-3xl">
          <Loader2 className="h-5 w-5 animate-spin text-white/60" />

          <p className="text-sm font-medium text-white/70">Verifying access...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

    const { dashboard, isLoading, isFetching } = useDashboardOverview();

  if (isLoading || isFetching) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <div className="flex items-center gap-4 rounded-3xl border border-white/10 bg-white/[0.03] px-6 py-5 backdrop-blur-3xl">
          <Loader2 className="h-5 w-5 animate-spin text-white/60" />

          <p className="text-sm font-medium text-white/70">Loading Mission Control...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-1 items-center justify-center p-4">
        <div className="w-full max-w-md rounded-[32px] border border-red-500/20 bg-red-500/5 p-6 backdrop-blur-3xl">
          <div className="flex items-center gap-3 text-red-300">
            <AlertCircle className="h-6 w-6" />

            <h2 className="text-lg font-semibold">Failed to load dashboard</h2>
          </div>

          <p className="mt-4 text-sm text-red-200/70">{error.message}</p>
        </div>
      </div>
    );
  }

  if (!dashboard) {
    return null;
  }

  const { metrics, recentForms, recentSubmissions, submissionChart } = dashboard;

  return (
    <div className="flex flex-col gap-8">
      {/* HERO */}
      <section className="relative overflow-hidden rounded-[40px] border border-white/10 bg-white/[0.03] p-6 shadow-[0_0_80px_rgba(0,0,0,0.45)] backdrop-blur-3xl md:p-10">
        {/* Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(201,115,43,0.15),transparent_30%)]" />

        <div className="relative z-10 flex flex-col gap-10 xl:flex-row xl:items-center xl:justify-between">
          {/* LEFT */}
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#C9732B]/20 bg-[#C9732B]/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-[#F3EBDD]">
              <Sparkles className="h-3.5 w-3.5" />
              Creator Mission Control
            </div>

            <h1 className="mt-6 text-5xl font-black tracking-tight text-white md:text-7xl">
              Welcome back,
              <br />
              Rohit.
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/60 md:text-lg">
              Build immersive forms, track audience engagement, and create cinematic experiences for
              your users.
            </p>

            {/* Actions */}
            <div className="mt-8 flex flex-wrap gap-4">
              <CreateFormButton
                className="
                  inline-flex
                  items-center
                  gap-3
                  rounded-2xl
                  bg-gradient-to-r
                  from-[#C9732B]
                  to-[#B56A3C]
                  px-6
                  py-4
                  text-sm
                  font-medium
                  text-white
                  shadow-[0_10px_40px_rgba(201,115,43,0.25)]
                  transition-all
                  duration-300
                  hover:scale-[1.02]
                "
              >
                <Plus className="h-5 w-5" />
                Create Form
              </CreateFormButton>

              <Link
                href="/dashboard/forms"
                className="
                  inline-flex
                  items-center
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
                "
              >
                <Globe className="h-5 w-5" />
                Manage Forms
              </Link>
            </div>
          </div>

          {/* RIGHT */}
          <div className="grid gap-4 sm:grid-cols-2 xl:w-[420px]">
            <MetricCard
              title="Total Forms"
              value={metrics.totalForms}
              icon={<FileText className="h-5 w-5" />}
            />

            <MetricCard
              title="Submissions"
              value={metrics.totalSubmissions}
              icon={<Inbox className="h-5 w-5" />}
            />

            <MetricCard
              title="Active Forms"
              value={metrics.activeForms}
              icon={<Activity className="h-5 w-5" />}
            />

            <MetricCard
              title="This Week"
              value={metrics.submissionsThisWeek}
              icon={<TrendingUp className="h-5 w-5" />}
            />
          </div>
        </div>
      </section>

      {/* CHART */}
      <section className="rounded-[36px] border border-white/10 bg-white/[0.03] p-6 shadow-[0_0_60px_rgba(0,0,0,0.35)] backdrop-blur-3xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white">Submission Activity</h2>

            <p className="mt-2 text-sm text-white/50">Audience engagement over time</p>
          </div>
        </div>

        <div className="h-[360px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={submissionChart}>
              <defs>
                <linearGradient id="submissionGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#C9732B" stopOpacity={0.35} />

                  <stop offset="100%" stopColor="#C9732B" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid vertical={false} stroke="#ffffff10" />

              <XAxis
                dataKey="date"
                tick={{
                  fill: "#ffffff50",
                  fontSize: 12,
                }}
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                allowDecimals={false}
                tick={{
                  fill: "#ffffff50",
                  fontSize: 12,
                }}
                axisLine={false}
                tickLine={false}
              />

              <Tooltip
                contentStyle={{
                  background: "#0A0A0A",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 20,
                  color: "white",
                }}
              />

              <Area
                type="monotone"
                dataKey="submissions"
                stroke="#C9732B"
                strokeWidth={3}
                fill="url(#submissionGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* BOTTOM */}
      <div className="grid gap-6 xl:grid-cols-2">
        {/* Recent Forms */}
        <section className="rounded-[36px] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-3xl">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-white">Recent Forms</h2>

              <p className="mt-2 text-sm text-white/50">Your latest creations</p>
            </div>

            <Link
              href="/dashboard/forms"
              className="text-sm font-medium text-white/40 transition hover:text-white"
            >
              View All
            </Link>
          </div>

          <div className="space-y-4">
            {recentForms.length === 0 ? (
              <EmptyState title="No forms yet" description="Create your first immersive form." />
            ) : (
              recentForms.map((form) => (
                <Link
                  key={form.formId}
                  href={`/dashboard/forms/${form.formId}`}
                  className="
                    group
                    block
                    rounded-3xl
                    border
                    border-white/10
                    bg-white/[0.02]
                    p-5
                    transition-all
                    duration-300
                    hover:bg-white/[0.04]
                  "
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-white">{form.title}</h3>

                      {form.description && (
                        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-white/45">
                          {form.description}
                        </p>
                      )}
                    </div>

                    <div className="rounded-2xl bg-[#C9732B]/10 px-4 py-2 text-sm font-semibold text-[#F3EBDD]">
                      {form.submissionsCount}
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </section>

        {/* Activity */}
        <section className="rounded-[36px] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-3xl">
          <div className="mb-8">
            <h2 className="text-2xl font-bold tracking-tight text-white">Activity Feed</h2>

            <p className="mt-2 text-sm text-white/50">Latest audience interactions</p>
          </div>

          <div className="space-y-5">
            {recentSubmissions.length === 0 ? (
              <EmptyState
                title="No submissions yet"
                description="Audience activity will appear here."
              />
            ) : (
              recentSubmissions.map((submission) => (
                <div key={submission.submissionId} className="flex gap-4">
                  {/* Timeline */}
                  <div className="flex flex-col items-center">
                    <div className="mt-1 h-3 w-3 rounded-full bg-[#C9732B]" />

                    <div className="mt-2 h-full w-px bg-white/10" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 rounded-3xl border border-white/10 bg-white/[0.02] p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-semibold text-white">{submission.formTitle}</h3>

                        <p className="mt-2 text-sm text-white/45">New response received</p>

                        <p className="mt-3 text-xs text-white/30">
                          {new Date(submission.createdAt).toLocaleString()}
                        </p>
                      </div>

                      <StatusBadge status={submission.status} />
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

type MetricCardProps = {
  title: string;
  value: number;
  icon: React.ReactNode;
};

function MetricCard({ title, value, icon }: MetricCardProps) {
  return (
    <motion.div
      whileHover={{
        y: -3,
      }}
      className="
        rounded-[28px]
        border
        border-white/10
        bg-white/[0.03]
        p-5
        backdrop-blur-2xl
      "
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-white/45">{title}</p>

          <h2 className="mt-4 text-4xl font-black tracking-tight text-white">{value}</h2>
        </div>

        <div className="rounded-2xl bg-[#C9732B]/10 p-3 text-[#F3EBDD]">{icon}</div>
      </div>
    </motion.div>
  );
}

type StatusProps = {
  status: "PENDING" | "COMPLETED";
};

function StatusBadge({ status }: StatusProps) {
  const styles = {
    COMPLETED: "border-emerald-500/20 bg-emerald-500/10 text-emerald-300",

    PENDING: "border-amber-500/20 bg-amber-500/10 text-amber-300",
  };

  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${styles[status]}`}
    >
      {status}
    </span>
  );
}

type EmptyStateProps = {
  title: string;
  description: string;
};

function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-[32px] border border-dashed border-white/10 bg-white/[0.02] p-10 text-center">
      <Inbox className="h-10 w-10 text-white/20" />

      <h3 className="mt-5 text-lg font-semibold text-white">{title}</h3>

      <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/45">{description}</p>
    </div>
  );
}
