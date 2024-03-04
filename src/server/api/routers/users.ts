import { users } from "@/db/schema";
import { protectedProcedure } from "@/server/trpc";
import { createTRPCRouter } from "@/server/trpc";
import { eq, } from "drizzle-orm";

export const usersRouter = createTRPCRouter({
  userInfo: protectedProcedure.query(
    async ({ ctx }) =>
      (
        await ctx.db
          .select({
            name: users.name,
            image: users.image,
            role: users.role,
          })
          .from(users)
          .where(eq(users.id, ctx.session.user.id))
      )[0]
  ),
  onboardingInfo: protectedProcedure.query(
    async ({ ctx }) =>
      (
        await ctx.db
          .select({ name: users.name, image: users.image, email: users.email })
          .from(users)
          .where(eq(users.id, ctx.session.user.id))
      )[0]
  )
});
