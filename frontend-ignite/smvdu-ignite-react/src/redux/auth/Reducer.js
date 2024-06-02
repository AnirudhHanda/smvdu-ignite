import {
    GET_USER_REQUEST, GET_USER_SUCCESS,
    LOGIN_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS, LOGOUT,
    REGISTER_FAILURE,
    REGISTER_REQUEST,
    REGISTER_SUCCESS
} from "@/redux/auth/ActionTypes.js";

const initialState = {
    user: null,
    loading: false,
    error: null,
    jwt: null,
}

export const authReducer = (state = initialState, action) => {
    switch(action.type){
        case LOGIN_REQUEST:
        case REGISTER_REQUEST:
        case GET_USER_REQUEST:
            console.log("REEEEEEEEEEEEEEEE");
            return {...state, loading: true, error: null};

        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                jwt: action.payload.jwt,
                user: action.payload.user, // Update the user property here
            };

        case GET_USER_SUCCESS:
            console.log("user action: ", action.payload.user);
            return {...state, loading: false, error: null,
                 user: action.payload.user};

        case LOGOUT:
            return initialState;

        case LOGIN_FAILURE:
            return{
                ...state,
                loading: false,
                error: action.error,
            };

        case REGISTER_FAILURE:
            return{
                ...state,
                loading: false,
                error: action.error,
            }

        default:
            return state;
    }
}
