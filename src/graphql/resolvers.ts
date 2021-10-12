import { PrismaContext } from "src/context";

const resolvers = {
  Query: {
    user: (_parent: any, args: { id: number }, context: PrismaContext) => {
      const user = context.prisma.user.findUnique({
        where: { id: Number(args.id) },
      });

      return user;
    },

    users: (_parent: any, _args: any, context: PrismaContext) => {
      const users = context.prisma.user.findMany();
      return users;
    },
  },
};

export default resolvers;
