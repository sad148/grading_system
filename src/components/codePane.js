import React, { Component } from 'react';
import brace from 'brace';
import AceEditor from 'react-ace';
import 'brace/mode/java';
import 'brace/theme/monokai';
import 'brace/theme/chrome';
import Switch from 'react-toggle-switch';
import "../switch.css"
import 'brace/theme/monokai'
import downloadIcon from '../download.png';
import { ToastContainer, toast } from 'react-toastify';
import '../../node_modules/react-toastify/dist/ReactToastify.min.css';
let downloadFile = require('../actions/downloadFile.js');

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
                      <Switch onClick={this.toggleSwitch} on={this.state.switchTheme}/>
                      {/*<a href = 'http://localhost:3009/download' onSuccess={this.downloadError}>*/}
                          <button id = 'downloadbutton' onClick={this.downloadFile} title = 'Download code'>Download(.zip)</button>
                      {/*</a>*/}
                  </div>
                  <hr/>
	              <AceEditor
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
                  <ToastContainer
                        type="error"
                        autoClose={3000}
                        closeOnClick
                        hideProgressBar
                  />
	    		</div>)
	}
}