import React, { useState, Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Redirect } from 'react-router-dom';
import { Reset } from 'styled-reset';
import Login from "./components/Login";
import BubblePage from './components/BubblePage';
import "./styles.scss";

const PrivateRouter = ({ component: Component, ...rest}) => (

  <Route
    {...rest}
    render ={props => 
    localStorage.getItem('token') ? (
      <Component {...props} /> 
    ) : (
      <Redirect to="/" />
    )
    }
    />
);

function App() {
  return (
    <Router>
      <div className="App">
        <Reset />
        <Route exact path="/" component={Login} />
        <PrivateRouter path="/bubblepage" component={BubblePage} />
      </div>
    </Router>
  );
}

export default App;
