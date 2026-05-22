"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { useCreateForm } from "~/hooks/api/form";


export default function FormsPage() {
  const [open, setOpen] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const { createFormAsync, status } = useCreateForm();

  const isLoading = status === "pending";

  const handleCreateForm = async () => {
    if (!title.trim()) return;

    try {
      await createFormAsync({
        title,
        description,
      });

      setTitle("");
      setDescription("");

      setOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <div className="flex items-center justify-between px-4 lg:px-6">
              <div>
                <h2 className="text-2xl font-semibold">Forms</h2>

                <p className="text-sm text-muted-foreground">
                  This is the Forms page.
                </p>
              </div>

              <button
                onClick={() => setOpen(true)}
                className="inline-flex items-center gap-2 rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
              >
                <Plus size={18} />
                Create Form
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 ">
          <div className="w-full max-w-lg rounded-2xl bg-black/30 shadow-xl border border-white/30">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/30 p-5">
              <div>
                <h3 className="text-xl font-semibold">
                  Create New Form
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Fill the details below to create a form.
                </p>
              </div>

              <button
                onClick={() => setOpen(false)}
                className="rounded-md p-2 transition hover:bg-gray-100 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Body */}
            <div className="space-y-5 p-5">
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Form Title
                </label>

                <input
                  type="text"
                  placeholder="Enter form title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded-lg border border-gray-600 px-4 py-3 outline-none transition focus:border-white"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Description
                </label>

                <textarea
                  placeholder="Enter form description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  className="w-full resize-none rounded-lg border border-gray-600 px-4 py-3 outline-none transition focus:border-white"
                />
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-3 border-t p-5">
              <button
                onClick={() => setOpen(false)}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium transition hover:border-red-500 hover:text-red-500 cursor-pointer"
              >
                Cancel
              </button>

              <button
                onClick={handleCreateForm}
                disabled={isLoading || !title.trim()}
                className="cursor-pointer rounded-lg bg-black px-5 py-2 text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:text-white hover:border-green-500 hover:text-green-500 "
              >
                {isLoading ? "Creating..." : "Create Form"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}