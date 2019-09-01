//Modules
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

// Personal Modules
// import {startGetUserSession} from 'app/actions/account'
import Router from 'app/router/';

//App CSS
require('applicationStyles');

//App JS
require('myJS/all.jsx');


// For react-redux
import {configure} from 'configureStore';
var store = configure();

//check if there is a sessionToken if there is get data from database and add to redux state
// if (localStorage.getItem("sessionToken")) store.dispatch(startGetUserSession());

//render
ReactDOM.render(
  <Provider store={store}>
    <Router />
  </Provider>,
  document.getElementById('app')
);
