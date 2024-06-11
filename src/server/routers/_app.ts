import { createCallerFactory, router } from '../trpc';
import { formRouter } from './form.router';
import { userRouter } from './users.router';

export const appRouter = router({
  users: userRouter,
  forms: formRouter,
});

export const createCaller = createCallerFactory(appRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
