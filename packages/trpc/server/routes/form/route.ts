import { getFormSubmissionsOutputModel } from "@repo/services/form-submission/model";
import { formFieldService, formService, submissionService } from "../../services";
import { authenticatedProcedure, publicProcedure, router } from "../../trpc";
import { generatePath } from "../../utils/path-generator";
import {
  createFieldInputModel,
  createFieldOutputModel,
  createFormInputModel,
  createFormOutputModel,
  deleteFieldInputModel,
  deleteFieldOutputModel,
  getFieldInputModel,
  getFieldOutputModel,
  getFormAndFieldByFormIdOutputModel,
  getFormAndFieldInputModel,
  getFormByIdInputModel,
  getFormByIdOutputModel,
  getFormSubmissionsInputModel,
  getPublicFormBySlugInputModel,
  getPublicFormBySlugOutputModel,
  listFormsByUserIdOutputModel,
  listPublicFormsInput,
  listPublicFormsOutput,
  reorderFieldsInputModel,
  reorderFieldsOutputModel,
  submitFormInputModel,
  submitFormOutputModel,
  updateFieldInputModel,
  updateFieldOutputModel,
  updateFormInputModel,
  updateFormOutputModel,
  updateFormPasswordInputModel,
  updateFormPasswordOutputModel,
  verifyFormPasswordInputModel,
  verifyFormPasswordOutputModel,
} from "./model";
import z from "zod";
import { TRPCError } from "@trpc/server";
import { FormAccessError } from "@repo/services/form/access";
import { FormTheme } from "@repo/services/form/model";

const TAGS = ["Form"];
const getPath = generatePath("/form");

/** Sends form rule rejections as client errors, with a message the UI can show. */
async function withFormAccessErrors<T>(action: () => Promise<T>) {
  try {
    return await action();
  } catch (error) {
    if (error instanceof FormAccessError) {
      throw new TRPCError({ code: "PRECONDITION_FAILED", message: error.message });
    }

    throw error;
  }
}

export const formRouter = router({
  // -----------Form Procedures ----------------------

  createForm: authenticatedProcedure
    .meta({
      openapi: {
        method: "POST",
        path: getPath("/createForm"),
        tags: TAGS,
        protect: true,
      },
    })
    .input(createFormInputModel)
    .output(createFormOutputModel)
    .mutation(async ({ input, ctx }) => {
      const {
        title,
        description,
        visibility,
        isPasswordProtected,
        passwordHash,
        theme,
        publishedAt,
        expiryDate,
        responseLimit,
      } = input;
      const { id } = await formService.createForm({
        title,
        description,
        createdBy: ctx.user.id,
        visibility,
        isPasswordProtected,
        passwordHash,
        theme,
        publishedAt,
        expiryDate,
        responseLimit,
      });
      return { id };
    }),

  listFormsByUserId: authenticatedProcedure
    .meta({
      openapi: {
        method: "GET",
        path: getPath("/listFormsByUserId"),
        tags: TAGS,
        protect: true,
      },
    })
    .input(z.undefined())
    .output(listFormsByUserIdOutputModel)
    .query(async ({ ctx }) => {
      const forms = await formService.listFormsByUserId({ userId: ctx.user.id });
      // return forms;
      return forms.map((form) => ({
        ...form,

        theme:
          form.theme as FormTheme,
      }));
    }),

  getFormById: authenticatedProcedure
    .meta({
      openapi: {
        method: "GET",
        path: getPath("/getFormById"),
        tags: TAGS,
        protect: true,
      },
    })
    .input(getFormByIdInputModel)
    .output(getFormByIdOutputModel)
    .query(async ({ input, ctx }) => {
      return await formService.getFormById(
        {
          formId: input.formId,
        },
        ctx.user.id,
      );
    }),

  getFormAndFieldById: authenticatedProcedure
    .meta({
      openapi: {
        method: "GET",
        path: getPath("/getFormAndFieldById"),
        tags: TAGS,
        protect: true,
      },
    })
    .input(getFormAndFieldInputModel)
    .output(getFormAndFieldByFormIdOutputModel)
    .query(async ({ input, ctx }) => {
      return formService.getFormAndFieldsById({ formId: input.formId }, ctx.user.id);
    }),

  getFormSubmissions: authenticatedProcedure
    .meta({
      openapi: {
        method: "GET",
        path: getPath("/getFormSubmissions"),
        tags: TAGS,
        protect: true,
      },
    })
    .input(getFormSubmissionsInputModel)
    .output(getFormSubmissionsOutputModel)
    .query(async ({ input, ctx }) => {
      return submissionService.getFormSubmissions({ formId: input.formId }, ctx.user.id);
    }),

  updateForm: authenticatedProcedure
    .meta({
      openapi: {
        method: "PUT",

        path: getPath("/updateForm"),

        tags: TAGS,
      },
    })

    .input(updateFormInputModel)

    .output(updateFormOutputModel)

    .mutation(async ({ input, ctx }) => {
      return formService.updateForm(input, ctx.user.id);
    }),

  updateFormPassword: authenticatedProcedure

    .meta({
      openapi: {
        method: "PUT",

        path: getPath("/updateFormPassword"),

        tags: TAGS,
      },
    })

    .input(updateFormPasswordInputModel)

    .output(updateFormPasswordOutputModel)

    .mutation(async ({ input, ctx }) => {
      return formService.updateFormPassword(
        input,

        ctx.user.id,
      );
    }),

  getPublicFormBySlug: publicProcedure
    .meta({
      openapi: {
        method: "GET",
        path: getPath("/public/{slug}"),
        tags: TAGS,
      },
    })
    .input(getPublicFormBySlugInputModel)

    .output(getPublicFormBySlugOutputModel)
    .query(async ({ input }) => {
      return withFormAccessErrors(() => formService.getPublicFormBySlug(input));
    }),

  verifyFormPassword: publicProcedure

    .meta({
      openapi: {
        method: "POST",

        path: getPath("/verifyFormPassword"),

        tags: TAGS,
      },
    })

    .input(verifyFormPasswordInputModel)

    .output(verifyFormPasswordOutputModel)

    .mutation(async ({ input }) => {
      return withFormAccessErrors(() => formService.verifyFormPassword(input));
    }),


  listPublicForms: publicProcedure
    .meta({
      openapi: {
        method: "POST",

        path: getPath("/exploreForms"),

        tags: TAGS,
      },
    })

    .input(listPublicFormsInput)

    .output(listPublicFormsOutput)
    .query(async ({ ctx, input }) => {
      return formService.listPublicForms(input.page, input.limit);
    }),

  // -----------Form Field Procedures ----------------------

  createField: authenticatedProcedure
    .meta({
      openapi: {
        method: "POST",
        path: getPath("/createField"),
        tags: TAGS,
        protect: true,
      },
    })
    .input(createFieldInputModel)
    .output(createFieldOutputModel)
    .mutation(async ({ input, ctx }) => {
      return await formFieldService.createField(input, ctx.user.id);
    }),

  updateField: authenticatedProcedure
    .meta({
      openapi: {
        method: "POST",
        path: getPath("/updateField"),
        tags: TAGS,
        protect: true,
      },
    })
    .input(updateFieldInputModel)
    .output(updateFieldOutputModel)
    .mutation(async ({ input, ctx }) => {
      return await formFieldService.updateField(input, ctx.user.id);
    }),

  getField: authenticatedProcedure
    .meta({
      openapi: {
        method: "POST",
        path: getPath("/getField"),
        tags: TAGS,
        protect: true,
      },
    })
    .input(getFieldInputModel)
    .output(getFieldOutputModel)
    .query(async ({ input, ctx }) => {
      return await formFieldService.getField(
        {
          formId: input.formId,
        },
        ctx.user.id,
      );
    }),

  deleteField: authenticatedProcedure
    .meta({
      openapi: {
        method: "POST",
        path: getPath("/deleteField"),
        tags: TAGS,
        protect: true,
      },
    })
    .input(deleteFieldInputModel)
    .output(deleteFieldOutputModel)
    .mutation(async ({ input, ctx }) => {
      return await formFieldService.deleteField({ fieldId: input.fieldId }, ctx.user.id);
    }),

  reorderFields: authenticatedProcedure
    .meta({
      openapi: {
        method: "POST",
        path: getPath("/reorderFields"),
        tags: TAGS,
        protect: true,
      },
    })
    .input(reorderFieldsInputModel)
    .output(reorderFieldsOutputModel)
    .mutation(async ({ input, ctx }) => {
      return await formFieldService.reorderFields(input, ctx.user.id);
    }),

  // submit form route

  submitForm: publicProcedure
    .meta({
      openapi: {
        method: "POST",
        path: getPath("/submitForm"),
        tags: TAGS,
      },
    })
    .input(submitFormInputModel)
    .output(submitFormOutputModel)
    .mutation(async ({ input }) => {
      return withFormAccessErrors(() => submissionService.createSubmission(input));
    }),
});
