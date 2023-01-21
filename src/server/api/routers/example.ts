import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),
  test: publicProcedure.query( async ({ ctx }) => {
    const values = await ctx.prisma.test.findMany();

    return values.map(el => el.name)
  }),
  createTest: publicProcedure
  .input(z.string())
  .mutation( async ({ ctx,input }) => {
    return await ctx.prisma.test.create({data: { name: input}})
  })
});
