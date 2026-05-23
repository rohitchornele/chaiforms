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
