"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const typeDefs = (0, apollo_server_1.gql) `
  type User {
    id: Int!
    name: String
    username: String!
  }

  type Query {
    user(id: ID!): User
    users: [User]
  }
`;
exports.default = typeDefs;
//# sourceMappingURL=types.js.map