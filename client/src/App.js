import React, { Component } from "react";
import {Route, Redirect} from 'react-router-dom'
import "./App.css";

import Home from "./components/Home";


class App extends Component {

  render() {
    return (
  <div>
  
      <div className="container">

        <div className="row">
        <Route exact path="/" render={() => <Redirect to="/home"/>}/>
      
          <Route exact path="/home" component={Home}/>
       
        </div>
      </div>

      </div>
    );
  }
}

export default App;
