import { createTRPCRouter, publicProcedure } from "@/server/trpc";

export const adminRouter = createTRPCRouter({
  getSponsorDay: publicProcedure.query(async () => {
    return null;
  }),
});