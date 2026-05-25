import FormFieldService from "@repo/services/form-field";
import { formFieldService, formService } from "../../services";
import { authenticatedProcedure, router } from "../../trpc";
import { generatePath } from "../../utils/path-generator";
import { createFieldInputModel, createFieldOutputModel, createFormInputModel, createFormOutputModel, deleteFieldInputModel, deleteFieldOutputModel, getFieldInputModel, getFieldOutputModel, getFormByIdInputModel, getFormByIdOutputModel, listFormsByUserIdOutputModel, updateFieldInputModel, updateFieldOutputModel } from "./model";
import z from "zod";


const TAGS = ["Form"];
const getPath = generatePath("/form");

export const formRouter = router({

    createForm: authenticatedProcedure
        .meta({
            openapi: {
                method: "POST",
                path: getPath('/createForm'),
                tags: TAGS,
                protect: true
            }
        })
        .input(createFormInputModel)
        .output(createFormOutputModel)
        .mutation(async ({ input, ctx }) => {
            const { title, description, visibility, isPasswordProtected, passwordHash, publishedAt, expiryDate, responseLimit  } = input;
            const { id } = await formService.createForm({ title, description, createdBy: ctx.user.id,  visibility, isPasswordProtected, passwordHash, publishedAt, expiryDate, responseLimit});
            return { id };
        }),


    listFormsByUserId: authenticatedProcedure
        .meta({
            openapi: {
                method: "GET",
                path: getPath('/listFormsByUserId'),
                tags: TAGS,
                protect: true
            }
        })
        .input(z.undefined())
        .output(listFormsByUserIdOutputModel)
        .query(async ({ ctx }) => {
            const forms = await formService.listFormsByUserId({ userId: ctx.user.id })
            return forms
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
        .query(async ({ input }) => {
            return await formService.getFormById({
                id: input.id,
            });
        }),

    createField: authenticatedProcedure
        .meta({
            openapi: {
                method: "POST",
                path: getPath('/createField'),
                tags: TAGS,
                protect: true
            }
        })
        .input(createFieldInputModel)
        .output(createFieldOutputModel)
        .mutation(async ({ input }) => {
            return await formFieldService.createField(input)
        }),

    updateField: authenticatedProcedure
        .meta({
            openapi: {
                method: "POST",
                path: getPath('/updateField'),
                tags: TAGS,
                protect: true
            }
        })
        .input(updateFieldInputModel)
        .output(updateFieldOutputModel)
        .mutation(async ({ input }) => {
            return await formFieldService.updateField(input)
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
            return await formFieldService.deleteField({ fieldId: input.fieldId })
        })


})