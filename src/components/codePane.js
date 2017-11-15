import React, { Component } from 'react';
import brace from 'brace';
import AceEditor from 'react-ace';
import 'brace/mode/java';
import 'brace/theme/monokai';
var runCode = require('../actions/runCode.js')

export default class CodePane extends Component {
	componentWillMount = () =>{
		this.setState({codeData:""});
	}

	componentWillReceiveProps = (nextProps) => {
		console.log("componentWillReceiveProps",nextProps);
		this.setState({
			codeData:nextProps.codeData
		})
	}

    runStudentCode = () => {
        runCode.run();
    }

	render() {
		return (<div id = 'codePane' className = 'borderProps'>
			<h3>Code</h3><button onClick={this.runStudentCode}> Run </button>
				  <hr/>				
				  <AceEditor
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
    					"marginLeft": "1%"
					  }}				  
					  setOptions={{
					  enableBasicAutocompletion: false,
					  enableLiveAutocompletion: false,
					  enableSnippets: false,
					  showLineNumbers: true,
					  }}/>
	    		</div>)
	}
}