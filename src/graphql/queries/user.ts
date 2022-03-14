import { PrismaContext } from "../../context";
import Error from "../../middleware/error";

const getUserById = async (
  _parent: any,
  args: { id: number },
  context: PrismaContext
) => {
  const isAuthenticated = context.authenticated.isAuth;

  if (!isAuthenticated) {
    return Error(context.authenticated.error);
  }

  const user = await context.user.findUnique({
    where: { id: Number(args.id) },
    include: {
      clubs: {
        include: {
          club: true,
        },
      },
    },
  });

  if (!user) {
    return Error("No user found.");
  }

  return {
    __typename: "User",
    id: user.id,
    name: user.name,
    username: user.username,
  };
};

const getAllUsers = async (
  _parent: any,
  _args: any,
  context: PrismaContext
) => {
  const users = context.user.findMany({
    include: { clubs: { include: { club: true } } },
  });
  return users;
};

export { getUserById, getAllUsers };
