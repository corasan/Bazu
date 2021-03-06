import React, { Component } from 'react'
import { ListGroup, ListGroupItem, Grid, Row, Col, Panel, Button } from 'react-bootstrap'
import { Link, browserHistory } from 'react-router'
const ref = new Firebase('https://sms-react.firebaseio.com/');
import AddContact from './addContact'

export default class SideNav extends Component{
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            messagesCount: 0,
            contactsCount: 0
        }
    }

    getName() {
        let user = ref.getAuth();
        ref.child('users').child(user.uid).on('value', function(data) {
            this.setState({name: data.val().firstname + ' ' + data.val().lastname})
        }.bind(this));
    }

    count(what) {
        let user = ref.getAuth();
        ref.child(what).child(user.uid).on('value', function(data) {
            let counter = 0;
            for (let i in data.val()) { counter++ }
            console.log(what, counter);
            return counter;
        });
    }

    componentWillMount() {
        this.setState({
            messagesCount: this.count('messages'),
            contactsCount: this.count('contacts'),
            name: this.getName()
        });
        console.log('Messages:', this.count('messages'));
    }

    logout = () => {
        ref.unauth();
    }

    render() {
        return(
            <div className="sidenav">
                <Link to="account"><p id="sidenav-user-name">{this.state.name}</p></Link>
                <hr/>
                <ul>
                    <Link to="/"><li>Contactos</li></Link>
                    <Link to="history"><li>Historial</li></Link>
                    <Link to="account"><li>Account</li></Link>
                </ul>
                <Link to="login" className="link-btn">
                    <Button bsStyle="primary" onClick={this.logout} id="logout-btn">
                        Log out
                    </Button>
                </Link>
            </div>
        )
    }
}
