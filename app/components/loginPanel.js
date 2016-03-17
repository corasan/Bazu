import React, { Component } from 'react'
import { Panel, Input, Col, Button } from 'react-bootstrap'

export default class LoginPanel extends Component{
    render() {
        return(
            <Panel>
                <form>
                    <Col md={2}/>
                    <Col md={8}>
                        <Input type="email" placeholder="Enter email" />
                        <Input type="password" placeholder="Password" />
                        <Button bsStyle="primary">Login</Button>
                    </Col>
                </form>
            </Panel>
        )
    }
}
