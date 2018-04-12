const getReducer = (state = {dataType: "", dataReceived: false, data: ""}, action) => {
    switch (action.type) {
        case 'DATA_RECEIVED':
            console.log("inside getreducer");
            state = {
                ...state,
                dataReceived: true,
                data: action.payload,
                dataType: action.dataType
            }
            break;
        case 'DATA_DISPLAYED' :
            state = {
                ...state,
                dataReceived: false
            }
            break;
        case 'DATA_APPEND':
            state = {
                ...state,
                dataReceived: true,
                data: [...state.data, ...action.payload],
                dataType: action.dataType
            }
            console.log(state);
            break;
    }
    return state;
}

export default getReducer;