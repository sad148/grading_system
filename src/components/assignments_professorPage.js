import React, {Component} from 'react'
import get from '../actions/get'
import {connect} from 'react-redux'
import DetailsTable from './detailsTable'
import store from '../store'

var papa = require('papaparse')
var addAssignments = require('../actions/adddata')

class Assignments_Professor extends Component {
    state = {
        assignmentsState: <label style={{color: "red", marginTop: "10px"}}>Select option</label>,
    }

    componentDidMount = () => {
        let courseDetails = store.getState().courseDetailsReducer
        this.props.dispatch(get(courseDetails, "ASSIGNMENTS"))
    }

    componentWillMount = () => {
        let graderId = store.getState().graderReducer.graderId
        let courseDetails = store.getState().courseDetailsReducer
        if (courseDetails.course_code.trim().length === 0 || courseDetails.section_code.trim().length === 0 || courseDetails.term.trim().length === 0) {
            alert('Please enter all course details')
            this.props.jumpToStep(0)
        }
    }

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.dataReceived) {
            this.setState({data: nextProps.data, dataType: nextProps.dataType, render: true})
            this.props.dispatch({type: "DATA_DISPLAYED"})
        }
    }

    toggleAssignments = (id) => {
        id === 0 ? this.setState({
            assignmentsState: <div className={"optionsDiv"}>
                Assignment Name:&nbsp;&nbsp;<input id={"assignmentsText"} type={"text"}/>
                <input style={{height: "30px", marginTop: "12px", marginLeft: "10px"}} type={"submit"}
                       value={"Create"} onClick={this.createAssignment}></input>
            </div>
        }) : this.setState({
            assignmentsState: <div className={"optionsDiv"}>
                <input id={"assignmentsFile"} type={"file"} onChange={this.handleFile}/>
            </div>
        })
    }

    handleFile = (e) => {
        let file = e.target.files[0]
        papa.parse(file, {
            complete: (result) => {
                let assignmentNames = []
                result.data.map((item) => {
                    if (item[0] != "")
                        assignmentNames.push({name: item[0]})
                })
                let courseDetails = store.getState().courseDetailsReducer
                addAssignments.adddata(courseDetails, "assignments", assignmentNames, this.props.dispatch)
            },
            error: (error) => {
                console.log("error", error)
            }
        })
    }

    createAssignment = () => {
        let courseDetails = store.getState().courseDetailsReducer
        const assignmentName = [{name: document.getElementById("assignmentsText").value.trim()}]
        addAssignments.adddata(courseDetails, "assignments", assignmentName, this.props.dispatch)
    }

    addRubricProf = (name) => {
        this.props.dispatch({type: "UPDATE_ASSIGNMENTID", assignmentId: name})
        this.props.jumpToStep(4);
    }

    render = () => {
        return (
            <div id={"assignment"} className={"profDivElements"}>
                Assignments List
                <hr/>
                Enter manually:<input type={"radio"} name="assignmentsOption" value={"Enter manually"}
                                      onClick={() => this.toggleAssignments(0)}></input><br/>
                Upload file:<input type={"radio"} name="assignmentsOption" value={"Upload file"}
                                   onClick={() => this.toggleAssignments(1)}></input><br/>
                {this.state.assignmentsState}
                <DetailsTable data={this.state.data} type={this.state.dataType} func={this.addRubricProf}/>
            </div>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        dataReceived: store.getReducer.dataReceived,
        data: store.getReducer.data,
        dataType: store.getReducer.dataType
    }
}

export default connect(mapStateToProps)(Assignments_Professor);