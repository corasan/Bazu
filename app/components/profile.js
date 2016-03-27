import React, { Component } from 'react'
import Firebase from 'firebase'
const ref = new Firebase('https://sms-react.firebaseio.com/');
import { FormControls, Input, Button } from 'react-bootstrap'

export default class Profile extends Component {
    render() {
        return (
            <form style={{margin: "40px 0 0 0"}}>
                <FormControls.Static label="Nombre" value={this.props.name + ' ' + this.props.lastname} />
                <FormControls.Static label="Email" value={this.props.email} />
            </form>
        )
    }
}
