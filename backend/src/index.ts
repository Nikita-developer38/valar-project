import { ApolloServer } from "apollo-server";
import { typeDefs } from "./scheme/typeDef";
import { resolvers } from "./scheme/resolver";

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen({ port: 4000 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});