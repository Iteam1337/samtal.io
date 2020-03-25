import React from 'react'
import CreateRoom from './Room/CreateRoom'
import Lobby from './Room/Lobby'
import Room from './Room/Room'
import Login from './Login/Login'
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Routes>
      <Route path="/" element={<CreateRoom />} />
      <Route path="/login" element={<Login />} />
      <Route path="/lobby/:roomId/" element={<Lobby />} />
      <Route path="/room/:roomId/" element={<Room />} />
    </Routes>
  )
}

export default App
