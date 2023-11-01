import { router, procedure } from "../trpc";
import { z } from "zod";

export const userRouter = router({
  findAll: procedure.query(async ({ ctx }) => {
    return await ctx.prisma.user.findMany();
  }),
  findOne: procedure
    .input(z.object({ email: z.string() }))
    .query(async ({ input, ctx }) => {
      const msw = await ctx.prisma.user.findUnique({
        where: {
          email: input.email,
        },
      });
      return msw;
    }),
});
