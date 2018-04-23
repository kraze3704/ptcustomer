import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'

import Addtraining from './addtraining';


export default class TrainingsList extends Component {

    state = {
        customers_trainings: [],
    };

    componentWillMount() {
        this._customerTrainings(this.props.link);
    }

    // load trainings for a customer from API, link provided in props as 'link'
    _customerTrainings = (link) => {
        let trainings = link + '/trainings';
        fetch(trainings)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    customers_trainings: data.content
                });
            })
            .catch(err => console.log(err));
    }

    _addTraining = (training) => {
        fetch('https://customerrest.herokuapp.com/api/trainings',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(training)
            })
            .then(re => this._customerTrainings(this.props.link))
            .catch(er => console.log(er));
    }

    _delTraining = (idLink) => {
        confirmAlert({
            title: '',
            message: 'Are you sure you want to delete this?',
            buttons: [
                {
                    label: 'OK',
                    onClick: () => {
                        fetch(idLink, { method: 'DELETE' })
                            .then(res => this._customerTrainings(this.props.link))
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
            columns: [
                {
                    Header: 'Date',
                    id: 'date',
                    accessor: d => {
                        let date = new Date(d.date);
                        return date.getMonth() + "." + date.getDate() + "." + date.getFullYear();
                    }
                },
                {
                    Header: 'Time',
                    id: 'time',
                    accessor: d => {
                        let time = new Date(d.date);
                        return time.getHours() + ':' + time.getMinutes();
                    }
                },
                {
                    Header: 'Duration',
                    accessor: 'duration'
                },
                {
                    Header: 'Activity',
                    accessor: 'activity'
                },
                {
                    id: 'button',
                    sortable: false,
                    filterable: false,
                    width: 100,
                    accessor: 'links[0].href',
                    Cell: ({ value }) => (<button className='btn btn-default btn-link' onClick={() => this._delTraining(value)}>Delete</button>)
                },
            ]
        }]

        // loading screen
        if (this.state.customers_trainings.length < 1)
            return (
                <div className='Trainings-container'>
                    <h2>Loading</h2>
                </div>
            )
        // checks for training data, if there are none display different page
        else if (this.state.customers_trainings[0].rel === null)
            return (
                <div className='Trainings-container'>
                    <div className='Trainings-bar'>
                        {console.log(this.state.customers_trainings)}
                        <Addtraining _addTraining={this._addTraining} _loadTrainings={() => this._customerTrainings(this.props.link)} idlink={this.props.link} />
                    </div>
                    <h4>No trainings available</h4>
                </div>
            )
        // display training data for the customer
        else {
            return (
                <div className='Trainings-container'>
                    <div className='Trainings-bar'>
                        {console.log(this.state.customers_trainings)}
                        <Addtraining _addTraining={this._addTraining} _loadTrainings={() => this._customerTrainings(this.props.link)} idlink={this.props.link} />
                    </div>
                    <div className="Trainings-list">
                        <ReactTable data={this.state.customers_trainings} columns={columns}
                            defaultPageSize={5}
                        />
                    </div>
                </div>
            );
        }
    }
}