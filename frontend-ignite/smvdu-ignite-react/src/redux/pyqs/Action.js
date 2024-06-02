// action.js
import api from "@/config/Api.js";
import * as actionTypes from "./ActionTypes";

// id = departmentID
export const fetchPyqs = (id) => {
    return async (dispatch) => {
        dispatch({ type: actionTypes.FETCH_PYQS_REQUEST});
        try {
            const response = await api.get(`api/v1/pyqs/${id}`);
            console.log("fetched notes: ", response.data);
            dispatch({
                type: actionTypes.FETCH_PYQS_SUCCESS,
                pyqs: response.data,
            });

        } catch(error){
            dispatch({
                type: actionTypes.FETCH_PYQS_FAILURE,
                error: error.response.data.errorDetail,
            })
        }
    };
}; 


// export const createCourse = (courseData) => {
//     return async (dispatch) => {
//         dispatch({type: actionTypes.CREATE_COURSE_REQUEST})
//         try{
//             const response = await api.post(`api/v1/courses/upload`,
//                 courseData
//             );
//             console.log("Uploaded question", response.data)
//             dispatch({
//                 type: actionTypes.CREATE_COURSE_SUCCESS,
//                 course: response.data,
//             })
//         } catch(error){
//             console.log("Error: ", error);
//             dispatch({
//                 type: actionTypes.CREATE_COURSE_FAILURE,
//                 error: error.message,
//             });
//         }

//     }
// }

// Action for deleting a pyq
export const deletePyq = (pyqId, fileName) => {
    return async (dispatch) => {
        dispatch({ type: actionTypes.DELETE_PYQS_REQUEST});
        try{
            const response = await api.delete(
                `api/v1/pyqs/delete/${fileName}`,
                {
                    params: {pyqId},
                }
            );
            dispatch({ type: actionTypes.DELETE_PYQS_SUCCESS, pyqId});
            console.log("Delete Pyq: ", response.data);
        } catch(error){
            console.log("error: ", error);
            dispatch({
                type: actionTypes.DELETE_PYQS_FAILURE,
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