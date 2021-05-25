import { createStore, combineReducers } from "redux";
import { bookReducer } from "./Reducers/bookReducer";
import { composeWithDevTools } from 'redux-devtools-extension';

const combineReducer = combineReducers({
    //for add many reducer
    books: bookReducer,
    // users:userReducer,
})
export const store = createStore(combineReducer, composeWithDevTools())