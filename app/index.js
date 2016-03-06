import React, {Component} from 'react'
import ReactDOM from 'react-dom'
// import App from './components/App'
import Main from './pages/Main'

class App extends Component{
    render() {
        return (
            <div>
                <Main />
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));