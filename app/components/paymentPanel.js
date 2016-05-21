import React, {Component} from 'react'
import { Panel, Input, Col, Row, Grid, Button } from 'react-bootstrap'
import { browserHistory, Link } from 'react-router'

const months = [
    <option value="1">1</option>,
    <option value="2">2</option>,
    <option value="3">3</option>,
    <option value="4">4</option>,
    <option value="5">5</option>,
    <option value="6">6</option>,
    <option value="7">7</option>,
    <option value="8">8</option>,
    <option value="9">9</option>,
    <option value="10">10</option>,
    <option value="11">11</option>,
    <option value="12">12</option>
]

const years = [
    <option value="16">16</option>,
    <option value="17">17</option>,
    <option value="18">18</option>,
    <option value="19">19</option>
]

export default class PaymentPanel extends Component {

    render() {
        return (
            <div>
                <div className="panels" id="panels-signup" style={{textAlign: "left"}}>
                    <div className="panel-title"><h3>Payment</h3></div>
                    <div className="panel-content" id="signup-content">
                        <form>
                            <label>Email</label>
                            <input type="email" placeholder="Email"/>
                            <label>Card</label>
                            <input type="number" placeholder="Card number"/>
                            <label>Expire(MM/YY) </label>
                            <select>{months}</select> <select>{years}</select>
                            <br/>
                            <br/>
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
