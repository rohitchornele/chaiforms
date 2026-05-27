import { publicProcedure, router } from "./trpc";

import { authRouter } from "./routes/auth/route";
import { formRouter } from "./routes/form/route";
import { dashboardRouter } from "./routes/dashboard/route";

export const serverRouter = router({
  auth: authRouter,
  form : formRouter,
  dashboard : dashboardRouter,
});

export { createContext } from "./context";
export type ServerRouter = typeof serverRouter;
