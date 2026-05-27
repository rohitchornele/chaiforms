"use client";

import Link from "next/link";

import {
  FileText,
  Pencil,
  Share2,
  Settings,
  Eye,
  BarChart3,
  Globe,
  Lock,
  Sparkles,
} from "lucide-react";

import { motion } from "framer-motion";

import StatusBadge from "./StatusBadge";

import { Form } from "~/types/form";

type Props = {
  form: Form;
};

export default function FormCard({ form }: Props) {
  const date = new Date(form.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const publicUrl = `${window.location.origin}/form/public/${form.slug}`;

  return (
    <motion.div
      whileHover={{
        y: -6,
      }}
      transition={{
        duration: 0.25,
      }}
      className="
        group
        relative
        overflow-hidden
        rounded-[32px]
        border
        border-white/10
        bg-white/[0.03]
        p-6
        shadow-[0_0_60px_rgba(0,0,0,0.35)]
        backdrop-blur-3xl
      "
    >
      {/* Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(201,115,43,0.12),transparent_35%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {/* Top Accent */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C9732B] to-transparent opacity-70" />

      <div className="relative z-10 flex h-full flex-col justify-between">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-2">
              <StatusBadge status={form.status} />

              <p className="mt-2 text-xs text-white/40">Created {date}</p>
            </div>

          {/* Visibility */}
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-white/50">
            {form.visibility === "PUBLIC" ? (
              <Globe className="h-3.5 w-3.5" />
            ) : (
              <Lock className="h-3.5 w-3.5" />
            )}

            <span>{form.visibility}</span>
          </div>
        </div>

        {/* Content */}
        <div className="mt-8">
          {/* Title */}
          <h3 className="line-clamp-2 text-2xl font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-[#F3EBDD]">
            {form.title}
          </h3>

          {/* Description */}
          {form.description && (
            <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-white/50">
              {form.description}
            </p>
          )}
        </div>

        {/* Footer */}
        <div className="mt-8">
          {/* Stats */}
          <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
            <div className="flex items-center gap-2 text-sm text-white/60">
              <FileText className="h-4 w-4" />

              <span>
                <span className="font-semibold text-white">{form.responseCount || 0}</span>{" "}
                responses
              </span>
            </div>
          </div>

          {/* Primary Action */}
          <div className="mt-4">
            <Link
              href={`/dashboard/forms/${form.id}`}
              className="
                flex
                h-12
                items-center
                justify-center
                gap-3
                rounded-2xl
                bg-gradient-to-r
                from-[#C9732B]
                to-[#B56A3C]
                text-sm
                font-medium
                text-white
                shadow-[0_10px_40px_rgba(201,115,43,0.25)]
                transition-all
                duration-300
                hover:scale-[1.01]
                hover:shadow-[0_10px_60px_rgba(201,115,43,0.35)]
              "
            >
              <Pencil className="h-4 w-4" />
              Edit Form
            </Link>
          </div>

          {/* Secondary Actions */}
          <div className="mt-4 grid grid-cols-4 gap-3">
            {/* Preview */}
            <Link
              href={`/form/public/${form.slug}`}
              target="_blank"
              className="
                flex
                h-12
                items-center
                justify-center
                rounded-2xl
                border
                border-white/10
                bg-white/[0.03]
                text-white/50
                transition-all
                duration-300
                hover:bg-white/[0.06]
                hover:text-white
              "
            >
              <Eye className="h-4 w-4" />
            </Link>

            {/* Analytics */}
            <Link
              href={`/dashboard/forms/${form.id}/submissions`}
              className="
                flex
                h-12
                items-center
                justify-center
                rounded-2xl
                border
                border-white/10
                bg-white/[0.03]
                text-white/50
                transition-all
                duration-300
                hover:bg-white/[0.06]
                hover:text-white
              "
            >
              <BarChart3 className="h-4 w-4" />
            </Link>

            {/* Settings */}
            <Link
              href={`/dashboard/forms/${form.id}/settings`}
              className="
                flex
                h-12
                items-center
                justify-center
                rounded-2xl
                border
                border-white/10
                bg-white/[0.03]
                text-white/50
                transition-all
                duration-300
                hover:bg-white/[0.06]
                hover:text-white
              "
            >
              <Settings className="h-4 w-4" />
            </Link>

            {/* Share */}
            {form.status !== "DRAFT" ? (
              <button
                onClick={async () => {
                  await navigator.clipboard.writeText(publicUrl);

                  alert("Public form link copied!");
                }}
                className="
                  flex
                  h-12
                  items-center
                  justify-center
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/[0.03]
                  text-white/50
                  transition-all
                  duration-300
                  hover:bg-white/[0.06]
                  hover:text-white
                "
              >
                <Share2 className="h-4 w-4" />
              </button>
            ) : (
              <div className="flex h-12 items-center justify-center rounded-2xl border border-white/5 bg-white/[0.02] text-white/20">
                <Share2 className="h-4 w-4" />
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
