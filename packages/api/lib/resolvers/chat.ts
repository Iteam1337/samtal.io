import { chatMessage, pubsub } from '../server'
import {
  QueryResolvers,
  MutationResolvers,
  SubscriptionResolvers,
} from '../__generated__/graphql'
import { withFilter } from 'apollo-server-express'

const CHATMESSAGE_ADDED = 'CHATMESSAGE_ADDED'

interface Resolvers {
  Query: QueryResolvers
  Mutation: MutationResolvers
  Subscription: SubscriptionResolvers
}

export const resolvers: Resolvers = {
  Query: {
    chatlog: () => chatMessage,
  },

  Mutation: {
    createRoom: async (_, { name }, { db }) => {
      const [newRoom] = await db('rooms')
        .returning(['id', 'name'])
        .insert({ name: name })

      return newRoom
    },
    sendMessage: (_, { roomId, from, message }) => {
      const newMessage = {
        from,
        message,
      }

      pubsub.publish(CHATMESSAGE_ADDED, { messageSent: newMessage, roomId })

      return newMessage
    },
  },

  Subscription: {
    messageSent: {
      subscribe: withFilter(
        () => pubsub.asyncIterator([CHATMESSAGE_ADDED]),
        (payload, variables) => {
          return payload.roomId === variables.roomId
        }
      ),
    },
  },
}