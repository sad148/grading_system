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
		if(nextProps.rubricLoaded == true) {
			for(let i = 0;i<10;i++) {
				guidelines.push(
					<div id = 'block'>
						<input type = 'checkbox' class = 'guidelinesCheckbox'></input>
						<input type = 'text' class = 'borderProps guidelinesData'></input>
						<button value = 'more' class = 'more'>More</button>
					</div>
					)
			}
		this.setState({guidelines:guidelines})
		}		
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