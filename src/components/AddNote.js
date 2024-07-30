// src/components/AddNote.js
import React, { useState } from 'react';
import { firestore } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/AddNote.css';

const AddNote = () => {
    const [note, setNote] = useState('');
    const [category, setCategory] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (note.trim() && category.trim()) {
            try {
                const timestamp = serverTimestamp();

                // Add note to 'notes' collection
                const docRef = await addDoc(collection(firestore, 'notes'), {
                    text: note,
                    category: category,
                    createdAt: timestamp,
                    savedAt: timestamp  // Add savedAt timestamp
                });

                // Add initial note to 'history' sub-collection
                await addDoc(collection(firestore, 'notes', docRef.id, 'history'), {
                    text: note,
                    category: category,
                    isInitial: true,
                    savedAt: timestamp  // Add savedAt timestamp
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
        <form onSubmit={handleSubmit} className="container mt-5 add-note-form">
            <h2 className="mb-4">Add Note</h2>
            <div className="form-group mb-3">
                <textarea
                    className="form-control"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Write your note here..."
                    required
                />
            </div>
            <div className="form-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="Category"
                    required
                />
            </div>
            <button type="submit" className="btn btn-primary">Add Note</button>
        </form>
    );
};

export default AddNote;
