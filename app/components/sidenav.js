import React, { Component } from 'react'
import { Panel, Grid, Row, Col } from 'react-bootstrap'
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
            <Col md={3}>
                <Panel>
                    <ul>
                        <AddContact />
                        <NewMessage contacts={this.state.contacts}/>
                    </ul>
                </Panel>
            </Col>
        )
    }
}
