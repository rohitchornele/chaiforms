import db, { asc, eq, max } from "@repo/database"
import { formFieldsTable } from '@repo/database/models/form-field'
import { createFieldInput, CreateFieldInputType, deleteFieldInput, DeleteFieldInputType, getFieldInput, GetFieldInputType, updateFieldInput, UpdateFieldInputType } from "./model"



function toLabelKey(label: string): string {
    return label
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '_')
        .replace(/^_\_$/g, '')
}

class FormFieldService {
    private async getNextIndex(formId: string): Promise<string> {
        const result = await db
            .select({ maxIndex: max(formFieldsTable.orderIndex) })
            .from(formFieldsTable)
            .where(eq(formFieldsTable.formId, formId))

        const current = result[0]?.maxIndex
        const next = current ? parseFloat(current) + 1 : 1
        return next.toFixed(2)
    }

    public async createField(payload: CreateFieldInputType) {
        const { label, type, formId, description, placeholder, isRequired } = await createFieldInput.parseAsync(payload)

        const labelKey = toLabelKey(label)

        const orderIndex = await this.getNextIndex(formId)

        const result = await db
            .insert(formFieldsTable)
            .values({ label, labelKey, type, formId, description, placeholder, isRequired, orderIndex })
            .returning({
                id: formFieldsTable.id
            })

        if (!result || result.length === 0 || !result[0]?.id) {
            throw new Error('Something went wrong while creatign the field')
        }

        return { id: result[0].id, labelKey, orderIndex }

    }

    public async updateField(payload: UpdateFieldInputType) {
        const { fieldId, ...updates } = await updateFieldInput.parseAsync(payload);

        const patch: Partial<typeof formFieldsTable.$inferInsert> = {}

        if (updates.label !== undefined) patch.label = updates.label
        if (updates.type !== undefined) patch.type = updates.type
        if ('description' in updates) patch.description = updates.description ?? null
        if ('placeholder' in updates) patch.placeholder = updates.placeholder ?? null
        if (updates.isRequired !== undefined) patch.isRequired = updates.isRequired

        if (Object.keys(patch).length === 0) throw new Error('No fields provided to update')

        const result = await db
            .update(formFieldsTable)
            .set(patch)
            .where(eq(formFieldsTable.id, fieldId))
            .returning({ id: formFieldsTable.id })


        if (!result || result.length === 0) {
            throw new Error(`Field with ID ${fieldId} does not exist`)
        }

        return { id: result[0]!.id }
    }

    public async deleteField(payload: DeleteFieldInputType) {

        const { fieldId } = await deleteFieldInput.parseAsync(payload);

        const result = await db
            .delete(formFieldsTable)
            .where(eq(formFieldsTable.id, fieldId))
            .returning({ id: formFieldsTable.id })


        if (!result || result.length === 0) {
            throw new Error(`Field with ID ${fieldId} does not exist`)
        }

        return { fieldId : result[0]!.id }

    }

    public async getField(payload: GetFieldInputType) {

        const { formId } = await getFieldInput.parseAsync(payload);

        const result = await db
            .select()
            .from(formFieldsTable)
            .where(eq(formFieldsTable.formId, formId))
            .orderBy(asc(formFieldsTable.orderIndex));

        return result.map((field) => ({
            fieldId: field.id,

            formId: field.formId!,

            label: field.label,

            type: field.type,

            description: field.description ?? undefined,

            placeholder: field.placeholder ?? undefined,

            isRequired: field.isRequired,

            orderIndex: field.orderIndex,
        }));


    }

    






}


export default FormFieldService