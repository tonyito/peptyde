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
  const [catalogData, setCatalogData] = useState({});
  const [itemSelected, setItemSelected] = useState('');
  const [brandSelected, setBrandSelected] = useState('');
  const [mass, setMass] = useState(0);
  const [volume, setVolume] = useState(0);
  const [massUnit, setMassUnit] = useState('kg');
  const [volumeUnit, setVolumeUnit] = useState('L');
  const [date, setDate] = useState(Date.now());

  //function to display items in location selected
  function openLocation(id, type, number) {
    setLocationID(id);
    setCurrentLocation(type + ' ' + number);
    setPage('locationDetail');
    setRenderStatus(false);
  }

  function openItem(id) {
    setItemSelected(id);
    setPage('itemDetail');
  }

  //function to open 'add item' component (not really a component I shouldve made it one though. Maybe later.)
  function addItem() {
    setPage('addItem');
    setRenderStatus(false);
  }

  //function to open 'update item' component
  function updateItem(id) {
    setItemSelected(id);
    setPage('update');
    serRenderStatus(false);
  }



  //function to send post request to add item to mongo
  function sendAddItem() {
    if (
      itemSelected !== '' &&
      brandSelected !== '' &&
      itemSelected !== 'select' &&
      brandSelected !== 'select' &&
      (mass !== 0 || volume !== 0)
    ) {
      const body = {
        locationID,
        itemSelected,
        brandSelected,
        mass,
        massUnit,
        volume,
        volumeUnit,
        date,
        locationID
      };
      fetch('/api/addItem', {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/JSON'
        },
        body: JSON.stringify(body)
      })
        .then(resp => resp.json())
        .then(() => {
          setPage('locationDetail');
          setRenderStatus(false);
          setCatalogData('');
          setItemSelected('');
          setBrandSelected('');
          setMass(0);
          setVolume(0);
        })
        .then(console.log('sent!'))
        .catch(err =>
          console.log('CreateCharacter fetch /api/addItem: ERROR: ', err)
        );
    }
  }

  //side effect handlers
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
      //get request for selector data
    } else if (page === 'addItem') {
      axios
        .get('/api/catalog/')
        .then(data => {
          setCatalogData(data);
          setRenderStatus(true);
        })
        .catch(err => console.log('Location Detail: fetch /api: ERROR: ', err));
    }
  }, [page]);
  //render for all locations
  if (page === 'addItem' && renderStatus) {
    const data = catalogData.data;
    const nameArray = [
      <option key="defaultName" value="select">
        Select
      </option>
    ];
    const brandArray = [
      <option key="defaultBrand" value="select">
        Select
      </option>
    ];
    for (let i = 0; i < data.length; i++) {
      nameArray.push(
        <option key={`addItemName ${i}`} value={data[i].name}>
          {data[i].name}
        </option>
      );
      brandArray.push(
        <option key={`addItemBrand ${i}`} value={data[i].brand}>
          {data[i].brand}
        </option>
      );
    }
    return (
      <div>
        <label htmlFor="itemName">Select an item:</label>
        <select id="itemName" onChange={e => setItemSelected(e.target.value)}>
          {nameArray}
        </select>
        <label htmlFor="brandName">Select an brand:</label>
        <select id="brandName" onChange={e => setBrandSelected(e.target.value)}>
          {brandArray}
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
          onChange={e => setDate(e.target.value)}
        ></input>
        <button onClick={() => sendAddItem()}>Add</button>
      </div>
    );
  } else if (page === 'location' && renderStatus) {
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
  }
    //render all items in selected location
  // else if (page === 'locationDetail' && renderStatus) {
  //   const data = itemsData.data;
  //   const array = [];
  //   for (let i = 0; i < data.length; i++) {
  //     array.push(
  //       <Item
  //         key={`Location Item Number ${i}`}
  //         type={'list'}
  //         id={data[i]._id}
  //         name={data[i].item_name}
  //         brand={data[i].brand}
  //         stock_date={data[i].stock_date}
  //         expiration={data[i].expiration}
  //         mass={data[i].mass}
  //         mass_unit={data[i].mass_unit}
  //         volume={data[i].volume}
  //         volume_unit={data[i].volume_unit}
  //         location_name={data[i].location_name}
  //         last_checked={data[i].last_checked}
  //         username={data[i].username}
  //         updateItem={updateItem}
  //         openItem = {openItem}
  //       />
  //     );
  //   }
  //   return (
  //     <div>
  //       <button onClick={() => addItem()}>Add Item</button>
  //       <h1>List of Items for {currentLocation}</h1>
  //       <table>
  //         <tbody>
  //           <tr>
  //             <th>Name</th>
  //             <th>Brand</th>
  //           </tr>
  //           {array}
  //         </tbody>
  //       </table>
  //     </div>
  //   );
  // }
  else if (page === 'itemDetail' && renderStatus) {
    const data = itemsData.data;
    let index = 0;
   for (let i = 0; i < data.length; i++) {
     if (data[i]._id === itemSelected) {
       index = i;
     }
   }
    const array = [];
      array.push(
        <Item
          key={`Item Number ${index}`}
          id={data[index]._id}
          name={data[index].item_name}
          brand={data[index].brand}
          stock_date={data[index].stock_date}
          expiration={data[index].expiration}
          mass={data[index].mass}
          mass_unit={data[index].mass_unit}
          volume={data[index].volume}
          volume_unit={data[index].volume_unit}
          location_name={data[index].location_name}
          last_checked={data[index].last_checked}
          username={data[index].username}
          updateItem={updateItem}
          openItem = {openItem}
        />
      );
    return (
      <div>
        <button onClick={() => addItem()}>Add Item</button>
        <h1>List of Items for {currentLocation}</h1>
        <table>
          <tbody>
            <tr>
              <th>Name</th>
              <th>Brand</th>
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
