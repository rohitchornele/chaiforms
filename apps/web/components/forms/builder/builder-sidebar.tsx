"use client";

import { Plus } from "lucide-react";

import { FORM_THEME_IDS, FORM_THEMES, type FormTheme } from "~/lib/form-themes";

import { FIELD_TYPES, type FieldType } from "./types";

type Props = {
  theme: FormTheme;
  onAddField: (type: FieldType) => void;
  onThemeChange: (theme: FormTheme) => void;
};

export function BuilderSidebar({ theme, onAddField, onThemeChange }: Props) {
  return (
    <aside
      aria-label="Fields and themes"
      className="flex flex-col gap-7 border-b border-cf-line bg-cf-panel p-5 xl:border-r xl:border-b-0"
    >
      <section className="flex flex-col gap-2.5">
        <h2 className="text-[13px] font-semibold text-cf-subtle">Add a field</h2>

        <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2 xl:grid-cols-1">
          {FIELD_TYPES.map((type) => (
            <button
              key={type.value}
              type="button"
              onClick={() => onAddField(type.value)}
              className="flex min-h-11 items-center gap-3 rounded-lg border border-cf-line py-0 pr-3 pl-2 text-left text-sm text-cf-text transition-colors hover:bg-cf-raised"
            >
              <span
                aria-hidden="true"
                className="flex h-7 w-[30px] items-center justify-center rounded-md bg-cf-raised font-mono text-[11px] font-medium text-cf-accent-soft"
              >
                {type.glyph}
              </span>

              <span className="flex-1">{type.label}</span>

              <Plus aria-hidden="true" size={16} className="text-cf-muted" />
            </button>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-2.5">
        <h2 className="text-[13px] font-semibold text-cf-subtle">Theme</h2>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 xl:grid-cols-2">
          {FORM_THEME_IDS.map((id) => {
            const option = FORM_THEMES[id];
            const isSelected = id === theme;

            return (
              <button
                key={id}
                type="button"
                aria-pressed={isSelected}
                onClick={() => onThemeChange(id)}
                className={`flex flex-col gap-2 rounded-xl border p-1.5 pb-2 text-left text-cf-text transition-colors ${
                  isSelected
                    ? "border-cf-accent-soft bg-cf-raised"
                    : "border-cf-line hover:bg-cf-raised"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`flex w-full flex-col gap-[5px] rounded-lg border px-2 py-2.5 ${option.page} ${option.card}`}
                >
                  <span className={`block h-[5px] w-3/5 rounded-[3px] ${option.swatchTitle}`} />
                  <span className={`block h-[13px] rounded-[3px] border ${option.input}`} />
                  <span className={`block h-[11px] w-1/2 rounded-[3px] ${option.swatchButton}`} />
                </span>

                <span className="px-1 text-[13px] font-medium">{option.name}</span>
              </button>
            );
          })}
        </div>

        <p className="text-[13px] text-cf-muted">{FORM_THEMES[theme].blurb}</p>
      </section>
    </aside>
  );
}
