import React from 'react';

const Navbar = ({ categories, onSelectCategory, selectedCategory }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#">Categorías</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          {categories.map(category => (
            <li 
              key={category.name} 
              className={`nav-item ${selectedCategory === category.name ? 'active' : ''}`}
              onClick={() => onSelectCategory(category.name)}
            >
              <a className="nav-link" href="#">{category.name}</a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
