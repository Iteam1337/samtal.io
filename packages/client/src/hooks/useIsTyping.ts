import React from "react"
import { gql, useSubscription } from "@apollo/client"
import {
  MessageTypingSubscription,
  MessageTypingSubscriptionVariables,
} from "../__generated__/types"

const MESSAGE_TYPING_SUBSCRIPTION = gql`
  subscription MessageTyping($roomId: String!) {
    messageTyping(roomId: $roomId) {
      message
      from
    }
  }
`

type Value = string | undefined

export const useIsTyping = (roomId: string): [Value, () => void] => {
  const [userTyping, setUserTyping] = React.useState<Value>()

  useSubscription<
    MessageTypingSubscription,
    MessageTypingSubscriptionVariables
  >(MESSAGE_TYPING_SUBSCRIPTION, {
    variables: { roomId },
    onSubscriptionData: ({ subscriptionData }) => {
      setUserTyping(subscriptionData.data?.messageTyping?.message)
    },
  })

  const reset = () => setUserTyping(undefined)

  return [userTyping, reset]
}
