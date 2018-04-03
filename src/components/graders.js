import React, {Component} from 'react'
import get from '../actions/get'
import {connect} from 'react-redux'
import DetailsTable from './detailsTable'
import store from '../store'

var papa = require('papaparse')
var addGrader = require('../actions/adddata')

class Graders extends Component {
    state = {
        graderState: <label style={{color: "red", marginTop: "10px"}}>Select option</label>,
    }

    componentDidMount = () => {
        let courseDetails = store.getState().courseDetailsReducer
        this.props.dispatch(get(courseDetails, "GRADERS"))
    }

    componentWillMount = () => {
        let courseDetails = store.getState().courseDetailsReducer
        if (courseDetails.course_code.trim().length === 0 || courseDetails.section_code.trim().length === 0 || courseDetails.term.trim().length === 0) {
            alert('Please enter all course details')
            this.props.jumpToStep(0)
        }
    }

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.dataReceived) {
            console.log("inside componentreceiveprops");
            this.setState({data: nextProps.data, dataType: nextProps.dataType, render: true})
            this.props.dispatch({type: "DATA_DISPLAYED"})
        }
    }

    toggleGrader = (id) => {
        id === 0 ? this.setState({
            graderState: <div className={"optionsDiv"}>
                Grader id:&nbsp;&nbsp;<input id={"graderText"} type={"text"}/>
                <input style={{height: "30px", marginTop: "12px", marginLeft: "10px"}} type={"submit"}
                       value={"Create"} onClick={this.createGrader}></input>
            </div>
        }) : this.setState({
            graderState: <div className={"optionsDiv"}>
                <input id={"graderFile"} type={"file"} onChange={this.handleFile}/>
            </div>
        })
    }

    handleFile = (e) => {
        let file = e.target.files[0]
        papa.parse(file, {
            complete: (result) => {
                let graderId = []
                result.data.map((item) => {
                    if (item[0] != "")
                        graderId.push({name: item[0], email: item[0]})
                })
                let courseDetails = store.getState().courseDetailsReducer
                addGrader.adddata(courseDetails, "graders", graderId, this.props.dispatch)
            },
            error: (error) => {
                console.log("error", error)
            }
        })
    }

    createGrader = () => {
        const graderId = [{
            name: document.getElementById("graderText").value.trim(),
            email: document.getElementById("graderText").value.trim()
        }]
        let courseDetails = store.getState().courseDetailsReducer
        addGrader.adddata(courseDetails, "graders", graderId, this.props.dispatch)
    }

    addStudent = (name) => {
        this.props.dispatch({type: "UPDATE_GRADERID", graderId: name})
        this.props.jumpToStep(2);
    }

    render = () => {
        return (
            <div id={"grader"} className={"profDivElements"}>
                Graders List
                <hr/>
                Enter manually:<input type={"radio"} name="graderOption" value={"Enter manually"}
                                      onClick={() => this.toggleGrader(0)}></input><br/>
                Upload file:<input type={"radio"} name="graderOption" value={"Upload file"}
                                   onClick={() => this.toggleGrader(1)}></input><br/>
                {this.state.graderState}
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

export default connect(mapStateToProps)(Graders);