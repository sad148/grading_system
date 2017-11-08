import React, { Component } from 'react';

export default class FeedbackPane extends Component {
	componentWillReceiveProps = (nextProps) => {
		document.getElementById('feedback').value = nextProps.feedback
	}

	render() {
		return (<div id = 'feedbackPane'>
	        	 	<textarea id='feedback' class = 'borderProps' placeholder='Write feedback'></textarea>
	    		</div>)
	}
}