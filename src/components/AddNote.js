// src/components/AddNote.js
import React, { useState } from 'react';
import { firestore } from '../firebase';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { toast } from 'react-toastify';

const AddNote = () => {
    const [note, setNote] = useState('');
    const [category, setCategory] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (note.trim() && category.trim()) {
            try {
                await addDoc(collection(firestore, 'notes'), {
                    text: note,
                    category: category,
                    createdAt: serverTimestamp()
                });
                toast.success('Note added successfully');
                setNote('');
                setCategory('');
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
            <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Category"
                required
            />
            <br />
            <button type="submit">Add Note</button>
        </form>
    );
};

export default AddNote;
