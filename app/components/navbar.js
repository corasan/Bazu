import React, { Component } from 'react'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'
import { Link } from 'react-router'
const ref = new Firebase('https://sms-react.firebaseio.com/');

export default class NavBar extends Component{
    logout = () => {
        ref.unauth();
    }

    render() {
        var user = ref.getAuth();
        return(
            <Navbar fixedTop>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to="/">SMS App</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav pullRight>
                        <NavDropdown eventKey={1} title={user.password.email} id="basic-nav-dropdown">
                            <li><Link eventKey={1.1} to="messages">Historial de mensajes</Link></li>
                        </NavDropdown>
                        <li><Link to="login" onClick={this.logout}>Log out</Link></li>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}
