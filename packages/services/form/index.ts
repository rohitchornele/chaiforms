import { nanoid } from "nanoid";

import { and, asc, count, db, desc, eq } from "@repo/database";
import { formsTable } from "@repo/database/models/form";
import { formSubmissionTable } from "@repo/database/models/form-submission";
import {
  createFormInput,
  FormTheme,
  getFormByIdInput,
  GetFormByIdInputType,
  getPublicFormBySlugInputModel,
  GetPublicFormBySlugInputType,
  listFormsByUserIdInput,
  ListFormsByUserIdInputType,
  updateFormInputModel,
  UpdateFormInputType,
  UpdateFormOutputType,
  updateFormPasswordInputModel,
  UpdateFormPasswordInputType,
  verifyFormPasswordInputModel,
  VerifyFormPasswordInputType,
  type CreateFormInputType,
} from "./model";
import { formFieldsTable } from "@repo/database/models/form-field";
import { createHmac, randomBytes } from "node:crypto";

function generateSlug(title: string) {
  const cleanTitle = title
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

  return `${cleanTitle}-${nanoid(6)}`;
}

class FormService {
  public async createForm(payload: CreateFormInputType) {
    const {
      title,
      description,
      createdBy,
      visibility,
      isPasswordProtected,
      passwordHash,
      theme,
      expiryDate,
      responseLimit,
    } = await createFormInput.parseAsync(payload);

    const result = await db
      .insert(formsTable)
      .values({
        title,
        slug: generateSlug(title),
        description,
        createdBy,
        visibility,
        isPasswordProtected,
        passwordHash,
        theme,
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

        slug: formsTable.slug,

        description: formsTable.description,

        status: formsTable.status,

        theme: formsTable.theme,

        createdAt: formsTable.createdAt,

        updatedAt: formsTable.updatedAt,

        responseCount: formsTable.responseCount,
      })

      .from(formsTable)

      .where(eq(formsTable.createdBy, userId))

      .orderBy(desc(formsTable.createdAt));

    // return forms;
    return forms.map((form) => ({
      ...form,

      theme:
        form.theme as FormTheme,
    }));
  }

  public async getFormById(payload: GetFormByIdInputType) {
    const { formId } = await getFormByIdInput.parseAsync(payload);

    const result = await db
      .select({
        formId: formsTable.id,
        title: formsTable.title,
        slug: formsTable.slug,
        description: formsTable.description,
        visibility: formsTable.visibility,
        isPasswordProtected: formsTable.isPasswordProtected,
        passwordHash: formsTable.passwordHash,
        publishedAt: formsTable.publishedAt,
        expiryDate: formsTable.expiryDate,
        theme: formsTable.theme,
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

    return {
      ...form,

      theme:
        form.theme as FormTheme,
    };
  }

  public async getFormAndFieldsById(payload: GetFormByIdInputType) {
    const { formId: requestedFormId } = await getFormByIdInput.parseAsync(payload);

    const rows = await db
      .select({
        formId: formsTable.id,
        title: formsTable.title,
        description: formsTable.description,
        isPasswordProtected: formsTable.isPasswordProtected,
        theme: formsTable.theme,
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

    const { formId, title, description, theme, isPasswordProtected, createdAt, updatedAt } = rows[0]!;

    const fields = rows
      .filter((r) => r.field?.fieldId !== null)
      .map((r) => r.field as NonNullable<typeof r.field>);

    return { formId, title, description, theme, isPasswordProtected, createdAt, updatedAt, fields };
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

        theme: validatedData.theme,

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

        theme: formsTable.theme,

        status: formsTable.status,

        updatedAt: formsTable.updatedAt,
      });

    return {
      ...updatedRows[0]!,

      theme:
        updatedRows[0]!
          .theme as FormTheme,
    };
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

      const hashedPassword = await this.generateHash(salt, validatedData.password);

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

  public async getPublicFormBySlug(payload: GetPublicFormBySlugInputType) {
    const validatedData = await getPublicFormBySlugInputModel.parseAsync(payload);

    // Get form
    const formRows = await db
      .select({
        formId: formsTable.id,

        title: formsTable.title,

        slug: formsTable.slug,

        description: formsTable.description,

        visibility: formsTable.visibility,

        status: formsTable.status,

        expiryDate: formsTable.expiryDate,

        responseLimit: formsTable.responseLimit,

        isPasswordProtected: formsTable.isPasswordProtected,

        theme: formsTable.theme,
      })
      .from(formsTable)
      .where(eq(formsTable.slug, validatedData.slug))
      .limit(1);

    const form = formRows[0];

    if (!form) {
      throw new Error("Form not found");
    }

    // Visibility check
    if (form.visibility === "PRIVATE") {
      throw new Error("Form is private");
    }

    if (form.status == "ARCHIVE") {
      throw new Error("No longer accepting submissions");
    }

    // Published check
    if (form.status !== "PUBLISHED") {
      throw new Error("Form is not published yet");
    }

    // Expiry check
    if (form.expiryDate && new Date() > form.expiryDate) {
      throw new Error("Form has expired");
    }

    // Get fields
    const fields = await db
      .select({
        fieldId: formFieldsTable.id,

        label: formFieldsTable.label,

        labelKey: formFieldsTable.labelKey,

        type: formFieldsTable.type,

        isRequired: formFieldsTable.isRequired,

        placeholder: formFieldsTable.placeholder,

        description: formFieldsTable.description,

        orderIndex: formFieldsTable.orderIndex,
      })
      .from(formFieldsTable)
      .where(eq(formFieldsTable.formId, form.formId))
      .orderBy(asc(formFieldsTable.orderIndex));

    return {
      formId: form.formId,

      title: form.title,

      slug: form.slug,

      description: form.description,

      isPasswordProtected: form.isPasswordProtected,

      theme: form.theme as FormTheme,

      fields,
    };
  }

  public async verifyFormPassword(payload: VerifyFormPasswordInputType) {
    const validatedData = await verifyFormPasswordInputModel.parseAsync(payload);

    const formRows = await db
      .select({
        slug: formsTable.slug,

        passwordHash: formsTable.passwordHash,

        isPasswordProtected: formsTable.isPasswordProtected,
      })
      .from(formsTable)
      .where(eq(formsTable.slug, validatedData.slug))
      .limit(1);

    const form = formRows[0];

    if (!form) {
      throw new Error("Form not found");
    }

    // Not protected
    if (!form.isPasswordProtected) {
      return { success: true };
    }

    // Missing hash
    if (!form.passwordHash) {
      throw new Error("Password not configured");
    }

    const [salt, storedHash] = form.passwordHash.split(":");

    const incomingHash = await this.generateHash(salt!, validatedData.password);

    const isValid = incomingHash === storedHash;

    if (!isValid) {
      throw new Error("Invalid password");
    }

    return {
      success: true,
    };
  }

  public async listPublicForms(page = 1, limit = 12) {
    const forms = await db

      .select({
        id: formsTable.id,

        title: formsTable.title,

        slug: formsTable.slug,

        description: formsTable.description,

        status: formsTable.status,

        theme: formsTable.theme,

        visibility: formsTable.visibility,

        responseCount: formsTable.responseCount,

        createdAt: formsTable.createdAt,
      })

      .from(formsTable)

      .where(
        and(
          eq(formsTable.status, "PUBLISHED"),

          eq(formsTable.visibility, "PUBLIC"),
        ),
      )

      .orderBy(desc(formsTable.createdAt))

      .limit(limit)

      .offset((page - 1) * limit);

    // return forms;
    return forms.map((form) => ({
      ...form,

      theme:
        form.theme as FormTheme,
    }));
  }
}

export default FormService;
