import { createHmac, timingSafeEqual } from "node:crypto";

/** A form rule rejected the request. The message is safe to show to respondents. */
export class FormAccessError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "FormAccessError";
  }
}

type FormAvailability = {
  visibility: "PUBLIC" | "UNLISTED" | "PRIVATE";
  status: "DRAFT" | "PUBLISHED" | "ARCHIVE";
  expiryDate: Date | null;
  responseLimit: number | null;
  responseCount: number;
};

export function assertFormIsOpen(form: FormAvailability, now = new Date()) {
  if (form.visibility === "PRIVATE") {
    throw new FormAccessError("Form is private");
  }

  if (form.status === "ARCHIVE") {
    throw new FormAccessError("No longer accepting submissions");
  }

  if (form.status !== "PUBLISHED") {
    throw new FormAccessError("Form is not published yet");
  }

  if (form.expiryDate && now > form.expiryDate) {
    throw new FormAccessError("Form has expired");
  }

  if (form.responseLimit !== null && form.responseCount >= form.responseLimit) {
    throw new FormAccessError("No longer accepting submissions");
  }
}

export function isFormPasswordValid(storedHash: string | null, password: string | undefined) {
  if (!storedHash || !password) return false;

  const [salt, expectedHash] = storedHash.split(":");

  if (!salt || !expectedHash) return false;

  const expected = Buffer.from(expectedHash, "utf8");

  const actual = Buffer.from(createHmac("sha256", salt).update(password).digest("hex"), "utf8");

  return expected.length === actual.length && timingSafeEqual(expected, actual);
}

export function assertFormPassword(
  form: { isPasswordProtected: boolean; passwordHash: string | null },
  password: string | undefined,
) {
  if (form.isPasswordProtected && !isFormPasswordValid(form.passwordHash, password)) {
    throw new FormAccessError("Incorrect password");
  }
}

type ResponseField = {
  id: string;
  label: string;
  type: "TEXT" | "NUMBER" | "EMAIL" | "YES_NO" | "PASSWORD";
  isRequired: boolean;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Checks answers against the form's fields and returns what should be stored.
 * Answers to fields that aren't on the form are dropped.
 */
export function validateResponses(fields: ResponseField[], responses: Record<string, string>) {
  const validated: Record<string, string> = {};

  for (const field of fields) {
    const raw = responses[field.id] ?? "";

    const value = field.type === "PASSWORD" ? raw : raw.trim();

    if (!value.trim()) {
      if (field.isRequired) throw new FormAccessError(`${field.label} is required`);

      continue;
    }

    if (field.type === "EMAIL" && !EMAIL_PATTERN.test(value)) {
      throw new FormAccessError(`${field.label} must be a valid email address`);
    }

    if (field.type === "NUMBER" && !Number.isFinite(Number(value))) {
      throw new FormAccessError(`${field.label} must be a number`);
    }

    if (field.type === "YES_NO") {
      const choice = value.toLowerCase();

      if (choice !== "yes" && choice !== "no") {
        throw new FormAccessError(`${field.label} must be Yes or No`);
      }

      validated[field.id] = choice === "yes" ? "Yes" : "No";

      continue;
    }

    validated[field.id] = value;
  }

  return validated;
}
