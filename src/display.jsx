import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.scss';
import Location from './location.jsx';

const Display = () => {
  const [locationData, setLocationData] = useState({});
  const [renderStatus, setRenderStatus] = useState(false);

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
  
  }});

 if (renderStatus) {
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
    return (
        <div>
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

    );
  }

  else {
    return <h1>Loading...</h1>;
  }
};

export default Display;
