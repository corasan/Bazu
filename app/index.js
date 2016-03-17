import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {Router, Route, browserHistory, Link, IndexRoute} from 'react-router'
import Contacts from './pages/Contacts'
import Login from './pages/Login'

class App extends Component{
    render() {
        return (
            <div>
                <h1>Home</h1>
                <Link to="/contacts">Contacts</Link>
                <Link to="/login">Login</Link>
                {this.props.children}
            </div>
        )
    }
}

// Routes
const routes = (
    <Router>
        <Route path="login" component={Login} />
        <Route path="/" component={App}>
            <Route path="contacts" component={Contacts} />
        </Route>
    </Router>
)

ReactDOM.render(<Router history={browserHistory}>{routes}</Router>, document.getElementById('app'));
