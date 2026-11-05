import db, { and, asc, eq, max } from "@repo/database"
import { formFieldsTable } from '@repo/database/models/form-field'
import { formsTable } from '@repo/database/models/form'
import { createFieldInput, CreateFieldInputType, deleteFieldInput, DeleteFieldInputType, getFieldInput, GetFieldInputType, reorderFieldsInput, ReorderFieldsInputType, updateFieldInput, UpdateFieldInputType } from "./model"



function toLabelKey(label: string): string {
    return label
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '_')
        .replace(/^_\_$/g, '')
}

class FormFieldService {
    private async assertOwnsForm(formId: string, userId: string) {
        const ownedForms = await db
            .select({ id: formsTable.id })
            .from(formsTable)
            .where(and(eq(formsTable.id, formId), eq(formsTable.createdBy, userId)))
            .limit(1);

        if (ownedForms.length === 0) throw new Error('Form not found');
    }

    private async assertOwnsField(fieldId: string, userId: string) {
        const ownedFields = await db
            .select({ id: formFieldsTable.id })
            .from(formFieldsTable)
            .innerJoin(formsTable, eq(formFieldsTable.formId, formsTable.id))
            .where(and(eq(formFieldsTable.id, fieldId), eq(formsTable.createdBy, userId)))
            .limit(1);

        if (ownedFields.length === 0) throw new Error(`Field with ID ${fieldId} does not exist`);
    }

    private async getNextIndex(formId: string): Promise<string> {
        const result = await db
            .select({ maxIndex: max(formFieldsTable.orderIndex) })
            .from(formFieldsTable)
            .where(eq(formFieldsTable.formId, formId))

        const current = result[0]?.maxIndex
        const next = current ? parseFloat(current) + 1 : 1
        return next.toFixed(2)
    }

    public async createField(payload: CreateFieldInputType, userId: string) {
        const { label, type, formId, description, placeholder, isRequired } = await createFieldInput.parseAsync(payload)

        await this.assertOwnsForm(formId, userId)

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

    public async updateField(payload: UpdateFieldInputType, userId: string) {
        const { fieldId, ...updates } = await updateFieldInput.parseAsync(payload);

        await this.assertOwnsField(fieldId, userId);

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

    public async deleteField(payload: DeleteFieldInputType, userId: string) {

        const { fieldId } = await deleteFieldInput.parseAsync(payload);

        await this.assertOwnsField(fieldId, userId);

        const result = await db
            .delete(formFieldsTable)
            .where(eq(formFieldsTable.id, fieldId))
            .returning({ id: formFieldsTable.id })


        if (!result || result.length === 0) {
            throw new Error(`Field with ID ${fieldId} does not exist`)
        }

        return { fieldId : result[0]!.id }

    }

    public async reorderFields(payload: ReorderFieldsInputType, userId: string) {
        const { formId, fieldIds } = await reorderFieldsInput.parseAsync(payload);

        await this.assertOwnsForm(formId, userId);

        const existingFields = await db
            .select({ id: formFieldsTable.id })
            .from(formFieldsTable)
            .where(eq(formFieldsTable.formId, formId));

        const existingIds = new Set(existingFields.map((field) => field.id));

        const isSameSetOfFields =
            new Set(fieldIds).size === fieldIds.length &&
            fieldIds.length === existingIds.size &&
            fieldIds.every((fieldId) => existingIds.has(fieldId));

        if (!isSameSetOfFields) throw new Error('Field list does not match this form');

        // (form_id, order_index) is unique and checked per statement, so fields
        // move through negative positions to avoid colliding with each other.
        await db.transaction(async (tx) => {
            for (const [index, fieldId] of fieldIds.entries()) {
                await tx
                    .update(formFieldsTable)
                    .set({ orderIndex: (-(index + 1)).toFixed(2) })
                    .where(eq(formFieldsTable.id, fieldId));
            }

            for (const [index, fieldId] of fieldIds.entries()) {
                await tx
                    .update(formFieldsTable)
                    .set({ orderIndex: (index + 1).toFixed(2) })
                    .where(eq(formFieldsTable.id, fieldId));
            }
        });

        return { success: true };
    }

    public async getField(payload: GetFieldInputType, userId: string) {

        const { formId } = await getFieldInput.parseAsync(payload);

        await this.assertOwnsForm(formId, userId);

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