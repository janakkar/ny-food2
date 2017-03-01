import React, {Component} from "react";
import App from "./App";
import Login from "./login/Login";
import CalculatorComponent from "./calculator/CalculatorComponent";
import {BrowserRouter, Match} from "react-router";
import * as firebase from "firebase";

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

export default class Root extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Match pattern='/' component={App}/>
                    <Match exactly pattern='/login' component={Login}/>
                    <Match pattern='/home' component={CalculatorComponent}/>
                </div>
            </BrowserRouter>
        );
    }
};
