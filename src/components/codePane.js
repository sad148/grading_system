import React, { Component } from 'react';
import AceEditor from 'react-ace';
import 'brace/mode/java';
import 'brace/theme/monokai'
import downloadIcon from '../download.png';
import { ToastContainer, toast } from 'react-toastify';
import '../../node_modules/react-toastify/dist/ReactToastify.min.css';
let downloadFile = require('../actions/downloadFile.js');

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

	downloadFile = () => {
	    downloadFile.downloadFile((res) => {
	        if(res) {
                window.location.href = 'http://localhost:3009/download';
            } else {
                toast.error("Error in downloading", {
                    position: toast.POSITION.TOP_CENTER
                })
            }
        })
    }

	render() {
		return (<div id = 'codePane' className = 'borderProps'>
                  <div style = {{"height":"3%"}}>
                      <h4>Code</h4>
                      {/*<a href = 'http://localhost:3009/download' onSuccess={this.downloadError}>*/}
                          <button id = 'downloadbutton' onClick={this.downloadFile} title = 'Download code'>Download(.zip)</button>
                      {/*</a>*/}
                  </div>
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
    					"marginLeft": "1%",
    					"borderRadius":"4px"
					  }}				  
					  setOptions={{
					  enableBasicAutocompletion: false,
					  enableLiveAutocompletion: false,
					  enableSnippets: false,
					  showLineNumbers: true,
					  }}/>
                  <ToastContainer
                        type="error"
                        autoClose={3000}
                        closeOnClick
                        hideProgressBar
                  />
	    		</div>)
	}
}