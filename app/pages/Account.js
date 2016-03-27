import React, {Component} from 'react'
import { Tabs, Tab } from 'react-bootstrap'
import ChangeEmail from '../components/ChangeEmail'

export default class AccountProfile extends Component {
    render() {
        return (
            <Tabs defaultActiveKey={2}>
                <Tab eventKey={1} title="Perfil">Tab 1 content</Tab>
                <Tab eventKey={2} title="Cambiar Email"><ChangeEmail /></Tab>
                <Tab eventKey={3} title="Cambiar Contrasena">Tab 3 content</Tab>
            </Tabs>
        )
    }
}
