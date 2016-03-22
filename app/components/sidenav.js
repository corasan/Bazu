import React, { Component } from 'react'
import { ListGroup, ListGroupItem, Grid, Row, Col, Panel, Button } from 'react-bootstrap'
import { Link, browserHistory } from 'react-router'
const ref = new Firebase('https://sms-react.firebaseio.com/');
import AddContact from './addContact'

export default class SideNav extends Component{
    constructor(props) {
        super(props);
        let user = ref.getAuth();
        this.state = {
            name: user.password.email,
            messagesCount: 0,
            contactsCount: 0
        }
    }

    counter(where) {
        let user = ref.getAuth();
        ref.child(where).child(user.uid).on('value', function(data) {
            let counter = 0;
            for (let i in data.val()) { counter++ }
            console.log(where, counter);
            return counter;
        });
    }

    componentWillMount() {
        this.setState({messagesCount: this.counter('messages'), contactsCount: this.counter('contacts')});
        console.log('Messages:', this.counter('messages'));
    }

    logout = () => {
        ref.unauth();
    }

    render() {
        return(
            <div className="sidenav">
                <p id="sidenav-user-name">Henry</p>
                <hr/>
                <ul>
                    <Link to="/"><li>Contactos</li><p>{this.state.contactsCount}</p></Link>
                    <Link to="messages"><li>Historial</li><p>{this.state.messagesCount}</p></Link>
                </ul>
                <Button bsStyle="primary" onClick={this.logout} href="login" id="logout-btn">Log out</Button>
            </div>
        )
    }
}
