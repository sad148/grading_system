import React, { Component } from 'react';
import {Collapse} from 'react-bootstrap';

export default class FeedbackPane extends Component {
	componentWillReceiveProps = (nextProps) => {
		document.getElementById('feedback').value = nextProps.feedback
	}

	clicked = () => {
		alert('Clicked');
	}

	render() {
		return (<div id = 'feedbackPane'>
					<div id = 'deductions' className = 'borderProps'>
						<h3  onClick = {this.clicked}>Deductions</h3>
						<hr/>
						<table>
	        	 			<tr>
	        	 				<td>row1</td>
	        	 				<td>row3</td>
	        	 			</tr>
	        	 			<tr>
	        	 				<td>row2</td>
	        	 			</tr>
	        	 		</table>
					</div>
	        	 	<textarea id='feedback' class = 'borderProps' placeholder='Write feedback'>	        	 		
	        	 	</textarea>
	    		</div>)
	}
}