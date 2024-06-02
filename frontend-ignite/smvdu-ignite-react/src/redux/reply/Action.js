// action.js
import api from "@/config/Api.js";
import * as actionTypes from "./ActionTypes";

// id = departmentID
export const fetchReplies = (id) => {
    return async (dispatch) => {
        dispatch({ type: actionTypes.FETCH_REPLIES_REQUEST });
        try {
            const response = await api.get(`api/v1/replies/${id}`);
            console.log("fetched replies: ", response.data);
            dispatch({
                type: actionTypes.FETCH_REPLIES_SUCCESS,
                payload: response.data,
            });

        } catch(error){
            dispatch({
                type: actionTypes.FETCH_REPLIES_FAILURE,
                error: error.response.data.errorDetail,
            })
        }
    };
}; 


export const createReply = (replyData) => {
    return async (dispatch) => {
        dispatch({type: actionTypes.CREATE_REPLY_REQUEST})
        try{
            const response = await api.post(`api/v1/replies/upload`,
                replyData
            );
            console.log("Uploaded reply", response.data)
            dispatch({
                type: actionTypes.CREATE_REPLY_SUCCESS,
                reply: response.data,
            })
        } catch(error){
            console.log("Error: ", error);
            dispatch({
                type: actionTypes.CREATE_REPLY_FAILURE,
                error: error.response.data.errorDetail,
            });
        }

    }
}

// Action for deleting a course
export const deleteReply = (replyId) => {
    return async (dispatch) => {
        dispatch({ type: actionTypes.DELETE_REPLY_REQUEST});
        try{
            const response = await api.delete(
                `api/v1/replies/${replyId}`
            );
            dispatch({ type: actionTypes.DELETE_REPLY_SUCCESS, replyId});
            console.log("Deleted Reply: ", response.data);
        } catch(error){
            console.log("error: ", error);
            dispatch({
                type: actionTypes.DELETE_REPLY_FAILURE,
                error: error.response.data.errorDetail,
            });
        }
    }
}