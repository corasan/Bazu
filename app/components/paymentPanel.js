import React, {Component} from 'react';
import $ from 'jquery';
import { Panel, Input, Col, Row, Grid, Button } from 'react-bootstrap';
import { browserHistory, Link } from 'react-router';

export default class PaymentPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            card: '',
            cvc: '',
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
        this.setState({ cvc: e.target.value });
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
                        <form action="/payment" method="POST" >
                            <div style={{textAlign: "left"}}>
                                <label>Email &nbsp;</label>
                                <input type="email" placeholder="email123@example.com" name="email" onChange={this.handleEmail} value={this.state.email} style={{width: 250}}/>
                                <label>Card &nbsp;&nbsp;</label>
                                <input type="text" placeholder="Card number" onChange={this.handleCard} value={this.state.card} maxLength="20" style={{width: 250}} name="number"/>
                                <label>Expire(MM/YY) &nbsp;</label>
                                <select required onChange={this.handleMonth} name="exp_month">{months}</select> <select required onChange={this.handleYear} name="exp_year">{years}</select>
                                <br/><br/>
                                <label>CVC &nbsp;</label>
                                <input type="text" placeholder="123" onChange={this.handleCCV} value={this.state.ccv} style={{width: 75}} maxLength="4" name="cvc"/>
                                <br/>
                                <label>Plan: &nbsp;</label>
                                <select required value={this.state.plan} name="plan" onChange={this.handlePlan}>{plans}</select>
                            </div>
                            <Button type="submit" bsStyle="primary" className="auth-btn">
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
    <option value="" key="0">MM</option>,
    <option value="01" key="1">01</option>,
    <option value="02" key="2">02</option>,
    <option value="03" key="3">03</option>,
    <option value="04" key="4">04</option>,
    <option value="05" key="5">05</option>,
    <option value="06" key="6">06</option>,
    <option value="07" key="7">07</option>,
    <option value="08" key="8">08</option>,
    <option value="09" key="9">09</option>,
    <option value="10" key="10">10</option>,
    <option value="11" key="11">11</option>,
    <option value="12" key="12">12</option>
];

const years = [
    <option value="" key="0">YY</option>,
    <option value="16" key="1">16</option>,
    <option value="17" key="2">17</option>,
    <option value="18" key="3">18</option>,
    <option value="19" key="4">19</option>,
    <option value="20" key="5">20</option>
];

const plans = [
    <option value="" key="0">Select plan</option>,
    <option value="basic_plan" key="1">Basic - $40</option>,
    <option value="medium_plan" key="2">Medium - $60</option>,
    <option value="pro_plan" key="3">Pro - $80</option>,
    <option value="ultimate_plan" key="4">Ultimate - $120</option>
];
