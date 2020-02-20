import React, {useState} from 'react';
import './styles.scss';
import { Link } from 'react-router-dom';
import Axios from 'axios';


const Search = ({setCurrentForm}) => {

  return (
    <React.Fragment>
      <input placeholder='Search Inventory' type='text' onChange={(e)=> setCurrentForm(e.target.value)} />
    </React.Fragment>
  );  
};

export default Search;