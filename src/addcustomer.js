import React from 'react';

import Skylight from 'react-skylight';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

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
        const customerDialog = {
            width: '300px',
            height: '500px',
            marginTop: '-20%',
            marginLeft: '-35%',
        }

        return (
            <div>
                <Skylight dialogStyles={customerDialog} hideOnOverlayClicked ref="customerDialog">
                    <div className="popup_Container">
                        <h4 className='popup_title'>Add new customer</h4>
                        <TextField name='firstname' hintText='First Name' onChange={this._handleChange} value={this.state.firstname} />
                        <TextField name='lastname' hintText='Last Name' onChange={this._handleChange} value={this.state.lastname} />
                        <TextField name='streetaddress' hintText='Street Address' onChange={this._handleChange} value={this.state.streetaddress} />
                        <TextField name='postcode' hintText='Post Code' onChange={this._handleChange} value={this.state.postcode} />
                        <TextField name='city' hintText='City' onChange={this._handleChange} value={this.state.city} />
                        <TextField name='email' hintText='Email' onChange={this._handleChange} value={this.state.email} />
                        <TextField name='phone' hintText='Phone' onChange={this._handleChange} value={this.state.phone} />
                        <br />
                        <RaisedButton onClick={this._submitCustomer} label='Save' primary={true} />
                    </div>
                </Skylight>

                <div>
                    <RaisedButton onClick={() => this.refs.customerDialog.show()} primary={true} label='Add Customer' />
                </div>
            </div>
        );
    }
}