import React, { Component } from 'react'
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import { Link, browserHistory } from 'react-router'
const ref = new Firebase('https://sms-react.firebaseio.com/');

export default class NavBar extends Component{
    logout = () => {
        ref.unauth();
    }

    render() {
        var user = ref.getAuth();
        return(
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to="/">SMS App</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav pullRight>
                        <NavItem>{user.password.email}</NavItem>
                        <li><Link to="login" onClick={this.logout}>Log out</Link></li>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}
