import { z } from "zod";
import { procedure, router } from "../trpc";
import { FormSchema } from "../../../prisma/zod/schema";
import prisma from "../../../prisma/client";

export const appRouter = router({
  getMSWs: procedure.query(async () => await prisma.mSW.findMany()),
  getAllForms: procedure.query(
    async () =>
      await prisma.form.findMany({
        include: {
          msw_name: true,
        },
      }),
  ),
  getForm: procedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async (opts) => {
      const craResult = await prisma.form.findUnique({
        where: {
          id: opts.input.id,
        },
      });
      return craResult;
    }),
  submitForm: procedure.input(FormSchema).mutation(async (opts) => {
    const craForm = prisma.form.create({
      data: opts.input,
    });
    return craForm;
  }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
