import { z } from 'zod';

export const createFormInputModel = z.object({
    title: z.string().describe("Title of the form"),
    description: z.string().max(300).describe("Description of the form"),
})

export const createFormOutputModel = z.object({
    id: z.string().describe("ID of the created form")
})


// export const listFormsByUserIdInputModel = z.object({
//     id: z.string().describe("ID of the user")
// })


export const listFormsByUserIdOutputModel = z.array(
    z.object({
        id: z.string().describe("ID of the form"),
        title: z.string().describe("Title of the form"),
        description: z.string().nullable().describe("Description of the form"),
        createdAt: z.date().describe("Form creation date"),
        updatedAt: z.date().nullable().describe("Form last updated date"),
    })
)


export const getFormByIdInputModel = z.object({
    id: z.string().uuid().describe('UUID of the form')
})


export const getFormByIdOutputModel = z.object({
    id: z.string().describe("ID of the form"),
    title: z.string().describe("Title of the form"),
    description: z.string().optional().describe("Description of the form"),
    createdAt: z.date().describe("Form creation date"),
    updatedAt: z.date().optional().describe("Form last updated date"),
})



const fieldTypeEnum = z.enum(['TEXT', 'NUMBER', 'EMAIL', 'YES_NO', 'PASSWORD'])

export const createFieldInputModel = z.object({
    formId: z.string().uuid().describe('UUID of the related form'),
    label: z.string().max(100).describe('Display name for the field'),
    type: fieldTypeEnum.describe("Type of the field"),
    description: z.string().optional(),
    placeholder: z.string().optional(),
    isRequired: z.boolean().optional().default(false).describe('Required flag'),
})


export const createFieldOutputModel = z.object({
    id: z.string().uuid().describe('UUID of the field'),
    labelKey: z.string(),
    orderIndex: z.string()
})


export const updateFieldInputModel = z.object({
    fieldId: z.string().uuid().describe('UUID of the field to update'),
    label: z.string().max(100).optional().describe('Updated display label'),
    type: fieldTypeEnum.describe("Type of the field updating"),
    description: z.string().nullable().describe('Updated Helper Text'),
    placeholder: z.string().describe('Updated placeholder text'),
    isRequired: z.boolean().describe('Updated required flag'),
})

export const updateFieldOutputModel = z.object({
    id: z.string().uuid().describe('UUID of the field'),
})


export const getFieldInputModel = z.object({
    formId: z.string().uuid().describe('UUID of the form to fetch field'),
})


export const getFieldOutputModel = z.array(z.object({
    fieldId: z.string().describe("Id of the field"),
    formId: z.string().uuid().describe('UUID of the form to fetch field'),
    label: z.string().max(100).describe('Display name for the field'),
    type: fieldTypeEnum.describe("Type of the field"),
    description: z.string().optional().describe('Helper text shown below the field'),
    placeholder: z.string().optional().describe('Placeholder text for the field'),
    isRequired: z.boolean().describe('Required flag'),
    orderIndex: z.string()
}))


export const deleteFieldInputModel = z.object({
    fieldId: z.string().uuid().describe('UUID of the field to delete'),
})

export const deleteFieldOutputModel = z.object({
    fieldId: z.string().uuid().describe('UUID of the deleted field'),
})




