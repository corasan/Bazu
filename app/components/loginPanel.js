import React, { Component } from 'react'
import { Panel, Input, Col, Button } from 'react-bootstrap'
import Firebase from 'firebase'
import { browserHistory } from 'react-router'
const ref = new Firebase('https://sms-react.firebaseio.com/');


export default class LoginPanel extends Component{
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    handleEmail = (e) => {
        this.setState({ email: e.target.value });
    }

    handlePassword = (e) => {
        this.setState({ password: e.target.value });
    }


    submitLogin = () => {
        let isNewUser = false;
        ref.authWithPassword({
            email: this.state.email,
            password: this.state.password
        }, function(error, authData) {
            if (error) {
                console.log("Login Failed!", error);
            } else {
                browserHistory.push('/');
                console.log("Authenticated successfully with payload:", authData);
            }
            let user = ref.getAuth();
            if(!data.child(user.uid).exists()) {
                ref.child('users').child(user.uid).set({
                    email: authData.password.email,
                    name: ''
                });
                console.log('User Saved!');
            }
        });
    }

    render() {
        return(
            <Panel id="login-panel">
                <form>
                    <h3 id="login-title">Login</h3>
                    <Col md={2}/>
                    <Col md={8}>
                        <Input type="email" placeholder="Email" onChange={this.handleEmail} />
                        <Input type="password" placeholder="Password" onChange={this.handlePassword} />
                    <Button type="button" bsStyle="primary" id="login-btn" onClick={this.submitLogin}>Login</Button>
                    </Col>
                </form>
            </Panel>
        )
    }
}
