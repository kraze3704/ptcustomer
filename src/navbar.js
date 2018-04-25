import React, { Component } from 'react';
import './App.css';

import { Link } from 'react-router-dom';

export default class NavBar extends Component {
    render() {
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
            </nav>
        );
    };
}