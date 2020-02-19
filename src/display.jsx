import React, { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import './styles.scss';
import Location from './location.jsx';

const Display = () => {
  const [locationData, setLocationData] = useState({});
  const [renderStatus, setRenderStatus] = useState(false);
  const {deleted} = useParams();

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
   let success = '';
   if (deleted) {
    success = <h1>Item successfully deleted.</h1>
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
    return (
        <div>
        {success}
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
