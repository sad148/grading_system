import React, {Component} from 'react';
import CodePane from './components/codePane.js'
import FeedbackPane from './components/feedbackPane.js'
import LeftPane from './components/leftPane.js'
import RightPane from './components/rightPane.js'

export default class App extends Component {
    state = {
        render: false
    }
    componentDidMount = () => {
        // let grader = prompt("Please enter your id", "");
        // if (grader == null) {
        //     alert('Please enter your id. Refresh the page to enter again!')
        //     this.setState({render: false})
        // } else {
        //     sessionStorage.setItem('graderId', grader);
        //     sessionStorage.setItem('apiurl', 'http://localhost:3009/');
        //     this.setState({render: true})
        // }
    }

    render = () => {
        return (
            <div id='mainDiv' className="App">
                <div id='topPane'>
                    <h3>Grading System</h3>
                </div>
                <div><LeftPane/><RightPane/></div>
            </div>
        );
    }
}