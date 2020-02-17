import React from 'react';
import ReactDOM from 'react-dom';
import './styles.scss';
import Display from './display.jsx'


const Index = () => {
  return (
    <div>
    <Display />
    </div>
  );
};

ReactDOM.render(<Index />, document.getElementById('root'));
