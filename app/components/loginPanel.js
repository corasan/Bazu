import React, { Component } from 'react'
import { Panel, Input, Col, Button } from 'react-bootstrap'

export default class LoginPanel extends Component{
    render() {
        return(
            <Panel id="login-panel">
                <form>
                    <h3 id="login-title">Login</h3>
                    <Col md={2}/>
                    <Col md={8}>
                        <Input type="email" placeholder="Enter email" />
                        <Input type="password" placeholder="Password" />
                        <Button bsStyle="primary" id="login-btn">Login</Button>
                    </Col>
                </form>
            </Panel>
        )
    }
}
