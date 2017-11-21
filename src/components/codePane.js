import React, { Component } from 'react';
import brace from 'brace';
import AceEditor from 'react-ace';
import 'brace/mode/java';
import 'brace/theme/monokai';
import 'brace/theme/chrome';
import Switch from 'react-toggle-switch';
import "../../node_modules/react-toggle-switch/dist/css/switch.min.css"

export default class CodePane extends Component {
	componentWillMount = () =>{
		this.setState({codeData:"", switchTheme:false});
	}

	componentWillReceiveProps = (nextProps) => {
		console.log("componentWillReceiveProps",nextProps);
		this.setState({
			codeData:nextProps.codeData
		})
	}

    toggleSwitch = () => {
        this.setState(prevState => {
            return {
                switchTheme: !prevState.switchTheme
            };
        });
    };

	render() {
        return (<div id = 'codePane' className = 'borderProps'>
                    <h4>Code</h4>
                    <Switch onClick={this.toggleSwitch} on={this.state.switchTheme}/>
                    <hr/>
                    <AceEditor
                        ref="ace"
                        mode="java"
                        theme={this.state.switchTheme ? "chrome":"monokai"}
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
}