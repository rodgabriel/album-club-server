import { ApolloServer } from "apollo-server";

import typeDefs from "./graphql/types";
import resolvers from "./graphql/resolvers";

import { context } from "./context";

const server = new ApolloServer({ typeDefs, resolvers, context });

server
  .listen()
  .then(({ url }) => {
    console.log(`Server ready at ${url}`);
  })
  .catch((reason) => console.log(reason));
