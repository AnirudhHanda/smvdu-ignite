import {
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    LOGIN_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS, LOGOUT,
    REGISTER_FAILURE,
    REGISTER_REQUEST,
    REGISTER_SUCCESS
} from "@/redux/auth/ActionTypes.js";
import {API_BASE_URL} from "@/config/Api.js";
import axios from "axios";

export const register = userData=>async(dispatch) => {
    dispatch({type: REGISTER_REQUEST})

    try{
        const {data} = await axios.post(`${API_BASE_URL}api/v1/registration`, userData)

        if(data.jwt){
            localStorage.setItem("jwt",data.jwt);
            dispatch({type:REGISTER_SUCCESS, payload: data})
        }

        console.log("register success", data)
    } catch (error){
        dispatch({
            type: REGISTER_FAILURE,
            error: error.response.data.errorDetail,
        })
        console.log("errrorr: ", error.response.data.errorDetail);
    }
}

export const login = userData=>async(dispatch) => {
    dispatch({type: LOGIN_REQUEST})

    try{
        const {data} = await axios.post(`${API_BASE_URL}api/v1/loging`, userData)

        if(data.jwt){
            localStorage.setItem("jwt",data.jwt);
            dispatch({type:LOGIN_SUCCESS, payload: data})
        }

        console.log("login success", data)
    } catch (error){
        dispatch({
            type: LOGIN_FAILURE,
            error: error.response.data.errorDetail,
        })
        console.log("errrorr: ", error.response.data.errorDetail);
    }
}

export const getUser= () => async(dispatch) => {
    dispatch({type: GET_USER_REQUEST})

    try{
        const {data} = await axios.get(`${API_BASE_URL}api/v1/users/profile`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt')}`,
            }
        })

            dispatch({type:GET_USER_SUCCESS, payload: data})
        

        console.log("user success", data)
    } catch (error){
        console.log(error);
    }
}

export const logout = () => async (dispatch) =>{
    localStorage.clear();
    dispatch({type: LOGOUT})
    
}