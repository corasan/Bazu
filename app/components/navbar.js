import React, { Component } from 'react'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'
import { Link } from 'react-router'
const ref = new Firebase('https://sms-react.firebaseio.com/');
import NewMessage from './newMessage'


export default class NavBar extends Component{
    constructor(props) {
        super(props);
        this.state = {
            contacts: {}
        }
    }

    componentWillMount() {
        let user = ref.getAuth();
        ref.child('contacts').child(user.uid).on('value', function(data) {
            this.setState({contacts: data.val()});
        }.bind(this));
    }

    render() {
        var user = ref.getAuth();
        return(
            <Navbar fixedTop>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to="/">Bazu</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav pullRight>
                        <NewMessage contacts={this.state.contacts} />
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}
