export type FormStatus =
  | "draft"
  | "published"
  | "archived";

export type FormVisibility =
  | "PUBLIC"
  | "UNLISTED"
  | "PRIVATE";

export type Form = {
  id: string;

  title: string;

  description?: string;

  createdAt: string | Date;

  status?: FormStatus;

  responseCount?: number;
};