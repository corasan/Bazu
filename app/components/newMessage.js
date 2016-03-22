import React, {Component} from 'react'
import {Button, Modal, Input} from 'react-bootstrap'
import $ from 'jquery'
import Firebase from 'firebase'
const ref = new Firebase('https://sms-react.firebaseio.com/');


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
    sendMessage = (e) => {
        e.preventDefault();
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
        let date = new Date();
        let day = date.getDate(),
            month = date.getMonth(),
            year = date.getFullYear();

        let user = ref.getAuth();
        ref.child('messages').child(user.uid).push({
            message: this.state.message,
            date: `${month}/${day}/${year}`
        });
    }

    render() {
        return(
            <div>
                <Button bsStyle="primary" onClick={this.open}>
                    Nuevo mensaje
                </Button>

                <Modal show={this.state.showModal} onHide={this.close}>
                    <Modal.Header>
                        <a onClick={this.close}><span className="close-modal">X</span></a>
                        <Modal.Title>Nuevo mensaje</Modal.Title>
                    </Modal.Header>
                    <form onSubmit={this.sendMessage}>
                        <Modal.Body>
                            <Input type="textarea" value={this.state.message} onChange={this.handleMessage}/>
                            <p id="note-modal">Nota: Este mensaje sera enviado automaticamente a sus contactos.</p>
                        </Modal.Body>
                        <hr/>
                        <div className="footer-modal">
                            <Button onClick={this.close}>Cancelar</Button>
                            <Button type="submit" bsStyle="primary">Enviar</Button>
                        </div>
                    </form>
                </Modal>
            </div>
        )
    }
}
