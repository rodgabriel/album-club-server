import bcrypt from "bcrypt";

import { PrismaContext } from "src/context";

export const createUser = async (
  _parent: any,
  args: { name: string; username: string; password: string },
  context: PrismaContext
) => {
  const checkUsername = await context.prisma.user.findFirst({
    where: { username: args.username },
  });

  if (checkUsername) {
    return { __typename: "Error", error: "Username already exists!" };
  }

  const hash = await bcrypt.hash(args.password, 10);

  const newUser = await context.prisma.user.create({
    data: { name: args.name, username: args.username, password: hash },
  });

  return {
    __typename: "User",
    id: newUser.id,
    name: newUser.name,
    username: newUser.username,
  };
};
