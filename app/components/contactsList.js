import React, {Component} from 'react'
import Firebase from 'firebase'
const contactsRef = new Firebase('https://sms-react.firebaseio.com/contacts');

export default class ContactsList extends Component{
    constructor(props) {
        super(props);
        this.state = {
            contacts_arr: []
        }
    }
    contact() {
        const arr = [];
        let counter = 1
        for(let i in this.props.contacts) {
            arr.push(
                <tr>
                    <td>{counter++}</td>
                    <td>{this.props.contacts[i].name}</td>
                    <td>{this.props.contacts[i].email}</td>
                    <td>{this.props.contacts[i].number}</td>
                </tr>
            )
        }
        return arr;
    }

    render() {
        return(
            <tbody>
                {this.contact()}
            </tbody>
        )
    }
}
