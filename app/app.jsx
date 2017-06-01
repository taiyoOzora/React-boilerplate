//Modules
import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router, Route} from 'react-router-dom' ;

//Compents
//extra codes if needed

//load foundation
$(document).foundation();

//App CSS
require('applicationStyles'); //added line 56 - 90 in webpack.config that removes the need of adding loaders

//render
ReactDOM.render(
  <div>
    <p>Gone</p>
  </div>,
  document.getElementById('app')
);
