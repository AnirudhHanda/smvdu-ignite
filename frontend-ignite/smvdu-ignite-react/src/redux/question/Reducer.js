// reducer.js
import * as actionTypes from './ActionTypes';

const initialState = {
    questions: [],
    loading: false,
    error: null
};

const questionReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CREATE_QUESTION_REQUEST:
        case actionTypes.DELETE_QUESTION_REQUEST:
        case actionTypes.FETCH_QUESTIONS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        
        case actionTypes.FETCH_QUESTIONS_SUCCESS:
        return {
            ...state,
            loading: false,
            questions: action.payload.questions,
            error: action.error,
        };
        case actionTypes.CREATE_QUESTION_SUCCESS:
            return {
                ...state,
                loading: false,
                questions: [...state.questions, action.question.question]
            };
        case actionTypes.DELETE_QUESTION_SUCCESS:
            return {
                ...state,
                loading: false,
                questions: state.questions.filter(question => question.id !== action.questionId),
                
            };
        
        case actionTypes.CREATE_QUESTION_FAILURE:
        case actionTypes.FETCH_QUESTIONS_FAILURE:
        case actionTypes.DELETE_QUESTION_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error,
            }

        
        
        default:
            return state;
    }
};

export default questionReducer;