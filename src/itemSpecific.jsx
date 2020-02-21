import React, { useState, useEffect } from 'react';
import './styles.scss';
import { BrowserRouter as Router, useParams, Redirect, Link, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import Update from './update';

const ItemSpecific = () => {
  const [renderStatus, setRenderStatus] = useState(false);
  const [itemsData, setItemsData] = useState({});
  const [text, setText] = useState('Delete');
  const [sure, setSure] = useState(0);
  const { id } = useParams();

  useEffect(() => {
    if (!renderStatus) {
      axios
        .get(`/api/itemDetail?id=${id}`)
        .then(data => {
          setItemsData(data);
          setRenderStatus(true);
        })
        .catch(err => console.log('Location Detail: fetch /api: ERROR: ', err));
    }
  });

  function deleeeet(id) {
    fetch('/api/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/JSON'
      },
      body: JSON.stringify({ id })
    }).catch(err => console.log('Delete fetch /api/delete: ERROR: ', err));
  }

  if (sure === 2) {
    deleeeet(id);
    const deleted = true;
    return (
      <Redirect
        to={{
          pathname: `/display/${deleted}`
        }}
      />
    );
  } else if (!renderStatus) {
    return <h1>Loading...</h1>;
  } else {
    itemsData.data.expiration = itemsData.data.expiration
      .toString()
      .slice(0, 10);
    itemsData.data.stock_date = itemsData.data.stock_date
      .toString()
      .slice(0, 10);
    itemsData.data.last_checked = itemsData.data.last_checked
      .toString()
      .slice(0, 10);
    return (
      <React.Fragment>
        <h1>Selected Item Detail:</h1>
        <Link to='/'><button>Home</button></Link>
        <table>
          <tbody>
            <tr>
              <th>Name</th>
              <th>Brand</th>
              <th>Expiration</th>
              <th>Mass</th>
              <th>Volume</th>
              <th>Location</th>
              <th>Last Checked</th>
              <th>Stock Date</th>
            </tr>
            <tr>
              <td>{itemsData.data.item_name}</td>
              <td>{itemsData.data.brand}</td>
              <td>{itemsData.data.expiration}</td>
              <td>
                {itemsData.data.mass} {itemsData.data.mass_unit}
              </td>
              <td>
                {itemsData.data.volume} {itemsData.data.volume_unit}
              </td>
              <td>{itemsData.data.location_name}</td>
              <td>{itemsData.data.last_checked}</td>
              <td>{itemsData.data.stock_date}</td>
            </tr>
          </tbody>
        </table>
        <Router>
        <Link to={`/update/${id}`}>
          <button>Update</button>
        </Link>
        <button
          onClick={() => {
            setText('Are You Sure?');
            !sure ? setSure(1) : setSure(2);
          }}
        >
          {text}
        </button>
        <div>
        <Switch>
        <Route path='/update/:id'>
          <Update />
        </Route>
      </Switch>
    </div>
        </Router>
      </React.Fragment>
    );
  }
};

export default ItemSpecific;
