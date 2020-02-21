import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Link,
  useParams,
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Item from './item';
import Search from './search';
import AddItem from './addItem';
import AddCatalog from './addCatalog';

const DisplaySpecific = () => {
  const [renderStatus, setRenderStatus] = useState(false);
  const [itemsData, setItemsData] = useState([]);
  const [currentForm, setCurrentForm] = useState('');

  let { id, type, number, redirect } = useParams();
  useEffect(() => {
    if (!renderStatus || redirect) {
      axios
        .get(`/api/locationDetail?id=${id}`)
        .then(data => {
          setItemsData(data.data);
          setRenderStatus(true);
        })
        .catch(err => console.log('Location Detail: fetch /api: ERROR: ', err));
    }
  });

  function minimize(e) {
    const regex = RegExp(e, 'i');
    const output = itemsData.filter(value => regex.test(value.item_name));
    const items = output.map((data, i) => (
      <Item
        key={`Location Item Number ${i}`}
        type={'list'}
        id={data._id}
        name={data.item_name}
        brand={data.brand}
        stock_date={data.stock_date}
        expiration={data.expiration}
        mass={data.mass}
        mass_unit={data.mass_unit}
        volume={data.volume}
        volume_unit={data.volume_unit}
        location_name={data.location_name}
        last_checked={data.last_checked}
        username={data.username}
      />
    ));
    return items;
  }

  if (renderStatus) {
    const data = itemsData;

    const array = [];
    for (let i = 0; i < data.length; i++) {
      array.push(
        <Item
          key={`Location Item Number ${i}`}
          type={'list'}
          id={data[i]._id}
          name={data[i].item_name}
          brand={data[i].brand}
          stock_date={data[i].stock_date}
          expiration={data[i].expiration}
          mass={data[i].mass}
          mass_unit={data[i].mass_unit}
          volume={data[i].volume}
          volume_unit={data[i].volume_unit}
          location_name={data[i].location_name}
          last_checked={data[i].last_checked}
          username={data[i].username}
        />
      );
    }
    return (
      <React.Fragment>
        <div>
          <h1>
            List of Items for {type} {number}
          </h1>
          <Link to="/">
            <button>Home</button>
          </Link>
          <Search minimize={minimize} setCurrentForm={setCurrentForm} />
          <Router>
            <Link to={`/addItem/${id}/${type}/${number}`}>
              <button>Add an item</button>
            </Link>
            <Link to="/addCatalog">
              <button>Add a new item type to the catalog</button>
            </Link>
            <div>
              <Switch>
                <Route path="/addItem/:location/:type/:number">
                  <AddItem />
                </Route>
                <Route path="/addCatalog">
                  <AddCatalog />
                </Route>
              </Switch>
            </div>
          </Router>
          <table>
            <tbody>
              <tr>
                <th>Name</th>
                <th>Brand</th>
              </tr>
              {minimize(currentForm)}
            </tbody>
          </table>
        </div>
      </React.Fragment>
    );
  } else {
    return <h1>Loading...</h1>;
  }
};

export default DisplaySpecific;
