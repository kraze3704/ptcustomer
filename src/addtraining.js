import React from 'react';
import Skylight from 'react-skylight';

export default class AddCustomer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            year: '',
            month: '',
            date: '',
            activity: '',
            duration: '',
        }
    }

    _handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    _submitTraining = (e) => {
        e.preventDefault();
        let newDate = new Date(this.state.year, this.state.month, this.state.date)
        let newTraining = {
            date: newDate,
            activity: this.state.activity,
            duration: this.state.duration,
            customer: this.props.idlink,
        };
        console.log(newTraining)
        this.props._addTraining(newTraining);
        this.props._loadTrainings();
        this.refs.addDialogue.hide();
    }

    render() {
        const addDialogue = {
            width: '70%',
            height: '450px',
            marginTop: '-300px',
            marginLeft: '-35%',
        }

        return (
            <div>
                <Skylight dialogueStyles={addDialogue} hideOnOverlayClicked ref="addDialogue">
                    <div className="card" style={{ "width": "95%" }}>
                        <div className="card-body">
                            <h5 className='card-title'>Add new customer</h5>
                            <form>
                                <div className="form-group">
                                    <input type="text" placeholder="Year" className="form-control" name="year" onChange={this._handleChange} />
                                </div>
                                <div className="form-group">
                                    <input type="text" placeholder="Month" className="form-control" name="month" onChange={this._handleChange} />
                                </div>
                                <div className="form-group">
                                    <input type="text" placeholder="Date" className="form-control" name="date" onChange={this._handleChange} />
                                </div>
                                <div className="form-group">
                                    <input type="text" placeholder="Activity" className="form-control" name="activity" onChange={this._handleChange} />
                                </div>
                                <div className="form-group">
                                    <input type="text" placeholder="Duration" className="form-control" name="duration" onChange={this._handleChange} />
                                </div>

                                <div className="form-group">
                                    <button className="btn btn-primary" onClick={this._submitTraining}>Save</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </Skylight>

                <div className="col-md-2">
                    <button style={{ 'margin': '10px' }} className='btn btn-primary' onClick={() => this.refs.addDialogue.show()}>Add Training</button>
                </div>
            </div>
        );
    }
}