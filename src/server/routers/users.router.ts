import { router, procedure } from "../trpc";
import { z } from "zod";
import { exclude } from "./remove-sensitive-fields";
import { User } from "@prisma/client";

export const userRouter = router({
  findAll: procedure.query(async ({ ctx }) => {
    const users = await ctx.prisma.user.findMany();
    return users.map((u: User) => exclude(u, ["password", "email"]));
  }),
  findById: procedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      return await ctx.prisma.user.findUnique({
        where: {
          id: input.id,
        },
      });
    }),
  findOne: procedure
    .input(z.object({ email: z.string() }))
    .query(async ({ input, ctx }) => {
      return await ctx.prisma.user.findUnique({
        where: {
          email: input.email,
        },
      });
    }),
});
