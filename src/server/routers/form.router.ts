import { FormSchema } from 'prisma/zod/schema';
import { z } from 'zod';

import { transporter } from '@/utils/transporter';

import { procedure, protectedProcedure, router } from '../trpc';

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
          User: {
            select: {
              name: true,
            },
          },
        },
      });
    }),
  submitForm: procedure.input(FormSchema).mutation(async ({ input, ctx }) => {
    const craForm = await ctx.prisma.form.create({
      data: input,
    });

    if (input.userId) {
      // Get user
      const user = await ctx.prisma.user.findUnique({
        where: {
          id: input.userId,
        },
      });

      if (user) {
        // Send email
        transporter.sendMail({
          to: user.email,
          subject: '[For info pls] New CRA Form',
          text: `A new CRA form has been submitted on ${input.survey_date}. Link: http://localhost:3000/cra-results/${craForm.id}`,
          html: `<p>A new CRA form has been submitted on ${input.survey_date}</p> Link: <a href="http://localhost:3000/cra-results/${craForm.id}">View Form</a>`,
        });
      }
    }

    return craForm;
  }),
});
