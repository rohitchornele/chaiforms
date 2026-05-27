import { z } from "zod";

export const dashboardMetricsModel = z.object({

    totalForms: z.number(),

    totalSubmissions: z.number(),

    activeForms: z.number(),

    submissionsThisWeek: z.number(),

    // completionRate: z.number(),

});

export const recentFormModel = z.object({

    formId: z.string(),
    title: z.string(),

    description: z.string().nullable().optional(),

    submissionsCount: z.number(),

    createdAt: z.date(),

});

export const recentSubmissionModel = z.object({

    submissionId: z.string(),

    formId: z.string(),

    formTitle: z.string(),

    status: z.enum(["PENDING", "COMPLETED",]),

    createdAt: z.date(),

});

export const submissionChartItemModel = z.object({

    date: z.string(),

    submissions: z.number(),

});

export const getDashboardOverviewOutputModel =
    z.object({

        metrics: dashboardMetricsModel,

        recentForms: z.array(recentFormModel),

        recentSubmissions: z.array(recentSubmissionModel),

        submissionChart: z.array(submissionChartItemModel),
    });

export type GetDashboardOverviewOutputType = z.infer<typeof getDashboardOverviewOutputModel>;