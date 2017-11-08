import React, {Component} from 'react';
import CodePane from './codePane.js'
import FeedbackPane from './feedbackPane.js'
import { connect } from 'react-redux'

class RightPane extends Component {
	componentWillMount = () => {
		this.setState({
				feedback:"",
				code:""
		})
	}

	componentWillReceiveProps = (nextProps) => {
		if(nextProps.cfReceived == true) {
			this.setState({
				feedback:nextProps.feedback,
				code:nextProps.code
			})
		}
	}

	render = () => {
		return(
			<div id = 'rightPane'>
				<CodePane codeData={this.state.code}/>
				<FeedbackPane feedback={this.state.feedback}/>
		    </div>
			)
	}
}

const mapStateToProps = (store) => {
	return {
		cfReceived:store.codeAndFeedbackReducer.cfReceived,
		feedback:store.codeAndFeedbackReducer.loadFeedback,
		code:store.codeAndFeedbackReducer.loadCode
	}
}

export default connect(mapStateToProps)(RightPane);