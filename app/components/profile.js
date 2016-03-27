import React, { Component } from 'react'
import Firebase from 'firebase'
const ref = new Firebase('https://sms-react.firebaseio.com/');
import { FormControls, Input, Button } from 'react-bootstrap'

export default class Profile extends Component {
    render() {
        return (
            <form className="form-horizontal" style={{margin: "40px 0 0 0"}}>
                <FormControls.Static label="Nombre:" labelClassName="col-xs-2" wrapperClassName="col-xs-10">
                    {this.props.name + ' ' + this.props.lastname}
                </FormControls.Static>
                <FormControls.Static label="Email:" labelClassName="col-xs-2" wrapperClassName="col-xs-10">
                    {this.props.email}
                </FormControls.Static>
            </form>
        )
    }
}
