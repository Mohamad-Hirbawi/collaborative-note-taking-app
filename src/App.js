// src/App.js
import React from 'react';
import Login from './components/Login';
import Signup from './components/Signup';
import AddNote from './components/AddNote';
import NotesList from './components/NotesList';

function App() {
    return (
        <div className="App">
            <h1>Collaborative Note Taking App</h1>
            <Login />
            <Signup />
            <AddNote />
            <NotesList />
        </div>
    );
}

export default App;
