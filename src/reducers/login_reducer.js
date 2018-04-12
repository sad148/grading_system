const login = (state = {loginFlag: false}, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            sessionStorage.setItem("username", action.payload)
            state = {
                ...state,
                loginFlag: true,
                userid: action.payload,
                role: action.role
            }

            break;
        case 'LOGIN_ERROR' :
            state = {
                ...state,
                loginFlag: false
            }
            break;
    }
    return state;
}

export default login;