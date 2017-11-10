import React,{Component} from 'react';
import { connect } from 'react-redux'
import loadRubric from '../actions/loadRubric.js'
import loadData from '../actions/loadCodeandFeedback.js'

class LeftPane extends Component {
	componentWillMount = () => {
		this.setState({guidelines:"Loading"});
		this.props.dispatch(loadRubric());
	}

	componentWillReceiveProps = (nextProps) => {
		console.log("inside componentWillReceiveProps",nextProps,this.props);
		let guidelines = [];
		let rubricData = nextProps.loadRubric;
		if(nextProps.rubricLoaded == true) {
			console.log("inside nextProps",rubricData)
			for(let i = 0;i<rubricData.length;i++) {
				guidelines.push(
					<div id = 'block'>
						<input type = 'checkbox' id = {i} className = 'guidelinesCheckbox' onClick={()=>this.checkboxClicked(rubricData, i)}></input>						
						<input type = 'text' className = 'guidelinesData borderProps' value = {rubricData[i].shortForm} disabled></input>&nbsp;
						<label className = 'gradeClass'>{rubricData[i].grade}</label>
						<button value = 'more' className = 'more'>More</button>
					</div>
					)
			}
		this.setState({guidelines:guidelines})
		}		
	}

	checkboxClicked = (rubricData, index) => {
		
	}
	
	loadStudentData = () => {
		let student = document.getElementById('studDropdown').value
		this.setState({"student":student});
		this.props.dispatch(loadData());
	}

	render = () =>{
		return(
				<div id = 'leftPane'>
					<div id = 'studentsList'>
						<select id = 'studDropdown' class = 'borderProps' onChange = {this.loadStudentData}>
							<option value = 'sad148'>sad148</option>
							<option value = 'dig22'>dig22</option>
							<option value = 'dab249'>dab249</option>
							<option value = 'asb161'>asb161</option>
							<option value = 'rar154'>rar154</option>
						</select>
					</div>
					<div id = 'rubric' class = 'borderProps'>
						<h3>Guidelines</h3>
						<hr/>
						<div id = 'guidelines'>							
							{this.state.guidelines}
						</div>
					</div>
				</div>
			)
	}
}

const mapStateToProps = (store) => {
	return {
		loadRubric:store.loadRubric.loadRubric,
		rubricLoaded:store.loadRubric.rubricLoaded
	}
}

export default connect(mapStateToProps)(LeftPane);

//<a href="javascript:void(0)" onClick={this.loadData}>Student1</a>