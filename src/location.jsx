import React from "react";
import "./styles.scss";

const Location = ({ type, number, id, openLocation }) => {
    return (
      <React.Fragment>
        <tr onClick={() => openLocation(id)}>
          <td>{type}</td>
          <td>{number}</td>
        </tr>
      </React.Fragment>
    );
  
};

export default Location;
