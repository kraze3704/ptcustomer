import React, { Component } from 'react';
import './App.css';

import CustomerList from './customerlist';
import NavBar from './navbar';
import Login from './login';
import Calendar from './calendar';
import { firebaseAuth } from './config';

import { BrowserRouter, Switch, Route, Redirect, } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest, isAuthenticated }) => (
  <Route {...rest} render={props =>
    (isAuthenticated ? (
      <Component {...props} />
    ) : (
        <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }} />
      )
    )} />
);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      isAuthenticated: false,
    };
  }

  componentDidMount() {
    // console.log(firebaseAuth);
    firebaseAuth.onAuthStateChanged((user) => {
      if (user && user.emailVerified) {
        this.setState({ user: user, isAuthenticated: true });
      }
      else {
        this.setState({ user: null, isAuthenticated: false });
      }
    });
  }

  render() {
    return (
      <div className='App'>
        <div className='App-header'>
          <h2 className='App-title'> Customer and Trainings </h2>
        </div>
        <BrowserRouter>
          <div>
            <NavBar isAuthenticated={this.state.isAuthenticated} />
            <Switch>
              <Route exact path='/' render={() => <h1> Home Page </h1>} />
              <Route path='/login' render={() => <Login />} />
              <PrivateRoute isAuthenticated={this.state.isAuthenticated} path="/list" component={() => <CustomerList />} />
              <Route path='/calendar' render={() => <Calendar />} />
              {/* <PrivateRoute isAuthenticated={this.state.isAuthenticated} path="/calendar" component={() => <Calendar />} /> */}
              <Route render={() => <h1 style={{ 'color': 'red' }}>Page Not Found </h1>} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
