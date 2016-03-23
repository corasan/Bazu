import React, { Component } from 'react'
import { Panel, Input, Col, Button } from 'react-bootstrap'
import Firebase from 'firebase'
import { browserHistory, Link } from 'react-router'
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
        }.bind(this));
    }

    render() {
        return(
            <div>
                <div className="panels">
                    <div className="panel-title"><h3>Login</h3></div>
                    <div className="panel-content">
                        <form>
                            <input type="email" placeholder="Email" onChange={this.handleEmail} />
                            <input type="password" placeholder="Password" onChange={this.handlePassword} />
                            <p id="forgot-password">Olvido la contrasena?</p>
                            <Button type="button" bsStyle="primary" className="auth-btn" onClick={this.submitLogin}>Iniciar sesion</Button>
                        </form>
                    </div>
                    <div className="panel-foot">
                        <hr/>
                        <h4>No tiene cuenta?
                            <Link to="signup" style={{color: "#5DC7C7", cursor:"pointer"}}> Crear cuenta</Link>
                        </h4>
                    </div>
                </div>
            </div>
        )
    }
}
