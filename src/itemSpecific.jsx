import React, { useState, useEffect } from 'react';
import './styles.scss';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const ItemSpecific = () => {
  const [renderStatus, setRenderStatus] = useState(false);
  const [itemsData, setItemsData] = useState({});
  const { id } = useParams();

  useEffect(() => {
    if (!renderStatus) {
      axios
        .get(`/api/itemDetail?id=${id}`)
        .then(data => {
          setItemsData(data);
          console.log(itemsData.data.item_name);
          setRenderStatus(true);
        })
        .catch(err => console.log('Location Detail: fetch /api: ERROR: ', err));
    }
  });

  if (!renderStatus) {
    return <h1>Loading...</h1>;
  } else {
    itemsData.data.expiration = itemsData.data.expiration.toString().slice(0, 10);
    itemsData.data.stock_date = itemsData.data.stock_date.toString().slice(0, 10);
    itemsData.data.last_checked = itemsData.data.last_checked.toString().slice(0, 10);
    return (
        <React.Fragment>
        <h1>Selected Item Detail:</h1>
      <table>
      <tbody>
        <tr>
          <th>Name</th>
          <th>Brand</th>
          <th>Expiration</th>
          <th>Mass</th>
          <th>Volume</th>
          <th>Location</th>
          <th>Last Checked</th>
          <th>Stock Date</th>
        </tr>
        <tr>
          <td>{itemsData.data.item_name}</td>
          <td>{itemsData.data.brand}</td>
          <td>{itemsData.data.expiration}</td>
          <td>{itemsData.data.mass} {itemsData.data.mass_unit}</td>
          <td>{itemsData.data.volume} {itemsData.data.volume_unit}</td>
          <td>{itemsData.data.last_checked}</td>
          <td>{itemsData.data.stock_date}</td>
        </tr>
        </tbody>
      </table>
      </React.Fragment>
    );
  }
};

// item_name: "ddH20"
// item_id: "5e4a45151c9d440000b7c888"
// brand: "Thermo-Fisher"
// expiration: "2020-02-29T00:00:00.000Z"
// mass: 0
// mass_unit: "kg"
// volume: 2
// location_name: "Shelf 1"
// location_id: "5e4a0c221c9d440000ba9704"
// last_checked: "2020-02-17T23:07:46.827Z"
// stock_date: "2020-02-17T23:07:46.831Z"

export default ItemSpecific;

