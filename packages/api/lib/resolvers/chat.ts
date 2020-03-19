import { pubsub } from '../server'
import { Resolvers } from '../__generated__/graphql'
import { withFilter } from 'apollo-server-express'

const CHATMESSAGE_ADDED = 'CHATMESSAGE_ADDED'

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
          start_time: input.startTime,
        })
        .returning(['id', 'name', 'start_time'])

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
        startTime: newRoom.start_time,
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
