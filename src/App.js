import React, { Component } from 'react';
import './App.css';

import CustomerList from './customerlist';
import NavBar from './navbar';

import { BrowserRouter, Switch, Route, } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className='App'>
          <div className='App-header'>
            <h2 className='App-title'> Customer and Trainings </h2>
          </div>
          <NavBar />

          <Switch>
            <Route exact path='/' render={() => <h1> Login Page </h1>} />
            <Route path='/list' component={() => <CustomerList />} />
            <Route render={() => <h1 style={{ 'color': 'red' }}>Page Not Found </h1>} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
