// src/components/AddNote.js
import React, { useState } from 'react';
import { firestore } from '../firebase';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { toast } from 'react-toastify';

const AddNote = () => {
    const [note, setNote] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (note.trim()) {
            try {
                await addDoc(collection(firestore, 'notes'), {
                    text: note,
                    createdAt: serverTimestamp()
                });
                toast.success('Note added successfully');
                setNote('');
            } catch (error) {
                toast.error('Error adding note: ' + error.message);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add Note</h2>
            <textarea value={note} onChange={(e) => setNote(e.target.value)} required />
            <br />
            <button type="submit">Add Note</button>
        </form>
    );
};

export default AddNote;
