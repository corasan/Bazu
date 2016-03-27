import React, { Component } from 'react'
const ref = new Firebase('https://sms-react.firebaseio.com/');
import {browserHistory, Link} from 'react-router'
import { FormControls, Input, Button } from 'react-bootstrap'

export default class ChangeEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentEmail: '',
            newEmail: '',
            password: ''
        }
    }
    changeUserEmail = () => {
        ref.changeEmail({
            oldEmail : this.state.currentEmail,
            newEmail : this.state.newEmail,
            password : this.state.password
        }, function(error) {
            if (error === null) {
                console.log("Email changed successfully");
                browserHistory.push('/');
            } else {
                console.log("Error changing email:", error);
            }
        });
    }
    handleEmail = (e) => {
        e.preventDefault();
        this.setState({ currentEmail: e.target.value });
    }
    handleNewEmail = (e) => {
        e.preventDefault();
        this.setState({ newEmail: e.target.value });
    }
    handlePassword = (e) => {
        e.preventDefault();
        this.setState({ password: e.target.value });
    }
    render() {
        return (
            <div>
                <form style={{margin: "40px 0 0 0"}}>
                    <Input type="email" label="Email" onChange={this.handleEmail} />
                    <Input type="email" label="Nuevo Email" onChange={this.handleNewEmail} />
                    <Input type="password" label="Contrasena" onChange={this.handlePassword} />
                    <Button role="button" bsStyle="primary" onClick={this.changeUserEmail}>Guardar</Button>
                </form>
            </div>
        )
    }
}
