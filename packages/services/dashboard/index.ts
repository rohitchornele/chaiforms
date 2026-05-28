import db, { and, count, desc, eq, gte, sql } from "@repo/database";
import { GetDashboardOverviewOutputType } from "./model";
import { formsTable } from "@repo/database/models/form";
import { formSubmissionTable } from "@repo/database/models/form-submission";


export class DashboardService {

    public async getOverview(userId: string): Promise<GetDashboardOverviewOutputType> {

        // Total forms
        const totalFormsResult = await db.select({ count: count(formsTable.id), })
            .from(formsTable)
            .where(eq(formsTable.createdBy, userId));

        const totalForms = totalFormsResult[0]?.count || 0;

        // Total submissions
        const totalSubmissionsResult = await db.select({ count: count(formSubmissionTable.id), })
            .from(formSubmissionTable).innerJoin(formsTable, eq(formsTable.id, formSubmissionTable.formId))
            .where(eq(formsTable.createdBy, userId));

        const totalSubmissions = totalSubmissionsResult[0]?.count || 0;

        // Active forms
        const sevenDaysAgo = new Date();

        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const activeFormsResult = await db.selectDistinct({ formId: formSubmissionTable.formId, })
            .from(formSubmissionTable)
            .innerJoin(formsTable, eq(formsTable.id, formSubmissionTable.formId))
            .where(and(eq(formsTable.createdBy, userId), gte(formSubmissionTable.createdAt, sevenDaysAgo)));

        const activeForms = activeFormsResult.length;

        // Completion rate
        // const completedSubmissions =
        //     await db.select({ count: count(formSubmissionTable.id), })
        //         .from(formSubmissionTable)
        //         .innerJoin( formsTable, eq( formsTable.id, formSubmissionTable.formId ) )
        //         .where( and( eq( formsTable.createdBy, userId ), eq( formSubmissionTable.status, "COMPLETED" ) ) );

        // const completedCount = completedSubmissions[0]?.count || 0;

        // const completionRate = totalSubmissions === 0 ? 0 : Math.round(
        //             (
        //                 completedCount /
        //                 totalSubmissions
        //             ) * 100
        //         );



        // Submissions this week
        const oneWeekAgo =
            new Date();

        oneWeekAgo.setDate(
            oneWeekAgo.getDate() - 7
        );

        const submissionsThisWeekResult =
            await db
                .select({
                    count:
                        count(
                            formSubmissionTable.id
                        ),
                })
                .from(formSubmissionTable)
                .innerJoin(
                    formsTable,
                    eq(
                        formsTable.id,
                        formSubmissionTable.formId
                    )
                )
                .where(
                    and(

                        eq(
                            formsTable.createdBy,
                            userId
                        ),

                        gte(
                            formSubmissionTable.createdAt,
                            oneWeekAgo
                        )
                    )
                );

        const submissionsThisWeek =
            submissionsThisWeekResult[0]?.count || 0;

        // Recent forms
        const recentFormsRows =
            await db
                .select({
                    formId:
                        formsTable.id,

                    title:
                        formsTable.title,

                    description:
                        formsTable.description,

                    createdAt:
                        formsTable.createdAt,
                })
                .from(formsTable)
                .where(
                    eq(
                        formsTable.createdBy,
                        userId
                    )
                )
                .orderBy(
                    desc(
                        formsTable.createdAt
                    )
                )
                .limit(5);

        const recentForms =
            await Promise.all(

                recentFormsRows.map(
                    async (form) => {

                        const submissions =
                            await db
                                .select({
                                    count:
                                        count(
                                            formSubmissionTable.id
                                        ),
                                })
                                .from(
                                    formSubmissionTable
                                )
                                .where(
                                    eq(
                                        formSubmissionTable.formId,
                                        form.formId
                                    )
                                );

                        return {

                            ...form,

                            submissionsCount:
                                submissions[0]?.count || 0,
                        };
                    }
                )
            );

        // Recent submissions
        const recentSubmissions =
            await db
                .select({

                    submissionId:
                        formSubmissionTable.id,

                    formId:
                        formsTable.id,

                    formTitle:
                        formsTable.title,

                    status:
                        formSubmissionTable.status,

                    createdAt:
                        formSubmissionTable.createdAt,

                })
                .from(
                    formSubmissionTable
                )
                .innerJoin(
                    formsTable,
                    eq(
                        formsTable.id,
                        formSubmissionTable.formId
                    )
                )
                .where(
                    eq(
                        formsTable.createdBy,
                        userId
                    )
                )
                .orderBy(
                    desc(
                        formSubmissionTable.createdAt
                    )
                )
                .limit(5);

        // Chart data
        const submissionChart =
            await db.execute(sql`
  SELECT 
    DATE(fs.created_at) as date,
    COUNT(*)::int as submissions
  FROM form_submissions fs
  INNER JOIN forms f 
    ON f.id = fs.form_id
  WHERE f.created_by = ${userId}
  GROUP BY DATE(fs.created_at)
  ORDER BY DATE(fs.created_at) ASC
`);

        return {

            metrics: {

                totalForms,

                totalSubmissions,

                activeForms,

                submissionsThisWeek,

                // completionRate,
            },

            recentForms,

            recentSubmissions,

            submissionChart:
                submissionChart.map(
                    (item: any) => ({

                        date:
                            String(item.date),

                        submissions:
                            Number(item.submissions),

                    })
                ),
        };
    }
}

export default DashboardService;