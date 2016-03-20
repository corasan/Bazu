import React, {Component} from 'react'
import { Table, Grid, Row, Col, Panel } from 'react-bootstrap'
import AddContact from '../components/addContact'
import ContactsList from '../components/contactsList'
import NewMessage from '../components/newMessage'
import SideNav from '../components/sidenav'
import Firebase from 'firebase'
const ref = new Firebase('https://sms-react.firebaseio.com/');

export default class Main extends Component{
    constructor(props) {
        super(props);
        this.state = {
            contacts: {}
        }
    }
    // Listen to changes in Firebase and assign the received object the contacts state
    componentWillMount() {
        let user = ref.getAuth();
        ref.child('contacts').child(user.uid).on('value', function(data) {
            this.setState({contacts: data.val()});
        }.bind(this));
    }
    // Pass the object as props to the contactslist component
    render() {
        return (
            <div>
                <h2 className="page-title">Contactos</h2>
                <SideNav />
                <Col md={8}>
                    <Panel>
                        <ContactsList contacts={this.state.contacts}/>
                    </Panel>
                </Col>
            </div>
        )
    }
}
