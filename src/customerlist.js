import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Traininglist from './trainingslist';


export default class Customerlist extends Component {

    state = {
        customers: [],
        keyword: '',
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
        console.log(this.state.keyword);

        let newList = this.state.customers.filter(
            data => data.firstname.toUpperCase() === this.state.keyword.toUpperCase()
        );

        console.log(newList);
    }

    _inputChanged = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
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
    ]

        return (
            <div className="Container">
                <div className="NavBar">
                    <form>
                        <input type='text' name='keyword' onChange={this._inputChanged} />
                        <button type='button' onClick={this._searchCustomers}>Search</button>
                    </form>
                </div>

                <div className="Customer-list">
                    <ReactTable data={this.state.customers} columns={columns}
                        className='-highlight -striped' // filterable // -filter option
                        SubComponent={
                            row => {
                                return (
                                    <Traininglist link={this.state.customers[row.index].links[2].href} />
                                )
                            }
                        } />
                </div>
            </div>
        );
    }
}