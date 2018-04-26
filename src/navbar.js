import React, { Component } from 'react';
import './App.css';

import { Link } from 'react-router-dom';
import { firebaseAuth } from './config';

import RaisedButton from 'material-ui/RaisedButton';

export default class NavBar extends Component {

    _logout = () => {
        return firebaseAuth.signOut();
    };

    render() {

        let logLink = null;
        if (this.props.isAuthenticated)
            logLink = <RaisedButton onClick={this._logout} default={true} label='Logout' />;
        else
            logLink = <Link className='nav-link' to='login'>Login</Link>;

        return (
            <nav className='navbar navbar-expand-lg navbar-light bg-light'>
                <Link className='navbar-brand' to='/'>PT CUSTOMER</Link>

                <div id='nav_Bar'>
                    <ul className='navbar-nav mr-auto'>
                        <li className='nav-item'>
                            <Link className='nav-link' to='/list'>Customer List</Link>
                        </li>
                        <li className='nav-item'>
                            <Link className='nav-link' to='/calendar'>Calendar</Link>
                        </li>
                    </ul>
                </div>
                <div style={{ float: 'right', }}>{logLink}</div>
            </nav>
        );
    };
}