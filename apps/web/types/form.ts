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

  createdAt: string | Date;

  status?: FormStatus;

  responseCount?: number;
};