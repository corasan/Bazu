import React, { Component } from 'react'
import { Panel, Input, Col, Button } from 'react-bootstrap'

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

    render() {
        return(
            <Panel id="login-panel">
                <form>
                    <h3 id="login-title">Login</h3>
                    <Col md={2}/>
                    <Col md={8}>
                        <Input type="email" placeholder="Email" onChange={this.handleEmail} />
                        <Input type="password" placeholder="Password" onChange={this.handlePassword} />
                        <Button bsStyle="primary" id="login-btn">Login</Button>
                    </Col>
                </form>
            </Panel>
        )
    }
}
