import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Traininglist from './trainingslist';


export default class Customerlist extends Component {

    state = {
        customers: [],
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

    render() {
        const columns = [{
            Header: 'Customer List',
            headerClassName: 'customer-list-header',
            columns: [
                {
                    Header: 'First Name',
                    accessor: 'firstname'
                },
                {
                    Header: 'Last Name',
                    accessor: 'lastname'
                },
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
                {
                    Header: 'Email',
                    accessor: 'email'
                },
                {
                    Header: 'Phone',
                    accessor: 'phone'
                }
            ]
        }]

        return (
            <div className="Customerlist">
                <ReactTable data={this.state.customers} columns={columns}
                    className='-highlight -striped' filterable
                    SubComponent={
                        row => {
                            return (
                                <Traininglist link={this.state.customers[row.index].links[2].href} />
                            )
                        }
                    } />
            </div>
        );
    }
}