import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.scss';
import Location from './location.jsx';

const Display = () => {
  const [locationData, setLocationData] = useState({});
  const [page, setPage] = useState('location');
  const [renderStatus, setRenderStatus] = useState(false);
  const [locationID, setLocationID] = useState('');

  function openLocation(id) {
    setLocationID(id);
    setPage('locationDetail')
  }
  useEffect(() => {
    if (page === 'location') {
      axios
        .get('/api/location/')
        .then(data => {
          setLocationData(data);
          setRenderStatus(true);
        })
        .catch(err => console.log('DetailsModal: fetch /api: ERROR: ', err));
    }
    else if (page === 'locationDetail') {
      axios
      .get('/api/locationDetail/')
      .then(data => {
        setLocationData(data);
        setRenderStatus(true);
        console.log('clicked', locationID);
      })
      .catch(err => console.log('DetailsModal: fetch /api: ERROR: ', err));
  }
    
  }, [page]);

  if (page === 'location' && renderStatus) {
    const data = locationData.data;
    const array = [];
    for (let i = 0; i < data.length; i++) {
      array.push(
        <Location
          key={`Location Number ${i}`}
          id={data[i]._id}
          type={data[i].type}
          number={data[i].number}
          openLocation={openLocation}
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
  } else {
    return <h1>Loading...</h1>;
  }
};

export default Display;
