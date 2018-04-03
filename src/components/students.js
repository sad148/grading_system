import React, {Component} from 'react'
import get from '../actions/get'
import {connect} from 'react-redux'
import DetailsTable from './detailsTable'
import store from '../store'

var papa = require('papaparse')
var addStudent = require('../actions/adddata')

class Students extends Component {
    state = {
        studentState: <label style={{color: "red", marginTop: "10px"}}>Select option</label>,
    }

    componentDidMount = () => {
        let courseDetails = store.getState().courseDetailsReducer
        this.props.dispatch(get(courseDetails, "STUDENTS"))
    }

    componentWillMount = () => {
        let graderId = store.getState().graderReducer.graderId
        let courseDetails = store.getState().courseDetailsReducer
        if (courseDetails.course_code.trim().length === 0 || courseDetails.section_code.trim().length === 0 || courseDetails.term.trim().length === 0) {
            alert('Please enter all course details')
            this.props.jumpToStep(0)
        } else if (graderId.trim().length === 0) {
            alert('Please click on respective grader to select the list of students')
            this.props.jumpToStep(1)
        }
    }

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.dataReceived) {
            this.setState({data: nextProps.data, dataType: nextProps.dataType, render: true})
            this.props.dispatch({type: "DATA_DISPLAYED"})
        }
    }

    toggleStudent = (id) => {
        id === 0 ? this.setState({
            studentState: <div className={"optionsDiv"}>
                Student id:&nbsp;&nbsp;<input id={"studentText"} type={"text"}/>
                <input style={{height: "30px", marginTop: "12px", marginLeft: "10px"}} type={"submit"}
                       value={"Create"} onClick={this.createStudent}></input>
            </div>
        }) : this.setState({
            studentState: <div className={"optionsDiv"}>
                <input id={"studentFile"} type={"file"} onChange={this.handleFile}/>
            </div>
        })
    }

    handleFile = (e) => {
        let file = e.target.files[0]
        papa.parse(file, {
            complete: (result) => {
                let studentId = []
                result.data.map((item) => {
                    if (item[0] != "")
                        studentId.push({name: item[0], email: item[0]})
                })
                let courseDetails = store.getState().courseDetailsReducer
                addStudent.adddata(courseDetails, "students", studentId, this.props.dispatch)
            },
            error: (error) => {
                console.log("error", error)
            }
        })
    }

    createStudent = () => {
        let courseDetails = store.getState().courseDetailsReducer
        const studentId = [{
            name: document.getElementById("studentText").value.trim(),
            email: document.getElementById("studentText").value.trim()
        }]
        addStudent.adddata(courseDetails, "students", studentId, this.props.dispatch)
    }


    render = () => {
        return (
            <div id={"student"} className={"profDivElements"}>
                Students List
                <hr/>
                Enter manually:<input type={"radio"} name="studentOption" value={"Enter manually"}
                                      onClick={() => this.toggleStudent(0)}></input><br/>
                Upload file:<input type={"radio"} name="studentOption" value={"Upload file"}
                                   onClick={() => this.toggleStudent(1)}></input><br/>
                {this.state.studentState}
                <DetailsTable data={this.state.data} type={this.state.dataType}
                              func={this.addStudent}/>
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

export default connect(mapStateToProps)(Students);