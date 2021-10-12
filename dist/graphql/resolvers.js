"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const resolvers = {
    Query: {
        user: (_parent, args, context) => {
            const user = context.prisma.user.findUnique({
                where: { id: Number(args.id) },
            });
            return user;
        },
        users: (_parent, _args, context) => {
            const users = context.prisma.user.findMany();
            return users;
        },
    },
};
exports.default = resolvers;
//# sourceMappingURL=resolvers.js.map