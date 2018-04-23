import React from 'react';
import Skylight from 'react-skylight';

export default class AddCustomer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            streetaddress: '',
            postcode: '',
            city: '',
            email: '',
            phone: '',
        }
    }

    _handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    _submitCustomer = (e) => {
        e.preventDefault();
        let newCustomer = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            streetaddress: this.state.streetaddress,
            postcode: this.state.postcode,
            city: this.state.city,
            email: this.state.email,
            phone: this.state.phone,
        };
        // console.log(newCustomer)
        this.props._addCustomer(newCustomer);
        this.props._loadCustomer();
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
                                    <input type="text" placeholder="First Name" className="form-control" name="firstname" onChange={this._handleChange} />
                                </div>
                                <div className="form-group">
                                    <input type="text" placeholder="Last Name" className="form-control" name="lastname" onChange={this._handleChange} />
                                </div>
                                <div className="form-group">
                                    <input type="text" placeholder="Street Address" className="form-control" name="streetaddress" onChange={this._handleChange} />
                                </div>
                                <div className="form-group">
                                    <input type="text" placeholder="PostCode" className="form-control" name="postcode" onChange={this._handleChange} />
                                </div>
                                <div className="form-group">
                                    <input type="text" placeholder="City" className="form-control" name="city" onChange={this._handleChange} />
                                </div>
                                <div className="form-group">
                                    <input type="text" placeholder="Email" className="form-control" name="email" onChange={this._handleChange} />
                                </div>
                                <div className="form-group">
                                    <input type="text" placeholder="Phone" className="form-control" name="phone" onChange={this._handleChange} />
                                </div>

                                <div className="form-group">
                                    <button className="btn btn-primary" onClick={this._submitCustomer}>Save</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </Skylight>

                <div className="col-md-2">
                    <button style={{ 'margin': '10px' }} className='btn btn-primary' onClick={() => this.refs.addDialogue.show()}>Add Customer</button>
                </div>
            </div>
        );
    }
}