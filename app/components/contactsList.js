import React, {Component} from 'react'
import Firebase from 'firebase'
import { Table } from 'react-bootstrap'

export default class ContactsList extends Component{
    constructor(props) {
        super(props);
        this.state = {
            contacts_arr: []
        }
    }
    // Receives props and iterate over it, make a new row for each element in the object received
    contact() {
        const arr = [];
        let counter = 1;
        for(let i in this.props.contacts) {
            arr.push(
                <tr key={counter}>
                    <td>{counter++}</td>
                    <td>{this.props.contacts[i].name}</td>
                    <td>{this.props.contacts[i].email}</td>
                    <td>{this.props.contacts[i].number.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3')}</td>
                </tr>
            )
        }
        return arr;
    }

    render() {
        return(
            <Table responsive hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Numero</th>
                    </tr>
                </thead>
                <tbody>
                    {this.contact()}
                </tbody>
            </Table>
        )
    }
}
