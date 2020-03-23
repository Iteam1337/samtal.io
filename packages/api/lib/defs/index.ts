import { gql } from 'apollo-server-express'

export const typeDefs = gql`
  type Token {
    token: String!
  }

  type Chat {
    from: String!
    message: String!
  }

  type ChatMember {
    roomId: String!
    name: String!
    id: String!
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
    createChatMember(roomId: String!, name: String!): ChatMember!
    register(name: String!, email: String!, password: String!): Token
    login(email: String!, password: String!): Token
  }

  type Subscription {
    messageSent(roomId: String!): Chat
  }
`
