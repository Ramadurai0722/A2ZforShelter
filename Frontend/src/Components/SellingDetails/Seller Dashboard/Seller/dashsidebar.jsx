import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./dashsidebar.css";

const CategorySidebar = ({ categories, setSelectedCategory, selectedCategory }) => {
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="category-sidebar">
      <h3>Categories</h3>
      <ul>
        {Object.keys(categories).map((category) => (
          <li 
            key={category} 
            onClick={() => handleCategoryClick(category)}
            className={selectedCategory === category ? 'active' : ''}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategorySidebar;
