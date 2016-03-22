import React, { Component } from 'react'
import { ListGroup, ListGroupItem, Grid, Row, Col, Panel } from 'react-bootstrap'
import { Link } from 'react-router'
const ref = new Firebase('https://sms-react.firebaseio.com/');
import AddContact from './addContact'

export default class SideNav extends Component{
    render() {
        return(
            <div className="sidenav">
                <Col md={3}>
                    <Panel>
                        <AddContact />
                    </Panel>
                </Col>
            </div>
        )
    }
}
