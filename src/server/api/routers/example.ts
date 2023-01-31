import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const exampleRouter = createTRPCRouter({
  getList: publicProcedure.query( async ({ ctx }) => {
    const list = await ctx.prisma.test.findMany();
   return list.reverse();
  }),
  createTodo: publicProcedure
  .input(z.string())
  .mutation( async ({ ctx,input }) => {
    return await ctx.prisma.test.create({data: { name: input}})
  }),
  removeTodo: publicProcedure
  .input(z.string())
  .mutation( async ({ ctx,input }) => {
    return await ctx.prisma.test.delete({ where: { id: input }})
  }),
  editTodo: publicProcedure
  .input(z.object({name: z.string(),id: z.string()}))
  .mutation( async ({ ctx,input }) => {
    return await ctx.prisma.test.update({ where: { id: input.id}, data: {name: input.name}})
  })
});
