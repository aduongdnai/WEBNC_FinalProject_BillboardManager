const initialState = {
    accessToken: localStorage.getItem("accessToken"),
    rfToken: localStorage.getItem("refreshToken"),
    userData: JSON.parse(localStorage.getItem("userData")),
    isAuth: localStorage.getItem("isAuth") || false
}
const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS': {
            return {
                ...state,
                accessToken: action.payload.accessToken,
                rfToken: action.payload.rfToken,
                userData: action.payload.userData,
                isAuth: true,
            }
        }
        case 'LOGOUT': {
            localStorage.clear()
            return {
                accessToken: null,
                rfToken: null,
                userData: null,
                isAuth: false
            };
        }
        case 'UPDATE_ACCESS_TOKEN': {
            localStorage.setItem('accessToken', action.payload.accessToken);
            return {
                ...state,
                accessToken: action.payload.accessToken
            }
        }
        default:
            return state
    }
}
export default authReducer