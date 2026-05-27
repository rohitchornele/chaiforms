"use client";

import { Loader2, Shield } from "lucide-react";

type Props = {
  open: boolean;

  password: string;

  setPassword: React.Dispatch<React.SetStateAction<string>>;

  isPending: boolean;

  isSuccess: boolean;

  error?: {
    message?: string;
  } | null;

  onClose: () => void;

  onSave: () => void;
};

export default function UpdatePasswordModal({
  open,

  password,

  setPassword,

  isPending,

  isSuccess,

  error,

  onClose,

  onSave,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-3xl border border-zinc-200 bg-white p-6 shadow-2xl">
        {/* Header */}
        <div className="mb-6 flex items-center gap-3">
          <div className="rounded-2xl bg-zinc-100 p-3 text-zinc-700">
            <Shield className="h-5 w-5" />
          </div>

          <div>
            <h2 className="text-xl font-semibold text-zinc-900">Update Password</h2>

            <p className="text-sm text-zinc-500">Secure this form with password</p>
          </div>
        </div>

        {/* Input */}
        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-700">Password</label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password"
              className="w-full rounded-2xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-zinc-900"
            />
          </div>

          {/* Error */}
          {error && (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error.message}
            </div>
          )}

          {/* Success */}
          {isSuccess && (
            <div className="rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
              Password updated successfully
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              onClick={onClose}
              className="rounded-xl border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100"
            >
              Cancel
            </button>

            <button
              onClick={onSave}
              disabled={isPending}
              className="inline-flex items-center gap-2 rounded-xl bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-black disabled:opacity-50"
            >
              {isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Password"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
