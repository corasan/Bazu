import React, {Component} from 'react'
import { Panel, Input, Col, Row, Grid, Button } from 'react-bootstrap'
import { browserHistory, Link } from 'react-router'

export default class PaymentPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            card: '',
            ccv: '',
            month: '',
            year: '',
            plan: ''
        }
    }
    handleEmail = (e) => {
        this.setState({ email: e.target.value });
    }
    handleCard = (e) => {
        this.setState({ card: e.target.value });
    }
    handleCCV = (e) => {
        this.setState({ ccv: e.target.value });
    }
    handleMonth = (e) => {
        this.setState({ month: e.target.value });
    }
    handleYear = (e) => {
        this.setState({ year: e.target.value });
    }
    handlePlan = (e) => {
        this.setState({ plan: e.target.value });
    }
    render() {
        return (
            <div>
                <div className="panels" id="panels-signup">
                    <div className="panel-title"><h3>Payment</h3></div>
                    <div className="panel-content" id="signup-content" style={{marginTop: 100}}>
                        <form>
                            <div style={{textAlign: "left"}}>
                                <input type="email" placeholder="Email" onChange={this.handleEmail} value={this.state.email}/>
                                <input type="number" placeholder="Card number" onChange={this.handleCard} value={this.state.card}/>
                                <label>Expire(MM/YY) &nbsp;</label>
                                <select required onChange={this.handleMonth}>{months}</select> <select required onChange={this.handleYear}>{years}</select>
                                <br/><br/>
                                <input type="number" placeholder="CCV" onChange={this.handleCCV} value={this.state.ccv}/>
                                <label>Plan: &nbsp;</label><select required onChange={this.handlePlan}>{plans}</select>
                            </div>
                            <Button type="button" bsStyle="primary" className="auth-btn" >
                                Aceptar
                            </Button>
                        </form>
                    </div>

                </div>
            </div>
        )
    }
}

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
];

const years = [
    <option value="16">16</option>,
    <option value="17">17</option>,
    <option value="18">18</option>,
    <option value="19">19</option>
];

const plans = [
    <option value="basic_plan">Basic - $40</option>,
    <option value="medium_plan">Medium - $60</option>,
    <option value="pro_plan">Pro - $80</option>,
    <option value="ultimate_plan">Ultimate - $120</option>
];
