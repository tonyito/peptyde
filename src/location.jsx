import React from 'react';
import './styles.scss';
import { Link} from 'react-router-dom';

const Location = ({ type, number, id }) => {
  return (
    <React.Fragment>
      <tr>
        <td>
          <Link to={`/displaySpecific/${id}/${type}/${number}/false`}>{type}</Link>
        </td>
        <td>{number}</td>
      </tr>
    </React.Fragment>
  );
};

export default Location;
