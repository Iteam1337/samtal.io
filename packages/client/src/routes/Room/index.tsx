import React from "react";
import { useParams } from "react-router";
import { gql, useMutation } from "@apollo/client";

const SEND_MESSAGE = gql`
  mutation SendMessage($roomId: String!, $from: String!, $message: String!) {
    sendMessage(roomId: $roomId, from: $from, message: $message) {
      from
      message
    }
  }
`;

const Room = () => {
  const { id } = useParams();
  const [message, setMessage] = React.useState("");
  const [sendMessage] = useMutation(SEND_MESSAGE, {
    onCompleted: res => console.log(res)
  });

  const handleSendMessage = (e: any) => {
    e.preventDefault();
    sendMessage({ variables: { roomId: id, from: "Bella", message: message } });
  };

  return (
    <div>
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
