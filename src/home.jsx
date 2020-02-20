import React from 'react';
import './styles.scss';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Minimalism or Laziness?</h1>

      <Link to="/display">
        <button className = '.Button' variant="info">Click here to see all your stuff</button>
      </Link>
      <Link to ='/addItem'>
        <button variant="info">Add an existing catalog item</button>
        </Link>
        <Link to="/addCatalog">
          <button variant="info">Add a new item type to the catalog</button>
        </Link>
    </div>
  );
};

export default Home;
