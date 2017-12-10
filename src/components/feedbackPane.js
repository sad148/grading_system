import React, { Component } from 'react';
import { connect } from 'react-redux'
import Feedback from './feedback.js'

var _ = require('lodash');

class FeedbackPane extends Component {
	componentWillMount = () => {
		this.arrData = [];
		this.setState({tableDiv:"", feedback:" ", displayGrade:0})
	}

	componentWillReceiveProps = (nextProps) => {
		let rubricData = nextProps.rubricData
		let tableArr = [];
		this.state.displayGrade = parseInt(this.state.displayGrade);
		// Add selected guideline from deductions view
		if(nextProps.rubricOperation == 1) {
			let x = document.getElementById("deductionsTable").rows.length;
			if(x != 0) {
				tableArr = this.state.tableDiv
			} 

			rubricData.id = nextProps.rubricId;
			this.state.displayGrade += parseInt(rubricData.grade);
			this.arrData.push(rubricData);

			tableArr.push(
					<tr align = "left">
						<td>{rubricData.fullForm} (<label style = {{color:"red"}}>{rubricData.grade}</label>)</td>
					</tr>
			)

			this.setState({tableDiv:tableArr, displayGrade:this.state.displayGrade})
		} else if(nextProps.rubricOperation == 0){  //Remove selected guideline from deductions view
            for(let i = 0;i < this.arrData.length; i++) {
				if(nextProps.rubricId != this.arrData[i].id) {				
					tableArr.push(
						<tr align = "left">
							<td>{this.arrData[i].fullForm} (<label style = {{color:"red"}}>{this.arrData[i].grade}</label>)</td>
						</tr>
					)
				} else {
					this.state.displayGrade -= parseInt(this.arrData[i].grade)
				}				
			}
			this.setState({tableDiv:tableArr, displayGrade:this.state.displayGrade});
			this.arrData = _.pullAllBy(this.arrData,[{id:nextProps.rubricId}],'id');
		} else if(nextProps.rubricOperation == 2) { // Reset deductions view when student or assignment changes
            this.arrData = [];
            tableArr = [];
            this.setState({tableDiv:""})
			this.setState({displayGrade:nextProps.grades});
        }
	}

	render() {
		return (<div id = 'feedbackSubmitDiv'>
					<div id = 'deductionsMainDiv'>
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
					</div>
                <Feedback arrData = {this.arrData} displayGrade = {this.state.displayGrade}/>
                <div id = 'grades'>
                    <label>Grade:</label><label style={{color:"red"}}>{this.state.displayGrade}</label>
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
