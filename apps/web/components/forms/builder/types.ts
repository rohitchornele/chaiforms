export type FieldType = "TEXT" | "NUMBER" | "EMAIL" | "YES_NO" | "PASSWORD";

export type BuilderField = {
  id: string;
  label: string;
  description: string;
  placeholder: string;
  isRequired: boolean;
  type: FieldType;
};

export const FIELD_TYPES: { value: FieldType; label: string; glyph: string }[] = [
  { value: "TEXT", label: "Text", glyph: "Aa" },
  { value: "NUMBER", label: "Number", glyph: "12" },
  { value: "EMAIL", label: "Email", glyph: "@" },
  { value: "YES_NO", label: "Yes / No", glyph: "Y/N" },
  { value: "PASSWORD", label: "Password", glyph: "***" },
];
