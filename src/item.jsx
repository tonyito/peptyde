import React from 'react';
import './styles.scss';
import { Link } from 'react-router-dom';


const Item = ({
  id,
  name,
  brand, 
}) => {

  return (
    <React.Fragment>
      <tr>
        <td><Link to={`/itemSpecific/${id}`}>{name}</Link></td>
        <td>{brand}</td>
      </tr>
    </React.Fragment>
  );  
};

export default Item;
