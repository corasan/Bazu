import React, {Component} from 'react'

export default class Payment extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <form action="/payment" method="POST">
            </form>
        )
    }
}
