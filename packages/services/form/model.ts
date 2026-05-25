import {z} from 'zod';


const visibilityEnum = z.enum(['UNLISTED', 'PUBLIC', 'PRIVATE'])

export const createFormInput = z.object({
    title : z.string().max(64).describe('Title of the form'),
    description: z.string().max(300).optional().describe('Description of the form'),
    createdBy : z.string().uuid().describe("UUID of the user creatign the form"),
    visibility : visibilityEnum.default("UNLISTED"),
    isPasswordProtected : z.boolean().default(false),
    passwordHash : z.string().optional(),
    publishedAt : z.coerce.date().optional(),
    expiryDate : z.coerce.date().optional(),
    responseLimit : z.number().optional(),
})

export type CreateFormInputType = z.infer<typeof createFormInput>


export const listFormsByUserIdInput = z.object({
    userId : z.string().uuid().describe('UUID of the user')
})

export type ListFormsByUserIdInputType = z.infer<typeof listFormsByUserIdInput>


export const getFormByIdInput = z.object({
    id : z.string().uuid().describe('UUID of the form')
})


export type GetFormByIdInputType = z.infer<typeof getFormByIdInput>