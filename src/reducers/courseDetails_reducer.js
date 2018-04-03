const courseReducer = (state = {course_code: "", section_code: "", term: ""}, action) => {
    switch (action.type) {
        case 'UPDATE_DATA':
            state = {
                ...state,
                course_code: action.course_code,
                section_code: action.section_code,
                term: action.term
            }
            break;
    }
    return state;
}

export default courseReducer;