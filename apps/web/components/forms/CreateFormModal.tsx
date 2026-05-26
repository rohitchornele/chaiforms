"use client";

import { useState } from "react";

import { X } from "lucide-react";

import { useCreateForm } from "~/hooks/api/form";

import type {
  FormVisibility,
} from "~/types/form";

type Props = {
  open: boolean;

  onClose: () => void;
};

type FormData = {
  title: string;

  description: string;

  visibility: FormVisibility;
};

export default function CreateFormModal({
  open,
  onClose,
}: Props) {
  const [formData, setFormData] =
    useState<FormData>({
      title: "",
      description: "",
      visibility: "UNLISTED",
    });

  const { createFormAsync, status } =
    useCreateForm();

  const isCreating =
    status === "pending";

  const handleChange = (
    key: keyof FormData,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!formData.title.trim())
      return;

    try {
      await createFormAsync(formData);

      onClose();

      setFormData({
        title: "",
        description: "",
        visibility: "UNLISTED",
      });
    } catch (error) {
      console.error(error);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-3xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
          <div>
            <h3 className="text-2xl font-bold">
              Create Form
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Create your new form.
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl p-2 hover:bg-gray-100"
          >
            <X size={18} />
          </button>
        </div>

        <div className="space-y-5 p-6">
          <div>
            <label className="mb-2 block text-sm font-medium">
              Title
            </label>

            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                handleChange(
                  "title",
                  e.target.value
                )
              }
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Description
            </label>

            <textarea
              rows={4}
              value={
                formData.description
              }
              onChange={(e) =>
                handleChange(
                  "description",
                  e.target.value
                )
              }
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Visibility
            </label>

            <select
              value={
                formData.visibility
              }
              onChange={(e) =>
                handleChange(
                  "visibility",
                  e.target.value
                )
              }
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
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
        </div>

        <div className="flex justify-end gap-3 border-t border-gray-100 px-6 py-5">
          <button
            onClick={onClose}
            className="rounded-xl border border-gray-300 px-5 py-2.5 text-sm"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={isCreating}
            className="rounded-xl bg-black px-5 py-2.5 text-sm text-white"
          >
            {isCreating
              ? "Creating..."
              : "Create Form"}
          </button>
        </div>
      </div>
    </div>
  );
}