import React, {Component} from 'react'
import {Button, Modal, Input} from 'react-bootstrap'
import $ from 'jquery'
import Firebase from 'firebase'
const ref = new Firebase('https://sms-react.firebaseio.com/users');


export default class NewMessage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            message: '',
            contacts: {}
        }
    }
    // Close modal
    close = () => {
        this.setState({ showModal: false });
    }
    // Open modal
    open = () => {
        this.setState({ showModal: true });
    }

    handleMessage = (e) => {
        this.setState({message: e.target.value})
    }
    // Sends the message to every contact to the server
    sendMessage = () => {
        for(let i in this.props.contacts) {
            $.post('/', {
                number: this.props.contacts[i].number,
                message: this.state.message
            });
        }
        this.close();
        this.saveMessage();
        this.setState({message: ''});
    }

    saveMessage = () => {
        let user = ref.getAuth();
        ref.child(user.uid).child('messages').push({
            message: this.state.message
        });
    }

    render() {
        return(
            <div>
                <Button bsStyle="primary" onClick={this.open}>
                    Nuevo mensaje
                </Button>

                <Modal show={this.state.showModal} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>Nuevo mensaje</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Input type="textarea" label="Mensaje" value={this.state.message} onChange={this.handleMessage}/>
                        <p>Nota: Este mensaje sera enviado automaticamente a sus contactos.</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.close}>Close</Button>
                        <Button onClick={this.sendMessage}>Enviar</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}
