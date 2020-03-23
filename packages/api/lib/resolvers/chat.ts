import { chatMessage, pubsub } from '../server'
import { Resolvers } from '../__generated__/graphql'
import { withFilter } from 'apollo-server-express'
import { v4 as uuidv4 } from 'uuid'

const CHATMESSAGE_ADDED = 'CHATMESSAGE_ADDED'

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
    createChatMember: (_, { name, roomId }) => {
      const id = uuidv4()
      return { name, id, roomId }
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
