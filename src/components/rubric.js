import React,{Component} from 'react';
import { connect } from 'react-redux';
import loadRubric from "../actions/loadRubric";
import Loader from './loader.js';
import SkyLight from 'react-skylight';

var modal = {
    width: '45%',
    height: '18%',
    borderRadius: '15px'
};

class Rubric extends Component {
    componentWillMount = () => {
        this.setState({guidelines:<Loader />, fullForm:""});
        this.props.dispatch(loadRubric());
        this.counter = 0;
    }

    componentWillReceiveProps = (nextProps) => {
        if(nextProps.rubricLoaded == true) {
            let guidelines = [];
            let rubricData = nextProps.loadRubric;
            for(let i = 0;i<rubricData.length;i++) {
                guidelines.push(
                    <div id = 'block'>
                        <input type = 'checkbox' id = {i} key = {this.counter++} className = 'guidelinesCheckbox' onClick={()=>this.checkboxClicked(rubricData[i], i)}></input>
                        <input type = 'text' className = 'guidelinesData borderProps' value = {rubricData[i].shortForm} disabled></input>&nbsp;
                        <label className = 'gradeClass'>{rubricData[i].grade}</label>
                        <button value = 'more' className = 'more' onClick = { () => this.showFullInfo(rubricData[i].fullForm)}>More</button>
                    </div>
                )
            }
            this.setState({guidelines:guidelines})
            this.props.dispatch({type:"DISPLAY_RUBRIC"});
        }
    }

    checkboxClicked = (rubricData, index) => {
        if(document.getElementById(index).checked == true) {
            this.props.dispatch({type:"ADDRUBRIC", rubricData:rubricData, rubricId:index, rubricOperation:1})
        } else {
            this.props.dispatch({type:"REMOVERUBRIC", rubricData:rubricData, rubricId:index, rubricOperation:0})
        }
    }

    showFullInfo = (fullForm) => {
        console.log(fullForm);
        this.simpleDialog.show();
        this.setState({fullForm:fullForm})
    }

    render = () => {
        return (
            <div id = 'rubric' className = 'borderProps'>
                <h4>Guidelines</h4>
                <hr/>
                <div id = 'guidelines'>
                    {this.state.guidelines}
                </div>
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

export default connect(mapStateToProps)(Rubric);