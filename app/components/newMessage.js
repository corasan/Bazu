import React, {Component} from 'react'
import {Button, Modal, Input} from 'react-bootstrap'

export default class NewMessage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            showModal: false
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

    render() {
        return(
            <div>
                <Button bsStyle="primary" bsSize="large" onClick={this.open}>
                    Nuevo mensaje +
                </Button>

                <Modal show={this.state.showModal} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>Nuevo mensaje</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Input type="textarea" label="Mensaje" />
                        <p>Nota: Este mensaje sera enviado automaticamente a sus contactos.</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.close}>Close</Button>
                        <Button onClick={this.close}>Enviar</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}
