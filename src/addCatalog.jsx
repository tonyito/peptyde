import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const AddCatalog = () => {
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [catalog, setCatalog] = useState('');
  const {location} = useParams();

  function sendAddCatalog() {
      const body = {
        name,
        brand,
        catalog
      };
      fetch('/api/addCatalog', {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/JSON'
        },
        body: JSON.stringify(body)
      })
        .catch(err =>
          console.log('addCatalog fetch /api/addCatalog: ERROR: ', err)
        );
  }


    return (
        <div>
        <h1>Enter Info for New Catalog Entry</h1>
        <p>Name:</p>
        <input value={name} onChange={(e) => setName('' + e.target.value)}/>
        <p>Brand:</p>
        <input value={brand} onChange={(f) => setBrand('' + f.target.value)}/>
        <p>Catalog Number:</p>
        <input value={catalog} onChange={(g) => setCatalog('' + g.target.value)}/>
        <Link to= '/'><button onClick={() => sendAddCatalog()}>Submit</button></Link> 
        <Link to={`/${location}`}>
        <button>
         Close
        </button></Link>
        </div>
    )

};

export default AddCatalog;
