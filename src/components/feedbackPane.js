import React, { Component } from 'react';

export default class FeedbackPane extends Component {
	componentWillReceiveProps = (nextProps) => {
		document.getElementById('feedback').value = nextProps.data
	}

	render() {
		return (<div id = 'feedbackPane'>
	        	 	<textarea id='feedback' placeholder='Write feedback'></textarea>
	    		</div>)
	}
}