import db, { and, desc, eq } from "@repo/database";
import { createFormSubmissionInputModel, CreateFormSubmissionInputType, CreateFormSubmissionOutputType, getFormSubmissionsInputModel, GetFormSubmissionsInputType, GetFormSubmissionsOutputType } from "./model";
import { formsTable } from "@repo/database/models/form";
import { formSubmissionTable } from "@repo/database/models/form-submission";
import { createHmac } from "node:crypto";



class SubmissionService {

    private async generateHash(salt: string, password: string) {
        return createHmac('sha256', salt).update(password).digest('hex')
    }

    public async createSubmission(payload: CreateFormSubmissionInputType): Promise<CreateFormSubmissionOutputType> {

        const { formId, responses, password } = await createFormSubmissionInputModel.parseAsync(payload);

        // Check form exists
        const rows = await db.select().from(formsTable).where(eq(formsTable.id, formId)).limit(1);

        const form = rows[0];

        if (!form) {
            throw new Error("Form not found");
        }

        // Password validation
        // if (form.isPasswordProtected) {

        //     if (!validatedData.password) {
        //         throw new Error(
        //             "Password is required"
        //         );
        //     }

        //     const isPasswordValid =
        //         await bcrypt.compare(
        //             validatedData.password,
        //             form.passwordHash!
        //         );

        //     if (!isPasswordValid) {
        //         throw new Error(
        //             "Invalid form password"
        //         );
        //     }
        // }

        // Insert submission
        const insertedSubmission =
            await db
                .insert(formSubmissionTable)
                .values({ formId, responses, status: "COMPLETED" })
                .returning({
                    submissionId: formSubmissionTable.id,
                    formId: formSubmissionTable.formId,
                    status: formSubmissionTable.status,
                    createdAt: formSubmissionTable.createdAt,
                });

        return insertedSubmission[0]!;
    }

    public async getFormSubmissions(payload: GetFormSubmissionsInputType, userId: string,): Promise<GetFormSubmissionsOutputType> {

        const validatedData = await getFormSubmissionsInputModel.parseAsync(payload);

        // Verify form ownership
        const formRows = await db.select({ formId: formsTable.id, })
            .from(formsTable)
            .where(and(eq(formsTable.id, validatedData.formId), eq(formsTable.createdBy, userId)))
            .limit(1);

        const form = formRows[0];

        if (!form) {
            throw new Error(
                "Form not found or unauthorized"
            );
        }

        // Get submissions
        const submissions = await db.select({
            submissionId: formSubmissionTable.id,
            formId: formSubmissionTable.formId,
            responses: formSubmissionTable.responses,
            status: formSubmissionTable.status,
            createdAt: formSubmissionTable.createdAt,
            updatedAt: formSubmissionTable.updatedAt,
        }).from(formSubmissionTable).where(eq(formSubmissionTable.formId, validatedData.formId))
            .orderBy(desc(formSubmissionTable.createdAt));

        return submissions;
    }
}

export default SubmissionService;