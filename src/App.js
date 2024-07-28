// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/Login';
import Signup from './components/Signup';
import AddNote from './components/AddNote';
import NotesList from './components/NotesList';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './contexts/AuthContext';
import Logout from './components/Logout';

function App() {
    return (
        <Router>
            <AuthProvider>
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
                            <li>
                                <Logout />
                            </li>
                        </ul>
                    </nav>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/add-note" element={<PrivateRoute><AddNote /></PrivateRoute>} />
                        <Route path="/notes" element={<PrivateRoute><NotesList /></PrivateRoute>} />
                    </Routes>
                    <ToastContainer />
                </div>
            </AuthProvider>
        </Router>
    );
}

export default App;
