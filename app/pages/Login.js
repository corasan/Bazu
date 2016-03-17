import React, { Component } from 'react'
import { Panel, Input, Col, Row, Grid } from 'react-bootstrap'
import LoginPanel from '../components/LoginPanel'

export default class App extends Component{
    render() {
        return (
            <div>
                <Grid>
                    <Row>
                        <Col md={3} />
                        <Col md={6}>
                            <LoginPanel />
                        </Col>
                        <Col md={2} />
                    </Row>
                </Grid>
            </div>
        )
    }
}
