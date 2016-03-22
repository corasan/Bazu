import React, { Component } from 'react'
import { Table } from 'react-bootstrap'

export default class MessagesList extends Component{
    message() {
        const arr = [];
        let counter = 1;
        for(let i in this.props.messages) {
            arr.push(
                <tr key={counter++}>
                    <td>{this.props.messages[i].message}</td>
                    <td>{this.props.messages[i].date}</td>
                </tr>
            )
        }
        return arr;
    }
    render() {
        return(
            <Table responsive hover id="messages-table">
                <thead>
                    <tr>
                        <th>Mensaje</th>
                        <th>Fecha</th>
                    </tr>
                </thead>
                <tbody>
                    {this.message()}
                </tbody>
            </Table>
        )
    }
}
