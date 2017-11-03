import React, { Component } from 'react';
import brace from 'brace';
import AceEditor from 'react-ace';
import 'brace/mode/java';
import 'brace/theme/monokai'

export default class CodePane extends Component {
	componentWillMount = () =>{
		this.setState({codeData:""});
	}

	componentWillReceiveProps = (nextProps) => {
		this.setState({
			codeData:nextProps.data
		})
	}

	render() {
		return (<div id = 'codePane'>
				  <AceEditor
					  mode="java"
					  theme="monokai"
					  name="codeDisplay"
					  value={this.state.codeData}
					  fontSize={14}
					  showPrintMargin={true}
					  showGutter={true}
					  highlightActiveLine={true}	
					  style={{
					  	width:"100%",
					  	height:"98%"
					  }}				  
					  setOptions={{
					  enableBasicAutocompletion: false,
					  enableLiveAutocompletion: false,
					  enableSnippets: false,
					  showLineNumbers: true,
					  tabSize: 2,
					  }}/>
	    		</div>)
	}
}