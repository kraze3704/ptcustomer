import React, { Component } from 'react';

import ReactTable from 'react-table';
import 'react-table/react-table.css';

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import Traininglist from './trainingslist';
import AddCustomer from './addcustomer';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

export default class Customerlist extends Component {

    state = {
        customers: [],
        keyword: '',
        option: '',
    };

    componentDidMount() {
        this._loadCustomers();
    }

    // load customers from API
    _loadCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
            .then(response => response.json())
            .then(data => {
                this.setState({
                    customers: data.content
                })
            })
            .catch(err => console.log(err))
    }

    // search with keyword and update state
    _searchCustomers = (e) => {
        e.preventDefault();

        // reset state if the keyword is empty or option is default
        if (this.state.keyword === '' || this.state.option === '')
            this._loadCustomers();
        else {
            let newList = this.state.customers.filter(
                data => data[this.state.option].toUpperCase() === this.state.keyword.toUpperCase()
            );
            this.setState({
                customers: newList
            });
        }
    }

    _inputChanged = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    // add customer
    _addCustomer = (customer) => {
        fetch('https://customerrest.herokuapp.com/api/customers',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(customer)
            })
            .then(re => this._loadCustomers())
            .catch(er => console.log(er));
    }

    // Delete a customer by id-link
    _onDelClick = (idLink) => {
        confirmAlert({
            title: '',
            message: 'Are you sure you want to delete this?',
            buttons: [
                {
                    label: 'OK',
                    onClick: () => {
                        fetch(idLink, { method: 'DELETE' })
                            .then(res => this._loadCustomers())
                            .catch(err => console.error(err))
                    }
                },
                {
                    label: 'CANCEL',
                }
            ]
        })
    }

    render() {
        const columns = [{
            // Header: 'Customer List',
            // headerClassName: 'customer-list-header',
            Header: 'Name',
            columns: [
                {
                    Header: 'First Name',
                    accessor: 'firstname'
                },
                {
                    Header: 'Last Name',
                    accessor: 'lastname'
                },
            ],
        },
        {
            Header: 'Address',
            columns: [
                {
                    Header: 'Street Address',
                    accessor: 'streetaddress'
                },
                {
                    Header: 'PostCode',
                    accessor: 'postcode'
                },
                {
                    Header: 'City',
                    accessor: 'city'
                },
            ],
        },
        {
            Header: 'Contact info',
            columns: [
                {
                    Header: 'Email',
                    accessor: 'email'
                },
                {
                    Header: 'Phone',
                    accessor: 'phone'
                },
            ]
        },
        {
            id: 'button',
            sortable: false,
            filterable: false,
            width: 100,
            accessor: 'links[0].href',
            Cell: ({ value }) => (<RaisedButton onClick={() => { this._onDelClick(value) }} label='Delete' default={true}/>)
        },
        ];

        return (
            <div className="Container">
                <div className="NavBar">
                    <div className="dbBar">
                        <AddCustomer _addCustomer={this._addCustomer} _loadCustomer={this._loadCustomers} />
                    </div>
                    <div className="SearchBar">
                        <form>
                            <TextField name='keyword' hintText='keyword' onChange={this._inputChanged} value={this.state.keyword} />
                            <select name="option" value={this.state.option} onChange={this._inputChanged}>
                                <option value="">Search By</option>
                                <option value="firstname">First Name</option>
                                <option value="lastname">Last Name</option>
                                <option value="city">City</option>
                            </select>
                            <RaisedButton onClick={this._searchCustomers} label='Search' primary={true} />
                            <RaisedButton onClick={this._loadCustomers} label='Reset' primary={true} />
                        </form>
                    </div>
                </div>

                <div className="Customer-list">
                    <ReactTable data={this.state.customers} columns={columns}
                        className='-highlight -striped' // filterable // -filter option
                        SubComponent={
                            row => {
                                return (
                                    <Traininglist link={this.state.customers[row.index].links[0].href} />
                                )
                            }
                        } />
                </div>
            </div>
        );
    }
}