import React, {Component} from 'react'
import {Button, Modal, Input} from 'react-bootstrap'

export default class AddContact extends Component{
    constructor(props) {
        super(props);
        this.state = {
            showModal: false
        }
    }

    close = () => {
        this.setState({ showModal: false });
    }

    open = () => {
        this.setState({ showModal: true });
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
                        <Input type="text" label="Nombre" placeholder="Nombre" />
                        <Input type="email" label="Email" placeholder="Email" />
                        <Input type="number" label="Numero" placeholder="1234567890"/>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.close}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
 }
}
