"use client";

import { useState } from "react";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

import { useCreateForm } from "~/hooks/api/form";

import type { FormVisibility } from "~/types/form";

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

      setFormData({
        title: "",
        description: "",
        visibility: "UNLISTED",
      });

      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[120] flex items-center justify-center p-4"
        >
          {/* Overlay */}
          <div
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
              scale: 0.96,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 10,
              scale: 0.98,
            }}
            transition={{
              duration: 0.2,
              ease: "easeOut",
            }}
            onClick={(e) =>
              e.stopPropagation()
            }
            className="relative z-10 w-full max-w-2xl rounded-3xl border bg-card text-card-foreground shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border px-6 py-5">
              <div>
                <h3 className="text-2xl font-semibold tracking-tight">
                  Create Form
                </h3>

                <p className="mt-1 text-sm text-muted-foreground">
                  Create your new form.
                </p>
              </div>

              <button
                onClick={onClose}
                className="flex size-10 items-center justify-center rounded-xl border transition-colors hover:bg-muted"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content */}
            <div className="space-y-5 p-6">
              {/* Title */}
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
                  placeholder="Feedback Form"
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
                />
              </div>

              {/* Description */}
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
                  placeholder="Describe your form..."
                  className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
                />
              </div>

              {/* Visibility */}
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
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
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

            {/* Footer */}
            <div className="flex justify-end gap-3 border-t border-border px-6 py-5">
              <button
                onClick={onClose}
                className="rounded-xl border border-border px-5 py-2.5 text-sm transition-colors hover:bg-muted"
              >
                Cancel
              </button>

              <button
                onClick={handleSubmit}
                disabled={isCreating}
                className="rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isCreating
                  ? "Creating..."
                  : "Create Form"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}