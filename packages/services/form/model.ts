import { z } from "zod";

const visibilityEnum = z.enum(["UNLISTED", "PUBLIC", "PRIVATE"]);

const formStatusEnum = z.enum(["DRAFT", "PUBLISHED", "ARCHIVE"]);

export const createFormInput = z.object({
  title: z.string().max(64).describe("Title of the form"),
  description: z.string().max(300).optional().describe("Description of the form"),
  createdBy: z.string().uuid().describe("UUID of the user creatign the form"),
  visibility: visibilityEnum.default("UNLISTED"),
  isPasswordProtected: z.boolean().default(false),
  passwordHash: z.string().optional(),
  publishedAt: z.coerce.date().optional(),
  expiryDate: z.coerce.date().optional(),
  responseLimit: z.number().optional(),
});

export type CreateFormInputType = z.infer<typeof createFormInput>;

export const listFormsByUserIdInput = z.object({
  userId: z.string().uuid().describe("UUID of the user"),
});

export type ListFormsByUserIdInputType = z.infer<typeof listFormsByUserIdInput>;

export const getFormByIdInput = z.object({
  formId: z.string().uuid().describe("UUID of the form"),
});

export type GetFormByIdInputType = z.infer<typeof getFormByIdInput>;

export const updateFormInputModel = z
  .object({
    formId: z.string().uuid().describe("UUID of the form"),

    title: z.string().min(1).max(64).describe("Title of the form"),

    description: z.string().max(300).nullable().optional().describe("Description of the form"),

    visibility: z.enum(["PUBLIC", "UNLISTED", "PRIVATE"]),

    isPasswordProtected: z.boolean().default(false),

    publishedAt: z.date().nullable().optional(),

    expiryDate: z.date().nullable().optional(),

    responseLimit: z.number().int().positive().nullable().optional(),

    status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVE"]),
  })
  .superRefine((data, ctx) => {
    // Expiry validation
    if (data.expiryDate && data.publishedAt && data.expiryDate < data.publishedAt) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["expiryDate"],
        message: "Expiry date must be after publish date",
      });
    }
  });

export const updateFormOutputModel = z.object({
  formId: z.string(),
  title: z.string(),
  description: z.string().nullable(),

  visibility: z.enum(["PUBLIC", "UNLISTED", "PRIVATE"]),

  isPasswordProtected: z.boolean(),

  publishedAt: z.coerce.date().nullable().optional(),

  expiryDate: z.coerce.date().nullable().optional(),

  responseLimit: z.number().nullable(),

  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVE"]),

  updatedAt: z.coerce.date().nullable().optional(),
});

export type UpdateFormInputType = z.infer<typeof updateFormInputModel>;

export type UpdateFormOutputType = z.infer<typeof updateFormOutputModel>;

export const updateFormPasswordInputModel = z
  .object({
    formId: z.string().uuid(),

    isPasswordProtected: z.boolean(),

    password: z.string().min(4).max(100).optional(),
  })
  .superRefine((data, ctx) => {
    // Password required
    // when protection enabled
    if (data.isPasswordProtected && !data.password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,

        path: ["password"],

        message: "Password is required",
      });
    }
  });

export const updateFormPasswordOutputModel = z.object({
  success: z.boolean(),

  message: z.string(),
});

export type UpdateFormPasswordInputType = z.infer<typeof updateFormPasswordInputModel>;

const fieldTypeEnum = z.enum(["TEXT", "NUMBER", "EMAIL", "YES_NO", "PASSWORD"]);

export const getPublicFormBySlugInputModel = z.object({ slug: z.string() });

export const getPublicFormBySlugOutputModel = z.object({
  formId: z.string(),

  title: z.string(),

  slug: z.string(),

  description: z.string().nullable().optional(),

  isPasswordProtected: z.boolean(),

  fields: z.array(
    z.object({
      fieldId: z.string(),

      label: z.string(),

      labelKey: z.string(),

      type: fieldTypeEnum,

      isRequired: z.boolean(),

      placeholder: z.string().nullable().optional(),

      description: z.string().nullable().optional(),

      orderIndex: z.string(),
    }),
  ),
});

export type GetPublicFormBySlugInputType = z.infer<typeof getPublicFormBySlugInputModel>;

export const verifyFormPasswordInputModel = z.object({
  slug: z.string(),
  password: z.string(),
});

export const verifyFormPasswordOutputModel = z.object({
  success: z.boolean(),
});

export type VerifyFormPasswordInputType = z.infer<typeof verifyFormPasswordInputModel>;

export const listPublicFormsInput = z.object({
  page: z.number().min(1).default(1),

  limit: z.number().min(1).max(50).default(12),
});

export const listPublicFormsOutput = z.array(
  z.object({
    id: z.string(),

    title: z.string(),

    slug: z.string(),

    description: z.string().nullable(),

    status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVE"]),

    visibility: z.enum(["PUBLIC", "UNLISTED", "PRIVATE"]),

    responseCount: z.number(),

    createdAt: z.date(),
  }),
);


export type ListPublicFormsInputType = z.infer<typeof listPublicFormsInput>;