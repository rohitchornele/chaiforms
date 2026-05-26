import { z } from 'zod';

const visibilityEnum = z.enum(['UNLISTED', 'PUBLIC', 'PRIVATE'])

export const createFormInputModel = z.object({
    title: z.string().max(64).describe('Title of the form'),
    description: z.string().max(300).optional().describe('Description of the form'),
    visibility: visibilityEnum.default("UNLISTED"),
    isPasswordProtected: z.boolean().default(false),
    passwordHash: z.string().optional(),
    publishedAt: z.coerce.date().optional(),
    expiryDate: z.coerce.date().optional(),
    responseLimit: z.number().optional(),
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
    formId: z.string().uuid().describe('UUID of the form')
})


export const getFormByIdOutputModel = z.object({
    formId: z.string().describe("ID of the form"),
    title: z.string().describe("Title of the form"),
    description: z.string().nullable().optional().describe("Description of the form"),
    createdAt: z.date().describe("Form creation date"),
    updatedAt: z.date().nullable().optional().optional().describe("Form last updated date"),
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


export const getFormAndFieldByFormIdInputModel = z.object({
    formId: z.string().uuid().describe('UUID of the form')
})



export const getFormAndFieldInputModel = z.object({
    formId: z.string().uuid().describe('UUID of the form'),
})


export const getFormAndFieldOutputModel = z.object({
    fieldId: z.string().describe("Id of the field"),
    label: z.string().max(100).describe('Display name for the field'),
    labelKey: z.string().describe("Translation key for label"),
    type: fieldTypeEnum.describe("Type of the field"),
    description: z.string().nullable().optional(),
    placeholder: z.string().optional().nullable(),
    isRequired: z.boolean(),
    orderIndex: z.string().describe("Fractional index for ordering")
})


export const getFormAndFieldByFormIdOutputModel = z.object({
    formId: z.string().describe("ID of the form"),
    title: z.string().describe("Title of the form"),
    description: z.string().nullable().optional().describe("Description of the form"),
    isPasswordProtected :z.boolean() ,
    createdAt: z.date().describe("Form creation date"),
    updatedAt: z.date().nullable().optional().optional().describe("Form last updated date"),
    fields: z.array(getFormAndFieldOutputModel)
}).nullable()



export const formResponsesModel = z.record(
    z.string(),
    z.string()
);


export const submitFormInputModel = z.object({

    formId: z.string().uuid().describe("UUID of the form"),

    isPasswordProtected : z.boolean().optional().default(false),

    responses: formResponsesModel.describe("Form field responses"),

    password: z.string().optional().describe("Password for protected forms"),
})


export const submitFormOutputModel = z.object({
  submissionId: z.string(),
});


// validation for getting submissions
export const getFormSubmissionsInputModel = z.object({
  formId: z.string().uuid().describe("UUID of the form"),
});


export const formSubmissionResponseModel = z.record(z.string(),z.string());

export const formSubmissionItemModel = z.object({

  submissionId: z.string(),
  formId: z.string(),
  responses: formSubmissionResponseModel,
  status: z.enum(["PENDING", "COMPLETED"]),
  createdAt: z.date(),
  updatedAt: z.date(),

});
