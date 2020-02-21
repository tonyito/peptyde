import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import './styles.scss';

const AddItem = () => {
  const [renderStatus, setRenderStatus] = useState(false);
  const [locationData, setLocationData] = useState({});
  const [catalogData, setCatalogData] = useState({});
  const [itemSelected, setItemSelected] = useState('');
  const [brandSelected, setBrandSelected] = useState('');
  const [locationID, setLocationID] = useState('');
  const [mass, setMass] = useState(0);
  const [volume, setVolume] = useState(0);
  const [massUnit, setMassUnit] = useState('kg');
  const [volumeUnit, setVolumeUnit] = useState('L');
  const [date, setDate] = useState(Date.now());
  const [newItem, setNewItem] = useState('');
  const [brandItem, setBrandItem] = useState('');

  const { location, type, number } = useParams();

  useEffect(() => {
    if (!renderStatus) {
      axios
        .all([axios.get('/api/catalog/'), axios.get('/api/location/')])
        .then(
          axios.spread((catalogDataGot, locationDataGot) => {
            setCatalogData(catalogDataGot);
            setLocationData(locationDataGot);
            setRenderStatus(true);
          })
        )
        .catch(err => console.log('Location Detail: fetch /api: ERROR: ', err));
    }
  });

  function sendAddItem() {
    if (
      locationID !== '' &&
      itemSelected !== 'select' &&
      brandSelected !== 'select' &&
      (mass !== 0 || volume !== 0)
    ) {
      const sendItem = newItem ? newItem : itemSelected;
      let sendBrand = brandItem ? brandItem : brandSelected;

      const body = {
        locationID,
        itemSelected: sendItem,
        brandSelected: sendBrand,
        mass,
        massUnit,
        volume,
        volumeUnit,
        date
      };
      fetch('/api/addItem', {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/JSON'
        },
        body: JSON.stringify(body)
      })
        .then(resp => resp.json())
        .catch(err => console.log('addItem fetch /api/addItem: ERROR: ', err));
    }
  }
  if (renderStatus) {
    const itemArray = [];
    const newBrandArray = [];
    if (itemSelected === 'new') {
      itemArray.push(
        <input key="iteminput" onChange={e => setNewItem(e.target.value)} />
      );
    }
    if (brandSelected === 'new') {
      newBrandArray.push(
        <input key="brandinput" onChange={e => setBrandItem(e.target.value)} />
      );
    }
    const displayLocationData = locationData.data;
    const locationArray = [
      <option key="defaultLocation" value="select">
        Select
      </option>
    ];
    const data = catalogData.data;
    const nameArray = [
      <option key="defaultName" value="select">
        Select
      </option>,
      <option key="newName" value="new">
        New...
      </option>
    ];
    const brandArray = [
      <option key="defaultName" value="select">
        Select
      </option>,
      <option key="newBrand" value="new">
        New...
      </option>
    ];
    for (let i = 0; i < data.length; i++) {
      nameArray.push(
        <option key={`addItemName ${i}`} value={`${data[i].name}`}>
          {`${data[i].name}`}
        </option>
      );
      brandArray.push(
        <option key={`addBrandName ${i}`} value={`${data[i].brand}`}>
          {`${data[i].brand}`}
        </option>
      );
    }
    for (let i = 0; i < displayLocationData.length; i++) {
      locationArray.push(
        <option key={`addLocationName ${i}`} value={displayLocationData[i]._id}>
          {displayLocationData[i].type} {displayLocationData[i].number}
        </option>
      );
    }
    return (
      <div className="addItem">
        <label htmlFor="itemName">Select an item:</label>
        <select id="itemName" onChange={e => setItemSelected(e.target.value)}>
          {nameArray}
        </select>
        {itemArray}
        <label htmlFor="brandName">Select the maker:</label>
        <select id="brandName" onChange={e => setBrandSelected(e.target.value)}>
          {brandArray}
        </select>
        {newBrandArray}
        <label htmlFor="locationName">Select an location:</label>
        <select id="locationName" onChange={e => setLocationID(e.target.value)}>
          {locationArray}
        </select>
        <span>Mass:</span>
        <input
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
        <input
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
          onChange={e => setDate(e.target.value)}
        ></input>
        <Link to={`/displaySpecific/${location}/${type}/${number}/true`}>
          <button onClick={() => sendAddItem()}>Add</button>
        </Link>
        <Link to="/">
          <button>Home</button>
        </Link>
        <Link to={`/${location}`}>
          <button>Close</button>
        </Link>
      </div>
    );
  } else return <h1>Loading...</h1>;
};

export default AddItem;
