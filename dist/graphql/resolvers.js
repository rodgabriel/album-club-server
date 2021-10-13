"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const resolvers = {
    Query: {
        user: (_parent, args, context) => {
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
        users: (_parent, _args, context) => {
            const users = context.prisma.user.findMany({
                include: { clubs: { include: { club: true } } },
            });
            return users;
        },
        club: (_parent, args, context) => {
            const club = context.prisma.club.findUnique({
                where: { id: Number(args.id) },
                include: {
                    members: { include: { user: true } },
                },
            });
            return club;
        },
        clubs: (_parent, _args, context) => {
            const clubs = context.prisma.club.findMany({
                include: {
                    members: { include: { user: true } },
                },
            });
            return clubs;
        },
    },
};
exports.default = resolvers;
//# sourceMappingURL=resolvers.js.map