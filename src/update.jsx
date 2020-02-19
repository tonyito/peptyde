import React, { useState, useEffect } from 'react';
import './styles.scss';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Update = () => {
  const [renderStatus, setRenderStatus] = useState(false);
  const [itemsData, setItemsData] = useState({});
  const { id } = useParams();

  useEffect(() => {
    if (!renderStatus) {
      axios
        .get(`/api/itemDetail?id=${id}`)
        .then(data => {
          setItemsData(data);
          setRenderStatus(true);
        })
        .catch(err => console.log('Location Detail: fetch /api: ERROR: ', err));
    }
  });
  if (renderStatus) {
  const data = itemsData.data;
  return (
    <h1>Updating {data.item_name} from {data.brand}</h1>
    
  );
  } else return <h1>Loading...</h1>;
};

export default Update;
