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

const TAGS = ["Form"];
const getPath = generatePath("/form");

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
      return forms;
    }),

  getFormById: publicProcedure
    .meta({
      openapi: {
        method: "GET",
        path: getPath("/getFormById"),
        tags: TAGS,
      },
    })
    .input(getFormByIdInputModel)
    .output(getFormByIdOutputModel)
    .query(async ({ input }) => {
      return await formService.getFormById({
        formId: input.formId,
      });
    }),

  getFormAndFieldById: publicProcedure
    .meta({
      openapi: {
        method: "GET",
        path: getPath("/getFormAndFieldById"),
        tags: TAGS,
      },
    })
    .input(getFormAndFieldInputModel)
    .output(getFormAndFieldByFormIdOutputModel)
    .query(async ({ input }) => {
      return formService.getFormAndFieldsById({ formId: input.formId });
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
      return formService.getPublicFormBySlug(input);
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
      return formService.verifyFormPassword(input);
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
    .mutation(async ({ input }) => {
      return await formFieldService.createField(input);
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
    .mutation(async ({ input }) => {
      return await formFieldService.updateField(input);
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
    .query(async ({ input }) => {
      return await formFieldService.getField({
        formId: input.formId,
      });
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
    .mutation(async ({ input }) => {
      return await formFieldService.deleteField({ fieldId: input.fieldId });
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
      return await submissionService.createSubmission(input);
    }),
});
