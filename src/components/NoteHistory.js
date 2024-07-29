// src/components/NoteHistory.js
import React, { useState, useEffect } from 'react';
import { firestore } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useParams, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import ReactMarkdown from 'react-markdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/NoteHistory.css';

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
        <div className="container mt-5 note-history-container">
            <h2 className="mb-4">Note History</h2>
            <ul className="list-group">
                {history.map((version) => (
                    <li key={version.id} className="list-group-item mb-3">
                        <ReactMarkdown>{version.text}</ReactMarkdown>
                        <p><strong>Category:</strong> {version.category}</p>
                        <p><strong>Saved At:</strong>
                            {version.savedAt && version.savedAt.seconds ? new Date(version.savedAt.seconds * 1000).toLocaleString() : 'Unknown'}
                        </p>
                        <Link to={`/edit-note/${id}`} className="btn btn-secondary">Restore</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NoteHistory;
