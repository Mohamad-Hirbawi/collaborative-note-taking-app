// src/components/NoteHistory.js
import React, { useState, useEffect } from 'react';
import { firestore } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useParams, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import ReactMarkdown from 'react-markdown';

const NoteHistory = () => {
    const { id } = useParams();
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const historyCollection = collection(firestore, 'notes', id, 'history');
                const historySnapshot = await getDocs(historyCollection);
                const historyData = historySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setHistory(historyData);
            } catch (error) {
                toast.error('Error fetching note history: ' + error.message);
            }
        };

        fetchHistory();
    }, [id]);

    return (
        <div>
            <h2>Note History</h2>
            <ul>
                {history.map((version, index) => (
                    <li key={version.id}>
                        <ReactMarkdown>{version.text}</ReactMarkdown>
                        <p><strong>Category:</strong> {version.category}</p>
                        <p><strong>Saved At:</strong> {new Date(version.savedAt.seconds * 1000).toLocaleString()}</p>
                        <Link to={`/edit-note/${id}`}>Restore</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NoteHistory;
