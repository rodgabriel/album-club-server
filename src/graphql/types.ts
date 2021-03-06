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

  type Error {
    error: String
  }

  type Login {
    user: User
    token: String
  }

  union UserOrError = User | Error
  union LoginOrError = Login | Error
  union CreateUserResult = User | Error

  type Query {
    user(id: ID!): UserOrError
    users: [User]
    club(id: ID!): Club
    clubs: [Club]
  }

  type Mutation {
    createUser(
      name: String
      username: String
      password: String
    ): CreateUserResult
    login(username: String, password: String): LoginOrError
  }
`;

export default typeDefs;
