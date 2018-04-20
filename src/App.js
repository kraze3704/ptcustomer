import React, { Component } from 'react';
import './App.css';
import Customerlist from './customerlist';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Customers and Training</h1>
        </header>
        <Customerlist />
      </div>
    );
  }
}

export default App;
