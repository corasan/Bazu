import React, {Component} from 'react'
import {Button, Modal, Input} from 'react-bootstrap'
import Firebase from 'firebase'
const contactsRef = new Firebase('https://sms-react.firebaseio.com/contacts');

export default class AddContact extends Component{
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            name: '',
            email: '',
            num: null
        }
    }

    close = () => {
        this.setState({ showModal: false });
    }

    open = () => {
        this.setState({ showModal: true });
    }

    handleEmail = (e) => {
        this.setState({email: e.target.value});
    }
    handleName = (e) => {
        this.setState({name: e.target.value});
    }
    handleNum = (e) => {
        this.setState({num: e.target.value});
    }


    saveNumber = () => {
        contactsRef.push({
            name: this.state.name,
            email: this.state.email,
            number: this.state.num
        });
        this.setState({email: '', name: '', num: ''});
        this.close();
    }

 render() {
    return (
        <div>
            <Button bsStyle="primary" bsSize="large" onClick={this.open}>
                Agregar Contacto +
            </Button>

            <Modal show={this.state.showModal} onHide={this.close}>
                <Modal.Header closeButton>
                    <Modal.Title>Agregar Contacto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <Input type="text" label="Nombre" value={this.state.name} onChange={this.handleName}/>
                        <Input type="email" label="Email" value={this.state.email} onChange={this.handleEmail}/>
                        <Input type="number" label="Numero" value={this.state.num} onChange={this.handleNum}/>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.close}>Close</Button>
                    <Button onClick={this.saveNumber}>Guardar</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
 }
}
