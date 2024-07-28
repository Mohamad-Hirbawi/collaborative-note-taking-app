// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import AddNote from './components/AddNote';
import NotesList from './components/NotesList';

function App() {
    return (
        <Router>
            <div className="App">
                <nav>
                    <ul>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                        <li>
                            <Link to="/signup">Signup</Link>
                        </li>
                        <li>
                            <Link to="/add-note">Add Note</Link>
                        </li>
                        <li>
                            <Link to="/notes">Notes</Link>
                        </li>
                    </ul>
                </nav>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/add-note" element={<AddNote />} />
                    <Route path="/notes" element={<NotesList />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
