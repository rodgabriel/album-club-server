import { gql } from "apollo-server";

const typeDefs = gql`
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

export default typeDefs;
