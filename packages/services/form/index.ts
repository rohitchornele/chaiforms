import { and, asc, db, eq } from "@repo/database";
import { formsTable } from '@repo/database/models/form'
import { createFormInput, getFormByIdInput, GetFormByIdInputType, listFormsByUserIdInput, ListFormsByUserIdInputType, type CreateFormInputType } from "./model";
import { formFieldsTable } from "@repo/database/models/form-field";


class FormService {

    public async createForm(payload: CreateFormInputType) {
        const { title, description, createdBy, visibility, isPasswordProtected, passwordHash, expiryDate, responseLimit } = await createFormInput.parseAsync(payload)

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
        const { formId } = await getFormByIdInput.parseAsync(payload);

        const result = await db.select({
            formId: formsTable.id,
            title: formsTable.title,
            description: formsTable.description,
            createdAt: formsTable.createdAt,
            updatedAt: formsTable.updatedAt,
        }).from(formsTable).where(eq(formsTable.id, formId));

        // if(!result || result.length === 0 || result[0] === undefined) throw new Error("Something went wrong")

        const form = result[0];

        if (!form) {
            throw new Error(
                "Something went wrong while fetching the form"
            );
        }

        return form ;
    }


    public async getFormAndFieldsById(payload: GetFormByIdInputType) {
        
        const { formId : requestedFormId } = await getFormByIdInput.parseAsync(payload);

        const rows = await db.select({
            formId: formsTable.id,
            title: formsTable.title,
            description: formsTable.description,
            createdAt: formsTable.createdAt,
            updatedAt: formsTable.updatedAt,
            field : {
                fieldId : formFieldsTable.id,
                label : formFieldsTable.label,
                labelKey : formFieldsTable.labelKey,
                type : formFieldsTable.type,
                description : formFieldsTable.description,
                placeholder : formFieldsTable.placeholder,
                isRequired : formFieldsTable.isRequired,
                orderIndex : formFieldsTable.orderIndex
            }
        }).from(formsTable)
        .leftJoin(formFieldsTable, eq(formFieldsTable.formId, formsTable.id))
        .where(eq(formsTable.id, requestedFormId))
        .orderBy(asc(formFieldsTable.orderIndex));


        if(rows.length === 0) return null

        const { formId, title, description, createdAt, updatedAt } = rows[0]!

        const fields = rows.filter(r => r.field?.fieldId !== null)
        .map( r => r.field as NonNullable<typeof r.field>)

        return { formId, title, description, createdAt, updatedAt, fields}

    }





}

export default FormService