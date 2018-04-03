import React, {Component} from 'react'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import {faPlus} from '@fortawesome/fontawesome-free-solid'
import {faEdit} from '@fortawesome/fontawesome-free-solid'
import addCourses from '../actions/addCourse'

const term = (
    <div style={{marginRight: "20px"}}>
        Select Term <br/>
        <select id={"term"}>
            <option value={"fall 2017"}>Fall 2017</option>
            <option value={"spring 2018"}>Spring 2018</option>
            <option value={"summer 2018"}>Summer 2018</option>
            <option value={"fall 2018"}>Fall 2018</option>
            <option value={"spring 2019"}>Spring 2019</option>
        </select>
    </div>
)

class Courses extends Component {
    state = {
        coursesState: "Select add or edit option above"
    }
    course = (id) => {
        id === 0 ?
            this.setState({
                coursesState:
                    <div style={{display: "flex"}}>
                        {term}
                        <div style={{marginRight: "20px"}}>
                            Add new course code <br/><input id={"coursecode"} type={"text"}/>
                        </div>
                        <div>
                            Add new section code <br/><input id={"sectioncode"}
                                                             type={"text"}
                        />
                        </div>
                        <input style={{height: "30px", marginTop: "12px"}} type={"submit"}
                               value={"Create"} onClick={this.addCourse}></input>
                    </div>
            }) : this.setState({
                coursesState:
                    <div style={{display: "flex"}}>
                        {term}
                        <div style={{marginRight: "20px"}}>
                            Enter course code <br/><input onChange={() => this.updateText(0)} id={"coursecode"}
                                                          type={"text"}/>
                        </div>
                        <div>
                            Enter section code <br/><input onChange={() => this.updateText(1)} id={"sectioncode"}
                                                           type={"text"}
                        />
                        </div>
                    </div>
            })
    }

    updateText = (id) => {
        let course_code = document.getElementById("coursecode").value
        let section_code = document.getElementById("sectioncode").value
        let selectedTerm = document.getElementById("term");
        selectedTerm = selectedTerm.options[selectedTerm.selectedIndex].value;
        this.props.props.dispatch({
            type: "UPDATE_DATA",
            course_code: course_code,
            section_code: section_code,
            term: selectedTerm
        });
    }

    addCourse = () => {
        let course_code = document.getElementById("coursecode").value
        let section_code = document.getElementById("sectioncode").value
        let selectedTerm = document.getElementById("term");
        selectedTerm = selectedTerm.options[selectedTerm.selectedIndex].value;
        this.props.props.dispatch(addCourses([course_code, section_code, selectedTerm]));
        //addCourses.addcourse([course_code, section_code, selectedTerm], this.props.props.dispatch)
    }

    render = () => {
        return (
            <div id={"course"} className={"profDivElements"}>
                Courses&nbsp;&nbsp;<FontAwesomeIcon onClick={() => this.course(0)}
                                                    icon={faPlus}/>&nbsp;&nbsp;<FontAwesomeIcon
                onClick={() => this.course(1)} icon={faEdit}/>
                <hr/>
                {this.state.coursesState}
            </div>
        )
    }
}

export default Courses;