import React, {Component} from 'react'
import {Button, Modal, Input} from 'react-bootstrap'
import $ from 'jquery'
import Firebase from 'firebase'
const ref = new Firebase('https://sms-react.firebaseio.com/');


export default class NewMessage extends Component{
    constructor(props) {
        super(props);
        let user = ref.getAuth();
        this.state = {
            showModal: false,
            message: '',
            contacts: {},
            file: '',
            userID: user.uid,
            email: user.password.email
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

    handleImageChange = (e) => {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
        }
        reader.readAsDataURL(file)
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
                    <form method="post" encType="multipart/form-data" action="/upload">
                        <Modal.Body>
                            <Input type="textarea" value={this.state.message} onChange={this.handleMessage}/>
                            <p id="note-modal">Este mensaje sera enviado automaticamente a sus contactos.</p>
                            <Input type="hidden" value={this.state.userID} name="userID" />
                            <Input type="hidden" value={this.state.email} name="userEmail" />
                        </Modal.Body>
                        <Input type="file" name="imageFile" id="file-upload" onChange={this.handleImageChange}/>
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
