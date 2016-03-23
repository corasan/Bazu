import React, { Component } from 'react'
import { Panel, Input, Col, Row, Grid, Button } from 'react-bootstrap'
import { browserHistory, Link } from 'react-router'
import Firebase from 'firebase'
const ref = new Firebase('https://sms-react.firebaseio.com/');

export default class SignupPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            firstname: '',
            lastname: ''
        }
    }

    handleEmail = (e) => {
        this.setState({ email: e.target.value });
    }
    handlePassword = (e) => {
        this.setState({ password: e.target.value });
    }
    handleName = (e) => {
        this.setState({ firstname: e.target.value });
    }
    handleLastname = (e) => {
        this.setState({ lastname: e.target.value });
    }

    alreadyUser() {
        let user = ref.getAuth();
        ref.child('users').on('value', function(data) {
            return data.child(user.uid.email).exists();
        });
    }

    submitSignup = () => {
        ref.createUser({
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            email: this.state.email,
            password: this.state.password
        }, function(error, authData) {
            if (error) {
                console.log('Failed to create user!', error);
            } else {
                ref.authWithPassword({
                    email: this.state.email,
                    password: this.state.password
                }, function(error, authData) {
                    if (error) { console.log("Login Failed!", error); }
                    else {
                        ref.child('users').child(authData.uid).set({
                            email: this.state.email,
                            firstname: this.state.firstname,
                            lastname: this.state.lastname
                        });
                        console.log('Authenticated successfully with payload:', authData);
                    }
                    browserHistory.push('/');
                }.bind(this));
            }
        }.bind(this));
    }
    render() {
        return (
            <div>
                <div className="panels" id="panels-signup">
                    <div className="panel-title"><h3>Nueva cuenta</h3></div>
                    <div className="panel-content" id="signup-content">
                        <form>
                            <input type="text" placeholder="Nombre" onChange={this.handleName} />
                            <input type="text" placeholder="Apellido" onChange={this.handleLastname} />
                            <input type="email" placeholder="Email" onChange={this.handleEmail} />
                            <input type="password" placeholder="Password" onChange={this.handlePassword} />
                            <Button type="button" bsStyle="primary" className="auth-btn" onClick={this.submitSignup}>
                                <Link to="/" className="link-btn">Crear cuenta</Link>
                            </Button>
                        </form>
                    </div>
                    <div className="panel-foot" id="signup-footer">
                        <hr/>
                        <h4><Link to="login" style={{color: "#5DC7C7", cursor:"pointer"}}>Login</Link></h4>
                    </div>
                </div>
            </div>
        )
    }
}
