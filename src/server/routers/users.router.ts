import { router, procedure } from "../trpc";
import prisma from "prisma/client";
import { z } from "zod";

export const userRouter = router({
  findAll: procedure.query(async () => await prisma.user.findMany()),
  findOne: procedure
    .input(z.object({ email: z.string() }))
    .query(async (opts) => {
      const msw = await prisma.user.findUnique({
        where: {
          email: opts.input.email,
        },
      });
      return msw;
    }),
});
