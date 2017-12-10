import React,{Component} from 'react';
import { connect } from 'react-redux'
import loadData from '../actions/loadCodeandFeedback.js'
import '../../node_modules/react-toastify/dist/ReactToastify.min.css';
import loadStudents from '../actions/loadStudents.js';
import Assignments from './assignments.js';
import Rubric from './rubric.js';
import store from '../store.js';


class LeftPane extends Component {
	componentWillMount = () => {
		this.setState({studentsList:""});
		this.props.dispatch(loadStudents());
	}

	componentWillReceiveProps = (nextProps) => {
		let studentsListArray = [];
		let studentsList = nextProps.loadStudents;
		if(nextProps.studentsLoaded == true) {
			studentsListArray.push(
						<option selected disabled value = 'default'>Select students...</option>
				)			
			for(let i = 0;i<studentsList.length;i++) {
				studentsListArray.push(
						<option value = {studentsList[i]}>{studentsList[i]}</option>								
					)
			}
			this.setState({studentsList:studentsListArray})
		}
	}

	loadStudentData = () => {
		let student = document.getElementById('studDropdown').value
        let assignment = document.getElementById('assignmentsDropdown').value
        if(assignment != "default") {
		    this.props.dispatch({type:"RUBRICDATA_RECEIVED",payload:store.getState().loadRubric.loadRubric});
		    this.props.dispatch({type:"RESETRUBRIC"});
            this.props.dispatch(loadData(student, assignment));
        }
	}

	render = () => {
	    console.log("inside render");
		return(
				<div id = 'leftPane'>                    
					<div id = 'studentsList'>
						<div id = 'selectStudentsDiv' className = 'borderProps'>
							<h4>Students</h4>
							<hr/>						
							<select id = 'studDropdown' className = 'borderProps' onChange = {this.loadStudentData}>
								{this.state.studentsList}
							</select>
                            <Assignments />
						</div>
					</div>
                    <Rubric />
				</div>
			)
	}
}

const mapStateToProps = (store) => {
	return {
		loadStudents:store.loadStudents.loadStudents,
		studentsLoaded:store.loadStudents.studentsLoaded
	}
}

export default connect(mapStateToProps)(LeftPane);