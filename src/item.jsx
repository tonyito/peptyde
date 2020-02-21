import React from 'react';
import './styles.scss';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import ItemSpecific from './itemSpecific';

const Item = ({ id, name, brand }) => {
  return (
    <React.Fragment>
      <Router>
        <tr>
          <td>
            <Link to={`/itemSpecific/${id}`}>{name}</Link>
          </td>
          <td>{brand}</td>
        </tr>
        <div>
          <Switch>
            <Route path="/itemSpecific/:id">
              <ItemSpecific />
            </Route>
          </Switch>
        </div>
      </Router>
    </React.Fragment>
  );
};

export default Item;
