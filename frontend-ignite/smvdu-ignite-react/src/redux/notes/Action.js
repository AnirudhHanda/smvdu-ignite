// action.js
import api from "@/config/Api.js";
import * as actionTypes from "./ActionTypes";

// id = departmentID
export const fetchNotes = (id) => {
    return async (dispatch) => {
        dispatch({ type: actionTypes.FETCH_NOTES_REQUEST});
        try {
            const response = await api.get(`api/v1/notes/${id}`);
            console.log("fetched notes: ", response.data);
            dispatch({
                type: actionTypes.FETCH_NOTES_SUCCESS,
                notes: response.data,
            });

        } catch(error){
            dispatch({
                type: actionTypes.FETCH_NOTES_FAILURE,
                error: error.response.data.errorDetail,
            })
        }
    };
}; 


export const createNote = (option, formData) => {
    return async (dispatch) => {
        console.log("Dispatch called: ", formData);
        dispatch({type: actionTypes.CREATE_NOTES_REQUEST})
        try{
            const response = await api.post(`api/v1/${option}/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('jwt')}`
                }
            }); 
            console.log("Uploaded note", response.data)
            dispatch({
                type: actionTypes.CREATE_NOTES_SUCCESS,
                payload: response.data,
            })
        } catch(error){
            console.log("Error: ", error);
            dispatch({
                type: actionTypes.CREATE_NOTES_FAILURE,
                error: error.response.data.errorDetail,
            });
        }

    }
}

// Action for deleting a note
export const deleteNote = (noteId, fileName) => {
    return async (dispatch) => {
        dispatch({ type: actionTypes.DELETE_NOTES_REQUEST});
        try{
            const response = await api.delete(
                `api/v1/notes/delete/${fileName}`,
                {
                    params: {noteId},
                }
            );
            dispatch({ type: actionTypes.DELETE_NOTES_SUCCESS, noteId});
            console.log("Delte Note: ", response.data);
        } catch(error){
            console.log("error: ", error);
            dispatch({
                type: actionTypes.DELETE_NOTES_FAILURE,
                error: error.response.data.errorDetail,
            });
        }
    }
}

// export const searchCourses = (keyword, id) => async dispatch => {
//     dispatch({type: actionTypes.SEARCH_COURSE_REQUEST});
//     try {
//         const {data} = await api.get("api/v1/courses/search?departmentId="+id+"&keyword="+keyword)
//         console.log("searched Courses", data)
//         dispatch({type: actionTypes.SEARCH_COURSE_SUCCESS, payload: data})
//     } catch(error){
//         console.log("error: ", error);
//     }
// }