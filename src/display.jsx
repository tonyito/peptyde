import React, { useState, useEffect }  from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './styles.scss';

const Display = () => {
    const [ locationData , setLocationData ] = useState({});
    const [ page, setPage ] = useState('location');
    const [renderStatus, setRenderStatus] = useState(false)

    useEffect(() => {
        if (page === 'location') {
        axios
          .get(
            "/api/location/"
          )
          .then(data => {
            setLocationData(data);
            setRenderStatus(true);
          })
          .catch(err => console.log('DetailsModal: fetch /api: ERROR: ', err));
        }
      }, [page]);

    if (page === 'location' && renderStatus) {
        console.log(locationData.data);
        const rows = locationData.data.map((x,i) => {return x.type});
        console.log(rows);
        return (
          <div>
        <h1>{rows}</h1>
        </div>
        );
    }
    else if (page === 'location' && !renderStatus) {

      return (
      <h1>Hi</h1>
      );
  }
}

export default Display;