"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const createUser = async (_parent, args, context) => {
    const checkUsername = await context.prisma.user.findFirst({
        where: { username: args.username },
    });
    if (checkUsername) {
        return { __typename: "Error", error: "Username already exists!" };
    }
    const hash = await bcrypt_1.default.hash(args.password, 10);
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
exports.createUser = createUser;
//# sourceMappingURL=index.js.map