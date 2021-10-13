import { gql } from "apollo-server";

const typeDefs = gql`
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

export default typeDefs;
