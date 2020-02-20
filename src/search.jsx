import React, {useState} from 'react';
import './styles.scss';
import { Link } from 'react-router-dom';
import Axios from 'axios';


const Search = ({minimize}) => {

  return (
    <React.Fragment>
      <input placeholder='Search Inventory' type='text' onChange={(e)=> minimize(e)} />
    </React.Fragment>
  );  
};

export default Search;