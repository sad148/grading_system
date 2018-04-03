import React, {Component} from 'react'
import get from '../actions/get'
import {connect} from 'react-redux'
import store from '../store'

var papa = require('papaparse')
var addRubricProf = require('../actions/adddata')

class Rubric_Professors extends Component {
    state = {
        rubricProfState: <label style={{color: "red", marginTop: "10px"}}>Select option</label>,
        data: []
    }

    componentDidMount = () => {
        let courseDetails = store.getState().courseDetailsReducer
        courseDetails.assignment_id = store.getState().assignmentIdReducer.assignmentId
        this.props.dispatch(get(courseDetails, "RUBRICS"))
    }

    componentWillMount = () => {
        let assignmentId = store.getState().assignmentIdReducer.assignmentId
        let courseDetails = store.getState().courseDetailsReducer
        if (courseDetails.course_code.trim().length === 0 || courseDetails.section_code.trim().length === 0 || courseDetails.term.trim().length === 0) {
            alert('Please enter all course details')
            this.props.jumpToStep(0)
        } else if (assignmentId.trim().length === 0) {
            alert('Please click on respective assignment to get the list of rubric')
            this.props.jumpToStep(3)
        }
    }

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.dataReceived) {
            this.setState({data: nextProps.data, dataType: nextProps.dataType, render: true})
            this.props.dispatch({type: "DATA_DISPLAYED"})
        }
    }

    toggleRubricProf = (id) => {
        id === 0 ? this.setState({
            rubricProfState: <div className={"optionsDiv"}>
                Grades:&nbsp;&nbsp;<input id={"grades"} type={"text"}/>
                Short Description:&nbsp;&nbsp;<input id={"shortDesc"} type={"text"}/>
                Long Description:&nbsp;&nbsp;<input id={"longDesc"} type={"text"}/>
                <input style={{height: "30px", marginTop: "12px", marginLeft: "10px"}} type={"submit"}
                       value={"Create"} onClick={this.createRubricProf}></input>
            </div>
        }) : this.setState({
            rubricProfState: <div className={"optionsDiv"}>
                <input id={"rubricProfFile"} type={"file"} onChange={this.handleFile}/>
            </div>
        })
    }

    handleFile = (e) => {
        let file = e.target.files[0]
        papa.parse(file, {
            header: true,
            complete: (result) => {
                let rubricProfId = []
                result.data.map((item) => {
                    if (item.grader != "" || item.short_desc != null || item.long_desc != null)
                        rubricProfId.push({
                            grade: item.grader,
                            short_desc: item['short description'],
                            long_desc: item['long description']
                        })
                })
                let courseDetails = store.getState().courseDetailsReducer
                courseDetails.assignment_id = store.getState().assignmentIdReducer.assignmentId
                addRubricProf.adddata(courseDetails, "rubric", rubricProfId, this.props.dispatch)
            },
            error: (error) => {
                console.log("error", error)
            }
        })
    }

    createRubricProf = () => {
        let courseDetails = store.getState().courseDetailsReducer
        courseDetails.assignment_id = store.getState().assignmentIdReducer.assignmentId

        const rubricProfId = [{
            grade: document.getElementById("grades").value.trim(),
            short_desc: document.getElementById("shortDesc").value.trim(),
            long_desc: document.getElementById("longDesc").value.trim()
        }]
        addRubricProf.adddata(courseDetails, "rubric", rubricProfId, this.props.dispatch)
    }

    render = () => {
        return (
            <div id={"rubricProf"} className={"profDivElements"}>
                RubricProfs List
                <hr/>
                Enter manually:<input type={"radio"} name="rubricProfOption" value={"Enter manually"}
                                      onClick={() => this.toggleRubricProf(0)}></input><br/>
                Upload file:<input type={"radio"} name="rubricProfOption" value={"Upload file"}
                                   onClick={() => this.toggleRubricProf(1)}></input><br/>
                {this.state.rubricProfState}
                <table border="1">
                    <tr>
                        <th style={{textAlign: "left"}}>Grades</th>
                        <th style={{textAlign: "left"}}>Short Description</th>
                        <th style={{textAlign: "left"}}>Long Description</th>
                    </tr>
                    {
                        this.state.data.map((item) => {
                            return (
                                <tr>
                                    <td style={{textAlign: "left"}}>{item.grade}</td>
                                    <td style={{textAlign: "left"}}>{item.short_desc}</td>
                                    <td style={{textAlign: "left"}}>{item.long_desc}</td>
                                </tr>
                            )
                        })
                    }
                </table>
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

export default connect(mapStateToProps)(Rubric_Professors);