import { dashboardService } from "../../services";
import { authenticatedProcedure, router } from "../../trpc";
import { generatePath } from "../../utils/path-generator";
import { getDashboardOverviewOutputModel } from "./model";

const TAGS = ["Dashboard"];
const getPath = generatePath("/dashboard");

export const dashboardRouter = router({

    getOverview: authenticatedProcedure

        .meta({
            openapi: {
                method: "GET",
                path: getPath(
                    "/overview"
                ),
                tags: TAGS,
            },
        })
        .output(
            getDashboardOverviewOutputModel
        )
        .query(async ({ ctx }) => {

            return dashboardService
                .getOverview(
                    ctx.user.id
                );
        }),



})