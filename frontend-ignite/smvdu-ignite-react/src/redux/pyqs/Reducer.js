// reducer.js
import * as actionTypes from './ActionTypes';

const initialState = {
    pyqs: [],
    loading: false,
    error: null,
    message: null,
};

const pyqsReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_PYQS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
                message: "Fetching PYQs..."
            };
        case actionTypes.FETCH_PYQS_SUCCESS:
            return {
                ...state,
                loading: false,
                pyqs: action.pyqs.pyqs,
                message: "PYQs available..."
            };
    
        
        case actionTypes.FETCH_PYQS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error,
            }

        case actionTypes.DELETE_PYQS_SUCCESS:
        return {
            ...state,
            loading: false,
            pyqs: state.pyqs.filter(pyq => pyq.id !== action.pyqId),
            message: "Deleted successfully...",
        };

        
        case actionTypes.DELETE_PYQS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error,
            }
        default:
            return state;
    }
};

export default pyqsReducer;