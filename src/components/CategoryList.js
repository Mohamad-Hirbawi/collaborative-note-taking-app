// src/components/CategoryList.js
import React from 'react';

const CategoryList = ({ categories, setFilterCategory }) => {
    return (
        <div>
            <h3>Categories</h3>
            <ul>
                <li onClick={() => setFilterCategory('')}>All</li>
                {categories.map((category, index) => (
                    <li key={index} onClick={() => setFilterCategory(category)}>
                        {category}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CategoryList;
