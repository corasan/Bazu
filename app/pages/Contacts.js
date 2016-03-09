import React, {Component} from 'react'
import { Table, Grid, Row, Col } from 'react-bootstrap'
import AddContact from '../components/addContact'
import ContactsList from '../components/contactsList'
import NewMessage from '../components/newMessage'
import Firebase from 'firebase'
const contactsRef = new Firebase('https://sms-react.firebaseio.com/contacts');

export default class Main extends Component{
    constructor(props) {
        super(props);
        this.state = {
            contacts: {}
        }
    }
    // Listen to changes in Firebase and assign the received object the contacts state
    componentWillMount() {
        contactsRef.on('value', function(data) {
            this.setState({contacts: data.val()});
        }.bind(this));
    }
    // Pass the object as props to the contactslist component
    render() {
        return (
            <div>
                <Grid>
                    <Row>
                        <Col md={2} />
                        <Col md={8}>
                            <AddContact />
                            <NewMessage contacts={this.state.contacts}/>
                            <Table responsive>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Nombre</th>
                                        <th>Email</th>
                                        <th>Numero</th>
                                    </tr>
                                </thead>
                                <ContactsList contacts={this.state.contacts}/>
                            </Table>
                        </Col>
                        <Col md={2} />
                    </Row>
                </Grid>
            </div>
        )
    }
}
