import React, { Component } from 'react';
import brace from 'brace';
import AceEditor from 'react-ace';
import 'brace/mode/java';
import 'brace/theme/monokai';
import 'brace/theme/chrome';
import Switch from 'react-toggle-switch';
import "../../node_modules/react-toggle-switch/dist/css/switch.min.css"

export default class CodePane extends Component {
    toggleSwitch = () => {
        this.setState(prevState => {
            return {
                switched: !prevState.switched
            };
        });
    };

    constructor(props) {
        super(props);
        this.state = {
            switched: false,
        };
    }

	componentWillMount = () =>{
		this.setState({codeData:""});
	}

	componentWillReceiveProps = (nextProps) => {
		console.log("componentWillReceiveProps",nextProps);
		this.setState({
			codeData:nextProps.codeData
		})
	}

    nightMode() {
        return (<div id = 'codePane' className = 'borderProps'>
                <h4>Code</h4>
                <Switch onClick={this.toggleSwitch} on={this.state.switched}/>
                <hr/>
                <AceEditor
                    ref="ace"
                    mode="java"
                    theme="monokai"
                    name="codeDisplay"
                    value={this.state.codeData}
                    fontSize={12}
                    showPrintMargin={true}
                    showGutter={true}
                    highlightActiveLine={true}
                    style={{
                        width:"98%",
                        height:"91%",
                        "marginLeft": "1%",
                        "borderRadius":"4px"
                    }}
                    setOptions={{
                        enableBasicAutocompletion: false,
                        enableLiveAutocompletion: false,
                        enableSnippets: false,
                        showLineNumbers: true,
                    }}/>
            </div>
        );
    }

    dayMode() {
        return (<div id = 'codePane' className = 'borderProps'>
                <h4>Code</h4>
                <Switch onClick={this.toggleSwitch} on={this.state.switched}/>
                <hr/>
                <AceEditor
                    ref="ace"
                    mode="java"
                    theme="chrome"
                    name="codeDisplay"
                    value={this.state.codeData}
                    fontSize={12}
                    showPrintMargin={true}
                    showGutter={true}
                    highlightActiveLine={true}
                    style={{
                        width:"98%",
                        height:"91%",
                        "marginLeft": "1%",
                        "borderRadius":"4px"
                    }}
                    setOptions={{
                        enableBasicAutocompletion: false,
                        enableLiveAutocompletion: false,
                        enableSnippets: false,
                        showLineNumbers: true,
                    }}/>
            </div>
        );
    }

	render() {
        if(this.state.switched)
            return this.nightMode();
        else
            return this.dayMode();
	}
}