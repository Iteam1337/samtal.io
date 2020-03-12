import React from 'react';
import './Start.css';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';

const CREATE_ROOM = gql`
  mutation CreateRoom($name: String!) {
    createRoom(name: $name) {
      id
      name
    }
  }
`;

function Start() {
  let input: any;
  const [createRoom, { data }] = useMutation(CREATE_ROOM);
  console.log(data)
  return (
    <div className="App">
      <form
        onSubmit={e => {
          console.log(input.value)
          e.preventDefault();
          createRoom({ variables: { name: input.value } });
          input.value = '';
        }}
      >
        <input
          placeholder="room name"
          ref={node => {
            input = node;
          }}
        />
        <button type="submit">Create room</button>
      </form>
    </div>
  );
}

export default Start;
