import db, { and, desc, eq, isNull, lt, or, sql } from "@repo/database";
import {
  createFormSubmissionInputModel,
  CreateFormSubmissionInputType,
  CreateFormSubmissionOutputType,
  getFormSubmissionsInputModel,
  GetFormSubmissionsInputType,
  GetFormSubmissionsOutputType,
} from "./model";
import { formsTable } from "@repo/database/models/form";
import { formFieldsTable } from "@repo/database/models/form-field";
import { formSubmissionTable } from "@repo/database/models/form-submission";
import {
  assertFormIsOpen,
  assertFormPassword,
  FormAccessError,
  validateResponses,
} from "../form/access";

class SubmissionService {
  public async createSubmission(
    payload: CreateFormSubmissionInputType,
  ): Promise<CreateFormSubmissionOutputType> {
    const { formId, responses, password } =
      await createFormSubmissionInputModel.parseAsync(payload);

    const rows = await db.select().from(formsTable).where(eq(formsTable.id, formId)).limit(1);

    const form = rows[0];

    if (!form) {
      throw new FormAccessError("Form not found");
    }

    assertFormIsOpen(form);

    assertFormPassword(form, password);

    const fields = await db
      .select({
        id: formFieldsTable.id,
        label: formFieldsTable.label,
        type: formFieldsTable.type,
        isRequired: formFieldsTable.isRequired,
      })
      .from(formFieldsTable)
      .where(eq(formFieldsTable.formId, formId));

    const validatedResponses = validateResponses(fields, responses);

    return db.transaction(async (tx) => {
      // Claiming the slot in the WHERE clause stops simultaneous submissions
      // from going over the response limit.
      const claimed = await tx
        .update(formsTable)
        .set({
          responseCount: sql`${formsTable.responseCount} + 1`,
        })
        .where(
          and(
            eq(formsTable.id, formId),
            or(
              isNull(formsTable.responseLimit),
              lt(formsTable.responseCount, formsTable.responseLimit),
            ),
          ),
        )
        .returning({ id: formsTable.id });

      if (claimed.length === 0) {
        throw new FormAccessError("No longer accepting submissions");
      }

      const insertedSubmission = await tx
        .insert(formSubmissionTable)
        .values({ formId, responses: validatedResponses, status: "COMPLETED" })
        .returning({
          submissionId: formSubmissionTable.id,
          formId: formSubmissionTable.formId,
          status: formSubmissionTable.status,
          createdAt: formSubmissionTable.createdAt,
        });

      return insertedSubmission[0]!;
    });
  }

  public async getFormSubmissions(
    payload: GetFormSubmissionsInputType,
    userId: string,
  ): Promise<GetFormSubmissionsOutputType> {
    const validatedData = await getFormSubmissionsInputModel.parseAsync(payload);

    // Verify form ownership
    const formRows = await db
      .select({ formId: formsTable.id })
      .from(formsTable)
      .where(and(eq(formsTable.id, validatedData.formId), eq(formsTable.createdBy, userId)))
      .limit(1);

    const form = formRows[0];

    if (!form) {
      throw new Error("Form not found or unauthorized");
    }

    // Get submissions
    const submissions = await db
      .select({
        submissionId: formSubmissionTable.id,
        formId: formSubmissionTable.formId,
        responses: formSubmissionTable.responses,
        status: formSubmissionTable.status,
        createdAt: formSubmissionTable.createdAt,
        updatedAt: formSubmissionTable.updatedAt,
      })
      .from(formSubmissionTable)
      .where(eq(formSubmissionTable.formId, validatedData.formId))
      .orderBy(desc(formSubmissionTable.createdAt));

    return submissions;
  }
}

export default SubmissionService;
