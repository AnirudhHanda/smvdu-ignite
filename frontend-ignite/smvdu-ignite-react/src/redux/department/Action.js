import api from "@/config/Api.js";
import {
    CREATE_DEPARTMENT_FAILURE,
    CREATE_DEPARTMENT_REQUEST,
    CREATE_DEPARTMENT_SUCCESS, DELETE_DEPARTMENT_FAILURE, DELETE_DEPARTMENT_REQUEST, DELETE_DEPARTMENT_SUCCESS,
    FETCH_DEPARTMENTS_REQUEST,
    FETCH_DEPARTMENTS_SUCCESS,
    FETCH_DEPARTMETNS_FAILURE,
    SEARCH_DEPARTMENT_FAILURE,
    SEARCH_DEPARTMENT_REQUEST, SEARCH_DEPARTMENT_SUCCESS
} from "@/redux/department/ActionTypes.js";


export const fetchDepartments = () => async (dispatch) => {
    dispatch({type: FETCH_DEPARTMENTS_REQUEST});
    try {
        const {data} = await api.get("api/v1/departments")
        console.log("fetch api called------");
        console.log("all departments", data)
        dispatch({type:FETCH_DEPARTMENTS_SUCCESS, payload: data})
    } catch(error){
        dispatch({
            type: FETCH_DEPARTMETNS_FAILURE,
            error: error.response.data.errorDetail,
        })
        console.log("errrorr: ", error.response.data.errorDetail);
    }
}

export const searchDepartments = (keyword) => async dispatch => {
    dispatch({type: SEARCH_DEPARTMENT_REQUEST});
    try {
        const {data} = await api.get("/api/v1/departments/search?keyword="+keyword)
        console.log("searched departments", data)
        dispatch({type: SEARCH_DEPARTMENT_SUCCESS, payload: data})
    } catch(error){
        dispatch({
            type: SEARCH_DEPARTMENT_FAILURE,
            error: error.response.data.errorDetail,
        })
        console.log("errrorr: ", error.response.data.errorDetail);
    }
}

export const createDepartment = (departmentData) => async(dispatch) => {
    dispatch({type: CREATE_DEPARTMENT_REQUEST});
    try {
        const {data} = await api.post("api/v1/departments/upload", departmentData)
        console.log("Created department", data)
        dispatch({type: CREATE_DEPARTMENT_SUCCESS, payload: data})
    } catch(error){
        dispatch({
            type: CREATE_DEPARTMENT_FAILURE,
            error: error.response.data.errorDetail,
        })
        console.log("errrorr: ", error.response.data.errorDetail);
    }
}

export const deleteDepartment = ({departmentId}) => async(dispatch) => {
    dispatch({type: DELETE_DEPARTMENT_REQUEST});
    try {
        const {data} = await api.delete("/api/v1/departments"+departmentId)
        console.log("deleted department", data)
        dispatch({type: DELETE_DEPARTMENT_SUCCESS, departmentId})
    } catch(error){
        dispatch({
            type: DELETE_DEPARTMENT_FAILURE,
            error: error.response.data.errorDetail,
        })
        console.log("errrorr: ", error.response.data.errorDetail);
    }
}