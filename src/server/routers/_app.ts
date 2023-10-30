import { router } from "../trpc";
import { userRouter } from "./users.router";
import { formRouter } from "./form.router";

export const appRouter = router({
  users: userRouter,
  forms: formRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
