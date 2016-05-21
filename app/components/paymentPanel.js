import React, {Component} from 'react'
import { Panel, Input, Col, Row, Grid, Button } from 'react-bootstrap'
import { browserHistory, Link } from 'react-router'

export default class PaymentPanel extends Component {
    render() {
        return (
            <div>
                <div className="panels" id="panels-signup">
                    <div className="panel-title"><h3>Payment</h3></div>
                    <div className="panel-content" id="signup-content">
                        <form>
                            <label>Email</label>
                            <input type="email" placeholder="Email"/>
                            <label>Card</label>
                            <input type="number" placeholder="Card number"/>
                            <label>Expire</label>
                            <input type="number" placeholder="MM/YY"/>
                            <label>CCV</label>
                            <input type="number" placeholder="CCV"/>
                            <Button type="button" bsStyle="primary" className="auth-btn" >
                                Aceptar
                            </Button>
                        </form>
                    </div>
                    <div className="panel-foot" id="signup-footer">
                        <h4><Link to="login" style={{color: "#5DC7C7", cursor:"pointer"}}>Login</Link></h4>
                    </div>
                </div>
            </div>
        )
    }
}
