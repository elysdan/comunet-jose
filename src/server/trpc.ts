import { TRPCError, initTRPC } from '@trpc/server';
import type { createTRPCContext } from './context';
import superjson from 'superjson';

const t = initTRPC
  .context<typeof createTRPCContext>()
  .create({ transformer: superjson });

export const createTRPCRouter = t.router;
export const middleware = t.middleware;

export const isAuthedMiddleware = t.middleware(({ ctx, next }) => {
  if (!ctx.session || !ctx.session.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  return next({
    ctx: {
      session: { ...ctx.session, user: ctx.session.user },
    },
  });
});

export const isAdminMiddleware = t.middleware(({ ctx, next }) => {
  if (ctx.session?.user.role !== 'ADMIN') {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  return next({
    ctx: {
      session: { ...ctx.session, user: ctx.session.user },
    },
  });
});

export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(isAuthedMiddleware);
export const adminProcedure = t.procedure.use(isAdminMiddleware);