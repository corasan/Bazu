import React, {Component} from 'react'
import Firebase from 'firebase'
import {Button, Modal, Input} from 'react-bootstrap'
import {Link} from 'react-router'
const ref = new Firebase('https://sms-react.firebaseio.com/');

export default class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: ''
        }
    }

    handleEmail = (e) => {
        this.setState({email: e.target.value})
    }

    resetPassword = () => {
        console.log('inside reset');
        ref.resetPassword({
            email : this.state.email
        }, function(error) {
            if (error === null) {
                console.log("Password reset email sent successfully");
            } else {
                console.log("Error sending password reset email:", error);
            }
        });
    }

    render() {
        return(
            <div>
                <div className="panels">
                    <div className="panel-title"><h3>Login</h3></div>
                    <div className="panel-content">
                        <form>
                            <p style={{margin: "100px 0 20px 0"}}>Le enviaremos un email para cambiar la contrasena</p>
                            <input type="email" placeholder="Email" onChange={this.handleEmail} />
                            <Button type="button" bsStyle="primary" className="auth-btn"
                                onClick={this.resetPassword} href="login">Enviar</Button>
                        </form>
                    </div>
                    <div className="panel-foot">
                        <hr/>
                        <h4 style={{margin: "0 0 50px 0"}}>
                            <Link to="login" style={{color: "#5DC7C7", cursor:"pointer"}}>
                                Iniciar Sesion
                            </Link>
                        </h4>
                    </div>
                </div>
            </div>
        )
    }
}

{/*<div>
    <p id="forgot-password" onClick={this.open}>Olvido la contrasena?</p>

    <Modal show={this.state.showModal} onHide={this.close}>
        <Modal.Header>
            <a onClick={this.close}><span className="close-modal">X</span></a>
            <Modal.Title>Olvido Contrasena</Modal.Title>
        </Modal.Header>
        <form>
            <Modal.Body>
                <p style={{margin: "30px 0 0 80px"}}>Le enviaremos un email para cambiar la contrasena</p>
                <Input type="text" id="reset-pass" placeholder="Email" value={this.state.email}
                onChange={this.handleEmail}/>
            </Modal.Body>
            <hr/>
            <div className="footer-modal">
                <Button onClick={this.close}>Cancelar</Button>
                <Button type="submit" bsStyle="primary" onClick={this.resetPassword}>Enviar</Button>
            </div>
        </form>
    </Modal>
</div>*/}
