// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
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
                <Switch>
                    <Route path="/login" component={Login} />
                    <Route path="/signup" component={Signup} />
                    <Route path="/add-note" component={AddNote} />
                    <Route path="/notes" component={NotesList} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
