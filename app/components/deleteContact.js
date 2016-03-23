import React, {Component} from 'react'
import Firebase from 'firebase'
import { Table } from 'react-bootstrap'
const ref = new Firebase('https://sms-react.firebaseio.com/');

export default class DeleteContact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name
        }
    }

    removeContact = () => {
        let user = ref.getAuth();
        ref.child('contacts').child(user.uid).child(this.props.name).remove();
    }

    render() {
        return(
            <td><a onClick={this.removeContact}>X</a></td>
        )
    }
}
