const assignmentIdReducer = (state = {assignmentId: ""}, action) => {
    switch (action.type) {
        case 'UPDATE_ASSIGNMENTID':
            state = {
                ...state,
                assignmentId: action.assignmentId
            }
            break;
    }
    return state;
}

export default assignmentIdReducer;