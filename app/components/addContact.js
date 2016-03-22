import React, {Component} from 'react'
import {Button, Modal, Input} from 'react-bootstrap'
import Firebase from 'firebase'
const ref = new Firebase('https://sms-react.firebaseio.com/');

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
    // Close modal
    close = () => {
        this.setState({ showModal: false });
    }
    // Open modal
    open = () => {
        this.setState({ showModal: true });
    }
    // Receive inputs from form
    handleEmail = (e) => {
        this.setState({email: e.target.value});
    }
    handleName = (e) => {
        this.setState({name: e.target.value});
    }
    handleNum = (e) => {
        this.setState({num: e.target.value});
    }

    // Saves information submitted in the form  to Firebase
    saveNumber = () => {
        let user = ref.getAuth();
        ref.child('contacts').child(user.uid).child(this.state.name).set({
            name: this.state.name,
            email: this.state.email,
            number: this.state.num
        });
        this.setState({email: '', name: '', num: ''}); // After form is submitted the state/input fields are blank
        this.close(); // Close modal after submit
    }

    render() {
        return (
            <div>
                <Button onClick={this.open} bsStyle="default" id="add-contact-btn">Nuevo Contacto</Button>

                <Modal show={this.state.showModal} onHide={this.close}>
                    <Modal.Header>
                        <a onClick={this.close}><span className="close-modal">X</span></a>
                        <Modal.Title>Agregar Contacto</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form className="contact-form">
                            <Input type="text" placeholder="Nombre" value={this.state.name} onChange={this.handleName}/>
                            <Input type="number" placeholder="Numero" value={this.state.num} onChange={this.handleNum}/>
                            <Input type="email" placeholder="Email" value={this.state.email} onChange={this.handleEmail}/>
                        </form>
                    </Modal.Body>
                    <hr/>
                    <div className="footer-modal">
                        <Button onClick={this.close}>Close</Button>
                        <Button onClick={this.saveNumber} bsStyle="primary">Guardar</Button>
                    </div>
                </Modal>
            </div>
        );
    }
}
