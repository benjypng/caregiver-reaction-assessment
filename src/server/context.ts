import type { inferAsyncReturnType } from '@trpc/server';
import type { CreateNextContextOptions } from '@trpc/server/adapters/next';
import { Session } from 'next-auth';
import { getServerSession } from 'next-auth/next';
import prisma from 'prisma/client';

import { authOptions } from '@/pages/api/auth/[...nextauth]';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface CreateContextOptions {
  session: Session | null;
}
/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */

export async function createContextInner(_opts: CreateContextOptions) {
  return {};
}

export async function createContext(opts: CreateNextContextOptions) {
  const session = await getServerSession(opts.req, opts.res, authOptions);
  return {
    session,
    prisma,
  };
}

export type Context = inferAsyncReturnType<typeof createContext>;
