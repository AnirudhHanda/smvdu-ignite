// reducer.js
import * as actionTypes from './ActionTypes';

const initialState = {
    replies: [],
    loading: false,
    error: null,
};

const replyReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_REPLY_REQUEST:
        case actionTypes.CREATE_REPLY_REQUEST:
        case actionTypes.DELETE_REPLY_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case actionTypes.FETCH_REPLIES_SUCCESS:
            return {
                ...state,
                loading: false,
                replies: action.payload.replies,
            };
        

        case actionTypes.CREATE_REPLY_SUCCESS:
            console.log("Dispatched or Not: ", action.reply);
            return {
                ...state,
                loading: false,
                replies: [...state.replies, action.reply.reply],  
            };
        
        case actionTypes.DELETE_REPLY_SUCCESS:
            return{
                ...state,
                loading: false,
                replies: state.replies.filter((reply) => reply.id !== action.replyID),
            };
        
        case actionTypes.FETCH_REPLIES_FAILURE:
        case actionTypes.CREATE_REPLY_FAILURE:
        case actionTypes.DELETE_REPLY_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error,
            }
        default:
            return state;
    }
};

export default replyReducer;