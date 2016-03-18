import React, { Component } from 'react'
import { ListGroup, ListGroupItem, Grid, Row, Col, Panel } from 'react-bootstrap'
import { Link } from 'react-router'
const ref = new Firebase('https://sms-react.firebaseio.com/');
import NewMessage from './newMessage'
import AddContact from './addContact'

export default class SideNav extends Component{
    constructor(props) {
        super(props);
        this.state = {
            contacts: {}
        }
    }

    render() {
        return(
            <div className="sidenav">
                <Col md={3}>
                    <Panel>
                        <ListGroup>
                            <ListGroupItem href="#link1"><NewMessage /></ListGroupItem>
                            <ListGroupItem href="#link2"><AddContact contacts={this.state.contacts} /></ListGroupItem>
                        </ListGroup>
                    </Panel>
                </Col>
            </div>
        )
    }
}
