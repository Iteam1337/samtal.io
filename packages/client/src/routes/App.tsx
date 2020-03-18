import React from "react"
import Start from "./Start/Start"
import Lobby from "./Room/Lobby"
import Room from "./Room/Room"
import { Routes, Route } from "react-router-dom"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Start />} />
      <Route path="/lobby/:roomId/" element={<Lobby />} />
      <Route path="/room/:roomId/" element={<Room />} />
    </Routes>
  )
}

export default App
