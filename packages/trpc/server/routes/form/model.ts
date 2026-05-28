import { FORM_THEME_VALUES } from "@repo/services/form/model";
import { z } from "zod";

const visibilityEnum = z.enum(["UNLISTED", "PUBLIC", "PRIVATE"]);




const themeEnum = FORM_THEME_VALUES

export const createFormInputModel = z.object({
  title: z.string().max(64).describe("Title of the form"),
  description: z.string().max(300).optional().describe("Description of the form"),
  visibility: visibilityEnum.default("UNLISTED"),
  isPasswordProtected: z.boolean().default(false),
  passwordHash: z.string().optional(),
  theme: z.enum(
    FORM_THEME_VALUES
  ).default("sacred-tech").optional(),
  publishedAt: z.coerce.date().optional(),
  expiryDate: z.coerce.date().optional(),
  responseLimit: z.number().optional(),
});

export const createFormOutputModel = z.object({
  id: z.string().describe("ID of the created form"),
});

// export const listFormsByUserIdInputModel = z.object({
//     id: z.string().describe("ID of the user")
// })

export const listFormsByUserIdOutputModel = z.array(
  z.object({
    id: z.string().describe("ID of the form"),
    title: z.string().describe("Title of the form"),
    slug: z.string(),
    status: z.string(),
    description: z.string().nullable().describe("Description of the form"),
    theme: z.enum(
      FORM_THEME_VALUES
    ).default("sacred-tech").optional(),
    responseCount: z.number(),
    createdAt: z.date().describe("Form creation date"),
    updatedAt: z.date().nullable().describe("Form last updated date"),
  }),
);

export const getFormByIdInputModel = z.object({
  formId: z.string().uuid().describe("UUID of the form"),
});

export const getFormByIdOutputModel = z.object({
  formId: z.string().describe("ID of the form"),

  title: z.string().describe("Title of the form"),

  slug: z.string(),

  description: z.string().nullable().optional().describe("Description of the form"),

  visibility: visibilityEnum.describe("Visibility of the form"),

  isPasswordProtected: z.boolean(),

  passwordHash: z.string().nullable().optional().describe("Hashed password of protected form"),

  theme: z.enum(
    FORM_THEME_VALUES
  ).default("sacred-tech").optional(),

  publishedAt: z.date().nullable().optional().describe("Form publish date"),

  expiryDate: z.date().nullable().optional().describe("Form expiry date"),

  responseLimit: z.number().nullable().optional().describe("Maximum response limit"),

  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVE"]),

  createdAt: z.date().describe("Form creation date"),

  updatedAt: z.date().nullable().optional().describe("Form last updated date"),
});

const fieldTypeEnum = z.enum(["TEXT", "NUMBER", "EMAIL", "YES_NO", "PASSWORD"]);

export const createFieldInputModel = z.object({
  formId: z.string().uuid().describe("UUID of the related form"),
  label: z.string().max(100).describe("Display name for the field"),
  type: fieldTypeEnum.describe("Type of the field"),
  description: z.string().optional(),
  placeholder: z.string().optional(),
  isRequired: z.boolean().optional().default(false).describe("Required flag"),
});

export const createFieldOutputModel = z.object({
  id: z.string().uuid().describe("UUID of the field"),
  labelKey: z.string(),
  orderIndex: z.string(),
});

export const updateFieldInputModel = z.object({
  fieldId: z.string().uuid().describe("UUID of the field to update"),
  label: z.string().max(100).optional().describe("Updated display label"),
  type: fieldTypeEnum.describe("Type of the field updating"),
  description: z.string().nullable().describe("Updated Helper Text"),
  placeholder: z.string().describe("Updated placeholder text"),
  isRequired: z.boolean().describe("Updated required flag"),
});

export const updateFieldOutputModel = z.object({
  id: z.string().uuid().describe("UUID of the field"),
});

export const getFieldInputModel = z.object({
  formId: z.string().uuid().describe("UUID of the form to fetch field"),
});

export const getFieldOutputModel = z.array(
  z.object({
    fieldId: z.string().describe("Id of the field"),
    formId: z.string().uuid().describe("UUID of the form to fetch field"),
    label: z.string().max(100).describe("Display name for the field"),
    type: fieldTypeEnum.describe("Type of the field"),
    description: z.string().optional().describe("Helper text shown below the field"),
    placeholder: z.string().optional().describe("Placeholder text for the field"),
    isRequired: z.boolean().describe("Required flag"),
    orderIndex: z.string(),
  }),
);

export const deleteFieldInputModel = z.object({
  fieldId: z.string().uuid().describe("UUID of the field to delete"),
});

export const deleteFieldOutputModel = z.object({
  fieldId: z.string().uuid().describe("UUID of the deleted field"),
});

export const getFormAndFieldByFormIdInputModel = z.object({
  formId: z.string().uuid().describe("UUID of the form"),
});

export const getFormAndFieldInputModel = z.object({
  formId: z.string().uuid().describe("UUID of the form"),
});

export const getFormAndFieldOutputModel = z.object({
  fieldId: z.string().describe("Id of the field"),
  label: z.string().max(100).describe("Display name for the field"),
  labelKey: z.string().describe("Translation key for label"),
  type: fieldTypeEnum.describe("Type of the field"),
  description: z.string().nullable().optional(),
  placeholder: z.string().optional().nullable(),
  isRequired: z.boolean(),
  orderIndex: z.string().describe("Fractional index for ordering"),
});

export const getFormAndFieldByFormIdOutputModel = z
  .object({
    formId: z.string().describe("ID of the form"),
    title: z.string().describe("Title of the form"),
    description: z.string().nullable().optional().describe("Description of the form"),
    isPasswordProtected: z.boolean(),
    status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVE"]),
    slug: z.string(),
    createdAt: z.date().describe("Form creation date"),
    updatedAt: z.date().nullable().optional().optional().describe("Form last updated date"),
    fields: z.array(getFormAndFieldOutputModel),
  })
  .nullable();

export const formResponsesModel = z.record(z.string(), z.string());

export const submitFormInputModel = z.object({
  formId: z.string().uuid().describe("UUID of the form"),

  isPasswordProtected: z.boolean().optional().default(false),

  responses: formResponsesModel.describe("Form field responses"),

  password: z.string().optional().describe("Password for protected forms"),
});

export const submitFormOutputModel = z.object({
  submissionId: z.string(),
});

// validation for getting submissions
export const getFormSubmissionsInputModel = z.object({
  formId: z.string().uuid().describe("UUID of the form"),
});

export const formSubmissionResponseModel = z.record(z.string(), z.string());

export const formSubmissionItemModel = z.object({
  submissionId: z.string(),
  formId: z.string(),
  responses: formSubmissionResponseModel,
  status: z.enum(["PENDING", "COMPLETED"]),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const updateFormInputModel = z
  .object({
    formId: z.string().uuid().describe("UUID of the form"),

    title: z.string().min(1).max(64).describe("Title of the form"),

    description: z.string().max(300).nullable().optional().describe("Description of the form"),

    visibility: z.enum(["PUBLIC", "UNLISTED", "PRIVATE"]),

    isPasswordProtected: z.boolean().default(false),

    publishedAt: z.coerce.date().nullable().optional(),

    expiryDate: z.coerce.date().nullable().optional(),

    theme: z.enum(
      FORM_THEME_VALUES
    ).default("sacred-tech").optional(),

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

  theme: z.enum(FORM_THEME_VALUES).default("sacred-tech").optional(),

  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVE"]),

  updatedAt: z.coerce.date().nullable().optional(),
});

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

export const getPublicFormBySlugInputModel = z.object({ slug: z.string() });

export const getPublicFormBySlugOutputModel = z.object({
  formId: z.string(),

  title: z.string(),

  slug: z.string(),

  description: z.string().nullable().optional(),

  theme: z.enum(
    FORM_THEME_VALUES
  ).default("sacred-tech").optional(),

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

export const verifyFormPasswordInputModel = z.object({
  slug: z.string(),
  password: z.string(),
});

export const verifyFormPasswordOutputModel = z.object({
  success: z.boolean(),
});



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

    theme: z.enum(
      FORM_THEME_VALUES
    ).default("sacred-tech").optional(),

    responseCount: z.number(),

    createdAt: z.date(),
  }),
);
