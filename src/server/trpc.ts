import { initTRPC, TRPCError } from "@trpc/server";
import { Context } from "./context";

const t = initTRPC.context<Context>().create();

const isAuthed = t.middleware(({ next, ctx }) => {
  if (!ctx.session?.user?.id) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
    });
  }
  return next({
    ctx: {
      session: ctx.session,
    },
  });
});

export const middleware = t.middleware;
export const router = t.router;

/**
 * Unprotected procedure
 */
export const procedure = t.procedure;

/**
 * Protected procedure
 */
export const protectedProcedure = t.procedure.use(isAuthed);
