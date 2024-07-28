// src/components/SearchBar.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/SearchBar.css';

const SearchBar = ({ searchQuery, setSearchQuery }) => {
    return (
        <input
            type="text"
            className="form-control search-bar"
            placeholder="Search notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
        />
    );
};

export default SearchBar;
