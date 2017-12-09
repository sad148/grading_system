import React, { Component } from 'react';
import { connect } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
import '../../node_modules/react-toastify/dist/ReactToastify.min.css';
var _ = require('lodash');
var updateFeedback = require('../actions/updateFeedBackApi.js');

class FeedbackPane extends Component {
	componentWillMount = () => {
		this.arrData = [];
		this.setState({tableDiv:"", feedback:" ", displayGrade:100})
	}

	componentWillReceiveProps = (nextProps) => {
		let rubricData = nextProps.rubricData
		let tableArr = [];
		let grade = nextProps.grades;
    console.log(nextProps);
		// Add selected guideline from deductions view
		if(nextProps.rubricOperation == 1) {
		    grade = this.state.displayGrade;
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

			this.setState({tableDiv:tableArr, displayGrade:grade})
		} else if(nextProps.rubricOperation == 0){  //Remove selected guideline from deductions view
            grade = this.state.displayGrade;
            for(let i = 0;i < this.arrData.length; i++) {
				if(nextProps.rubricId != this.arrData[i].id) {				
					tableArr.push(
						<tr align = "left">
							<td>{this.arrData[i].fullForm} (<label style = {{color:"red"}}>{this.arrData[i].grade}</label>)</td>
						</tr>
					)
				} else {
					grade = grade - parseInt(this.arrData[i].grade)
				}				
			}
			this.setState({tableDiv:tableArr, displayGrade:grade})
			this.arrData = _.pullAllBy(this.arrData,[{id:nextProps.rubricId}],'id');
		} else if(nextProps.rubricOperation == 2) { // Reset deductions view when student or assignment changes
            this.arrData = [];
            tableArr = [];
            this.setState({tableDiv:""})
        }

		this.setState({feedback:nextProps.feedback, displayGrade:nextProps.grades})
	}

	updateTextarea = () => {
		let val = document.getElementById('feedback').value
		this.setState({feedback:val})
	}

	submitFeedback = () => {
        let student = document.getElementById('studDropdown').value
        let assignment = document.getElementById('assignmentsDropdown').value
        if (assignment == 'default')
            toast.error("Please select assignment", {
                position: toast.POSITION.TOP_CENTER
            })
        else if (student == 'default') {
            toast.error("Please select student", {
                position: toast.POSITION.TOP_CENTER
            })
        }
        else {
            var data = {
                oldFeedback: this.state.feedback,
                newFeedback: this.arrData,
                grades: this.state.displayGrade,
                student:student,
                assignment:assignment,
                feedbackUpdated: this.arrData.length > 0 ? true : false
            }
        }

		updateFeedback.update(data,(res)=>{
			if(res.code == 200) {
				document.getElementById('feedback').value = res.data.feedback;
				toast.success("Updated Successfully!!!", {
			    	position: toast.POSITION.TOP_CENTER
			    })
			} else {
                toast.error(res.message, {
                    position: toast.POSITION.TOP_CENTER
                })
            }
		})
	}

	render() {
		return (<div id = 'feedbackSubmitDiv'>
					<div id = 'feedbackPane'>
						<div id = 'deductions' className = 'borderProps'>
							<h4>Deductions</h4>
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
							<h4>Feedback</h4>
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
		        	<ToastContainer 
			          type="success"
			          autoClose={3000}			          
			          closeOnClick
			          hideProgressBar		          
			        />
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
