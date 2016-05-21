import React, {Component} from 'react'
import PaymentPanel from '../components/paymentPanel'

export default class Payment extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <form action="/payment" method="POST">
                <PaymentPanel />
            </form>
        )
    }
}
