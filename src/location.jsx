import React from 'react';
import './styles.scss';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import DisplaySpecific from './displaySpecific';

const Location = ({ type, number, id, openLocation }) => {
  return (

        <React.Fragment>
          <tr>
            <td>
              <Link to={`/displaySpecific/${id}/${type}/${number}`}>{type} </Link>
            </td>
            <td>{number}</td>
          </tr>
        </React.Fragment>
  );
};

export default Location;

// <Link to={`/location/${id}`}>{type} {number}</Link>
// <Route path="/location/:id" component={DisplaySpecific}/>
