import { Router, Route, browserHistory } from 'react-router'
import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import promise from "redux-promise-middleware";
import thunk from "redux-thunk";
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import { createBrowserHistory } from 'history';
import loadRubric from './reducers/loadRubric_reducer.js'
import codeAndFeedbackReducer from './reducers/codeAndFeedback_reducer.js'
import toggleRubric from './reducers/toggleRubric_reducer.js'

const logger = createLogger({})

const store = createStore(
  combineReducers({
    loadRubric,
    codeAndFeedbackReducer,
    toggleRubric,
    routing: routerReducer    
  }),{},applyMiddleware(logger,thunk,promise())
)

export const history = syncHistoryWithStore(createBrowserHistory(), store)

export default store;