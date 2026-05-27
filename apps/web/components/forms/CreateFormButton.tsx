"use client";

import { useState } from "react";

import CreateFormModal from "./CreateFormModal";

type Props = {
  children: React.ReactNode;

  className?: string;
};

export default function CreateFormButton({
  children,
  className,
}: Props) {
  const [open, setOpen] =
    useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={className}
      >
        {children}
      </button>

      <CreateFormModal
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}