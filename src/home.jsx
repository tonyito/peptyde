import React from 'react';

import {Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Hi</h1>
      <Link to="/display">
        <button>
         Click here to see all your stuff
        </button>
      </Link>
      <Link to="/addItem">
      <button>
       Add an item
      </button>
    </Link>
    </div>
  );
};

export default Home;
