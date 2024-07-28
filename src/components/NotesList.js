// src/components/NotesList.js
import React, { useEffect, useState } from 'react';
import { firestore } from '../firebase';
import { collection, query, orderBy, onSnapshot, doc, deleteDoc } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

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

    const handleDelete = async (id) => {
        try {
            await deleteDoc(doc(firestore, 'notes', id));
            toast.success('Note deleted successfully');
        } catch (error) {
            toast.error('Error deleting note: ' + error.message);
        }
    };

    return (
        <div>
            <h2>Notes</h2>
            <ul>
                {notes.map(note => (
                    <li key={note.id}>
                        {note.text}
                        <Link to={`/edit-note/${note.id}`}>Edit</Link>
                        <button onClick={() => handleDelete(note.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NotesList;
