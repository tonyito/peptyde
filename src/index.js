import React from 'react';
import ReactDOM from 'react-dom';

import Display from './display.jsx';
import DisplaySpecific from './displaySpecific.jsx';
import AddCatalog from './addCatalog.jsx'
import AddItem from './addItem.jsx';
import Home from './home.jsx';
import ItemSpecific from './itemSpecific.jsx';
import Update from './update.jsx';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


const Index = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/addCatalog">
            <AddCatalog />
          </Route>
          <Route exact path="/itemSpecific/:id">
            <ItemSpecific />
          </Route>
          <Route path="/displaySpecific/:id/:type/:number/:redirect">
            <DisplaySpecific />
          </Route>
          <Route exact path="/reset/:id/:type/:number">
          <DisplaySpecific />
        </Route>
          <Route path="/display/:deleted">
            <Display />
          </Route>
          <Route path="/display/">
            <Display />
          </Route>
          <Route path="/addItem">
            <AddItem />
          </Route>
          <Route path="/update/:id">
            <Update />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
      <link
  rel="stylesheet"
  href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
  integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
  crossorigin="anonymous"
/>
    </div>
  );
};

ReactDOM.render(<Index />, document.getElementById('root'));
