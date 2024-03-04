import { appRouter } from "@/server/api/approuter";
import { createTRPCContext } from "@/server/context";
import { createNextApiHandler } from "@trpc/server/adapters/next";

export default createNextApiHandler({
  router: appRouter,
  createContext: createTRPCContext,
});