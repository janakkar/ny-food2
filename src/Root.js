import React, {Component} from "react";
import App from "./App";
import {Router, hashHistory, Route, IndexRedirect} from "react-router";
import CalculatorComponent from './calculator/CalculatorComponent';
import Login from './login/Login';
import * as firebase from "firebase";
import { isAuthenticated } from "./login/AuthService";

const firebaseConfig = {
    apiKey: "AIzaSyBWZy9gbtIO8bC4dSuhA1YCmAIwyy8XDcU",
    authDomain: "kyfood-d855c.firebaseapp.com",
    databaseURL: "https://kyfood-d855c.firebaseio.com",
    storageBucket: "kyfood-d855c.appspot.com",
    messagingSenderId: "787175316824"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
// const database = firebaseApp.database().ref();
export const firebaseAuth = firebaseApp.auth();

class Root extends Component {
    constructor(props) {
        super(props);

        this.requireAuth = this.requireAuth.bind(this);
        this.avoidPageNotFound = this.avoidPageNotFound.bind(this);
    }

    requireAuth(nextState, replace, callback) {
        isAuthenticated().subscribe(
          (isAuthenticated) => {
              if(!isAuthenticated) {
                  replace({
                      pathname: '/login',
                      state: { nextPathname: nextState.location.pathname }
                  });
              }
              callback();
          }
        );
    }

    avoidPageNotFound(nextState, replace) {
        replace('/home');
    }

    render() {
        return (
          <Router history={hashHistory}>
              <Route path='/' component={App}>
                  <IndexRedirect to="/home"/>
                  <Route path='login' component={Login}/>
                  <Route path='home' component={CalculatorComponent} onEnter={this.requireAuth}/>
                  <Route path='*' onEnter={this.avoidPageNotFound} />
              </Route>
          </Router>
        );
    }
}

export default Root;
