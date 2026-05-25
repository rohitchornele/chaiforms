import { db, eq } from "@repo/database";
import { formsTable } from '@repo/database/models/form'
import { createFormInput, getFormByIdInput, GetFormByIdInputType, listFormsByUserIdInput, ListFormsByUserIdInputType, type CreateFormInputType } from "./model";


class FormService {

    public async createForm(payload: CreateFormInputType) {
        const { title, description, createdBy,visibility, isPasswordProtected, passwordHash, expiryDate, responseLimit  } = await createFormInput.parseAsync(payload)

        const result = await db.insert(formsTable).values({ title, description, createdBy, visibility, isPasswordProtected, passwordHash, expiryDate, responseLimit }).returning({
            id: formsTable.id,
        })

        if (!result || result.length === 0 || !result[0]?.id) throw new Error('Something went wrong while creating the form')

        return { id: result[0].id }
    }


    public async listFormsByUserId(payload: ListFormsByUserIdInputType) {
        const { userId } = await listFormsByUserIdInput.parseAsync(payload);

        const forms = await db.select({
            id: formsTable.id,
            title: formsTable.title,
            description: formsTable.description,
            createdAt: formsTable.createdAt,
            updatedAt: formsTable.updatedAt
        }).from(formsTable).where(eq(formsTable.createdBy, userId))

        return forms;
    }


    public async getFormById(
        payload: GetFormByIdInputType
    ) {
        const { id } =
            await getFormByIdInput.parseAsync(payload);

        const result = await db
            .select()
            .from(formsTable)
            .where(eq(formsTable.id, id));

        const form = result[0];

        if (!form) {
            throw new Error(
                "Something went wrong while fetching the form"
            );
        }

        return {
            id: form.id,

            title: form.title,

            description:
                form.description ?? undefined,

            createdAt:
                form.createdAt ?? new Date(),

            updatedAt:
                form.updatedAt ?? undefined,
        };
    }
}

export default FormService