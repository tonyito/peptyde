import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles.scss";
import Location from "./location.jsx";

const Display = () => {
  const [locationData, setLocationData] = useState({});
  const [page, setPage] = useState("location");
  const [renderStatus, setRenderStatus] = useState(false);

  useEffect(() => {
    if (page === "location") {
      axios
        .get("/api/location/")
        .then(data => {
          setLocationData(data);
          setRenderStatus(true);
        })
        .catch(err => console.log("DetailsModal: fetch /api: ERROR: ", err));
    }
  }, [page]);

  if (page === "location" && renderStatus) {
    const data = locationData.data;
    // const rows = data.map((x, i) => {
    //   <Location key={`Location Number ${i}`} type={x.type} number={x.number} state={renderStatus}/>;
    // });
    const array = [];
    for (let i = 0; i < data.length; i++) {
      array.push(<Location key={`Location Number ${i}`} type={data[i].type} number={data[i].number} state={renderStatus}/>)
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
  } else if (page === "location" && !renderStatus) {
    return <h1>Loading...</h1>;
  }
};

export default Display;
