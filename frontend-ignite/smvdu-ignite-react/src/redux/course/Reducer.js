// reducer.js
import * as actionTypes from './ActionTypes';

const initialState = {
    courses: [],
    loading: false,
    error: null,
    searchCoursess: [],
};

const courseReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_COURSES_REQUEST:
        case actionTypes.CREATE_COURSE_REQUEST:
        case actionTypes.DELETE_COURSE_REQUEST:
        case actionTypes.FETCH_COURSES_BY_ID_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case actionTypes.FETCH_COURSES_SUCCESS:
            return {
                ...state,
                loading: false,
                courses: action.courses.courses,
            };
        case actionTypes.FETCH_COURSES_BY_ID_SUCCESS:
            return {
                ...state,
                loading: false,
                courseDetails: action.courses,
                
            };
        

        case actionTypes.CREATE_COURSE_SUCCESS:
            return {
                ...state,
                loading: false,
                courses: [...state.courses, action.course],  
            };
        
        case actionTypes.DELETE_COURSE_SUCCESS:
            return{
                ...state,
                loading: false,
                courses: state.courses.filter((course) => course.id !== action.courseID),
            };
        
        case actionTypes.SEARCH_COURSE_SUCCESS:
            console.log("COurse payload: ", action.payload);
            return{
                ...state,
                loading: false,
                searchCoursess: action.payload.courses,
                error: null
            }
        
        case actionTypes.FETCH_COURSES_FAILURE:
        case actionTypes.CREATE_COURSE_FAILURE:
        case actionTypes.DELETE_COURSE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error,
            }
        default:
            return state;
    }
};

export default courseReducer;