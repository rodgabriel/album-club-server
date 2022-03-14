import { PrismaClient } from "@prisma/client";
import { ensureAuthenticated, JWT_Payload } from "./middleware/authentication";

const prisma = new PrismaClient();

type Authenticated =
  | {
      isAuth: true;
      payload: JWT_Payload;
    }
  | {
      isAuth: false;
      error: string;
    };
export interface PrismaContext extends PrismaClient {
  authenticated: Authenticated;
}

export const context = ({ req }: { req: any }): PrismaContext => {
  const token = req.headers.authorization?.split(" ")[1];

  let authenticated = { isAuth: false } as PrismaContext["authenticated"];

  if (!token) {
    authenticated = { isAuth: false, error: "No token provided." };
  } else {
    authenticated = ensureAuthenticated(token);
  }

  const ctx = prisma as PrismaContext;
  ctx.authenticated = authenticated;

  return ctx;
};
