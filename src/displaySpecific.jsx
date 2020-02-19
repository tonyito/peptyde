import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Item from './item';

const DisplaySpecific = () => {
  const [renderStatus, setRenderStatus] = useState(false);
  const [itemsData, setItemsData] = useState({});

  let { id, type, number } = useParams();
  useEffect(() => {
    axios
      .get(`/api/locationDetail?id=${id}`)
      .then(data => {
        setItemsData(data);
        setRenderStatus(true);
      })
      .catch(err => console.log('Location Detail: fetch /api: ERROR: ', err));
  });

  //function to open 'update item' component
  function updateItem(id) {
    setItemSelected(id);
    setPage('update');
    serRenderStatus(false);
  }

  function openItem(id) {
    setItemSelected(id);
    setPage('itemDetail');
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
          updateItem={updateItem}
          openItem={openItem}
        />
      );
    }
    return (
      <div>
        <button onClick={() => addItem()}>Add Item</button>
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

