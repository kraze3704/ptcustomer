import React from 'react';
import Skylight from 'react-skylight';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';


export default class AddCustomer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: '',
            hour: '',
            minute: '',
            activity: '',
            duration: '',
        }
    };

    _handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    _submitTraining = (e) => {
        e.preventDefault();

        var newDate = this.state.date;
        newDate.setHours(this.state.hour, this.state.minute);

        let newTraining = {
            date: newDate,
            activity: this.state.activity,
            duration: this.state.duration,
            customer: this.props.idlink,
        };
        // console.log(newTraining);
        this.props._addTraining(newTraining);
        this.props._loadTrainings();
        this.refs.addDialogue.hide();
    };


    _dateChange = (e, input) => {
        this.setState({
            date: input
        });
    };

    render() {
        const trainingDialog = {
            width: '300px',
            height: '200px',
            marginTop: '-30%',
            marginLeft: '-35%',
        }

        return (
            <div>
                <Skylight dialogStyles={trainingDialog} hideOnOverlayClicked ref="trainingDialog">
                    <div className='popup_Container'>
                        <h4 className='popup_title'>Add new training</h4>
                        <DatePicker hintText='Select a date' onChange={this._dateChange} />
                        <div className='form_group'>
                            <TextField className='form_input' name='hour' hintText="Hour" onChange={this._handleChange} value={this.state.hour} />
                            <TextField className='form_input' name='minute' hintText="Min" onChange={this._handleChange} value={this.state.minute} />
                        </div>
                        <TextField name='duration' hintText='Duration' onChange={this._handleChange} value={this.state.duration} />
                        <TextField name='activity' hintText='Activity' onChange={this._handleChange} value={this.state.activity} />
                        <br />
                        <RaisedButton onClick={this._submitTraining} label='Save' primary={true} />
                    </div>
                </Skylight>
              
                <div>
                    <RaisedButton onClick={() => this.refs.trainingDialog.show()} label='Add Training' primary={true} />
                </div>
            </div>
        );
    };
}