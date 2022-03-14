import bcrypt from "bcrypt";
import { generateToken } from "../../middleware/authentication";
import { JWT_SECRET } from "../../config/auth";
import { PrismaContext } from "../../context";

export const createUser = async (
  _parent: any,
  args: { name: string; username: string; password: string },
  context: PrismaContext
) => {
  const checkUsername = await context.user.findFirst({
    where: { username: args.username },
  });

  if (checkUsername) {
    return { __typename: "Error", error: "Username already exists!" };
  }

  const hash = await bcrypt.hash(args.password, 10);

  const newUser = await context.user.create({
    data: { name: args.name, username: args.username, password: hash },
  });

  return {
    __typename: "User",
    id: newUser.id,
    name: newUser.name,
    username: newUser.username,
  };
};

export const login = async (
  _parent: any,
  args: { username: string; password: string },
  context: PrismaContext
) => {
  const { username, password } = args;

  const user = await context.user.findFirst({ where: { username } });

  if (!user) {
    return { __typename: "Error", error: "No user found." };
  }

  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) {
    return { __typename: "Error", error: "Invalid information." };
  }

  const token = generateToken(
    { id: String(user.id), username: user.username },
    "1d",
    JWT_SECRET
  );

  return { __typename: "Login", user, token };
};
