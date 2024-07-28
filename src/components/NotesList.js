// src/components/NotesList.js
import React, { useEffect, useState } from 'react';
import { firestore } from '../firebase';
import { collection, query, orderBy, onSnapshot, doc, deleteDoc } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import ReactMarkdown from 'react-markdown';
import SearchBar from './SearchBar';
import CategoryList from './CategoryList';

const NotesList = () => {
    const [notes, setNotes] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterCategory, setFilterCategory] = useState('');
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const q = query(collection(firestore, 'notes'), orderBy('createdAt', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const notesData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setNotes(notesData);

            // Extract unique categories
            const uniqueCategories = [...new Set(notesData.map(note => note.category))];
            setCategories(uniqueCategories);
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

    const filteredNotes = notes.filter(note =>
        note.text.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (filterCategory ? note.category.toLowerCase() === filterCategory.toLowerCase() : true)
    );

    return (
        <div>
            <h2>Notes</h2>
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <CategoryList categories={categories} setFilterCategory={setFilterCategory} />
            <ul>
                {filteredNotes.map(note => (
                    <li key={note.id}>
                        <ReactMarkdown>{note.text}</ReactMarkdown>
                        <p><strong>Category:</strong> {note.category}</p>
                        <Link to={`/edit-note/${note.id}`}>Edit</Link>
                        <button onClick={() => handleDelete(note.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NotesList;
