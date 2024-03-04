import { createTRPCRouter } from '@/server/trpc';
import { usersRouter } from '@/server/api/routers/users';
import { pinsRouter } from '@/server/api/routers/pins';
import { adminRouter } from '@/server/api/routers/admin';

export const appRouter = createTRPCRouter({
  users: usersRouter,
  pins: pinsRouter,
  admin: adminRouter
});

export type AppRouter = typeof appRouter;