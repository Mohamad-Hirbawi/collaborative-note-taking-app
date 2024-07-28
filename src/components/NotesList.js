// src/components/NotesList.js
import React, { useEffect, useState } from 'react';
import { firestore } from '../firebase';
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

const NotesList = () => {
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        const q = query(collection(firestore, 'notes'), orderBy('createdAt', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const notesData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setNotes(notesData);
        });

        return () => unsubscribe();
    }, []);

    return (
        <div>
            <h2>Notes</h2>
            <ul>
                {notes.map(note => (
                    <li key={note.id}>{note.text}</li>
                ))}
            </ul>
        </div>
    );
};

export default NotesList;
