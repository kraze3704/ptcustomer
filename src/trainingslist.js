import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';


export default class TrainingsList extends Component {

    state = {
        customers_trainings: [],
    };

    componentDidMount() {
        this._customerTrainings(this.props.link);
    }

    // load trainings for a customer from API, link provided in props as 'link'
    _customerTrainings = (link) => {
        fetch(link)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    customers_trainings : data.content
                })
            }
            )
            .catch(err => console.log(err))
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
                    Header: 'Content',
                    accessor: 'content'
                },
/*                {
                    id: 'button',
                    sortable: false,
                    filterable: false,
                    width: 100,
                    accessor: '',
                    Cell: ({value}) => (<button className='btn btn-default btn-link' onClick='#'>Delete</button>)
                }, */
            ]
        }]

        return (
            <div className="TrainingsLists">
                <ReactTable data={this.state.customers_trainings} columns={columns}
                defaultPageSize={5}
                />
            </div>
        );
    }
}