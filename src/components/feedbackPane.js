import React, { Component } from 'react';
import {Collapse, Button} from 'react-bootstrap';
import { connect } from 'react-redux'
var _ = require('lodash');
var updateFeedback = require('../actions/updateFeedBackApi.js');

class FeedbackPane extends Component {
	componentWillMount = () => {
		this.arrData = [];
		this.setState({openDeductions:false, openFeedback:true, tableDiv:"", feedback:""})
	}	

	componentWillReceiveProps = (nextProps) => {
		let rubricData = nextProps.rubricData
		let tableArr = [];

		if(nextProps.rubricOperation == 1) {
			let x = document.getElementById("deductionsTable").rows.length;			
			if(x != 0) {
				tableArr = this.state.tableDiv				
			} 

			rubricData.id = nextProps.rubricId
			this.arrData.push(rubricData);

			tableArr.push(
					<tr align = "left">
						<td>{rubricData.fullForm} (<label style = {{color:"red"}}>{rubricData.grade}</label>)</td>
					</tr>
			)
			
			if(this.state.openDeductions == false) {
				this.setState({openDeductions:true})
			}
			this.setState({tableDiv:tableArr})
		} else {
			for(let i = 0;i < this.arrData.length; i++) {
				if(nextProps.rubricId != this.arrData[i].id) {
					tableArr.push(
						<tr align = "left">
							<td>{this.arrData[i].fullForm} (<label style = {{color:"red"}}>{this.arrData[i].grade}</label>)</td>
						</tr>
					)
				}
			}
			this.setState({tableDiv:tableArr})
			this.arrData = _.pullAllBy(this.arrData,[{id:nextProps.rubricId}],'id');
		}

		this.setState({feedback:nextProps.feedback})
	}

	toggleCollapse = (type) => {
		console.log("inside toggleCollapse",type)
		if (type == 0) {
			if(this.state.openDeductions == false) {
				this.setState({openDeductions:true});	
			} else {
				this.setState({openDeductions:false});
			}		
		} else {
			if(this.state.openFeedback == false) {
				this.setState({openFeedback:true});	
			} else {
				this.setState({openFeedback:false});
			}
		}
	}

	updateTextarea = () => {
		let val = document.getElementById('feedback').value
		this.setState({feedback:val})
	}

	submitFeedback = () => {
		let data = {
			oldFeedback:this.state.feedback,
			newFeedback:this.arrData
		}

		updateFeedback.update(data,(res)=>{
			
		})
	}

	render() {
		return (<div id = 'feedbackPane'>
					<div id = 'deductions' className = 'borderProps'>
						<h3 onClick = {() => this.toggleCollapse(0)}>Deductions</h3>
						<hr/>
						<Collapse in = {this.state.openDeductions}>
							<table id = 'deductionsTable'>
								<tbody>	        	 			
		        	 				{this.state.tableDiv}
		        	 			</tbody>
		        	 		</table>
	        	 		</Collapse>
					</div>
					<div id = 'feedbackDiv' className = 'borderProps'>
						<h3 onClick = {() => this.toggleCollapse(1)}>Feedback</h3>
						<hr/>
						<Collapse in = {this.state.openFeedback}>
	        	 			<textarea id='feedback' placeholder='Write feedback' value = {this.state.feedback} onChange = {() => this.updateTextarea()}></textarea>
	        	 		</Collapse>
	        	 	</div>
	        	 	<div id = 'submit'>
	        	 		<Button bsStyle="primary" onClick = {this.submitFeedback}>Submit</Button>
	        	 	</div>
	    		</div>)
	}
}

const mapStateToProps = (store) => {
	return {
		rubricId:store.toggleRubric.rubricId,
		rubricData:store.toggleRubric.rubricData,
		rubricOperation:store.toggleRubric.rubricOperation
	}
}

export default connect(mapStateToProps)(FeedbackPane)