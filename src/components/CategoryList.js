// src/components/CategoryList.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/CategoryList.css';

const CategoryList = ({ categories, setFilterCategory }) => {
    return (
        <div className="category-list container mt-5">
            <h3>Categories</h3>
            <ul className="list-group">
                <li
                    className="list-group-item"
                    onClick={() => setFilterCategory('')}
                >
                    All
                </li>
                {categories.map((category, index) => (
                    <li
                        key={index}
                        className="list-group-item"
                        onClick={() => setFilterCategory(category)}
                    >
                        {category}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CategoryList;
