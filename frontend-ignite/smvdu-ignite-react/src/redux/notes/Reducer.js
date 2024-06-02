// reducer.js
import * as actionTypes from './ActionTypes';

const initialState = {
    notes: [],
    loading: false,
    error: null,
    message: null,
};

const notesReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CREATE_NOTES_REQUEST:
        case actionTypes.FETCH_NOTES_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
                message: "Uploading file.....",
            };
        case actionTypes.FETCH_NOTES_SUCCESS:
            return {
                ...state,
                loading: false,
                notes: action.notes.notes,
                message: "Notes available...."
            };
    
        case actionTypes.CREATE_NOTES_SUCCESS:
            console.log("NOTE CREATED");
            return{
                ...state,
                loading: false,
                notes: [...state.notes, action.payload.note],
                error: null,
                message: "Uploaded successfully..."
            }
        case actionTypes.FETCH_NOTES_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error,
                message: "error has occured..."
            }

        case actionTypes.DELETE_NOTES_SUCCESS:
            return {
                ...state,
                loading: false,
                notes: state.notes.filter(note => note.id !== action.noteId),
                
            };

        case actionTypes.CREATE_NOTES_FAILURE:
        case actionTypes.DELETE_NOTES_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error,
            }
        default:
            return state;
    }
};

export default notesReducer;