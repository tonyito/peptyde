import React from "react";
import "./styles.scss";

const Location = ({ type, number, state }) => {
    return (
      <React.Fragment>
        <tr>
          <td>{type}</td>
          <td>{number}</td>
        </tr>
      </React.Fragment>
    );
  
};

export default Location;
