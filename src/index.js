import React from 'react';
import ReactDOM from 'react-dom';
import './styles.scss';
import Display from './display.jsx';
import DisplaySpecific from './displaySpecific.jsx';
import AddItem from './addItem.jsx';
import Home from './home.jsx';
import ItemSpecific from './itemSpecific.jsx'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const Index = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/itemSpecific/:id">
            <ItemSpecific />
          </Route>
          <Route exact path="/displaySpecific/:id/:type/:number">
            <DisplaySpecific />
          </Route>
          <Route path="/display">
            <Display />
          </Route>
          <Route path="/addItem">
            <AddItem />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

ReactDOM.render(<Index />, document.getElementById('root'));
