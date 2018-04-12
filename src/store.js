import {Router, Route, browserHistory} from 'react-router'
import {createStore, combineReducers, applyMiddleware} from "redux";
import {createLogger} from "redux-logger";
import promise from "redux-promise-middleware";
import thunk from "redux-thunk";
import {syncHistoryWithStore, routerReducer} from 'react-router-redux';
import loadRubric from './reducers/loadRubric_reducer.js'
import codeAndFeedbackReducer from './reducers/codeAndFeedback_reducer.js'
import toggleRubric from './reducers/toggleRubric_reducer.js'
import loadStudents from './reducers/loadStudents_reducer.js'
import loadAssignmentsList from './reducers/loadAssignmentsList_reducer';
import login from './reducers/login_reducer'
import getReducer from './reducers/get_reducer'
import courseDetailsReducer from './reducers/courseDetails_reducer'
import graderReducer from './reducers/grader_reducer'
import assignmentIdReducer from './reducers/assignment_reducer'

const logger = createLogger({})

const store = createStore(
    combineReducers({
        loadRubric,
        loadAssignmentsList,
        loadStudents,
        codeAndFeedbackReducer,
        toggleRubric,
        login,
        getReducer,
        graderReducer,
        assignmentIdReducer,
        courseDetailsReducer,
        routing: routerReducer
    }), {}, applyMiddleware(logger, thunk, promise())
)

export const history = syncHistoryWithStore(browserHistory, store)

export default store;