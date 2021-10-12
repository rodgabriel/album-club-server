"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const types_1 = __importDefault(require("./graphql/types"));
const resolvers_1 = __importDefault(require("./graphql/resolvers"));
const context_1 = require("./context");
const server = new apollo_server_1.ApolloServer({ typeDefs: types_1.default, resolvers: resolvers_1.default, context: context_1.context });
server
    .listen()
    .then(({ url }) => {
    console.log(`Server ready at ${url}`);
})
    .catch((reason) => console.log(reason));
//# sourceMappingURL=index.js.map