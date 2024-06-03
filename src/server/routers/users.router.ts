import { router, procedure, protectedProcedure } from "../trpc";
import { z } from "zod";
import bcrypt from "bcrypt";
import { transporter } from "@/utils/transporter";
import {
  generateHashPassword,
  generatePlainPassword,
} from "@/utils/generate-pw";

export const userRouter = router({
  findAll: procedure.query(async ({ ctx }) => {
    return await ctx.prisma.user.findMany({
      select: {
        id: true,
        name: true,
      },
    });
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
  sendPassword: procedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const user = await ctx.prisma.user.findUnique({
        where: {
          id: input.id,
        },
      });

      if (user) {
        const plain = generatePlainPassword();
        const pw = await generateHashPassword(plain);
        await ctx.prisma.user.update({
          where: {
            id: input.id,
          },
          data: {
            password: pw,
          },
        });
        transporter.sendMail({
          to: user.email,
          subject: "New Password",
          text: `Your new password is ${plain}. You are encouraged to change it after you log in for the first time.`,
          html: `<p>Your new password is ${plain}</p><p>You are encouraged to change it after you log in for the first time.`,
        });
      }
    }),
  createOne: protectedProcedure
    .input(z.object({ name: z.string(), email: z.string() }))
    .mutation(async ({ input, ctx }) => {
      // Check unique email
      const existingUser = await ctx.prisma.user.findUnique({
        where: {
          email: input.email,
        },
      });

      if (existingUser) throw new Error("Email already exists");

      return await ctx.prisma.user.create({
        data: {
          name: input.name,
          email: input.email,
        },
      });
    }),
  deleteOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.user.delete({
        where: {
          id: input.id,
        },
      });
    }),
  updateName: protectedProcedure
    .input(z.object({ id: z.string(), name: z.string() }))
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.user.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
        },
      });
    }),
  updatePassword: procedure
    .input(z.object({ id: z.string(), password: z.string().min(5).max(20) }))
    .mutation(async ({ input, ctx }) => {
      const hashedPassword = await bcrypt.hash(
        input.password,
        await bcrypt.genSalt(10),
      );
      return await ctx.prisma.user.update({
        where: {
          id: input.id,
        },
        data: {
          password: hashedPassword,
        },
      });
    }),
});
