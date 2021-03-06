import { pubsub } from '../server'
import { Resolvers } from '../__generated__/graphql'
import { withFilter } from 'apollo-server-express'
import { v4 as uuidv4 } from 'uuid'

const CHATMESSAGE_ADDED = 'CHATMESSAGE_ADDED'
const CHATMESSAGE_TYPING = 'CHATMESSAGE_TYPING'

export const resolvers: Resolvers = {
  Mutation: {
    createRoom: async (_, { input }, { auth, db }) => {
      const user = await db
        .select('id')
        .from('users')
        .where('email', auth.email)
        .first()

      const [newRoom] = await db('rooms')
        .insert({
          name: input.name,
          owner_id: user.id,
          start: input.start,
        })
        .returning(['id', 'name', 'start'])

      let newRoomAgenda = null

      if (input.agenda) {
        const agendaWithIds = input.agenda.map((entry: any) => {
          entry.room_id = newRoom.id
          return entry
        })

        newRoomAgenda = await db('agenda_items')
          .insert(agendaWithIds)
          .returning(['title'])
      }

      return {
        id: newRoom.id,
        name: newRoom.name,
        start: newRoom.start,
        agenda: newRoomAgenda,
      }
    },
    sendMessage: (_, { input }) => {
      const newMessage = {
        from: input.from,
        message: input.message,
      }

      pubsub.publish(CHATMESSAGE_ADDED, {
        messageSent: newMessage,
        roomId: input.roomId,
      })

      pubsub.publish(CHATMESSAGE_TYPING, {
        messageTyping: null,
        roomId: input.roomId,
      })

      return newMessage
    },
    createChatMember: (_, { name, roomId }) => {
      const id = uuidv4()
      return { name, id, roomId }
    },

    typingMessage: (_, { input }) => {
      pubsub.publish(CHATMESSAGE_TYPING, {
        messageTyping: {
          message: input.message,
          from: input.from,
        },
        roomId: input.roomId,
      })

      return input.message
    },
  },

  Subscription: {
    messageSent: {
      subscribe: withFilter(
        () => pubsub.asyncIterator([CHATMESSAGE_ADDED]),
        (payload, variables) => payload.roomId === variables.roomId
      ),
    },

    messageTyping: {
      subscribe: withFilter(
        () => pubsub.asyncIterator([CHATMESSAGE_TYPING]),
        (payload, variables) => payload.roomId === variables.roomId
      ),
    },
  },
}
