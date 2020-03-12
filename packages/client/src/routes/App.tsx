import React from 'react';
import Start from './Start/Start'
import {
  Routes,
  Route
} from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Start />} />
    </Routes>
  );
}

export default App;
