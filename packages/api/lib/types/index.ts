import { gql } from 'apollo-server-express'

export const typeDefs = gql`
  type Chat {
    from: String!
    message: String!
  }

  type Room {
    id: String!
    name: String!
  }

  type Query {
    chatlog: [Chat]!
  }

  type Mutation {
    createRoom(name: String!): Room
    sendMessage(roomId: String!, from: String!, message: String!): Chat
  }

  type Subscription {
    messageSent(roomId: String!): Chat
  }
`
