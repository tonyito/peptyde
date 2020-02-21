import React, { useState, useEffect } from 'react';
import {
  useParams,
  Link,
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import axios from 'axios';
import Location from './location.jsx';
import AddItem from './addItem.jsx';
import AddCatalog from './addCatalog';

const Display = () => {
  const [locationData, setLocationData] = useState({});
  const [renderStatus, setRenderStatus] = useState(false);
  const { deleted } = useParams();

  //side effect handlers
  useEffect(() => {
    //get request for all locations
    if (!renderStatus) {
      axios
        .get('/api/location/')
        .then(data => {
          setLocationData(data);
          setRenderStatus(true);
        })
        .catch(err => console.log('Location: fetch /api: ERROR: ', err));
      //get request for all items in selected location
    }
  });

  if (renderStatus) {
    let success = '';
    if (deleted) {
      success = <h1>Item successfully deleted.</h1>;
    }

    const data = locationData.data;
    const array = [];
    for (let i = 0; i < data.length; i++) {
      array.push(
        <Location
          key={`Location Number ${i}`}
          id={data[i]._id}
          type={data[i].type}
          number={data[i].number}
        />
      );
    }
    const location = 'display';
    return (
<React.Fragment>
<div>
          {success}
          <Link to="/">
          <button>
           Home
          </button></Link>
          <table>
            <tbody>
              <tr>
                <th>Storage Unit Type</th>
                <th>Unit Number</th>
              </tr>
              {array}
            </tbody>
          </table>
          </div>
          <Router>
          <div>
          <Link to={`/addItem/${location}`}>
            <button>Add a new item</button>
          </Link>
          <Link to={`/addCatalog/${location}`}>
            <button>Add a new item type to the catalog</button>
          </Link>
          <Switch>
            <Route path={`/addItem/:location`}>
              <AddItem />
            </Route>
            <Route path={`/addCatalog/:location`}>
            <AddCatalog />
          </Route>
          </Switch>
        </div>
      </Router>
      </React.Fragment>
    );
  } else {
    return <h1>Loading...</h1>;
  }
};

export default Display;
