import React, { Component } from 'react';
import './App.css';
import CodePane from './components/codePane.js'
import FeedbackPane from './components/feedbackPane.js'

import LeftPane from './components/leftPane.js'
import RightPane from './components/rightPane.js'

export default class App extends Component {
	render = () => {
		return (
		<div id = 'app'>
		  <div id = 'topPane'>
		  	<h3>Grading System</h3>
		  </div>
		  <div id='mainDiv' className="App">      	
			<LeftPane />
			<RightPane />		    

		    <div id ='submitDiv'>

			</div>
		  </div>
		</div>
		);
	}
}

//<input type='file' accept='.txt' id='codeInput' onChange={this.readCodeFile}></input>