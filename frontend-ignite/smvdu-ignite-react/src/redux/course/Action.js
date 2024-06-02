// action.js
import api from "@/config/Api.js";
import * as actionTypes from "./ActionTypes";

// id = departmentID
export const fetchCourses = (id) => {
    return async (dispatch) => {
        dispatch({ type: actionTypes.FETCH_COURSES_REQUEST });
        try {
            const response = await api.get(`api/v1/courses/department/${id}`);
            console.log("fetched courses: ", response.data);
            dispatch({
                type: actionTypes.FETCH_COURSES_SUCCESS,
                courses: response.data,
            });

        } catch(error){
            dispatch({
                type: actionTypes.FETCH_COURSES_FAILURE,
                error: error.response.data.errorDetail,
            })
        }
    };
}; 

// here the id is courseId
export const fetchCourseById = (id) => {
    return async (dispatch) => {
        dispatch({ type: actionTypes.FETCH_COURSES_BY_ID_REQUEST });
        try{
            const response = await api.get(`api/v1/courses/${id}`);
            console.log("fetched course by id: ", response.data);
            dispatch({
                type: actionTypes.FETCH_COURSES_BY_ID_SUCCESS,
                courses: response.data,
            });
        } catch(error) {
            dispatch({
                type: actionTypes.FETCH_COURSES_BY_ID_FAILURE,
                error: error.response.data.errorDetail,
            })
        }
    }
}

export const createCourse = (courseData) => {
    return async (dispatch) => {
        dispatch({type: actionTypes.CREATE_COURSE_REQUEST})
        try{
            const response = await api.post(`api/v1/courses/upload`,
                courseData
            );
            console.log("Uploaded question", response.data)
            dispatch({
                type: actionTypes.CREATE_COURSE_SUCCESS,
                course: response.data,
            })
        } catch(error){
            console.log("Error: ", error);
            dispatch({
                type: actionTypes.CREATE_COURSE_FAILURE,
                error: error.response.data.errorDetail,
            });
        }

    }
}

// Action for deleting a course
export const deleteCourse = (courseId) => {
    return async (dispatch) => {
        dispatch({ type: actionTypes.DELETE_COURSE_REQUEST});
        try{
            await api.delete(
                `api/v1/questions/${courseId}`
            );
            dispatch({ type: actionTypes.DELETE_COURSE_SUCCESS, courseId});
        } catch(error){
            console.log("error: ", error);
            dispatch({
                type: actionTypes.DELETE_COURSE_FAILURE,
                error: error.response.data.errorDetail,
            });
        }
    }
}

export const searchCourses = (keyword, id) => async dispatch => {
    dispatch({type: actionTypes.SEARCH_COURSE_REQUEST});
    try {
        const {data} = await api.get("api/v1/courses/search?departmentId="+id+"&keyword="+keyword)
        console.log("searched Courses", data)
        dispatch({type: actionTypes.SEARCH_COURSE_SUCCESS, payload: data})
    } catch(error){
        dispatch({
            type: actionTypes.SEARCH_COURSE_FAILURE,
            error: error.response.data.errorDetail,
        });
    }
}