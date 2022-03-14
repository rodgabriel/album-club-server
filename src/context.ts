import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export interface PrismaContext extends PrismaClient {
  req: any;
}

export const context = ({ req }: { req: any }): PrismaContext => {
  const ctx = prisma as PrismaContext;
  ctx.req = req;

  return ctx;
};
