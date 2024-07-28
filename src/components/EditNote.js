// src/components/EditNote.js
import React, { useState, useEffect } from 'react';
import { firestore } from '../firebase';
import { doc, getDoc, updateDoc, collection, addDoc } from 'firebase/firestore';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const EditNote = () => {
    const { id } = useParams();
    const [note, setNote] = useState('');
    const [category, setCategory] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchNote = async () => {
            try {
                const docRef = doc(firestore, 'notes', id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setNote(docSnap.data().text);
                    setCategory(docSnap.data().category);
                } else {
                    toast.error('Note not found');
                    navigate('/notes');
                }
            } catch (error) {
                toast.error('Error fetching note: ' + error.message);
            }
        };

        fetchNote();
    }, [id, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const docRef = doc(firestore, 'notes', id);
            const noteSnapshot = await getDoc(docRef);

            // Save the current version to history collection
            if (noteSnapshot.exists()) {
                const noteData = noteSnapshot.data();
                await addDoc(collection(firestore, 'notes', id, 'history'), {
                    ...noteData,
                    savedAt: new Date()
                });
            }

            // Update the note
            await updateDoc(docRef, { text: note, category: category });
            toast.success('Note updated successfully');
            navigate('/notes');
        } catch (error) {
            toast.error('Error updating note: ' + error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Edit Note</h2>
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
            <button type="submit">Update Note</button>
        </form>
    );
};

export default EditNote;
