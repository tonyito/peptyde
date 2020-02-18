import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Route, Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Welcome to Peptyde</h1>
      <Link to="/display">
        <button>
         Click here to see all your stuff
        </button>
      </Link>
    </div>
  );
};

export default Home;
