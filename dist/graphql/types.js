"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const typeDefs = (0, apollo_server_1.gql) `
  type User {
    id: Int!
    name: String
    username: String!
    clubs: [ClubsToUser]
  }

  type Club {
    id: Int!
    name: String!
    members: [UsersToClub]
  }

  type ClubsToUser {
    club: Club
  }

  type UsersToClub {
    user: User
  }

  type Query {
    user(id: ID!): User
    users: [User]
    club(id: ID!): Club
    clubs: [Club]
  }
`;
exports.default = typeDefs;
//# sourceMappingURL=types.js.map