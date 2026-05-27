"use client";

import Link from "next/link";

import {
  FileText,
  Inbox,
  Activity,
  ArrowUpRight,
  Loader2,
  AlertCircle,
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

import { useDashboardOverview } from "~/hooks/api/dashboard";

import CreateFormButton from "~/components/forms/CreateFormButton";

export default function DashboardPage() {
  const {
    dashboard,
    isLoading,
    isFetching,
    error,
  } = useDashboardOverview();

  if (isLoading || isFetching) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <div className="flex items-center gap-3 rounded-2xl border bg-card px-6 py-4 text-card-foreground shadow-sm">
          <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />

          <p className="text-sm font-medium">
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-1 items-center justify-center p-4">
        <div className="w-full max-w-md rounded-3xl border border-destructive/20 bg-card p-6 text-card-foreground shadow-sm">
          <div className="flex items-center gap-3 text-destructive">
            <AlertCircle className="h-6 w-6" />

            <h2 className="text-lg font-semibold">
              Failed to load dashboard
            </h2>
          </div>

          <p className="mt-3 text-sm text-muted-foreground">
            {error.message}
          </p>
        </div>
      </div>
    );
  }

  if (!dashboard) {
    return null;
  }

  const {
    metrics,
    recentForms,
    recentSubmissions,
    submissionChart,
  } = dashboard;

  return (
    <div className="flex flex-1 flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">
            Dashboard
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Monitor your forms and submissions
          </p>
        </div>

        <CreateFormButton
          className="inline-flex items-center justify-center rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          Create Form
        </CreateFormButton>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <DashboardCard
          title="Total Forms"
          value={metrics.totalForms}
          icon={<FileText className="h-5 w-5" />}
        />

        <DashboardCard
          title="Total Submissions"
          value={metrics.totalSubmissions}
          icon={<Inbox className="h-5 w-5" />}
        />

        <DashboardCard
          title="Active Forms"
          value={metrics.activeForms}
          icon={<Activity className="h-5 w-5" />}
        />

        <DashboardCard
          title="Submissions This Week"
          value={metrics.submissionsThisWeek}
          icon={<ArrowUpRight className="h-5 w-5" />}
        />
      </div>

      {/* Chart */}
      <div className="rounded-3xl border bg-card p-6 text-card-foreground shadow-sm">
        <div className="mb-6">
          <h2 className="text-lg font-semibold">
            Submission Activity
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Track submission trends over time
          </p>
        </div>

        <div className="h-[320px] w-full">
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <AreaChart data={submissionChart}>
              <defs>
                <linearGradient
                  id="submissionGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor="currentColor"
                    stopOpacity={0.25}
                  />

                  <stop
                    offset="95%"
                    stopColor="currentColor"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="hsl(var(--border))"
              />

              <XAxis
                dataKey="date"
                tick={{
                  fontSize: 12,
                }}
              />

              <YAxis
                allowDecimals={false}
                tick={{
                  fontSize: 12,
                }}
              />

              <Tooltip />

              <Area
                type="monotone"
                dataKey="submissions"
                stroke="currentColor"
                fillOpacity={1}
                fill="url(#submissionGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid gap-6 xl:grid-cols-2">
        {/* Recent Forms */}
        <div className="rounded-3xl border bg-card p-6 text-card-foreground shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">
                Recent Forms
              </h2>

              <p className="mt-1 text-sm text-muted-foreground">
                Recently created forms
              </p>
            </div>

            <Link
              href="/dashboard/forms"
              className="text-sm font-medium text-muted-foreground transition hover:text-foreground"
            >
              View All
            </Link>
          </div>

          <div className="space-y-4">
            {recentForms.length === 0 ? (
              <EmptyState
                title="No forms yet"
                description="Create your first form to get started."
              />
            ) : (
              recentForms.map((form) => (
                <Link
                  key={form.formId}
                  href={`/dashboard/forms/${form.formId}`}
                  className="block rounded-2xl border p-4 transition hover:bg-muted/40"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-semibold">
                        {form.title}
                      </h3>

                      {form.description && (
                        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                          {form.description}
                        </p>
                      )}
                    </div>

                    <div className="shrink-0 rounded-xl bg-muted px-3 py-1 text-sm font-medium">
                      {form.submissionsCount}
                    </div>
                  </div>

                  <p className="mt-3 text-xs text-muted-foreground">
                    {new Date(
                      form.createdAt
                    ).toLocaleDateString()}
                  </p>
                </Link>
              ))
            )}
          </div>
        </div>

        {/* Recent Submissions */}
        <div className="rounded-3xl border bg-card p-6 text-card-foreground shadow-sm">
          <div className="mb-6">
            <h2 className="text-lg font-semibold">
              Recent Submissions
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Latest responses from users
            </p>
          </div>

          <div className="space-y-4">
            {recentSubmissions.length === 0 ? (
              <EmptyState
                title="No submissions yet"
                description="Submissions will appear here once users start responding."
              />
            ) : (
              recentSubmissions.map(
                (submission) => (
                  <div
                    key={
                      submission.submissionId
                    }
                    className="rounded-2xl border p-4"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <h3 className="font-semibold">
                          {
                            submission.formTitle
                          }
                        </h3>

                        <p className="mt-1 text-sm text-muted-foreground">
                          {new Date(
                            submission.createdAt
                          ).toLocaleString()}
                        </p>
                      </div>

                      <StatusBadge
                        status={
                          submission.status
                        }
                      />
                    </div>
                  </div>
                )
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

type DashboardCardProps = {
  title: string;
  value: number;
  icon: React.ReactNode;
};

function DashboardCard({
  title,
  value,
  icon,
}: DashboardCardProps) {
  return (
    <div className="rounded-3xl border bg-card p-6 text-card-foreground shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">
            {title}
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight">
            {value}
          </h2>
        </div>

        <div className="rounded-2xl bg-muted p-3 text-muted-foreground">
          {icon}
        </div>
      </div>
    </div>
  );
}

type StatusProps = {
  status: "PENDING" | "COMPLETED";
};

function StatusBadge({
  status,
}: StatusProps) {
  const styles = {
    COMPLETED:
      "border-green-200 bg-green-100 text-green-700 dark:border-green-900 dark:bg-green-950 dark:text-green-400",

    PENDING:
      "border-red-200 bg-red-100 text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-400",
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

function EmptyState({
  title,
  description,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed p-10 text-center">
      <Inbox className="h-10 w-10 text-muted-foreground/40" />

      <h3 className="mt-4 font-semibold">
        {title}
      </h3>

      <p className="mt-2 max-w-xs text-sm text-muted-foreground">
        {description}
      </p>
    </div>
  );
}