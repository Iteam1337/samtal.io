import express from 'express'
import { ApolloServer, PubSub, IResolvers } from 'apollo-server-express'
import { resolvers as chatResolvers } from './resolvers/chat'
import { resolvers as userResolvers } from './resolvers/user'
import { typeDefs } from './defs'
import merge from 'lodash.merge'
import http from 'http'
import { db } from './adapters/postgres'
import cors from 'cors'
import { SamtalContext } from './types'
import { AuthDirective } from 'graphql-directive-auth'

process.env.APP_SECRET = 'this is jwt secret'

export const pubsub = new PubSub()

const server = new ApolloServer({
  typeDefs: [typeDefs],
  resolvers: merge(chatResolvers, userResolvers) as IResolvers<
    any,
    SamtalContext
  >,
  schemaDirectives: {
    // to use @hasRole and @isAuthenticated directives
    ...AuthDirective(),
  },
  context: ({ req }) => ({
    db,
    req,
  }),
})

const app = express()

app.use(cors())

server.applyMiddleware({ app })

const httpServer = http.createServer(app)
server.installSubscriptionHandlers(httpServer)

httpServer.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
)
