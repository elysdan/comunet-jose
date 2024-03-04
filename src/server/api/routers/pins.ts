import { createTRPCRouter, publicProcedure } from '@/server/trpc';

export const pinsRouter = createTRPCRouter({
  getSponsorDay: publicProcedure.query(async () => {
    return null;
  }),
});