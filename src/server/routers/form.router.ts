import { z } from "zod";
import { router, procedure, protectedProcedure } from "../trpc";
import { FormSchema } from "prisma/zod/schema";

export const formRouter = router({
  getAllForms: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.form.findMany({
      include: {
        msw_name: true,
      },
    });
  }),
  getForm: procedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const craResult = await ctx.prisma.form.findUnique({
        where: {
          id: input.id,
        },
        include: {
          msw_name: true,
        },
      });
      return craResult;
    }),
  submitForm: procedure.input(FormSchema).mutation(async ({ input, ctx }) => {
    const craForm = await ctx.prisma.form.create({
      data: input,
    });
    return craForm;
  }),
});
