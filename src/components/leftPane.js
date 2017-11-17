import React,{Component} from 'react';
import { connect } from 'react-redux'
import loadRubric from '../actions/loadRubric.js'
import loadData from '../actions/loadCodeandFeedback.js'
import { ToastContainer, toast } from 'react-toastify';
import '../../node_modules/react-toastify/dist/ReactToastify.min.css';
import Notifications, {notify} from 'react-notify-toast';
import SkyLight from 'react-skylight';

var modal = {    
    width: '45%',
    height: '18%',
    borderRadius: '15px'
};

class LeftPane extends Component {
	componentWillMount = () => {
		this.setState({guidelines:"Loading"});
		this.props.dispatch(loadRubric());
	}

	componentWillReceiveProps = (nextProps) => {
		let guidelines = [];
		let rubricData = nextProps.loadRubric;
		if(nextProps.rubricLoaded == true) {
			console.log("inside nextProps",rubricData)
			for(let i = 0;i<rubricData.length;i++) {
				guidelines.push(
					<div id = 'block'>
						<input type = 'checkbox' id = {i} className = 'guidelinesCheckbox' onClick={()=>this.checkboxClicked(rubricData[i], i)}></input>						
						<input type = 'text' className = 'guidelinesData borderProps' value = {rubricData[i].shortForm} disabled></input>&nbsp;
						<label className = 'gradeClass'>{rubricData[i].grade}</label>
						<button value = 'more' className = 'more' onClick = { () => this.showFullInfo(rubricData[i].fullForm)}>More</button>
					</div>
					)
			}
		this.setState({guidelines:guidelines})
		}		
	}

	showFullInfo = (fullForm) => {
		this.simpleDialog.show();
		this.setState({fullForm:fullForm})		
	}

	checkboxClicked = (rubricData, index) => {
		console.log(index, document.getElementById(index).checked)
		if(document.getElementById(index).checked == true) {
			this.props.dispatch({type:"ADDRUBRIC", rubricData:rubricData, rubricId:index, rubricOperation:1})
		} else {
			this.props.dispatch({type:"REMOVERUBRIC", rubricData:rubricData, rubricId:index, rubricOperation:0})
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
						<div id = 'selectStudentsDiv' className = 'borderProps'>
							<h4>Students</h4>
							<hr/>						
							<select id = 'studDropdown' className = 'borderProps' onChange = {this.loadStudentData}>
								<option value = 'sad148'>sad148</option>
								<option value = 'dig22'>dig22</option>
								<option value = 'dab249'>dab249</option>
								<option value = 'asb161'>asb161</option>
								<option value = 'rar154'>rar154</option>
							</select>
						</div>
					</div>
					<div id = 'rubric' className = 'borderProps'>
						<h4>Guidelines</h4>
						<hr/>
						<div id = 'guidelines'>							
							{this.state.guidelines}
						</div>
					</div>
					<Notifications />
					<SkyLight dialogStyles = {modal} hideOnOverlayClicked ref = {ref => this.simpleDialog = ref}>
						<div>
							<h4>Description</h4>
							<hr />
							{this.state.fullForm}	
						</div>			       
			        </SkyLight>
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