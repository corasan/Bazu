import React, {Component} from 'react'
import { Tabs, Tab } from 'react-bootstrap'
import ChangeEmail from '../components/changeEmail'
import Profile from '../components/profile'
import Firebase from 'firebase'
const ref = new Firebase('https://sms-react.firebaseio.com/');

export default class AccountProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            name: '',
            lastname: ''
        }
    }
    componentWillMount() {
        const user = ref.getAuth();
        ref.child('users').child(user.uid).on('value', function(data) {
            let userData = data.val();
            this.setState({name: userData.firstname, lastname: userData.lastname, email: userData.email});
        }.bind(this));
    }
    render() {
        return (
            <Tabs defaultActiveKey={1}>
                <Tab eventKey={1} title="Perfil"><Profile name={this.state.name} lastname={this.state.lastname} email={this.state.email} /></Tab>
                <Tab eventKey={2} title="Cambiar Email"><ChangeEmail /></Tab>
                <Tab eventKey={3} title="Cambiar Contrasena">Tab 3 content</Tab>
            </Tabs>
        )
    }
}
