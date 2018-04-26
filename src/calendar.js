import React, { Component } from 'react';

import 'react-big-calendar/lib/css/react-big-calendar.css'
import BigCalendar from 'react-big-calendar';
import localizer from 'react-big-calendar/lib/localizers/moment'
import moment from 'moment';

localizer(moment);

export default class Calendar extends Component {

    state = {
        trainings: [],
    };

    componentDidMount() {
        this._loadTrainings();
    }

    // load trainings from API
    _loadTrainings = () => {
        fetch('https://customerrest.herokuapp.com/api/trainings')
            .then(response => response.json())
            .then(data => {

                let newList = data.content.map(trainingList => {

                    let trainingListWithName = {};

                    fetch(trainingList.links[2].href)
                        .then(response => response.json())
                        .then(data => {
                            trainingListWithName.firstname = data.firstname;
                            trainingListWithName.lastname = data.lastname;

                            trainingListWithName.title = trainingList.activity + ': ' + data.lastname + ', ' + data.firstname;
                            trainingListWithName.start = new Date(trainingList.date);
                            let end = moment(new Date(trainingList.date)).add(trainingList.duration, 'm');
                            trainingListWithName.end = new Date(end);
                            // trainingListWithName.activity = trainingList.activity;
                            // trainingListWithName.duration = trainingList.duration;
                            trainingListWithName.links = trainingList.links;
                        })
                        .catch(err => console.log(err));

                    return trainingListWithName;
                });

                this.setState({
                    trainings: newList,
                })
            })
            .catch(err => console.log(err));
    }

    render() {

        const MyCalendar = () => (
            <div className='Calendar_Container'>
                <BigCalendar
                    events={this.state.trainings}
                    views={{
                        month: true,
                        week: true,
                        day: true,
                        agenda: true,
                    }}
                    showMultiDayTimes
                />
            </div>
        );

        return (
            <div className="Container">

                {/* 
                <h2> this is the calendar page!</h2>
                <ul>
                    {this.state.trainings.map(
                        (content, index) =>
                            <li key={index}>
                                [{index}]{content.firstname}, {content.lastname} | {content.activity} | {content.date}
                            </li>
                    )}
                 </ul>
                */}
                <MyCalendar />
            </div>
        );
    }
}