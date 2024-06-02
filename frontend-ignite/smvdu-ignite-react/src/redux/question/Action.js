// action.js
import * as actionTypes from './ActionTypes.js';
import api from "@/config/Api.js";


// action for creating a question
export const createQuestion = (questionData) => {
    return async (dispatch) => {
        dispatch({type: actionTypes.CREATE_QUESTION_REQUEST})
        try{
            const response = await api.post(`api/v1/questions/upload`,
                questionData
            );
            console.log("Uploaded question", response.data)
            dispatch({
                type: actionTypes.CREATE_QUESTION_SUCCESS,
                question: response.data,
            })
        } catch(error){
            console.log("Error: ", error);
            dispatch({
                type: actionTypes.CREATE_QUESTION_FAILURE,
                error: error.response.data.errorDetail,
            });
        }

    }
}

// Action for deleting a question
export const deleteQuestion = (questionId) => {
    return async (dispatch) => {
        dispatch({ type: actionTypes.DELETE_QUESTION_REQUEST});
        try{
            console.log("Delete called:");
            const response = await api.delete(
                `api/v1/questions/${questionId}`
            );
            dispatch({ type: actionTypes.DELETE_QUESTION_SUCCESS, questionId});
            console.log("Deleted: ", response.data);
        } catch(error){
            console.log("error: ", error);
            dispatch({
                type: actionTypes.DELETE_QUESTION_FAILURE,
                error: error.response.data.errorDetail,
            });
        }
    }
}

// Action for fetching Questions
export const fetchQuestions = () => {
    return async (dispatch) => {
        dispatch({ type: actionTypes.FETCH_QUESTIONS_REQUEST});
        try{
            const response = await api.get(
                `api/v1/questions`
            );
            dispatch({
                type: actionTypes.FETCH_QUESTIONS_SUCCESS,
                payload: response.data,
            });
            console.log("Fetched Questions: ", response.data);
        } catch(error){
            console.log("error: ", error)
            dispatch({
                type: actionTypes.FETCH_QUESTIONS_FAILURE,
                error: error.response.data.errorDetail,
            });
        }
    }
}

