import React from "react";
import { gql, useSubscription } from "@apollo/client";

const MESSAGES_SUBSCRIPTION = gql`
  subscription MessageSent($roomId: String!) {
    messageSent(roomId: $roomId) {
      message
      from
    }
  }
`;

interface ChatLogProps {
  roomId?: string;
}

type ChatMessage = {
  from: String;
  message: String;
};

const ChatLog: React.FC<ChatLogProps> = ({ roomId }) => {
  const { data, error } = useSubscription(MESSAGES_SUBSCRIPTION, {
    variables: { roomId }
  });
  const [chatLog, updateChatLog] = React.useState<ChatMessage[]>([]);

  React.useEffect(() => {
    if (data) {
      updateChatLog([...chatLog, data.messageSent]);
    }
  }, [data]);

  if (error) {
    return <div>Error</div>;
  }

  return (
    <div>
      {chatLog.map((entry, index) => (
        <div key={index}>
          <p>{entry.message}</p>
          <p>{entry.from}</p>
        </div>
      ))}
    </div>
  );
};

export default ChatLog;
