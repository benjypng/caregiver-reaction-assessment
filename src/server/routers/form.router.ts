import { z } from "zod";
import { router, procedure, protectedProcedure } from "../trpc";
import { FormSchema } from "prisma/zod/schema";
import { EmailTemplate } from "@/features/email";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const formRouter = router({
  getAllForms: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.form.findMany({
      include: {
        User: true,
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
      return await ctx.prisma.form.findUnique({
        where: {
          id: input.id,
        },
        include: {
          User: true,
        },
      });
    }),
  submitForm: procedure.input(FormSchema).mutation(async ({ input, ctx }) => {
    const craForm = await ctx.prisma.form.create({
      data: input,
    });
    const user = await ctx.prisma.user.findUnique({
      where: {
        id: input.userId!,
      },
    });
    await resend.emails.send({
      from: "AH CRA <no-reply@ah-cra.toolsforsocial.work>",
      to: [user!.email],
      subject: "AH-CRA Result",
      react: EmailTemplate({ resultId: craForm.id }),
      text: "",
    });
    return craForm;
  }),
});
