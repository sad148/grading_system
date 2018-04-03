import React, {Component} from 'react';
import {connect} from 'react-redux'
import Courses from './courses'
import Graders from './graders'
import Students from './students'
import Assignments_Professors from './assignments_professorPage'
import Rubric_Professors from './rubric_professors'
import '../../node_modules/react-stepzilla/src/css/main.css'

import StepZilla from 'react-stepzilla'

class Professor extends Component {
    state = {}

    render = () => {
        const steps =
            [
                {name: 'Courses', component: <Courses props={this.props}/>},
                {name: 'Graders', component: <Graders props={this.props}/>},
                {name: 'Students', component: <Students props={this.props}/>},
                {name: 'Assignments', component: <Assignments_Professors props={this.props}/>},
                {name: 'Rubric', component: <Rubric_Professors props={this.props}/>}
            ]
        return (
            <div style={{width: "100%", height: "100%", position: "absolute"}}>
                <div id={"header"} style={{"backgroundColor": "#376c82", height: "8%"}}/>
                <div className={"step-progress"}>
                    <StepZilla steps={steps}/>
                </div>
                <div>
                    {this.state.display}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (store) => {
    return {}
};

//to connect the component to store
export default connect(mapStateToProps)(Professor);