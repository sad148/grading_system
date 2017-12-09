const codeAndFeedbackReducer = (state = { loadFeedback:"", loadCode:"", cfReceived:false, loadDataError:false, loadDataErrorMessage:"" }, action ) => {
	switch(action.type) {
		case 'CODERECEIVED':
			state = 
                {
                    ...state,
                    cfReceived:true,
                    loadCode:action.code,
                    loadDataError:false,
                    loadDataErrorMessage:""
                }
			break;
        case 'ASSIGNMENT_FOLDER_NOT_FOUND':
            state =
                {
                    ...state,
                    cfReceived:false,
                    loadFeedback:"",
                    loadCode:false,
                    loadDataError:true,
                    loadDataErrorMessage:"Assignment folder not found"
                }
            break;
        case 'FEEDBACKRECEIVED':
            state = 
                {
                    ...state,
                    loadFeedback:action.feedback
                }
            break;
        case 'GRADESRECEIVED':
            state =
                {
                    ...state,
                    loadGrades:action.grades
                }
            break;

	}
	return state;
}

export default codeAndFeedbackReducer;