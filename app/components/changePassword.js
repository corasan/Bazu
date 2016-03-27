import React, { Component } from 'react'
const ref = new Firebase('https://sms-react.firebaseio.com/');
import {browserHistory} from 'react-bootstrap'
import { FormControls, Input, Button } from 'react-bootstrap'

export default class ChangePassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPassword: '',
            newPassword: ''
        }
    }
    changePassword = () => {
        ref.changePassword({
            email: this.props.email,
            password: this.state.currenPassword,
            newPassword: this.state.newPassword
        }, function(error) {
            if (error === null) {
                console.log("Password changed successfully");
                browserHistory.push('/');
            } else {
                console.log("Error changing password:", error);
            }
        });
    }
    handleEmail = (e) => {
        e.preventDefault();
        this.setState({ currentEmail: e.target.value });
    }
    handleNewPassword = (e) => {
        e.preventDefault();
        this.setState({ newPassword: e.target.value });
    }
    handlePassword = (e) => {
        e.preventDefault();
        this.setState({ currenPassword: e.target.value });
    }
    render() {
        return (
            <form style={{margin: "40px 0 0 0"}}>
                <Input type="email" label="Email" onChange={this.handleEmail} />
                <Input type="password" label="Contrasena" onChange={this.handleNewPassword} />
                <Input type="password" label=" Nueva contrasena"  onChange={this.handlePassword} />
                <Button role="submit" bsStyle="primary" onClick={this.changeEmail}>Guardar</Button>
            </form>
        )
    }
}
