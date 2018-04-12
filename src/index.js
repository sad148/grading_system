import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import './css/font.css';
import App from './App';
import Login from './components/login'
import Professor from './components/professors'
import {Provider} from 'react-redux'
import {Router, Route} from 'react-router'
import store, {history} from './store.js'

store.subscribe(() => {
})

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Router path="/login" component={Login}/>
            <Router path={'/professor'} component={Professor}/>
            <Route path="/grader" component={App}>

            </Route>
        </Router>
    </Provider>,
    document.getElementById('root')
)