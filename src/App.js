import React, { Component } from 'react';
import CodePane from './components/codePane.js'
import FeedbackPane from './components/feedbackPane.js'
import LeftPane from './components/leftPane.js'
import RightPane from './components/rightPane.js'

export default class App extends Component {
	componentWillMount = () => {
        sessionStorage.setItem('apiurl', 'http://localhost:3009/');
    }
	render = () => {
		return (
		  <div id='mainDiv' className="App">
              <div id = 'topPane'>
                  <h3>Grading System</h3>
              </div>
			<LeftPane />
			<RightPane />
		  </div>
		);
	}
}