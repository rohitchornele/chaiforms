import { and, asc, db, eq } from "@repo/database";
import { formsTable } from "@repo/database/models/form";
import {
    createFormInput,
    getFormByIdInput,
    GetFormByIdInputType,
    listFormsByUserIdInput,
    ListFormsByUserIdInputType,
    updateFormInputModel,
    UpdateFormInputType,
    UpdateFormOutputType,
    updateFormPasswordInputModel,
    UpdateFormPasswordInputType,
    type CreateFormInputType,
} from "./model";
import { formFieldsTable } from "@repo/database/models/form-field";
import { createHmac, randomBytes } from "node:crypto";

class FormService {
    public async createForm(payload: CreateFormInputType) {
        const {
            title,
            description,
            createdBy,
            visibility,
            isPasswordProtected,
            passwordHash,
            expiryDate,
            responseLimit,
        } = await createFormInput.parseAsync(payload);

        const result = await db
            .insert(formsTable)
            .values({
                title,
                description,
                createdBy,
                visibility,
                isPasswordProtected,
                passwordHash,
                expiryDate,
                responseLimit,
            })
            .returning({
                id: formsTable.id,
            });

        if (!result || result.length === 0 || !result[0]?.id)
            throw new Error("Something went wrong while creating the form");

        return { id: result[0].id };
    }

    public async listFormsByUserId(payload: ListFormsByUserIdInputType) {
        const { userId } = await listFormsByUserIdInput.parseAsync(payload);

        const forms = await db
            .select({
                id: formsTable.id,
                title: formsTable.title,
                description: formsTable.description,
                createdAt: formsTable.createdAt,
                updatedAt: formsTable.updatedAt,
            })
            .from(formsTable)
            .where(eq(formsTable.createdBy, userId));

        return forms;
    }

    public async getFormById(payload: GetFormByIdInputType) {
        const { formId } = await getFormByIdInput.parseAsync(payload);

        const result = await db
            .select({
                formId: formsTable.id,
                title: formsTable.title,
                description: formsTable.description,
                visibility: formsTable.visibility,
                isPasswordProtected: formsTable.isPasswordProtected,
                passwordHash: formsTable.passwordHash,
                publishedAt: formsTable.publishedAt,
                expiryDate: formsTable.expiryDate,
                responseLimit: formsTable.responseLimit,
                status: formsTable.status,
                createdAt: formsTable.createdAt,
                updatedAt: formsTable.updatedAt,
            })
            .from(formsTable)
            .where(eq(formsTable.id, formId));

        // if(!result || result.length === 0 || result[0] === undefined) throw new Error("Something went wrong")

        const form = result[0];

        if (!form) {
            throw new Error("Something went wrong while fetching the form");
        }

        return form;
    }

    public async getFormAndFieldsById(payload: GetFormByIdInputType) {
        const { formId: requestedFormId } = await getFormByIdInput.parseAsync(payload);

        const rows = await db
            .select({
                formId: formsTable.id,
                title: formsTable.title,
                description: formsTable.description,
                isPasswordProtected: formsTable.isPasswordProtected,
                createdAt: formsTable.createdAt,
                updatedAt: formsTable.updatedAt,
                field: {
                    fieldId: formFieldsTable.id,
                    label: formFieldsTable.label,
                    labelKey: formFieldsTable.labelKey,
                    type: formFieldsTable.type,
                    description: formFieldsTable.description,
                    placeholder: formFieldsTable.placeholder,
                    isRequired: formFieldsTable.isRequired,
                    orderIndex: formFieldsTable.orderIndex,
                },
            })
            .from(formsTable)
            .leftJoin(formFieldsTable, eq(formFieldsTable.formId, formsTable.id))
            .where(eq(formsTable.id, requestedFormId))
            .orderBy(asc(formFieldsTable.orderIndex));

        if (rows.length === 0) return null;

        const { formId, title, description, isPasswordProtected, createdAt, updatedAt } = rows[0]!;

        const fields = rows
            .filter((r) => r.field?.fieldId !== null)
            .map((r) => r.field as NonNullable<typeof r.field>);

        return { formId, title, description, isPasswordProtected, createdAt, updatedAt, fields };
    }

    public async updateForm(
        payload: UpdateFormInputType,
        userId: string,
    ): Promise<UpdateFormOutputType> {
        const validatedData = await updateFormInputModel.parseAsync(payload);

        // Check ownership
        const existingFormRows = await db
            .select({
                id: formsTable.id,
            })
            .from(formsTable)
            .where(
                and(
                    eq(formsTable.id, validatedData.formId),

                    eq(formsTable.createdBy, userId),
                ),
            )
            .limit(1);

        const existingForm = existingFormRows[0];

        if (!existingForm) {
            throw new Error("FORM NOT FOUND");
        }

        // Password hash
        // let passwordHash:
        //     string | null = null;

        // if (
        //     validatedData.isPasswordProtected
        // ) {
        //     passwordHash = validatedData.passwordHash
        // await bcrypt.hash(
        //   validatedData.password!,
        //   10
        // );
        // }

        // Update form
        const updatedRows = await db
            .update(formsTable)
            .set({
                title: validatedData.title,

                description: validatedData.description,

                visibility: validatedData.visibility,

                isPasswordProtected: validatedData.isPasswordProtected,

                publishedAt: validatedData.publishedAt,

                expiryDate: validatedData.expiryDate,

                responseLimit: validatedData.responseLimit,

                status: validatedData.status,

                updatedAt: new Date(),
            })
            .where(eq(formsTable.id, validatedData.formId))
            .returning({
                formId: formsTable.id,

                title: formsTable.title,

                description: formsTable.description,

                visibility: formsTable.visibility,

                isPasswordProtected: formsTable.isPasswordProtected,

                publishedAt: formsTable.publishedAt,

                expiryDate: formsTable.expiryDate,

                responseLimit: formsTable.responseLimit,

                status: formsTable.status,

                updatedAt: formsTable.updatedAt,
            });

        return updatedRows[0]!;
    }




    private async generateHash(salt: string, password: string) {
        return createHmac("sha256", salt).update(password).digest("hex");
    }

    public async updateFormPassword(payload: UpdateFormPasswordInputType, userId: string) {
        const validatedData = await updateFormPasswordInputModel.parseAsync(payload);

        // Verify ownership
        const formRows = await db
            .select({
                id: formsTable.id,
            })
            .from(formsTable)
            .where(
                and(
                    eq(formsTable.id, validatedData.formId),

                    eq(formsTable.createdBy, userId),
                ),
            )
            .limit(1);

        const form = formRows[0];

        if (!form) {
            throw new Error("Form not found");
        }

        let passwordHash: string | null = null;

        // Create new password hash
        if (validatedData.isPasswordProtected && validatedData.password) {
            const salt = randomBytes(16).toString("hex");

            const hashedPassword = await this.generateHash(
                salt,

                validatedData.password,
            );

            passwordHash = `${salt}:${hashedPassword}`;
        }

        // Remove existing password
        if (!validatedData.isPasswordProtected) {
            passwordHash = null;
        }

        // Update form
        await db
            .update(formsTable)
            .set({
                isPasswordProtected: validatedData.isPasswordProtected,

                passwordHash,

                updatedAt: new Date(),
            })
            .where(eq(formsTable.id, validatedData.formId));

        return {
            success: true,

            message: validatedData.isPasswordProtected
                ? "Password updated successfully"
                : "Password protection removed successfully",
        };
    }
}

export default FormService;
