import React, { Component } from 'react';
import { connect } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
import '../../node_modules/react-toastify/dist/ReactToastify.min.css';
var _ = require('lodash');
var updateFeedback = require('../actions/updateFeedBackApi.js');

class FeedbackPane extends Component {
	componentWillMount = () => {
		this.arrData = [];
		this.setState({openDeductions:true, openFeedback:true, tableDiv:"", feedback:"", displayGrade:100})
	}	

	componentWillReceiveProps = (nextProps) => {
		let rubricData = nextProps.rubricData
		let tableArr = [];
		let grade = this.state.displayGrade;

		if(nextProps.rubricOperation == 1) {
			let x = document.getElementById("deductionsTable").rows.length;			
			if(x != 0) {
				tableArr = this.state.tableDiv
			} 

			rubricData.id = nextProps.rubricId
			grade = grade + parseInt(rubricData.grade)
			this.arrData.push(rubricData);

			tableArr.push(
					<tr align = "left">
						<td>{rubricData.fullForm} (<label style = {{color:"red"}}>{rubricData.grade}</label>)</td>
					</tr>
			)
			
			if(this.state.openDeductions == false) {
				this.setState({openDeductions:true})
			}
			this.setState({tableDiv:tableArr, displayGrade:grade})
		} else {
			//let grade = this.state.grade;
			for(let i = 0;i < this.arrData.length; i++) {
				if(nextProps.rubricId != this.arrData[i].id) {				
					tableArr.push(
						<tr align = "left">
							<td>{this.arrData[i].fullForm} (<label style = {{color:"red"}}>{this.arrData[i].grade}</label>)</td>
						</tr>
					)
				} else {
					console.log("before ",grade,parseInt(this.arrData[i].grade))
					grade = grade - parseInt(this.arrData[i].grade)
					console.log("after ",grade,parseInt(this.arrData[i].grade));
				}				
			}
			this.setState({tableDiv:tableArr, displayGrade:grade})
			this.arrData = _.pullAllBy(this.arrData,[{id:nextProps.rubricId}],'id');
		}

		this.setState({feedback:nextProps.feedback})
	}

	updateTextarea = () => {
		let val = document.getElementById('feedback').value
		this.setState({feedback:val})
	}

	submitFeedback = () => {
		let data = {
			oldFeedback:this.state.feedback,
			newFeedback:this.arrData,
			grades:this.state.displayGrade
		}

		updateFeedback.update(data,(res)=>{
			if(res == 200) {
				toast.success("Updated successfully!!!")
			}
		})
	}

	render() {
		return (<div id = 'feedbackSubmitDiv'>
					<div id = 'feedbackPane'>
						<div id = 'deductions' className = 'borderProps'>
							<h3>Deductions</h3>
							<hr/>
								<div id = 'deductionsTableDiv'>
									<table id = 'deductionsTable'>
										<tbody>	        	 			
				        	 				{this.state.tableDiv}
				        	 			</tbody>
				        	 		</table>
				        	 	</div>
						</div>
						<div id = 'feedbackDiv' className = 'borderProps'>
							<h3>Feedback</h3>
							<hr/>
							<textarea id='feedback' placeholder='Write feedback' value = {this.state.feedback} onChange = {() => this.updateTextarea()}></textarea>
	        	 		</div>	        	 	
		    		</div>
		    		<div id = 'submit'>
		        		<button id = 'submitButton' onClick = {this.submitFeedback}>Submit</button>
		        		<div id = 'grades'>
		        			<label>Grade:</label><label style={{color:"red"}}>{this.state.displayGrade}</label>
		        		</div>
		        	</div>
		        </div>
	    		)
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
