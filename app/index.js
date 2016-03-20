import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import Firebase from 'firebase'
import { Router, Route, browserHistory, Link, IndexRoute } from 'react-router'
import { Grid, Row, Col, Panel } from 'react-bootstrap'
import NavBar from './components/navbar'
import SideNav from './components/sidenav'
const ref = new Firebase('https://sms-react.firebaseio.com/');

class App extends Component{
    render() {
        return (
            <div>
                <NavBar />
                <div className="app-content">
                    <Grid>
                        <Row>
                            {this.props.children}
                        </Row>
                    </Grid>
                </div>
            </div>
        )
    }
}

// Redirects user to login page if is not Authenticated
function requireAuth(nextState, replace) {
    var user = ref.getAuth();
    if (!user) {
        replace({
            pathname: '/login',
            state: { nextPathname: nextState.location.pathname }
        });
    }
}

function unAuth(nextState, replace) {
    var user = ref.getAuth();
    if (user) {
        replace({
            pathname: '/',
            state: { nextPathname: nextState.location.pathname }
        });
    }
}

function saveUser() {
    var user = ref.getAuth();
    ref.child('users').once('value', function(data) {
        console.log('inside user save');
        if(!data.child(user.uid).exists()) {
            ref.child('users').child(user.uid).set({
                email: user.password.email,
                name: ''
            });
            console.log('User Saved!');
        }
    });
}

import Contacts from './pages/Contacts'
import Login from './pages/Login'
import Messages from './pages/Messages'
const routes = (
    <Router>
        <Route path="login" component={Login} onEnter={unAuth} onLeave={saveUser}/>
        <Route path="/" component={App} onEnter={requireAuth}>
            <IndexRoute component={Contacts}/>
            <Route path="/messages" component={Messages} />
        </Route>
    </Router>
)

ReactDOM.render(<Router history={browserHistory}>{routes}</Router>, document.getElementById('app'));
