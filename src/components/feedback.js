import React, { Component } from 'react';
import { connect } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
import '../../node_modules/react-toastify/dist/ReactToastify.min.css';
import store from '../store.js'
import Textarea from "react-textarea-autosize";

var updateFeedback = require('../actions/updateFeedBackApi.js');

class Feedback extends Component {
    componentWillMount = () => {
        this.arrData = [];
        this.setState({feedback:""})
    }

    componentWillReceiveProps = (nextProps) => {
        this.setState({feedback:nextProps.feedback})
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
                newFeedback: this.props.arrData,
                grades: this.props.displayGrade,
                student:student,
                assignment:assignment,
                feedbackUpdated: this.props.arrData.length > 0 ? true : false
            }
            console.log(data);
        }

        updateFeedback.update(data,(res)=>{
            if(res.code == 200) {
                this.props.dispatch({type:"FEEDBACKRECEIVED", feedback:res.data.feedback});
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

    render = () => {
        return (
            <div id = 'feedback'>
                <div id = 'feedbackDiv' className = 'borderProps'>
                    <h4>Feedback</h4>
                    <hr/>
                    {/*<Textarea value = {this.state.feedback} width = "100%" />*/}
                    <textarea id='feedback' placeholder='Write feedback' value = {this.state.feedback}></textarea>
                </div>
                <div id = 'submit'>
                    <button id = 'submitButton' onClick = {this.submitFeedback}>Submit</button>
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
        feedback:store.codeAndFeedbackReducer.loadFeedback
    }
}

export default connect(mapStateToProps)(Feedback)