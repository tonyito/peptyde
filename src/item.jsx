import React from 'react';
import './styles.scss';

const Item = ({
  id,
  name,
  stock_date,
  expiration,
  mass,
  volume,
  location_name,
  last_checked,
  username
}) => {
  expiration = expiration.toString().slice(0, 10);
  stock_date = stock_date.toString().slice(0, 10);
  last_checked = last_checked.toString().slice(0, 10);

  return (
    <React.Fragment>
      <tr>
        <td>{name}</td>
        <td>{mass}</td>
        <td>{volume}</td>
        <td>{stock_date}</td>
        <td>{expiration}</td>
        <td>{last_checked}</td>
        <td>{username}</td>
      </tr>
    </React.Fragment>
  );
};

export default Item;
