import React, { Component } from 'react'
import { ListGroup, ListGroupItem, Grid, Row, Col, Panel } from 'react-bootstrap'
import MessagesList from '../components/messagesList'
const ref = new Firebase('https://sms-react.firebaseio.com/');

export default class Messages extends Component{
    constructor() {
        super();
        this.state = {
            messages: {}
        }
    }

    componentWillMount() {
        let user = ref.getAuth();
        ref.child('messages').child(user.uid).on('value', function(data) {
            this.setState({messages: data.val()});
        }.bind(this));
    }

    render() {
        return(
            <div>
                <MessagesList messages={this.state.messages} />
            </div>
        )
    }
}
