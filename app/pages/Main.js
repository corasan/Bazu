import React, {Component} from 'react'
import { Table } from 'react-bootstrap'
import AddContact from '../components/addContact'
import ContactsList from '../components/contactsList'
import Firebase from 'firebase'
const contactsRef = new Firebase('https://sms-react.firebaseio.com/contacts');

export default class Main extends Component{
    constructor(props) {
        super(props);
        this.state = {
            contacts: {}
        }
    }

    componentWillMount() {
        contactsRef.on('value', function(data) {
            this.setState({contacts: data.val()});
            console.log(data.val());
        }.bind(this));
    }

    render() {
        return (
            <div>
                <AddContact />
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
            </div>
        )
    }
}
