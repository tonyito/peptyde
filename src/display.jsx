import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.scss';
import Location from './location.jsx';
import Item from './item.jsx';

const Display = () => {
  const [locationData, setLocationData] = useState({});
  const [currentLocation, setCurrentLocation] = useState('');
  const [itemsData, setItemsData] = useState({});
  const [page, setPage] = useState('location');
  const [renderStatus, setRenderStatus] = useState(false);
  const [locationID, setLocationID] = useState('');

  function openLocation(id, type, number) {
    setLocationID(id);
    setCurrentLocation(type + ' ' + number);
    setPage('locationDetail');
    //added this after commit
    setRenderStatus(false);
  }
  useEffect(() => {
    //get request for all locations
    if (page === 'location') {
      axios
        .get('/api/location/')
        .then(data => {
          setLocationData(data);
          setRenderStatus(true);
        })
        .catch(err => console.log('Location: fetch /api: ERROR: ', err));
      //get request for all items in selected location
    } else if (page === 'locationDetail') {
      axios
        .get(`/api/locationDetail?id=${locationID}`)
        .then(data => {
          setItemsData(data);
          setRenderStatus(true);
        })
        .catch(err => console.log('Location Detail: fetch /api: ERROR: ', err));
    }
  }, [page]);
  //render for all locations
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
    //render all items in selected location
  } else if (page === 'locationDetail' && renderStatus) {
    const data = itemsData.data;
    const array = [];
    for (let i = 0; i < data.length; i++) {
      array.push(
        <Item
          key={`Item Number ${i}`}
          id={data[i]._id}
          name={data[i].item_name}
          stock_date={data[i].stock_date}
          expiration={data[i].expiration}
          mass={data[i].mass}
          volume={data[i].volume}
          location_name={data[i].location_name}
          last_checked={data[i].last_checked}
          username={data[i].username}
        />
      );
    }
    return (
      <div>
        <h1>List of Items for {currentLocation}</h1>
        <table>
          <tbody>
            <tr>
              <th>Name</th>
              <th>Mass</th>
              <th>Volume</th>
              <th>Stock Date</th>
              <th>Expiration</th>
              <th>Last Checked</th>
              <th>Checked By</th>
            </tr>
            {array}
          </tbody>
        </table>
      </div>
    );
  }

  //render for loading
  else {
    return <h1>Loading...</h1>;
  }
};

export default Display;
