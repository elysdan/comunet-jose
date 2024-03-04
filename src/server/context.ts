import type { Session } from "next-auth";
import { db } from "@/db/drizzle-db";
import type { CreateNextContextOptions } from "@trpc/server/adapters/next";
import { getServerAuthSession } from "./auth";

type CreateContextOptions = {
  session: Session | null;
};

const createInnerTRPCContext = (opts: CreateContextOptions) => {
  return {
    session: opts.session,
    db,
  };
};

export const createTRPCContext = async (opts: CreateNextContextOptions) => {
  const { res, req } = opts;
  const session = await getServerAuthSession({ req, res });
  return createInnerTRPCContext({
    session,
  });
};