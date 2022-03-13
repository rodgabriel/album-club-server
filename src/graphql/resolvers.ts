import { PrismaContext } from "src/context";

// mutations
import { user_mutations } from "./mutations";

const resolvers = {
  Query: {
    user: (_parent: any, args: { id: number }, context: PrismaContext) => {
      const user = context.prisma.user.findUnique({
        where: { id: Number(args.id) },
        include: {
          clubs: {
            include: {
              club: true,
            },
          },
        },
      });

      return user;
    },

    users: (_parent: any, _args: any, context: PrismaContext) => {
      const users = context.prisma.user.findMany({
        include: { clubs: { include: { club: true } } },
      });
      return users;
    },

    club: (_parent: any, args: { id: number }, context: PrismaContext) => {
      const club = context.prisma.club.findUnique({
        where: { id: Number(args.id) },
        include: {
          members: { include: { user: true } },
        },
      });

      return club;
    },

    clubs: (_parent: any, _args: any, context: PrismaContext) => {
      const clubs = context.prisma.club.findMany({
        include: {
          members: { include: { user: true } },
        },
      });
      return clubs;
    },
  },

  Mutation: {
    ...user_mutations,
  },
};

export default resolvers;
