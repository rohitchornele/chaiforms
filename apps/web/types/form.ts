export type FormStatus =
  | "DRAFT"
  | "PUBLISHED"
  | "ARCHIVE";

export type FormVisibility =
  | "PUBLIC"
  | "UNLISTED"
  | "PRIVATE";

export type Form = {
  
  id: string;

  title: string;

  slug : string;

  description?: string;

  visibility? : string;

  createdAt: string | Date;

  status?: FormStatus;

  responseCount?: number;

};

export const FORM_THEMES = [
  "sacred-tech",
  "cyberpunk",
  "anime",
  "startup-os",
] as const;

export type FormTheme =
  (typeof FORM_THEMES)[number];