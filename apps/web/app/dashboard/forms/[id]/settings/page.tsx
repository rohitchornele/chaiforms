"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import { useParams } from "next/navigation";

import {
  AlertCircle,
  Loader2,
  Save,
  Shield,
  Globe,
  Calendar,
  BarChart3,
  Palette,
  ArrowLeft,
  Check,
  Copy,
  ExternalLink,
  Trash2,
  Archive,
  Eye,
  FileText,
} from "lucide-react";

import {
  useGetForm,
  useUpdateForm,
  useUpdateFormPassword,
} from "~/hooks/api/form";

import UpdatePasswordModal from "~/components/forms/UpdatePasswordModal";

import {
  FORM_THEMES,
  type FormTheme,
} from "~/lib/form-themes";

const THEMES: {
  id: FormTheme;
  title: string;
  description: string;
  preview: string;
}[] = [
  {
    id: "sacred-tech",
    title: "Sacred Tech",
    description:
      "Ancient futuristic Indian-inspired aesthetics",
    preview:
      "from-[#C9732B] via-[#1F4A3B] to-black",
  },

  {
    id: "cyberpunk",
    title: "Cyberpunk",
    description:
      "Neon futuristic hacker vibes",
    preview:
      "from-cyan-500 via-fuchsia-500 to-black",
  },

  {
    id: "anime",
    title: "Anime",
    description:
      "Dreamy colorful anime-inspired visuals",
    preview:
      "from-pink-500 via-purple-500 to-cyan-500",
  },

  {
    id: "startup-os",
    title: "Startup OS",
    description:
      "Clean modern SaaS aesthetics",
    preview:
      "from-zinc-700 via-zinc-900 to-black",
  },
];

export default function FormSettingsPage() {
  const params = useParams();

  const formId =
    params.id as string;

  const {
    forms,
    isLoading,
    error,
  } = useGetForm(formId);

  const {
    updateFormAsync,
    status,
    error: updateError,
  } = useUpdateForm();

  const {
    updateFormPasswordAsync,
    status:
      passwordUpdateStatus,
    error:
      passwordUpdateError,
  } =
    useUpdateFormPassword();

  const [title, setTitle] =
    useState("");

  const [
    description,
    setDescription,
  ] = useState("");

  const [
    visibility,
    setVisibility,
  ] = useState<
    "PUBLIC" | "UNLISTED" | "PRIVATE"
  >("UNLISTED");

  const [
    isPasswordProtected,
    setIsPasswordProtected,
  ] = useState(false);

  const [password, setPassword] =
    useState("");

  const [statusValue, setStatusValue] =
    useState<
      | "DRAFT"
      | "PUBLISHED"
      | "ARCHIVE"
    >("DRAFT");

  const [
    responseLimit,
    setResponseLimit,
  ] = useState("");

  const [
    publishedAt,
    setPublishedAt,
  ] = useState("");

  const [
    expiryDate,
    setExpiryDate,
  ] = useState("");

  const [theme, setTheme] =
    useState<FormTheme>(
      "sacred-tech",
    );

  const [
    isPasswordModalOpen,
    setIsPasswordModalOpen,
  ] = useState(false);

  const [copied, setCopied] =
    useState(false);

  useEffect(() => {
    if (!forms) return;

    setTitle(forms.title);

    setDescription(
      forms.description || "",
    );

    setVisibility(
      forms.visibility,
    );

    setTheme(
      forms.theme as FormTheme,
    );

    setIsPasswordProtected(
      forms.isPasswordProtected,
    );

    setStatusValue(
      forms.status,
    );

    setResponseLimit(
      forms.responseLimit
        ? String(
            forms.responseLimit,
          )
        : "",
    );

    setPublishedAt(
      forms.publishedAt
        ? new Date(
            forms.publishedAt,
          )
            .toISOString()
            .slice(0, 16)
        : "",
    );

    setExpiryDate(
      forms.expiryDate
        ? new Date(
            forms.expiryDate,
          )
            .toISOString()
            .slice(0, 16)
        : "",
    );
  }, [forms]);

  const selectedTheme =
    FORM_THEMES[theme];

  const publicUrl =
    typeof window !==
      "undefined" &&
    forms?.slug
      ? `${window.location.origin}/form/public/${forms.slug}`
      : "";

  const handleSubmit =
    async () => {
      if (!forms) return;

      if (
        !isPasswordProtected
      ) {
        await updateFormPasswordAsync(
          {
            formId,

            isPasswordProtected:
              false,
          },
        );
      }

      await updateFormAsync({
        formId,

        title,

        description,

        visibility,

        theme,

        isPasswordProtected,

        publishedAt:
          publishedAt
            ? new Date(
                publishedAt,
              )
            : null,

        expiryDate:
          expiryDate
            ? new Date(
                expiryDate,
              )
            : null,

        responseLimit:
          responseLimit
            ? Number(
                responseLimit,
              )
            : null,

        status:
          statusValue,
      });
    };

  const handleUpdatePassword =
    async () => {
      await updateFormPasswordAsync(
        {
          formId,

          isPasswordProtected,

          password,
        },
      );

      setPassword("");

      setIsPasswordModalOpen(
        false,
      );
    };

  const copyUrl =
    async () => {
      if (!publicUrl)
        return;

      await navigator.clipboard.writeText(
        publicUrl,
      );

      setCopied(true);

      setTimeout(
        () =>
          setCopied(false),
        2000,
      );
    };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950">
        <Loader2 className="h-6 w-6 animate-spin text-white" />
      </div>
    );
  }

  if (error || !forms) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950 p-4">
        <div className="rounded-3xl border border-red-500/20 bg-red-500/10 p-8 text-red-200">
          Failed to load form
        </div>
      </div>
    );
  }

  return (
    <div
      className={`
        min-h-screen
        overflow-hidden
        ${selectedTheme.page}
      `}
    >
      {/* Background */}
      <div className="fixed inset-0 overflow-hidden">
        <div
          className={`
            absolute inset-0
            bg-gradient-to-br
            ${selectedTheme.backgroundGlow}
          `}
        />

        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:70px_70px]" />
      </div>

      <div className="relative z-10 p-4 md:p-8">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <Link
                href={`/dashboard/forms/${formId}`}
                className="mb-4 inline-flex items-center gap-2 text-sm text-white/60 transition hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to builder
              </Link>

              <h1 className="text-4xl font-bold tracking-tight">
                Form Settings
              </h1>

              <p className="mt-3 max-w-2xl text-sm text-white/60">
                Customize
                appearance,
                publishing,
                visibility and
                security settings
                for your form.
              </p>
            </div>

            <button
              onClick={
                handleSubmit
              }
              disabled={
                status ===
                "pending"
              }
              className={`
                inline-flex
                items-center
                justify-center
                gap-2
                rounded-2xl
                px-6
                py-3
                text-sm
                font-medium
                transition
                ${selectedTheme.button}
              `}
            >
              {status ===
              "pending" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Save Changes
                </>
              )}
            </button>
          </div>

          {/* Quick Stats */}
          <div className="mb-6 grid gap-5 md:grid-cols-4">
            {[
              {
                label:
                  "Responses",
                value:
                  forms.responseLimit   ??
                  0,
                icon: FileText,
              },

              {
                label: "Status",
                value:
                  forms.status,
                icon: Globe,
              },

              {
                label:
                  "Visibility",
                value:
                  forms.visibility,
                icon: Eye,
              },

              {
                label: "Theme",
                value: theme,
                icon: Palette,
              },
            ].map(
              (item) => {
                const Icon =
                  item.icon;

                return (
                  <div
                    key={
                      item.label
                    }
                    className={`
                      rounded-[28px]
                      p-5
                      backdrop-blur-3xl
                      ${selectedTheme.card}
                    `}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-white/50">
                          {
                            item.label
                          }
                        </p>

                        <h3 className="mt-2 text-2xl font-bold capitalize">
                          {
                            item.value
                          }
                        </h3>
                      </div>

                      <div className="rounded-2xl bg-white/10 p-3">
                        <Icon className="h-5 w-5" />
                      </div>
                    </div>
                  </div>
                );
              },
            )}
          </div>

          <div className="grid gap-6">
            {/* General */}
            <div
              className={`
                rounded-[32px]
                p-6
                backdrop-blur-3xl
                ${selectedTheme.card}
              `}
            >
              <div className="mb-6 flex items-center gap-4">
                <div className="rounded-2xl bg-white/10 p-3">
                  <BarChart3 className="h-5 w-5" />
                </div>

                <div>
                  <h2 className="text-xl font-semibold">
                    General Information
                  </h2>

                  <p className="mt-1 text-sm text-white/50">
                    Basic details
                    about your
                    form
                  </p>
                </div>
              </div>

              <div className="space-y-5">
                <div>
                  <label
                    className={`
                      mb-2
                      block
                      text-sm
                      font-medium
                      ${selectedTheme.label}
                    `}
                  >
                    Form Title
                  </label>

                  <input
                    type="text"
                    value={title}
                    onChange={(e) =>
                      setTitle(
                        e.target
                          .value,
                      )
                    }
                    className={`
                      w-full
                      rounded-2xl
                      border
                      px-4
                      py-3
                      text-sm
                      outline-none
                      transition
                      ${selectedTheme.input}
                      ${selectedTheme.focusRing}
                    `}
                  />
                </div>

                <div>
                  <label
                    className={`
                      mb-2
                      block
                      text-sm
                      font-medium
                      ${selectedTheme.label}
                    `}
                  >
                    Description
                  </label>

                  <textarea
                    rows={5}
                    value={
                      description
                    }
                    onChange={(e) =>
                      setDescription(
                        e.target
                          .value,
                      )
                    }
                    className={`
                      w-full
                      rounded-2xl
                      border
                      px-4
                      py-3
                      text-sm
                      outline-none
                      transition
                      ${selectedTheme.input}
                      ${selectedTheme.focusRing}
                    `}
                  />
                </div>
              </div>
            </div>

            {/* Theme Selection */}
            <div
              className={`
                rounded-[32px]
                p-6
                backdrop-blur-3xl
                ${selectedTheme.card}
              `}
            >
              <div className="mb-8 flex items-center gap-4">
                <div className="rounded-2xl bg-white/10 p-3">
                  <Palette className="h-5 w-5" />
                </div>

                <div>
                  <h2 className="text-xl font-semibold">
                    Theme Selection
                  </h2>

                  <p className="mt-1 text-sm text-white/50">
                    Choose the
                    visual universe
                    for your form
                  </p>
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                {THEMES.map(
                  (
                    themeOption,
                  ) => (
                    <button
                      key={
                        themeOption.id
                      }
                      onClick={() =>
                        setTheme(
                          themeOption.id,
                        )
                      }
                      className={`
                        relative
                        overflow-hidden
                        rounded-3xl
                        border
                        p-5
                        text-left
                        transition-all
                        duration-300
                        hover:scale-[1.02]
                        ${
                          theme ===
                          themeOption.id
                            ? "border-white shadow-2xl"
                            : "border-white/10"
                        }
                      `}
                    >
                      <div
                        className={`
                          absolute inset-0
                          bg-gradient-to-br
                          ${themeOption.preview}
                          opacity-80
                        `}
                      />

                      <div className="relative z-10">
                        <div className="mb-10 flex justify-end">
                          {theme ===
                            themeOption.id && (
                            <div className="rounded-full bg-white/20 p-2 backdrop-blur">
                              <Check className="h-4 w-4 text-white" />
                            </div>
                          )}
                        </div>

                        <h3 className="text-lg font-semibold text-white">
                          {
                            themeOption.title
                          }
                        </h3>

                        <p className="mt-2 text-sm text-white/70">
                          {
                            themeOption.description
                          }
                        </p>
                      </div>
                    </button>
                  ),
                )}
              </div>
            </div>

            {/* Visibility & Status */}
            <div
              className={`
                rounded-[32px]
                p-6
                backdrop-blur-3xl
                ${selectedTheme.card}
              `}
            >
              <div className="mb-8 flex items-center gap-4">
                <div className="rounded-2xl bg-white/10 p-3">
                  <Globe className="h-5 w-5" />
                </div>

                <div>
                  <h2 className="text-xl font-semibold">
                    Visibility &
                    Status
                  </h2>

                  <p className="mt-1 text-sm text-white/50">
                    Control who
                    can access
                    your form
                  </p>
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label
                    className={`
                      mb-2
                      block
                      text-sm
                      font-medium
                      ${selectedTheme.label}
                    `}
                  >
                    Visibility
                  </label>

                  <select
                    value={
                      visibility
                    }
                    onChange={(
                      e,
                    ) =>
                      setVisibility(
                        e.target
                          .value as typeof visibility,
                      )
                    }
                    className={`
                      w-full
                      rounded-2xl
                      border
                      px-4
                      py-3
                      text-sm
                      outline-none
                      ${selectedTheme.input}
                    `}
                  >
                    <option value="PUBLIC">
                      Public
                    </option>

                    <option value="UNLISTED">
                      Unlisted
                    </option>

                    <option value="PRIVATE">
                      Private
                    </option>
                  </select>
                </div>

                <div>
                  <label
                    className={`
                      mb-2
                      block
                      text-sm
                      font-medium
                      ${selectedTheme.label}
                    `}
                  >
                    Status
                  </label>

                  <select
                    value={
                      statusValue
                    }
                    onChange={(
                      e,
                    ) =>
                      setStatusValue(
                        e.target
                          .value as typeof statusValue,
                      )
                    }
                    className={`
                      w-full
                      rounded-2xl
                      border
                      px-4
                      py-3
                      text-sm
                      outline-none
                      ${selectedTheme.input}
                    `}
                  >
                    <option value="DRAFT">
                      Draft
                    </option>

                    <option value="PUBLISHED">
                      Published
                    </option>

                    <option value="ARCHIVE">
                      Archive
                    </option>
                  </select>
                </div>
              </div>
            </div>

            {/* Security */}
            <div
              className={`
                rounded-[32px]
                p-6
                backdrop-blur-3xl
                ${selectedTheme.card}
              `}
            >
              <div className="mb-8 flex items-center gap-4">
                <div className="rounded-2xl bg-white/10 p-3">
                  <Shield className="h-5 w-5" />
                </div>

                <div>
                  <h2 className="text-xl font-semibold">
                    Security
                  </h2>

                  <p className="mt-1 text-sm text-white/50">
                    Protect your
                    form with
                    password
                    security
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between rounded-3xl border border-white/10 bg-white/[0.03] p-5">
                <div>
                  <h3 className="font-medium">
                    Password
                    Protection
                  </h3>

                  <p className="mt-1 text-sm text-white/50">
                    Require a
                    password before
                    accessing the
                    form
                  </p>
                </div>

                <button
                  onClick={() =>
                    setIsPasswordProtected(
                      !isPasswordProtected,
                    )
                  }
                  className={`
                    relative
                    h-7
                    w-14
                    rounded-full
                    transition
                    ${
                      isPasswordProtected
                        ? "bg-[#C9732B]"
                        : "bg-white/10"
                    }
                  `}
                >
                  <div
                    className={`
                      absolute
                      top-1
                      h-5
                      w-5
                      rounded-full
                      bg-white
                      transition
                      ${
                        isPasswordProtected
                          ? "left-8"
                          : "left-1"
                      }
                    `}
                  />
                </button>
              </div>

              {isPasswordProtected && (
                <button
                  onClick={() =>
                    setIsPasswordModalOpen(
                      true,
                    )
                  }
                  className={`
                    mt-5
                    rounded-2xl
                    px-5
                    py-3
                    text-sm
                    font-medium
                    transition
                    ${selectedTheme.button}
                  `}
                >
                  Update Password
                </button>
              )}
            </div>

            {/* Publishing */}
            <div
              className={`
                rounded-[32px]
                p-6
                backdrop-blur-3xl
                ${selectedTheme.card}
              `}
            >
              <div className="mb-8 flex items-center gap-4">
                <div className="rounded-2xl bg-white/10 p-3">
                  <Calendar className="h-5 w-5" />
                </div>

                <div>
                  <h2 className="text-xl font-semibold">
                    Publishing
                    Settings
                  </h2>

                  <p className="mt-1 text-sm text-white/50">
                    Control dates
                    and response
                    limits
                  </p>
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label
                    className={`
                      mb-2
                      block
                      text-sm
                      font-medium
                      ${selectedTheme.label}
                    `}
                  >
                    Publish Date
                  </label>

                  <input
                    type="datetime-local"
                    value={
                      publishedAt
                    }
                    onChange={(
                      e,
                    ) =>
                      setPublishedAt(
                        e.target
                          .value,
                      )
                    }
                    className={`
                      w-full
                      rounded-2xl
                      border
                      px-4
                      py-3
                      text-sm
                      outline-none
                      ${selectedTheme.input}
                    `}
                  />
                </div>

                <div>
                  <label
                    className={`
                      mb-2
                      block
                      text-sm
                      font-medium
                      ${selectedTheme.label}
                    `}
                  >
                    Expiry Date
                  </label>

                  <input
                    type="datetime-local"
                    value={
                      expiryDate
                    }
                    onChange={(
                      e,
                    ) =>
                      setExpiryDate(
                        e.target
                          .value,
                      )
                    }
                    className={`
                      w-full
                      rounded-2xl
                      border
                      px-4
                      py-3
                      text-sm
                      outline-none
                      ${selectedTheme.input}
                    `}
                  />
                </div>

                <div className="md:col-span-2">
                  <label
                    className={`
                      mb-2
                      block
                      text-sm
                      font-medium
                      ${selectedTheme.label}
                    `}
                  >
                    Response
                    Limit
                  </label>

                  <input
                    type="number"
                    value={
                      responseLimit
                    }
                    onChange={(
                      e,
                    ) =>
                      setResponseLimit(
                        e.target
                          .value,
                      )
                    }
                    placeholder="Unlimited"
                    className={`
                      w-full
                      rounded-2xl
                      border
                      px-4
                      py-3
                      text-sm
                      outline-none
                      ${selectedTheme.input}
                    `}
                  />
                </div>
              </div>
            </div>

            {/* Form URL */}
            <div
              className={`
                rounded-[32px]
                p-6
                backdrop-blur-3xl
                ${selectedTheme.card}
              `}
            >
              <div className="mb-6 flex items-center gap-4">
                <div className="rounded-2xl bg-white/10 p-3">
                  <ExternalLink className="h-5 w-5" />
                </div>

                <div>
                  <h2 className="text-xl font-semibold">
                    Public Form URL
                  </h2>

                  <p className="mt-1 text-sm text-white/50">
                    Share your
                    form with
                    others
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-4 lg:flex-row">
                <input
                  value={publicUrl}
                  readOnly
                  className={`
                    flex-1
                    rounded-2xl
                    border
                    px-4
                    py-3
                    text-sm
                    outline-none
                    ${selectedTheme.input}
                  `}
                />

                <div className="flex gap-3">
                  <button
                    onClick={
                      copyUrl
                    }
                    className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-medium text-white transition hover:bg-white/[0.06]"
                  >
                    <Copy className="h-4 w-4" />

                    {copied
                      ? "Copied"
                      : "Copy"}
                  </button>

                  <Link
                    href={
                      publicUrl
                    }
                    target="_blank"
                    className={`
                      flex
                      items-center
                      gap-2
                      rounded-2xl
                      px-5
                      py-3
                      text-sm
                      font-medium
                      transition
                      ${selectedTheme.button}
                    `}
                  >
                    <ExternalLink className="h-4 w-4" />
                    Open
                  </Link>
                </div>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="rounded-[32px] border border-red-500/20 bg-red-500/5 p-6 backdrop-blur-3xl">
              <div className="mb-8 flex items-center gap-4">
                <div className="rounded-2xl bg-red-500/10 p-3 text-red-300">
                  <Trash2 className="h-5 w-5" />
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-red-200">
                    Danger Zone
                  </h2>

                  <p className="mt-1 text-sm text-red-200/60">
                    Irreversible
                    actions for
                    this form
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <button className="flex items-center gap-2 rounded-2xl border border-red-500/20 bg-red-500/10 px-5 py-3 text-sm font-medium text-red-200 transition hover:bg-red-500/20">
                  <Archive className="h-4 w-4" />
                  Archive Form
                </button>

                <button className="flex items-center gap-2 rounded-2xl border border-red-500/20 bg-red-500/10 px-5 py-3 text-sm font-medium text-red-200 transition hover:bg-red-500/20">
                  <Trash2 className="h-4 w-4" />
                  Delete Form
                </button>
              </div>
            </div>

            {/* Alerts */}
            {updateError && (
              <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-5 py-4 text-sm text-red-200">
                <div className="flex items-center gap-3">
                  <AlertCircle className="h-4 w-4" />
                  {
                    updateError.message
                  }
                </div>
              </div>
            )}

            {status ===
              "success" && (
              <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-5 py-4 text-sm text-emerald-200">
                Form settings
                updated
                successfully
              </div>
            )}
          </div>
        </div>
      </div>

      <UpdatePasswordModal
        open={
          isPasswordModalOpen
        }
        password={password}
        setPassword={
          setPassword
        }
        isPending={
          passwordUpdateStatus ===
          "pending"
        }
        isSuccess={
          passwordUpdateStatus ===
          "success"
        }
        error={
          passwordUpdateError
        }
        onClose={() =>
          setIsPasswordModalOpen(
            false,
          )
        }
        onSave={
          handleUpdatePassword
        }
      />
    </div>
  );
}