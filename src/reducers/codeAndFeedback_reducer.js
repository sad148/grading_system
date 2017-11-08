const codeAndFeedbackReducer = (state = { loadFeedback:"", loadCode:"", cfReceived:false }, action ) => {
	switch(action.type) {
		case 'CODEFEEDBACKRECEIVED':
			state = 
			{
				...state,
				cfReceived:true,
				loadFeedback:action.feedback,
				loadCode:action.code
			}
			break;
	}
	return state;
}

export default codeAndFeedbackReducer;