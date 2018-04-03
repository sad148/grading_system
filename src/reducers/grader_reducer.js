const graderReducer = (state = {graderId: ""}, action) => {
    switch (action.type) {
        case 'UPDATE_GRADERID':
            state = {
                ...state,
                graderId: action.graderId
            }
            break;
    }
    return state;
}

export default graderReducer;