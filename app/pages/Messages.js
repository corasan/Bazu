import React, { Component } from 'react'
import { ListGroup, ListGroupItem, Grid, Row, Col, Panel } from 'react-bootstrap'
import MessagesList from '../components/messagesList'
const ref = new Firebase('https://sms-react.firebaseio.com/users');

export default class Messages extends Component{
    constructor() {
        super();
        this.state = {
            messages: {}
        }
    }

    componentWillMount() {
        let user = ref.getAuth();
        ref.child(user.uid).child('messages').on('value', function(data) {
            this.setState({messages: data.val()});
        }.bind(this));
    }

    render() {
        return(
            <div>
                <h2 className="page-title">Historial de Mensajes</h2>
                <Col md={3}/>
                <Col md={8}>
                    <Panel>
                        <MessagesList messages={this.state.messages} />
                    </Panel>
                </Col>
            </div>
        )
    }
}
