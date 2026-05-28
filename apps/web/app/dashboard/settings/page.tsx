"use client";

import Link from "next/link";

import {
  ArrowLeft,
  Bell,
  Lock,
  Palette,
  Globe,
  Shield,
  User,
  Sparkles,
  ChevronRight,
  Monitor,
  Moon,
  Sun,
  Mail,
  Database,
} from "lucide-react";

import { motion } from "framer-motion";

export default function DashboardSettingsPage() {
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

      <div className="relative z-10 mx-auto max-w-7xl p-4 md:p-8">
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
                Back to Manage Forms
              </Link>

              <div className="inline-flex items-center gap-2 rounded-full border border-[#C9732B]/20 bg-[#C9732B]/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-[#F3EBDD]">
                <Sparkles className="h-3.5 w-3.5" />
                Creator Configuration
              </div>

              <h1 className="mt-6 text-5xl font-black tracking-tight text-white md:text-6xl">
                Dashboard
                <br />
                Settings
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/55">
                Customize your creator workspace, appearance,
                notifications, and futuristic form-building experience.
              </p>
            </div>

            {/* RIGHT */}
            <div className="grid gap-4 sm:grid-cols-2">
              <QuickCard
                title="Themes"
                value="4 Active"
                icon={<Palette className="h-5 w-5" />}
              />

              <QuickCard
                title="Notifications"
                value="Enabled"
                icon={<Bell className="h-5 w-5" />}
              />

              <QuickCard
                title="Security"
                value="Protected"
                icon={<Shield className="h-5 w-5" />}
              />

              <QuickCard
                title="Workspace"
                value="Creator Mode"
                icon={<Monitor className="h-5 w-5" />}
              />
            </div>
          </div>
        </section>

        {/* SETTINGS GRID */}
        <div className="mt-8 grid gap-6 xl:grid-cols-2">
          {/* PROFILE */}
          <SettingsCard
            title="Profile Settings"
            description="Manage your personal creator profile"
            icon={<User className="h-5 w-5" />}
          >
            <SettingsRow
              title="Display Name"
              subtitle="Rohit Chornele"
            />

            <SettingsRow
              title="Email Address"
              subtitle="rohitchornele@example.com"
            />

            <SettingsRow
              title="Profile Image"
              subtitle="Customize your avatar"
            />
          </SettingsCard>

          {/* APPEARANCE */}
          <SettingsCard
            title="Appearance"
            description="Customize dashboard aesthetics"
            icon={<Palette className="h-5 w-5" />}
          >
            <SettingsRow
              title="Theme"
              subtitle="Sacred Tech"
              icon={<Moon className="h-4 w-4" />}
            />

            <SettingsRow
              title="Accent Colors"
              subtitle="Copper Glow"
              icon={<Sun className="h-4 w-4" />}
            />

            <SettingsRow
              title="Interface Style"
              subtitle="Glassmorphism"
              icon={<Monitor className="h-4 w-4" />}
            />
          </SettingsCard>

          {/* SECURITY */}
          <SettingsCard
            title="Security"
            description="Protect your creator account"
            icon={<Lock className="h-5 w-5" />}
          >
            <SettingsRow
              title="Password"
              subtitle="Last updated 12 days ago"
            />

            <SettingsRow
              title="2FA Authentication"
              subtitle="Disabled"
            />

            <SettingsRow
              title="Sessions"
              subtitle="Manage logged devices"
            />
          </SettingsCard>

          {/* NOTIFICATIONS */}
          <SettingsCard
            title="Notifications"
            description="Control alerts and updates"
            icon={<Bell className="h-5 w-5" />}
          >
            <SettingsRow
              title="Email Notifications"
              subtitle="Enabled"
              icon={<Mail className="h-4 w-4" />}
            />

            <SettingsRow
              title="Submission Alerts"
              subtitle="Instant updates"
            />

            <SettingsRow
              title="Weekly Reports"
              subtitle="Every Monday"
            />
          </SettingsCard>

          {/* FORM SETTINGS */}
          <SettingsCard
            title="Form Preferences"
            description="Default settings for new forms"
            icon={<Globe className="h-5 w-5" />}
          >
            <SettingsRow
              title="Default Visibility"
              subtitle="Unlisted"
            />

            <SettingsRow
              title="Default Theme"
              subtitle="Sacred Tech"
            />

            <SettingsRow
              title="Auto Save"
              subtitle="Enabled"
            />
          </SettingsCard>

          {/* DATA */}
          <SettingsCard
            title="Data & Storage"
            description="Manage exports and retention"
            icon={<Database className="h-5 w-5" />}
          >
            <SettingsRow
              title="Storage Usage"
              subtitle="1.2 GB Used"
            />

            <SettingsRow
              title="CSV Exports"
              subtitle="Enabled"
            />

            <SettingsRow
              title="Retention Policy"
              subtitle="Unlimited"
            />
          </SettingsCard>
        </div>
      </div>
    </div>
  );
}

type QuickCardProps = {
  title: string;
  value: string;
  icon: React.ReactNode;
};

function QuickCard({
  title,
  value,
  icon,
}: QuickCardProps) {
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
          <p className="text-sm text-white/45">
            {title}
          </p>

          <h2 className="mt-4 text-2xl font-black tracking-tight text-white">
            {value}
          </h2>
        </div>

        <div className="rounded-2xl bg-[#C9732B]/10 p-3 text-[#F3EBDD]">
          {icon}
        </div>
      </div>
    </motion.div>
  );
}

type SettingsCardProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
  children: React.ReactNode;
};

function SettingsCard({
  title,
  description,
  icon,
  children,
}: SettingsCardProps) {
  return (
    <motion.section
      whileHover={{
        y: -2,
      }}
      className="
        relative
        overflow-hidden
        rounded-[36px]
        border
        border-white/10
        bg-white/[0.03]
        p-6
        shadow-[0_0_60px_rgba(0,0,0,0.35)]
        backdrop-blur-3xl
      "
    >
      {/* Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(201,115,43,0.08),transparent_35%)]" />

      <div className="relative z-10">
        {/* Header */}
        <div className="mb-8 flex items-start gap-4">
          <div className="rounded-2xl bg-[#C9732B]/10 p-3 text-[#F3EBDD]">
            {icon}
          </div>

          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white">
              {title}
            </h2>

            <p className="mt-2 text-sm leading-relaxed text-white/45">
              {description}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4">
          {children}
        </div>
      </div>
    </motion.section>
  );
}

type SettingsRowProps = {
  title: string;
  subtitle: string;
  icon?: React.ReactNode;
};

function SettingsRow({
  title,
  subtitle,
  icon,
}: SettingsRowProps) {
  return (
    <button
      className="
        flex
        w-full
        items-center
        justify-between
        rounded-2xl
        border
        border-white/10
        bg-white/[0.02]
        px-5
        py-4
        text-left
        transition-all
        duration-300
        hover:bg-white/[0.05]
      "
    >
      <div className="flex items-center gap-4">
        {icon && (
          <div className="text-white/50">
            {icon}
          </div>
        )}

        <div>
          <h3 className="text-sm font-semibold text-white">
            {title}
          </h3>

          <p className="mt-1 text-xs text-white/45">
            {subtitle}
          </p>
        </div>
      </div>

      <ChevronRight className="h-4 w-4 text-white/30" />
    </button>
  );
}