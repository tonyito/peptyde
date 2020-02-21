import React from 'react';
import './styles.scss';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import AddItem from './addItem';
import AddCatalog from './addCatalog';

const Home = () => {
  return (
    <React.Fragment>
    <h1>Feeling kinda cute, <br />might style later idk</h1>
    <div className = 'mainButtons' > 

      <Link to="/display">
        <button >Click here to see all your stuff</button>
      </Link>

    </div>
    <Router>
    <div className='mainButtons'>
    <Link to ='/addItem'>
    <button variant="info">Add a new item</button>
    </Link>
    <Link to="/addCatalog">
      <button variant="info">Add a new item type to the catalog</button>
    </Link>
    </div>
    <div className='popups'>
    <Switch >
    <Route path="/addItem">
      <AddItem />
    </Route>
    <Route path="/addCatalog">
    <AddCatalog />
  </Route>
  </Switch>
  </div>

</Router>
</React.Fragment>
  );
};

export default Home;
