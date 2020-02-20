import React, { useState, useEffect } from 'react';
import './styles.scss';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const Update = () => {
  const [renderStatus, setRenderStatus] = useState(false);
  const [locationData, setLocationData] = useState({});
  const [itemsData, setItemsData] = useState({});
  const [locationID, setLocationID] = useState('');
  const [mass, setMass] = useState(0);
  const [volume, setVolume] = useState(0);
  const [massUnit, setMassUnit] = useState('kg');
  const [volumeUnit, setVolumeUnit] = useState('L');
  const [date, setDate] = useState(Date.now());
  const { id } = useParams();

  useEffect(() => {
    if (!renderStatus) {
    axios
      .all([axios.get('/api/location/'), axios.get(`/api/itemDetail?id=${id}`)])
      .then(
        axios.spread((locationDataGot, itemDataGot) => {
          setLocationData(locationDataGot);
          setItemsData(itemDataGot);
          setMass(itemsData.data.mass);
          setMassUnit(itemsData.data.mass_unit);
          setVolume(itemsData.data.volume);
          setVolumeUnit(itemsData.data.volume_unit);
          setDate(itemsData.data.expiration);
          setLocationID(itemsData.data.location_id);
          setRenderStatus(true);
        })
      )
      .catch(err => console.log('Location Detail: fetch /api: ERROR: ', err));
    }
  });

  function sendUpdateItem(){
    const body = {
      id,
      locationID,
      mass,
      massUnit,
      volume,
      volumeUnit,
      date
    };
    fetch('/api/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/JSON'
      },
      body: JSON.stringify(body)
    })
      .catch(err =>
        console.log('updateItem fetch /api/updateItem: ERROR: ', err)
      );
  }

  if (renderStatus) {
    let redirectLocation = {};
  const newItemData = itemsData.data;
  const newLocationData = locationData.data;

  for (let value of newLocationData) {
    if (value._id === newItemData.location_id) {
      redirectLocation = value;
    }
  }
  const locationArray = [];
  for (let i = 0; i < newLocationData.length; i++) {
    locationArray.push(
      <option key={`addLocationName ${i}`} value={newLocationData[i]._id}>
        {newLocationData[i].type} {newLocationData[i].number}
      </option>
    );
  }
  
  return (
    <div>
    <h1>Updating {newItemData.item_name} from {newItemData.brand}</h1>
    <label htmlFor="locationName">Select an location:</label>
    <select id="locationName" value={newItemData.location_id} onChange={e => setLocationID(e.target.value)}>
      {locationArray}
    </select>
    <span>Mass:</span>
        <textarea
          tpe="text"
          name="mass"
          value={mass}
          onChange={e => setMass('' + e.target.value)}
        />
        <label htmlFor="massUnit">Unit:</label>
        <select
          id="massUnit"
          value={massUnit}
          onChange={e => setMassUnit(e.target.value)}
        >
          <option value="kg">kg</option>
          <option value="g">g</option>
          <option value="mg">mg</option>
          <option value="ug">ug</option>
          <option value="ng">ng</option>
        </select>
        <span>or Volume:</span>
        <textarea
          tpe="text"
          name="volume"
          value={volume}
          onChange={e => setVolume('' + e.target.value)}
        />
        <label htmlFor="volumeUnit">Unit:</label>
        <select
          id="volumeUnit"
          value={volumeUnit}
          onChange={e => setVolumeUnit(e.target.value)}
        >
          <option value="L">L</option>
          <option value="mL">mL</option>
          <option value="uL">uL</option>
          <option value="nL">nL</option>
        </select>
        <label htmlFor="expiration">Expiration date:</label>
        <input
          type="date"
          id="expiration"
          name="expiration"
          value={newItemData.expiration.slice(0,10)}
          onChange={e => setDate(e.target.value)}
        ></input>
        <Link to={`/displaySpecific/${redirectLocation._id}/${redirectLocation.type}/${redirectLocation.number}`}><button onClick={() => sendUpdateItem()}>Update</button></Link>
    </div>
    
  );
  } else return <h1>Loading...</h1>;
};

export default Update;

