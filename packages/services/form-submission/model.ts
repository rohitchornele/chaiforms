// submission.validation.ts

import { z } from "zod";

export const formResponsesModel = z.record(
  z.string(),
  z.string()
);

export const createFormSubmissionInputModel = z.object({

  formId: z.string().uuid().describe("UUID of the form"),

  isPasswordProtected : z.boolean(),

  responses: formResponsesModel.describe("Form field responses"),

  password: z.string().optional().describe("Password for protected forms"),
});



export const createFormSubmissionOutputModel = z.object({
  submissionId: z.string(),
  formId: z.string(),
  status: z.enum(["PENDING", "COMPLETED"]),
  createdAt: z.date(),
});

export type CreateFormSubmissionInputType = z.infer<typeof createFormSubmissionInputModel>;

export type CreateFormSubmissionOutputType = z.infer<typeof createFormSubmissionOutputModel>;




/// get submissions based on from id :

export const getFormSubmissionsInputModel = z.object({
  formId: z.string().uuid().describe("UUID of the form"),
});

export type GetFormSubmissionsInputType = z.infer<typeof getFormSubmissionsInputModel>;


export const formSubmissionResponseModel = z.record(z.string(),z.string());

export const formSubmissionItemModel = z.object({

  submissionId: z.string(),
  formId: z.string(),
  responses: formSubmissionResponseModel,
  status: z.enum(["PENDING", "COMPLETED"]),
  createdAt: z.date(),
  updatedAt: z.date(),

});

export const getFormSubmissionsOutputModel = z.array(formSubmissionItemModel);

export type GetFormSubmissionsOutputType = z.infer<typeof getFormSubmissionsOutputModel>;