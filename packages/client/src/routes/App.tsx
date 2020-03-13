import React from "react";
import Start from "./Start/Start";
import Room from "./Room";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Start />} />
      <Route path="/room/:roomId" element={<Room />} />
    </Routes>
  );
}

export default App;
