import { PrismaContext } from "src/context";
import { ensureAuthenticated } from "../../middleware/authentication";

const getUserById = async (
  _parent: any,
  args: { id: number },
  context: PrismaContext
) => {
  const isAuthenticated = ensureAuthenticated("blahblahblah");

  if (!isAuthenticated.isAuth) {
    return { __typename: "Error", error: isAuthenticated.error };
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
    return { __typename: "Error", error: "No user found." };
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
