// src/App.js
import React from 'react';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  return (
      <div className="App">
        <h1>Collaborative Note Taking App</h1>
        <Login />
        <Signup />
      </div>
  );
}

export default App;
