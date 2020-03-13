import React from "react";
import { useParams } from "react-router";
import { gql, useMutation, useSubscription } from "@apollo/client";
import ChatLog from "../../components/ChatLog";

const SEND_MESSAGE = gql`
  mutation SendMessage($roomId: String!, $from: String!, $message: String!) {
    sendMessage(roomId: $roomId, from: $from, message: $message) {
      from
      message
    }
  }
`;

const Room: React.FC = () => {
  const { roomId } = useParams();
  const [message, setMessage] = React.useState("");
  const [sendMessage] = useMutation(SEND_MESSAGE, {
    onCompleted: res => console.log(res)
  });

  const handleSendMessage = (e: any) => {
    e.preventDefault();
    sendMessage({ variables: { roomId, from: "Bella", message } });
  };

  return (
    <div>
      <ChatLog roomId={roomId} />
      <form onSubmit={e => handleSendMessage(e)}>
        <input
          type="text"
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
        <button type="submit">Skicka</button>
      </form>
    </div>
  );
};

export default Room;
