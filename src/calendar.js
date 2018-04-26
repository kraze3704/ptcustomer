import React, { Component } from 'react';

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
                        .then(async(data) => {
                            trainingListWithName.firstname = data.firstname;
                            trainingListWithName.lastname = data.lastname;

                            trainingListWithName.date = trainingList.date;
                            trainingListWithName.activity = trainingList.activity;
                            trainingListWithName.end = trainingList.duration;
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

        return (
            <div className="Container">
                <h2> this is the calendar page!</h2>
                <ul>
                    {this.state.trainings.map(
                        (content, index) =>
                            <li key={index}>
                                [{index}]{content.firstname}, {content.lastname} | {content.activity} | {content.date}
                            </li>
                    )}
                </ul>
            </div>
        );
    }
}