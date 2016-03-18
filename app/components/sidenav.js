import React, { Component } from 'react'
import { ListGroup, ListGroupItem, Grid, Row, Col, Panel } from 'react-bootstrap'
import { Link } from 'react-router'
const ref = new Firebase('https://sms-react.firebaseio.com/users');
import NewMessage from './newMessage'
import AddContact from './addContact'

export default class SideNav extends Component{
    constructor(props) {
        super(props);
        this.state = {
            contacts: {}
        }
    }

    componentWillMount() {
        let user = ref.getAuth();
        ref.child(user.uid).child('contacts').on('value', function(data) {
            this.setState({contacts: data.val()});
        }.bind(this));
    }

    render() {
        return(
            <div className="sidenav">
                <Col md={3}>
                    <Panel>
                        <AddContact />
                        <NewMessage contacts={this.state.contacts} />
                    </Panel>
                </Col>
            </div>
        )
    }
}
