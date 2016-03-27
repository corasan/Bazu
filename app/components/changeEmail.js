import React, { Component } from 'react'
const ref = new Firebase('https://sms-react.firebaseio.com/');
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
    changeEmail = () => {
        ref.changeEmail({
            oldEmail : this.state.currentEmail,
            newEmail : this.state.newEmail,
            password : this.state.password
        }, function(error) {
            if (error === null) {
                console.log("Email changed successfully");
            } else {
                console.log("Error changing email:", error);
            }
        });
    }
    componentWillMount() {
        const user = ref.getAuth();
        this.setState({ currentEmail: user.password.email});
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
            <form style={{margin: "40px 0 0 0"}}>
                <FormControls.Static label="Email" value={this.state.currentEmail} />
                <Input type="email" label="Nuevo Email" placeholder="Nuevo email" onChange={this.handleNewEmail} />
                <Input type="password" label="Contrasena" onChange={this.handlePassword} />
                <Button role="submit" bsStyle="primary" onClick={this.changeEmail}>Guardar</Button>
            </form>
        )
    }
}
