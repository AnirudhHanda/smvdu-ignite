import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {thunk} from "redux-thunk";
import {authReducer} from "@/redux/auth/Reducer.js";

import questionReducer from "./question/Reducer";
import courseReducer from "./course/Reducer";
import replyReducer from "./reply/Reducer";
import { departmentReducer } from "./department/Reducer";
import notesReducer from "./notes/Reducer";
import pyqsReducer from "./pyqs/Reducer";

const rootReducer = combineReducers({
    auth: authReducer,
    department: departmentReducer,
    question: questionReducer,
    course: courseReducer,
    reply: replyReducer,
    note: notesReducer,
    pyq: pyqsReducer
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))