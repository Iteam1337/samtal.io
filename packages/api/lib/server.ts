import express from 'express'
import { ApolloServer, PubSub, IResolvers } from 'apollo-server-express'
import { resolvers as queueResolvers } from './resolvers/chat'
import { resolvers as userResolvers } from './resolvers/user'
import { typeDefs } from './defs'
import merge from 'lodash.merge'
import http from 'http'
import { Chat } from './__generated__/graphql'
import { db } from './adapters/postgres'
import cors from 'cors'
import { SamtalContext } from './types'

export const pubsub = new PubSub()

export const chatMessage: Chat[] = [
  {
    from: 'Kalle',
    message: 'Hej',
  },
]

const server = new ApolloServer({
  typeDefs: [typeDefs],
  resolvers: merge(queueResolvers, userResolvers) as IResolvers<
    any,
    SamtalContext
  >,
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
