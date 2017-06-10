//Modules
import React from 'react';
import {HashRouter as Router, Switch, Route, hashHistory} from 'react-router-dom' ;

//Components
//extra codes if needed

export var requireLogin = () =>{
  // if (!firebase.auth().currentUser){
  //   window.location.href = "/#/";
  // }
}

export var requireNotLogin = () =>{
  // if (firebase.auth().currentUser){
  //   window.location.href = "/#/todos";
  // }
}

export default(
  <Router history={hashHistory}>
    <Switch>
      <Route exact path='/' component={}/>
      <Route path='/todos' component={}/>
    </Switch>
  </Router>
)
