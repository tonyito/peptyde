import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Item from './item';
import Search from './search';


const DisplaySpecific = () => {
  const [renderStatus, setRenderStatus] = useState(false);
  const [itemsData, setItemsData] = useState({});

  let { id, type, number } = useParams();
  useEffect(() => {
    if (!renderStatus) {
    axios
      .get(`/api/locationDetail?id=${id}`)
      .then(data => {
        setItemsData(data);
        setRenderStatus(true);
      })
      .catch(err => console.log('Location Detail: fetch /api: ERROR: ', err));
    }
  });

  function minimize(e) {
    let newArray = [];
    e.persist();
    const regex = RegExp(e.target.value);
    for (let value of itemsData.data) {
      if(regex.test(value.item_name)) {
        newArray.push(value);
      }
    }
    const newObj = {data: newArray};
    setItemsData(newObj);
  }


  if (renderStatus) {
    
    const data = itemsData.data;
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
      <div>
      <Search minimize={minimize}/>
      <Link to="/addItem">

      <button>
       Add an item
      </button></Link>
      <Link to="/addCatalog">
      <button>Add a new item type to the catalog</button>
    </Link>
        <h1>List of Items for {type} {number}</h1>
        <table>
          <tbody>
            <tr>
              <th>Name</th>
              <th>Brand</th>
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

export default DisplaySpecific;

