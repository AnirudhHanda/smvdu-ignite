import {
    CREATE_DEPARTMENT_FAILURE,
    CREATE_DEPARTMENT_REQUEST, CREATE_DEPARTMENT_SUCCESS, DELETE_DEPARTMENT_FAILURE, DELETE_DEPARTMENT_REQUEST, DELETE_DEPARTMENT_SUCCESS,
    FETCH_DEPARTMENTS_REQUEST,
    FETCH_DEPARTMENTS_SUCCESS, FETCH_DEPARTMETNS_FAILURE, SEARCH_DEPARTMENT_FAILURE, SEARCH_DEPARTMENT_REQUEST, SEARCH_DEPARTMENT_SUCCESS
} from "@/redux/department/ActionTypes.js";

const initialState = {
    departments:[],
    loading: false,
    error: null,
    searchDepartmentss:[],
}

export const departmentReducer = (state = initialState, action) => {
    switch(action.type){

        case FETCH_DEPARTMENTS_REQUEST:
        case CREATE_DEPARTMENT_REQUEST:
        case DELETE_DEPARTMENT_REQUEST:
        case SEARCH_DEPARTMENT_REQUEST:
            console.log("REQUEST Accepted");
            return {
                ...state,
                loading: true,
                error: null,
            };

        case CREATE_DEPARTMENT_SUCCESS:
            console.log("CREATED CREATED");
            return{
                ...state,
                loading: false,
                departments: [...state.departments, action.payload.department],
                error: null,
            }

        case FETCH_DEPARTMENTS_SUCCESS:
            console.log("Reducer object: ", action.payload.department);
            return {
                ...state, 
                loading:false,
                departments: action.payload.departments,
                error: null,
            };

        case SEARCH_DEPARTMENT_SUCCESS:
            return{
                ...state,
                loading: false,
                searchDepartmentss: action.payload.departments,
                error: null
            }

        
        case DELETE_DEPARTMENT_SUCCESS:
            return{
                ...state,
                loading: false,
                departments: state.departments.filter(department => department.departmentId === action.departmentId),
                error: null,
            };

        case FETCH_DEPARTMETNS_FAILURE:
        case CREATE_DEPARTMENT_FAILURE:
        case DELETE_DEPARTMENT_FAILURE:
        case SEARCH_DEPARTMENT_FAILURE:
            return{
                ...state,
                loading: false,
                error: action.error,
            };

        default:
            return state;
    }
}